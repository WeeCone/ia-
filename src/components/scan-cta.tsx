"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/client";
import { useAuth } from "./auth-provider";

/** "Scan a chart" call to action: straight to the dashboard when signed in, otherwise to sign-up. */
export function ScanCta({ className = "btn-primary", children }: { className?: string; children?: React.ReactNode }) {
  const { user } = useAuth();
  const { t, href } = useI18n();
  return (
    <Link href={href(user ? "/dashboard" : "/auth/signup")} className={className}>
      {children ?? `${t.header.scan}${t.header.scanSuffix}`}
    </Link>
  );
}
