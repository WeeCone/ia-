"use client";

import Link from "next/link";
import { useAuth } from "./auth-provider";

/** "Connexion" for visitors, "Mon espace" once signed in. */
export function HeaderAccountLink({ className }: { className: string }) {
  const { user } = useAuth();
  return (
    <Link href={user ? "/dashboard" : "/auth/login"} className={className}>
      {user ? "Mon espace" : "Connexion"}
    </Link>
  );
}
