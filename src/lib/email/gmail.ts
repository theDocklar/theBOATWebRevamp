import dns from "node:dns";
import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";

// Node often resolves smtp.gmail.com to IPv6 first and stalls ~60–90s before IPv4.
dns.setDefaultResultOrder("ipv4first");

// ── Env variables (add these to .env.local) ──────────────────────────────────
// GMAIL_USER=your-account@gmail.com       — Gmail address used to send mail
// GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx  — App password from Google Account
// CONTACT_TO_EMAIL=info@theboatgrp.com    — inbox that receives form submissions
// ─────────────────────────────────────────────────────────────────────────────

function getEnv(name: string): string | undefined {
  return process.env[name]?.trim() || undefined;
}

export function getGmailConfig() {
  const user = getEnv("GMAIL_USER");
  const pass = getEnv("GMAIL_APP_PASSWORD")?.replace(/\s/g, "");
  const to = getEnv("CONTACT_TO_EMAIL");

  return { user, pass, to };
}

export function isGmailConfigured(): boolean {
  const { user, pass, to } = getGmailConfig();
  return Boolean(user && pass && to);
}

let transporter: Mail | null = null;
let transporterKey = "";

function getTransporter(user: string, pass: string): Mail {
  const key = `${user}:${pass}`;
  if (transporter && transporterKey === key) {
    return transporter;
  }

  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
    pool: true,
    maxConnections: 1,
    maxMessages: 50,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  transporterKey = key;
  return transporter;
}

export async function sendViaGmail(options: {
  subject: string;
  html: string;
  text: string;
  replyTo: string;
}) {
  const { user, pass, to } = getGmailConfig();

  if (!user || !pass || !to) {
    throw new Error("Gmail is not configured");
  }

  const mailer = getTransporter(user, pass);

  await mailer.sendMail({
    from: `"theBOAT" <${user}>`,
    to,
    replyTo: options.replyTo,
    subject: options.subject,
    html: options.html,
    text: options.text,
  });
}
