import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, hasLocale } from "./i18n/config";

/**
 * French is served at the unprefixed URLs: "/pricing" is rewritten to the "/fr/pricing" route.
 * "/en/…" and "/es/…" pass through; "/fr/…" redirects to the unprefixed URL so each page has one address.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];

  if (first === DEFAULT_LOCALE) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }
  if (hasLocale(first)) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Pages only: not the API, Next internals, or files with an extension (media, icons, robots…).
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
