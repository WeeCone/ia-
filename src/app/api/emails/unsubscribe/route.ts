import { connection } from "next/server";
import { DEFAULT_LOCALE, hasLocale } from "@/i18n/config";
import { DICTIONARIES } from "@/i18n/dictionaries";
import { unsubscribeWithToken } from "@/lib/marketing";

const escape = (value: string) => value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);

/** The unsubscribe link of every marketing e-mail: works without signing in, thanks to the token in the link. */
export async function GET(request: Request) {
  await connection();
  const params = new URL(request.url).searchParams;
  const language = params.get("l");
  const locale = hasLocale(language) ? language : DEFAULT_LOCALE;
  const done = await unsubscribeWithToken(params.get("u") ?? "", params.get("t") ?? "").catch(() => false);
  const t = DICTIONARIES[locale].marketing.unsubscribed;
  const title = done ? t.title : "Scanzivo";
  const text = done ? t.text : "This link is no longer valid.";
  return new Response(
    `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${escape(title)}</title></head>` +
      `<body style="margin:0;background:#0b0f19;color:#f1f5f9;font-family:Arial,Helvetica,sans-serif"><main style="max-width:480px;margin:18vh auto;padding:0 20px"><h1 style="font-size:26px">${escape(title)}</h1><p style="line-height:1.6;color:#94a3b8">${escape(text)}</p><p><a href="/" style="color:#00f5a0">Scanzivo</a></p></main></body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } },
  );
}

/** One-click unsubscribe (List-Unsubscribe-Post): the mail client posts to the same link. */
export async function POST(request: Request) {
  await connection();
  const params = new URL(request.url).searchParams;
  const done = await unsubscribeWithToken(params.get("u") ?? "", params.get("t") ?? "").catch(() => false);
  return new Response(null, { status: done ? 200 : 400 });
}
