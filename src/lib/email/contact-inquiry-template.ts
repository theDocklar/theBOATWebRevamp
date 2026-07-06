export type ContactInquiryPayload = {
  name: string;
  email: string;
  company: string;
  service: string;
  details: string;
  budget: string;
};

const BRAND = {
  orange: "#f04b25",
  orangeDark: "#d94020",
  dark: "#0f0f0f",
  darkCard: "#1a1a1a",
  cream: "#eeeae4",
  muted: "rgba(255,255,255,0.45)",
  border: "rgba(255,255,255,0.08)",
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function fieldRow(label: string, value: string): string {
  const safeValue = escapeHtml(value || "—");
  return `
    <tr>
      <td style="padding: 0 0 20px 0;">
        <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: ${BRAND.muted}; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
          ${escapeHtml(label)}
        </p>
        <p style="margin: 0; font-size: 15px; line-height: 1.5; color: #ffffff; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
          ${safeValue}
        </p>
      </td>
    </tr>
  `;
}

export function buildContactInquiryEmail(payload: ContactInquiryPayload): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `New inquiry from ${payload.name} — ${payload.service}`;

  const text = [
    "New contact form submission — theBOAT",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Company: ${payload.company || "—"}`,
    `Service: ${payload.service}`,
    `Budget: ${payload.budget}`,
    "",
    "Project details:",
    payload.details || "—",
  ].join("\n");

  const detailsBlock = payload.details
    ? `<p style="margin: 0; font-size: 15px; line-height: 1.65; color: rgba(255,255,255,0.85); white-space: pre-wrap; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">${escapeHtml(payload.details)}</p>`
    : `<p style="margin: 0; font-size: 15px; color: ${BRAND.muted}; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">—</p>`;

  const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: ${BRAND.cream};">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: ${BRAND.cream}; padding: 40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 560px; background-color: ${BRAND.dark}; border-radius: 16px; overflow: hidden; border: 1px solid ${BRAND.border};">
            <!-- Header -->
            <tr>
              <td style="background-color: ${BRAND.orange}; padding: 28px 32px;">
                <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.7); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                  New inquiry
                </p>
                <h1 style="margin: 0; font-size: 28px; font-weight: 800; line-height: 1.1; color: #ffffff; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                  ${escapeHtml(payload.name)}
                </h1>
                <p style="margin: 10px 0 0 0; font-size: 14px; color: rgba(255,255,255,0.8); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                  via theBOAT contact form
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 32px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  ${fieldRow("Email", payload.email)}
                  ${fieldRow("Company", payload.company)}
                  ${fieldRow("Service", payload.service)}
                  ${fieldRow("Budget", payload.budget)}
                </table>

                <div style="margin-top: 8px; padding: 20px; background-color: ${BRAND.darkCard}; border-radius: 12px; border: 1px solid ${BRAND.border};">
                  <p style="margin: 0 0 10px 0; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: ${BRAND.muted}; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                    Project details
                  </p>
                  ${detailsBlock}
                </div>

                <table role="presentation" cellspacing="0" cellpadding="0" style="margin-top: 28px;">
                  <tr>
                    <td style="border-radius: 999px; background-color: ${BRAND.orange};">
                      <a href="mailto:${escapeHtml(payload.email)}" style="display: inline-block; padding: 12px 22px; font-size: 14px; font-weight: 600; color: #ffffff; text-decoration: none; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                        Reply to ${escapeHtml(payload.name.split(" ")[0] || "sender")} →
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding: 20px 32px 28px; border-top: 1px solid ${BRAND.border};">
                <p style="margin: 0; font-size: 12px; line-height: 1.5; color: ${BRAND.muted}; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                  theBOAT · Colombo, Sri Lanka ·
                  <a href="https://theboatgrp.com" style="color: ${BRAND.orange}; text-decoration: none;">theboatgrp.com</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();

  return { subject, html, text };
}
