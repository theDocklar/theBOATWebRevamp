import { NextResponse } from "next/server";
import {
  buildContactInquiryEmail,
  type ContactInquiryPayload,
} from "@/lib/email/contact-inquiry-template";
import { isGmailConfigured, sendViaGmail } from "@/lib/email/gmail";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function parsePayload(body: unknown): ContactInquiryPayload | null {
  if (!body || typeof body !== "object") return null;

  const data = body as Record<string, unknown>;
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const company = typeof data.company === "string" ? data.company.trim() : "";
  const service = typeof data.service === "string" ? data.service.trim() : "";
  const details = typeof data.details === "string" ? data.details.trim() : "";
  const budget = typeof data.budget === "string" ? data.budget.trim() : "";

  if (!name || !email || !isValidEmail(email)) return null;

  return { name, email, company, service, details, budget };
}

export async function POST(request: Request) {
  if (!isGmailConfigured()) {
    console.error(
      "Contact form misconfigured: set GMAIL_USER, GMAIL_APP_PASSWORD, and CONTACT_TO_EMAIL in .env.local"
    );
    return NextResponse.json(
      { error: "Email service is not configured yet." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const payload = parsePayload(body);
  if (!payload) {
    return NextResponse.json(
      { error: "Please provide a valid name and email address." },
      { status: 400 }
    );
  }

  const { subject, html, text } = buildContactInquiryEmail(payload);

  try {
    await sendViaGmail({
      subject,
      html,
      text,
      replyTo: payload.email,
    });
  } catch (err) {
    console.error("Gmail send error:", err);
    return NextResponse.json(
      { error: "Failed to send your message. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
}
