"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useI18n } from "@/i18n/client";
import { onConsentChange, onOpenConsent, openConsent, readConsent, saveConsent, type Consent } from "@/lib/consent";
import { pixel, PIXEL_ID, revokePixel } from "@/lib/meta-pixel";

/**
 * Asks once for advertising cookies (the Meta pixel), with "Refuser" exactly as easy as "Accepter", as the CNIL requires.
 * Shown only when a pixel is configured; reopened from the footer to change the choice.
 */
export function CookieBanner() {
  const { t, href } = useI18n();
  const c = t.cookies;
  const pathname = usePathname();
  const consent = useSyncExternalStore(onConsentChange, readConsent, () => "denied" as Consent);
  const [reopened, setReopened] = useState(false);
  useEffect(() => onOpenConsent(() => setReopened(true)), []);

  if (!PIXEL_ID || pathname.includes("/admin")) return null;
  if (consent !== null && !reopened) return null;

  const choose = (value: Consent) => {
    saveConsent(value);
    setReopened(false);
    if (value === "granted") pixel("PageView");
    else revokePixel();
  };

  return (
    <section
      role="dialog"
      aria-label={c.title}
      className="theme-dark fixed inset-x-3 bottom-3 z-[60] rounded-2xl border border-border bg-surface p-5 text-foreground shadow-[0_24px_60px_-20px_rgb(0_0_0/0.7)] sm:inset-x-auto sm:left-4 sm:max-w-md"
    >
      <p className="font-semibold">{c.title}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {c.text}{" "}
        <Link href={href("/legal/confidentialite")} className="underline underline-offset-2 hover:text-foreground">
          {c.more}
        </Link>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button type="button" onClick={() => choose("denied")} className="btn-secondary py-2.5">
          {c.refuse}
        </button>
        <button type="button" onClick={() => choose("granted")} className="btn-secondary py-2.5">
          {c.accept}
        </button>
      </div>
    </section>
  );
}

/** Footer link to change the cookie choice; absent when no pixel is configured. */
export function CookieSettingsLink() {
  const { t } = useI18n();
  if (!PIXEL_ID) return null;
  return (
    <button type="button" onClick={openConsent} className="text-left hover:text-brand">
      {t.cookies.manage}
    </button>
  );
}
