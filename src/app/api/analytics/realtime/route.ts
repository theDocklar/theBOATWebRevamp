import { NextResponse } from "next/server";
import { getGA4RealtimeData } from "@/lib/ga4";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get("propertyId") || undefined;

    const data = await getGA4RealtimeData(propertyId);
    return NextResponse.json(
      {
        success: true,
        data,
      },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error: unknown) {
    const err = error as Error;
    const isMissingConfig =
      err.message.includes("not configured") ||
      err.message.includes("credentials not found");

    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to fetch real-time analytics data",
        configRequired: isMissingConfig,
        setupInstructions: {
          step1: "Create or find your GA4 Property ID (Admin > Property Settings in Google Analytics).",
          step2: "Create a Service Account in Google Cloud Console and assign it Viewer role on your GA4 Property.",
          step3: "Add GA4_PROPERTY_ID, GOOGLE_CLIENT_EMAIL, and GOOGLE_PRIVATE_KEY to your .env.local file.",
        },
      },
      {
        status: isMissingConfig ? 400 : 500,
      }
    );
  }
}
