"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useI18n } from "@/i18n/client";
import { pixel } from "@/lib/meta-pixel";
import { trackLeave, trackLive, trackView } from "@/lib/track";

const LIVE_EVERY_MS = 30_000;

/**
 * Counts page views for the admin "Visites" tab and keeps the visitor on its live count while the tab is visible
 * (anonymous, no cookie). The admin pages are never counted.
 */
export function VisitTracker() {
  const pathname = usePathname();
  const { locale } = useI18n();
  useEffect(() => {
    const path = pathname.replace(/^\/(fr|en|es)(?=\/|$)/, "") || "/";
    if (path.startsWith("/admin")) return;
    trackView(path, locale);
    // Meta pixel, only with the visitor's consent (lib/meta-pixel.ts).
    pixel("PageView");

    const live = () => {
      if (!document.hidden) trackLive(path, locale);
    };
    const onVisibility = () => (document.hidden ? trackLeave() : live());
    live();
    const timer = setInterval(live, LIVE_EVERY_MS);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", trackLeave);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", trackLeave);
    };
  }, [pathname, locale]);
  return null;
}
