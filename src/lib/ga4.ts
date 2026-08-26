import { OAuth2Client } from "google-auth-library";
import fs from "node:fs";
import path from "node:path";

let cachedAccessToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedAccessToken && cachedAccessToken.expiresAt > Date.now() + 60000) {
    return cachedAccessToken.token;
  }

  // 1. From Refresh Token
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (refreshToken && clientId && clientSecret) {
    const oauth2Client = new OAuth2Client(clientId, clientSecret);
    oauth2Client.setCredentials({ refresh_token: refreshToken });
    const { token } = await oauth2Client.getAccessToken();
    if (token) {
      cachedAccessToken = { token, expiresAt: Date.now() + 3500000 };
      return token;
    }
  }

  // 2. From Token File
  const tokenFilePath = path.resolve(process.cwd(), "gsc-oauth", "google_account_token.json");
  const clientSecretPath = path.resolve(process.cwd(), "gsc-oauth", "client_secret.json");

  if (fs.existsSync(tokenFilePath) && fs.existsSync(clientSecretPath)) {
    try {
      const secretsRaw = JSON.parse(fs.readFileSync(clientSecretPath, "utf-8"));
      const secretConfig = secretsRaw.installed || secretsRaw.web;
      const tokenRaw = JSON.parse(fs.readFileSync(tokenFilePath, "utf-8"));

      const oauth2Client = new OAuth2Client(secretConfig.client_id, secretConfig.client_secret);
      oauth2Client.setCredentials(tokenRaw);
      const { token } = await oauth2Client.getAccessToken();
      if (token) {
        cachedAccessToken = { token, expiresAt: Date.now() + 3500000 };
        return token;
      }
    } catch {
      // Fall through
    }
  }

  throw new Error(
    "Google credentials not configured. Please run 'npm run auth:google' or set GOOGLE_REFRESH_TOKEN in .env.local"
  );
}

async function callGA4DataApi(propertyId: string, endpoint: string, body: Record<string, unknown>) {
  const token = await getAccessToken();
  const url = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:${endpoint}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error?.message || `GA4 API error (${res.status})`);
  }

  return json;
}

export interface RealtimeAnalyticsResult {
  propertyId: string;
  timestamp: string;
  activeUsers: number;
  screenPageViews: number;
  eventCount: number;
  topPages: Array<{
    path: string;
    activeUsers: number;
  }>;
  countries: Array<{
    country: string;
    activeUsers: number;
  }>;
  cities: Array<{
    city: string;
    activeUsers: number;
  }>;
  deviceCategories: Array<{
    device: string;
    activeUsers: number;
  }>;
  recentEvents: Array<{
    eventName: string;
    eventCount: number;
  }>;
}

/**
 * Pull real-time analytics data from Google Analytics 4 (last 30 minutes).
 */
export async function getGA4RealtimeData(
  overridePropertyId?: string
): Promise<RealtimeAnalyticsResult> {
  const propertyId =
    overridePropertyId || process.env.GA4_PROPERTY_ID || process.env.NEXT_PUBLIC_GA4_PROPERTY_ID;

  if (!propertyId) {
    throw new Error(
      "GA4_PROPERTY_ID is not configured in environment variables. Please add your numeric GA4 Property ID."
    );
  }

  // 1. Fetch overview real-time metrics
  const overviewResponse = await callGA4DataApi(propertyId, "runRealtimeReport", {
    metrics: [
      { name: "activeUsers" },
      { name: "screenPageViews" },
      { name: "eventCount" },
    ],
  });

  const activeUsers = parseInt(overviewResponse.rows?.[0]?.metricValues?.[0]?.value || "0", 10);
  const screenPageViews = parseInt(overviewResponse.rows?.[0]?.metricValues?.[1]?.value || "0", 10);
  const eventCount = parseInt(overviewResponse.rows?.[0]?.metricValues?.[2]?.value || "0", 10);

  // 2. Fetch top active pages
  const pagesResponse = await callGA4DataApi(propertyId, "runRealtimeReport", {
    dimensions: [{ name: "unifiedScreenName" }],
    metrics: [{ name: "activeUsers" }],
    limit: 10,
  });

  const topPages = (pagesResponse.rows || []).map((row: any) => ({
    path: row.dimensionValues?.[0]?.value || "/",
    activeUsers: parseInt(row.metricValues?.[0]?.value || "0", 10),
  }));

  // 3. Fetch countries & cities
  const geoResponse = await callGA4DataApi(propertyId, "runRealtimeReport", {
    dimensions: [{ name: "country" }, { name: "city" }],
    metrics: [{ name: "activeUsers" }],
    limit: 10,
  });

  const countriesMap = new Map<string, number>();
  const cities: Array<{ city: string; activeUsers: number }> = [];

  for (const row of geoResponse.rows || []) {
    const country = row.dimensionValues?.[0]?.value || "Unknown";
    const city = row.dimensionValues?.[1]?.value || "Unknown";
    const users = parseInt(row.metricValues?.[0]?.value || "0", 10);

    countriesMap.set(country, (countriesMap.get(country) || 0) + users);
    if (city !== "(not set)" && city !== "Unknown") {
      cities.push({ city: `${city}, ${country}`, activeUsers: users });
    }
  }

  const countries = Array.from(countriesMap.entries()).map(([country, activeUsers]) => ({
    country,
    activeUsers,
  }));

  // 4. Fetch device category
  const devicesResponse = await callGA4DataApi(propertyId, "runRealtimeReport", {
    dimensions: [{ name: "deviceCategory" }],
    metrics: [{ name: "activeUsers" }],
  });

  const deviceCategories = (devicesResponse.rows || []).map((row: any) => ({
    device: row.dimensionValues?.[0]?.value || "desktop",
    activeUsers: parseInt(row.metricValues?.[0]?.value || "0", 10),
  }));

  // 5. Fetch real-time events
  const eventsResponse = await callGA4DataApi(propertyId, "runRealtimeReport", {
    dimensions: [{ name: "eventName" }],
    metrics: [{ name: "eventCount" }],
    limit: 10,
  });

  const recentEvents = (eventsResponse.rows || []).map((row: any) => ({
    eventName: row.dimensionValues?.[0]?.value || "unknown",
    eventCount: parseInt(row.metricValues?.[0]?.value || "0", 10),
  }));

  return {
    propertyId,
    timestamp: new Date().toISOString(),
    activeUsers,
    screenPageViews,
    eventCount,
    topPages,
    countries,
    cities,
    deviceCategories,
    recentEvents,
  };
}
