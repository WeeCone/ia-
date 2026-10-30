import "server-only";
import { Resend } from "resend";
import { INTL_LOCALE, localePath, type Locale } from "@/i18n/config";
import { formatEur } from "@/i18n/format";
import { OFFER_PRICE_EUR } from "@/lib/plans";
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

type Message = {
  to: string;
  subject: string;
  heading: string;
  /** Plain paragraphs, in order; `strong` is set apart in bold. */
  lines: string[];
  strong: string;
  after: string;
  cta: string;
  url: string;
  password?: { text: string; cta: string; url: string };
  locale: Locale;
  appUrl: string;
  label: string;
};

/** The house layout shared by the purchase emails. Returns false when email is not configured or the provider rejects it. */
async function sendMessage(m: Message) {
  const resend = getResend();
  if (!resend || !process.env.EMAIL_FROM) {
    console.warn(`${m.label} skipped: RESEND_API_KEY / EMAIL_FROM not set`);
    return false;
  }
  const disclaimer = DICTIONARIES[m.locale].welcomeEmail.disclaimer;
  const paragraph = (text: string, color = "#94a3b8") => `<p style="margin:0 0 12px;line-height:1.6;color:${color}">${escapeHtml(text)}</p>`;
  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: m.to,
    subject: m.subject,
    text: [
      ...m.lines.flatMap((line, index) => (index === 0 ? [line, ""] : [line])),
      m.strong,
      m.after,
      "",
      `${m.cta} : ${m.url}`,
      ...(m.password ? ["", `${m.password.text} ${m.password.url}`] : []),
      "",
      disclaimer,
    ].join("\n"),
    html: `<!doctype html>
<html lang="${m.locale}">
  <body style="margin:0;background:#0b0f19;font-family:Arial,Helvetica,sans-serif;color:#f1f5f9">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b0f19;padding:32px 16px">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#151d2c;border:2px solid #263247">
          <tr><td style="padding:20px 28px;border-bottom:2px solid #263247">
            <img src="${m.appUrl}/brand/scanzivo-logo-transparent.png" alt="Scanzivo" width="180" height="52" style="display:block;border:0">
          </td></tr>
          <tr><td style="padding:32px 28px">
            <h1 style="margin:0 0 20px;font-size:28px;line-height:1.15">${m.heading}</h1>
            ${m.lines.map((line) => paragraph(line)).join("\n            ")}
            <p style="margin:0 0 12px;line-height:1.6;color:#f1f5f9"><strong>${escapeHtml(m.strong)}</strong></p>
            <p style="margin:0 0 28px;line-height:1.6;color:#94a3b8">${escapeHtml(m.after)}</p>
            <a href="${m.url}" style="display:inline-block;background:#00f5a0;color:#0b0f19;font-weight:700;text-decoration:none;padding:14px 24px;border-radius:999px">
              ${m.cta}
            </a>${
              m.password
                ? `
            <p style="margin:28px 0 0;line-height:1.6;color:#94a3b8">${escapeHtml(m.password.text)}
              <a href="${escapeHtml(m.password.url)}" style="color:#00f5a0;font-weight:700">${m.password.cta}</a>
            </p>`
                : ""
            }
          </td></tr>
          <tr><td style="padding:16px 28px;border-top:2px solid #263247;font-size:12px;line-height:1.5;color:#94a3b8">
            ${disclaimer}
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`,
  });
  if (error) {
    console.error(`${m.label} failed`, error);
    return false;
  }
  return true;
}

/**
 * Sent when a paid trial starts (trials bought before they were withdrawn): the date the subscription will be charged
 * and how to stop it before then.
 */
export async function sendTrialEmail(
  to: string,
  name: string | null,
  trialEndsAt: number,
  appUrl: string,
  locale: Locale,
  /** For an account made at payment (bought without an account): the link to choose its password. */
  passwordUrl?: string,
) {
  const t = DICTIONARIES[locale].trialEmail;
  const date = new Date(trialEndsAt).toLocaleDateString(INTL_LOCALE[locale], { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Paris" });
  return sendMessage({
    to,
    subject: t.subject,
    heading: t.heading,
    lines: [t.greeting(name), t.active],
    strong: t.charge(date, formatEur(locale, 19.99)),
    after: t.cancel,
    cta: t.cta,
    url: `${appUrl}${localePath(locale, "/dashboard")}`,
    password: passwordUrl ? { text: t.password, cta: t.passwordCta, url: passwordUrl } : undefined,
    locale,
    appUrl,
    label: "trial email",
  });
}

/** Sent once a pack is paid: what it opens, how it renews (or not), and the way into the dashboard. */
export async function sendPurchaseEmail(
  to: string,
  name: string | null,
  offer: string,
  appUrl: string,
  locale: Locale,
  /** For an account made at payment (bought without an account): the link to choose its password. */
  passwordUrl?: string,
) {
  const t = DICTIONARIES[locale].purchaseEmail;
  const pack = offer === "starter" ? "starter" : offer === "lifetime" ? "lifetime" : "monthly";
  return sendMessage({
    to,
    subject: t.subject(t.names[pack]),
    heading: t.heading(t.names[pack]),
    lines: [t.greeting(name)],
    strong: t.includes[pack](formatEur(locale, OFFER_PRICE_EUR[pack])),
    after: pack === "lifetime" ? t.oneOff : t.cancel,
    cta: t.cta,
    url: `${appUrl}${localePath(locale, "/dashboard")}`,
    password: passwordUrl ? { text: t.password, cta: t.passwordCta, url: passwordUrl } : undefined,
    locale,
    appUrl,
    label: "purchase email",
  });
}
