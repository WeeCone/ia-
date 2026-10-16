import type { Metadata } from "next";
import Link from "next/link";
import { PricingPlans } from "@/components/pricing-plans";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TrustStrip } from "@/components/trust-strip";
import { MONTHLY_CREDITS } from "@/lib/plans";

export const metadata: Metadata = { title: "Tarifs — Scanzivo" };

// The questions that stop people at the payment step.
const QUESTIONS: { q: string; a: React.ReactNode }[] = [
  {
    q: `Que se passe-t-il quand j'ai utilisé mes ${MONTHLY_CREDITS} analyses ?`,
    a: "Les analyses sont rechargées au début de chaque période : à votre date d'échéance pour l'offre mensuelle, au début de chaque mois civil pour l'accès à vie. Rien n'est prélevé en plus, et une image qui n'est pas un graphique n'est pas décomptée.",
  },
  {
    q: "Comment résilier l'abonnement mensuel ?",
    a: "En un clic, depuis « Mon abonnement » dans votre espace. L'abonnement s'arrête à la fin de la période déjà payée, sans autre prélèvement.",
  },
  {
    q: "Puis-je passer du mensuel à l'accès à vie ?",
    a: "Oui, depuis votre espace. Votre abonnement mensuel est alors arrêté automatiquement : il n'y a plus aucun prélèvement mensuel.",
  },
  {
    q: "Puis-je être remboursé ?",
    a: (
      <>
        L&apos;accès est ouvert dès le paiement : au moment de payer, vous demandez cet accès immédiat et renoncez au délai de
        rétractation, comme le prévoit la loi pour un service numérique. Détails dans les{" "}
        <Link href="/legal/cgv" className="text-brand underline underline-offset-2">
          conditions générales
        </Link>
        .
      </>
    ),
  },
  {
    q: "Comment se passe le paiement ?",
    a: "Sur la page de paiement sécurisée de Stripe, notre prestataire. Scanzivo n'a jamais accès à vos données bancaires.",
  },
];

export default function PricingPage() {
  return (
    <div className="theme-light flex flex-1 flex-col">
      <SiteHeader />
      <main id="contenu" className="mx-auto w-full max-w-5xl flex-1 px-4 pb-24 pt-16 sm:pt-24">
        <h1 className="display max-w-3xl text-4xl sm:text-6xl">
          {MONTHLY_CREDITS} analyses par mois. <span className="mark">Un verdict sur chaque graphique.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">Un accès à vie en un seul paiement, ou un abonnement mensuel sans engagement.</p>

        <div className="mt-12">
          <PricingPlans />
        </div>

        <div className="mt-10">
          <TrustStrip />
        </div>

        <section aria-labelledby="questions-paiement" className="mt-20 grid gap-8 lg:grid-cols-12">
          <h2 id="questions-paiement" className="display text-3xl lg:col-span-4">
            Avant de payer
          </h2>
          <div className="space-y-3 lg:col-span-8">
            {QUESTIONS.map(({ q, a }) => (
              <details key={q} className="group panel open:border-brand/50">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium [&::-webkit-details-marker]:hidden">
                  {q}
                  <span className="shrink-0 font-display text-2xl leading-none text-brand transition-transform group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <div className="border-t border-border px-5 py-4 leading-relaxed text-muted">{a}</div>
              </details>
            ))}
          </div>
        </section>

        <p className="mt-16 text-xs text-muted">
          Prix en euros, toutes taxes comprises. Les analyses sont fournies à titre informatif et ne constituent pas un conseil en
          investissement.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
