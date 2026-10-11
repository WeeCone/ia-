import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

const features = [
  { title: "Importez une capture", text: "Un screenshot de n'importe quel graphique : crypto, forex, actions, matières premières." },
  { title: "L'IA l'analyse", text: "Tendance, supports, résistances et figures chartistes détectés en quelques secondes." },
  { title: "Scénarios probabilisés", text: "Un scénario haussier et un baissier, avec niveaux d'entrée, stop et objectifs." },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-4 pb-16 pt-20 text-center sm:pt-28">
          <span className="inline-block rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
            Analyse technique propulsée par l&apos;IA
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
            Votre analyste de graphiques, <span className="text-brand">disponible 24h/24</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            Envoyez une capture de votre chart et recevez une analyse claire avec des scénarios de trading concrets.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/auth/signup" className="btn-primary px-6 py-3 text-base">Commencer gratuitement</Link>
            <Link href="/auth/login" className="btn-secondary px-6 py-3 text-base">J&apos;ai déjà un compte</Link>
          </div>
        </section>
        <section className="mx-auto grid max-w-6xl gap-4 px-4 pb-24 sm:grid-cols-3">
          {features.map((feature, index) => (
            <div key={feature.title} className="rounded-2xl border border-border bg-surface p-6">
              <span className="text-sm font-semibold text-brand">0{index + 1}</span>
              <h2 className="mt-2 text-lg font-semibold">{feature.title}</h2>
              <p className="mt-2 text-sm text-muted">{feature.text}</p>
            </div>
          ))}
        </section>
      </main>
      <footer className="border-t border-border px-4 py-6 text-center text-xs text-muted">
        Les analyses sont fournies à titre informatif et ne constituent pas un conseil en investissement.
      </footer>
    </div>
  );
}
