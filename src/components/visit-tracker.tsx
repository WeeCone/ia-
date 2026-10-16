"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useI18n } from "@/i18n/client";
import { trackView } from "@/lib/track";

/** Counts page views for the admin "Visites" tab (anonymous, no cookie). The admin pages are never counted. */
export function VisitTracker() {
  const pathname = usePathname();
  const { locale } = useI18n();
  useEffect(() => {
    const path = pathname.replace(/^\/(fr|en|es)(?=\/|$)/, "") || "/";
    if (path.startsWith("/admin")) return;
    trackView(path, locale);
  }, [pathname, locale]);
  return null;
}
