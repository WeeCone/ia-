"use client";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { Logo } from "@/components/logo";
import { auth } from "@/lib/firebase";
import { getUserProfile, type UserProfile } from "@/lib/users";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!loading && !user) router.replace("/auth/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (user) getUserProfile(user.uid).then(setProfile);
  }, [user]);

  if (loading || !user) {
    return <div className="flex flex-1 items-center justify-center text-muted">Chargement…</div>;
  }

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Logo />
          <button onClick={() => signOut(auth)} className="btn-secondary">
            Déconnexion
          </button>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
        <h1 className="text-3xl font-semibold">Bonjour {user.displayName ?? user.email} 👋</h1>
        <p className="mt-2 text-muted">
          Plan {profile?.plan === "pro" ? "Pro" : "Gratuit"} · {profile?.credits ?? "–"} analyses restantes
        </p>
        <div className="mt-8 grid place-items-center rounded-2xl border-2 border-dashed border-border bg-surface px-6 py-16 text-center">
          <p className="text-lg font-medium">Analyse de graphique par IA</p>
          <p className="mt-2 max-w-md text-sm text-muted">
            Bientôt : importez une capture de graphique et obtenez tendance, supports/résistances et scénarios haussier/baissier.
          </p>
        </div>
      </main>
    </div>
  );
}
