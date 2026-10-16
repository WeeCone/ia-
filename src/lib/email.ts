import "server-only";
import { Resend } from "resend";
import { localePath, type Locale } from "@/i18n/config";
import { DICTIONARIES, type Dict } from "@/i18n/dictionaries";

let client: Resend | null = null;

function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  client ??= new Resend(process.env.RESEND_API_KEY);
  return client;
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);

/** Sends the welcome email. Returns false when email is not configured or the provider rejects it. */
export async function sendWelcomeEmail(to: string, name: string | null, appUrl: string, locale: Locale) {
  const resend = getResend();
  if (!resend || !process.env.EMAIL_FROM) {
    console.warn("welcome email skipped: RESEND_API_KEY / EMAIL_FROM not set");
    return false;
  }

  const t = DICTIONARIES[locale].welcomeEmail;
  const pricingUrl = `${appUrl}${localePath(locale, "/pricing")}`;
  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to,
    subject: t.subject,
    text: [t.greeting(name), "", t.created, t.next, "", `${t.start} ${pricingUrl}`, "", t.disclaimer].join("\n"),
    html: welcomeHtml(name ? escapeHtml(name) : null, appUrl, pricingUrl, t, locale),
  });

  if (error) {
    console.error("welcome email failed", error);
    return false;
  }
  return true;
}

// Table-based layout with inline styles: the only thing email clients render reliably.
function welcomeHtml(name: string | null, appUrl: string, pricingUrl: string, t: Dict["welcomeEmail"], locale: Locale) {
  return `<!doctype html>
<html lang="${locale}">
  <body style="margin:0;background:#0b0f19;font-family:Arial,Helvetica,sans-serif;color:#f1f5f9">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b0f19;padding:32px 16px">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#151d2c;border:2px solid #263247">
          <tr><td style="padding:20px 28px;border-bottom:2px solid #263247;font-weight:900;font-size:18px;letter-spacing:0.5px">
            <img src="${appUrl}/brand/scanzivo-logo-transparent.png" alt="Scanzivo" width="180" height="52" style="display:block;border:0">
          </td></tr>
          <tr><td style="padding:32px 28px">
            <h1 style="margin:0 0 20px;font-size:30px;line-height:1.1;text-transform:uppercase">
              ${t.heading}${name ? `, <span style="background:#4f8cff;color:#0b0f19;padding:0 6px">${name}</span>` : ""}.
            </h1>
            <p style="margin:0 0 16px;line-height:1.6;color:#94a3b8">${t.oneStep}</p>
            <p style="margin:0 0 28px;line-height:1.6;color:#94a3b8">
              ${t.thenA}
              <strong style="color:#f1f5f9">${t.thenB}</strong> ${t.thenC}
            </p>
            <a href="${pricingUrl}" style="display:inline-block;background:#4f8cff;color:#0b0f19;font-weight:900;text-transform:uppercase;text-decoration:none;padding:14px 24px;border:2px solid #4f8cff">
              ${t.cta}
            </a>
          </td></tr>
          <tr><td style="padding:16px 28px;border-top:2px solid #263247;font-size:12px;line-height:1.5;color:#94a3b8">
            ${t.disclaimer}
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}
