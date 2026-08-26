#!/usr/bin/env node
/**
 * Interactive Google Account connection script for Google Analytics 4 & Search Console.
 * Pre-configured for account: buildarealgreatsite@gmail.com
 */

import { OAuth2Client } from "google-auth-library";
import http from "node:http";
import { URL } from "node:url";
import fs from "node:fs";
import path from "node:path";
import { exec } from "node:child_process";

const TARGET_EMAIL = "buildarealgreatsite@gmail.com";
const PORT = 8085;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/oauth2callback`;

const SCRIPT_DIR = path.resolve(process.cwd(), "gsc-oauth");
const CLIENT_SECRET_FILE = path.join(SCRIPT_DIR, "client_secret.json");
const TOKEN_FILE = path.join(SCRIPT_DIR, "google_account_token.json");
const ENV_LOCAL_PATH = path.resolve(process.cwd(), ".env.local");

const SCOPES = [
  "https://www.googleapis.com/auth/analytics.readonly",
  "https://www.googleapis.com/auth/webmasters.readonly",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

function readClientSecrets() {
  if (!fs.existsSync(CLIENT_SECRET_FILE)) {
    throw new Error(`client_secret.json not found at ${CLIENT_SECRET_FILE}`);
  }
  const raw = JSON.parse(fs.readFileSync(CLIENT_SECRET_FILE, "utf-8"));
  const config = raw.installed || raw.web;
  return {
    clientId: config.client_id,
    clientSecret: config.client_secret,
  };
}

function updateEnvFile(updates) {
  let envContent = "";
  if (fs.existsSync(ENV_LOCAL_PATH)) {
    envContent = fs.readFileSync(ENV_LOCAL_PATH, "utf-8");
  }

  for (const [key, value] of Object.entries(updates)) {
    const regex = new RegExp(`^${key}=.*$`, "m");
    if (regex.test(envContent)) {
      envContent = envContent.replace(regex, `${key}=${value}`);
    } else {
      envContent += `\n${key}=${value}`;
    }
  }

  fs.writeFileSync(ENV_LOCAL_PATH, envContent.trim() + "\n", "utf-8");
  console.log("📝 Updated .env.local with new credentials");
}

async function fetchGA4Properties(oauth2Client) {
  const token = (await oauth2Client.getAccessToken()).token;
  try {
    const res = await fetch("https://analyticsadmin.googleapis.com/v1beta/accountSummaries", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn("⚠️ Could not fetch GA4 Account Summaries:", errText);
      return [];
    }

    const data = await res.json();
    const properties = [];

    for (const account of data.accountSummaries || []) {
      for (const prop of account.propertySummaries || []) {
        const propId = prop.property.replace("properties/", "");
        properties.push({
          propertyId: propId,
          displayName: prop.displayName,
          account: account.displayName,
        });
      }
    }
    return properties;
  } catch (err) {
    console.warn("⚠️ GA4 API fetch error:", err.message);
    return [];
  }
}

async function fetchDataStreams(oauth2Client, propertyId) {
  const token = (await oauth2Client.getAccessToken()).token;
  try {
    const res = await fetch(
      `https://analyticsadmin.googleapis.com/v1beta/properties/${propertyId}/dataStreams`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) return [];
    const data = await res.json();
    const streams = [];

    for (const stream of data.dataStreams || []) {
      if (stream.webStreamData) {
        streams.push({
          name: stream.displayName,
          measurementId: stream.webStreamData.measurementId,
          defaultUri: stream.webStreamData.defaultUri,
        });
      }
    }
    return streams;
  } catch (err) {
    return [];
  }
}

async function main() {
  console.log("=================================================");
  console.log(`🔗 GOOGLE ACCOUNT CONNECTION: ${TARGET_EMAIL}`);
  console.log("=================================================\n");

  const { clientId, clientSecret } = readClientSecrets();
  const oauth2Client = new OAuth2Client(clientId, clientSecret, REDIRECT_URI);

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: SCOPES,
    login_hint: TARGET_EMAIL,
  });

  const server = http.createServer(async (req, res) => {
    try {
      const parsedUrl = new URL(req.url, `http://127.0.0.1:${PORT}`);
      if (parsedUrl.pathname === "/oauth2callback") {
        const code = parsedUrl.searchParams.get("code");
        const error = parsedUrl.searchParams.get("error");

        if (error) {
          res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
          res.end(`<h1>Authentication Failed</h1><p>${error}</p>`);
          console.error("❌ Authentication was cancelled or failed:", error);
          server.close();
          process.exit(1);
        }

        if (code) {
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.end(`
            <!DOCTYPE html>
            <html>
              <head><title>Authentication Successful</title></head>
              <body style="font-family: sans-serif; text-align: center; padding: 50px; background: #0b0f19; color: #fff;">
                <h1 style="color: #22c55e;">✅ Authentication Successful!</h1>
                <p>Google Account <strong>${TARGET_EMAIL}</strong> is now connected to theBOAT SEO & Analytics.</p>
                <p>You can close this browser tab and return to Antigravity.</p>
              </body>
            </html>
          `);

          console.log("📥 Authorization code received. Exchanging for tokens...");
          const { tokens } = await oauth2Client.getToken(code);
          oauth2Client.setCredentials(tokens);

          fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokens, null, 2), "utf-8");
          console.log(`💾 Saved auth tokens to ${TOKEN_FILE}`);

          // Verify user info
          const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: { Authorization: `Bearer ${tokens.access_token}` },
          });
          const userInfo = await userInfoRes.json();
          console.log(`\n👤 Authenticated Google Account: ${userInfo.email} (${userInfo.name})`);

          // Fetch Google Analytics properties
          console.log("\n🔍 Discovering GA4 Properties and Data Streams...");
          const properties = await fetchGA4Properties(oauth2Client);

          const envUpdates = {
            GOOGLE_REFRESH_TOKEN: tokens.refresh_token || "",
            GOOGLE_CLIENT_ID: clientId,
            GOOGLE_CLIENT_SECRET: clientSecret,
          };

          if (properties.length > 0) {
            console.log(`Found ${properties.length} GA4 Property(ies):`);
            for (const prop of properties) {
              console.log(`  - Property Name: "${prop.displayName}" | ID: ${prop.propertyId} (Account: ${prop.account})`);
              const streams = await fetchDataStreams(oauth2Client, prop.propertyId);
              for (const stream of streams) {
                console.log(`      * Stream: ${stream.name} | Measurement ID: ${stream.measurementId} | URI: ${stream.defaultUri}`);
              }

              // If match for theboat or first property
              if (
                prop.displayName.toLowerCase().includes("boat") ||
                !envUpdates.GA4_PROPERTY_ID
              ) {
                envUpdates.GA4_PROPERTY_ID = prop.propertyId;
                if (streams.length > 0) {
                  envUpdates.NEXT_PUBLIC_GA_MEASUREMENT_ID = streams[0].measurementId;
                }
              }
            }
          } else {
            console.log("ℹ️ No existing GA4 properties found under this account, or permission is pending.");
          }

          updateEnvFile(envUpdates);

          console.log("\n=================================================");
          console.log("🎉 GOOGLE ACCOUNT SUCCESSFULLY CONNECTED!");
          console.log("=================================================\n");

          server.close();
          process.exit(0);
        }
      }
    } catch (err) {
      console.error("❌ Error handling OAuth callback:", err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal error");
      server.close();
      process.exit(1);
    }
  });

  server.listen(PORT, () => {
    console.log(`🌐 Local OAuth server listening on ${REDIRECT_URI}`);
    console.log(`👉 Opening browser consent screen for ${TARGET_EMAIL}...`);
    console.log(`\nIf the browser does not open automatically, please open this URL:\n${authUrl}\n`);

    exec(`open "${authUrl}"`, (err) => {
      if (err) {
        console.log(`(Failed to launch browser automatically: ${err.message})`);
      }
    });
  });
}

main();
