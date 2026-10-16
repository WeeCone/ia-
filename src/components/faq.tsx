import Link from "next/link";
import { MONTHLY_CREDITS } from "@/lib/plans";

const QUESTIONS: { q: string; a: React.ReactNode }[] = [
  {
    q: "Comment fonctionne Scanzivo ?",
    a: "Vous importez une capture d'écran de votre graphique. Une IA de vision la lit comme un analyste : structure de marché, tendance, supports et résistances, figures chartistes et indicateurs visibles. Elle tranche pour le scénario le plus probable et vous rend un plan d'action : acheter ou vendre sur confirmation, attendre, ou ne pas trader, avec une zone d'entrée, un stop, des objectifs et le niveau qui la ferait changer d'avis. Le scénario alternatif reste consultable.",
  },
  {
    q: "Faut-il savoir trader pour l'utiliser ?",
    a: "Non. Le rapport explique pourquoi chaque niveau compte, ce qui en fait aussi un bon outil d'apprentissage. Les traders expérimentés s'en servent plutôt comme second avis avant d'entrer en position.",
  },
  {
    q: "Quels marchés et quelles plateformes ?",
    a: "Tout graphique de prix lisible : crypto, forex, actions, indices, matières premières. La capture peut venir de TradingView, Binance, MetaTrader ou de n'importe quelle autre plateforme, sur toutes les unités de temps.",
  },
  {
    q: "Sur quoi reposent les analyses ?",
    a: "Uniquement sur ce qui est visible dans votre capture. Scanzivo ne se connecte pas aux cotations en temps réel et ne voit pas l'actualité : une capture nette, avec l'axe des prix lisible, donne une meilleure analyse.",
  },
  {
    q: "Puis-je adapter l'analyse à ma façon de trader ?",
    a: "Oui : ajoutez un contexte avant d'analyser, par exemple « scalping 5 min, je cherche un short » ou « investissement long terme ». L'IA en tient compte dans sa lecture et ses scénarios.",
  },
  {
    q: "Combien d'analyses puis-je faire ?",
    a: `${MONTHLY_CREDITS} par mois avec chaque offre. Une image qui n'est pas un graphique n'est pas décomptée.`,
  },
  {
    q: "Puis-je résilier à tout moment ?",
    a: (
      <>
        Oui. L&apos;abonnement mensuel est sans engagement et se résilie en un clic depuis votre tableau de bord ; l&apos;offre À vie
        est un paiement unique, sans renouvellement. Détails dans les <Link href="/legal/cgv" className="text-brand underline underline-offset-2">conditions générales</Link>.
      </>
    ),
  },
  {
    q: "Scanzivo garantit-il des gains ?",
    a: "Non. Aucun outil ne peut garantir des gains. Les probabilités sont des estimations du modèle, pas des certitudes, et les analyses ne constituent pas un conseil en investissement. Le trading comporte un risque de perte en capital : ne risquez que ce que vous pouvez vous permettre de perdre.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
                    <h2 className="display text-4xl sm:text-5xl">Questions fréquentes</h2>
          <p className="mt-4 text-muted">Tout ce qu&apos;il faut savoir avant votre première analyse.</p>
          <Link href="/auth/signup" className="btn-primary mt-8">Commencer →</Link>
        </div>
        <div className="space-y-4 lg:col-span-8">
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
      </div>
    </section>
  );
}
