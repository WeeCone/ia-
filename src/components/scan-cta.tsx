"use client";

import Link from "next/link";
import { useAuth } from "./auth-provider";

/** "Scan a chart" call to action: straight to the dashboard when signed in, otherwise to sign-up. */
export function ScanCta({ className = "btn-primary", children = "Scanner un graphique" }: { className?: string; children?: React.ReactNode }) {
  const { user } = useAuth();
  return (
    <Link href={user ? "/dashboard" : "/auth/signup"} className={className}>
      {children}
    </Link>
  );
}
