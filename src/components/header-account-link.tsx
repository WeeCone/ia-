"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/client";
import { useAuth } from "./auth-provider";

/** "Connexion" for visitors, "Mon espace" once signed in. */
export function HeaderAccountLink({ className }: { className: string }) {
  const { user } = useAuth();
  const { t, href } = useI18n();
  return (
    <Link href={href(user ? "/dashboard" : "/auth/login")} className={className}>
      {user ? t.header.mySpace : t.header.login}
    </Link>
  );
}
