import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import { COMPANY } from "@/lib/legal";
import { MONTHLY_CREDITS, OFFERS } from "@/lib/plans";

export const metadata: Metadata = { title: "Conditions générales — Scanzivo" };

export default function CgvPage() {
  return (
    <LegalPage title="Conditions générales de vente et d'utilisation">
      <h2>1. Objet</h2>
      <p>
        Les présentes conditions régissent l&apos;utilisation du service {COMPANY.brand} (le « Service ») et la souscription
        de ses offres payantes auprès de {COMPANY.name} (« nous »). Créer un compte ou passer commande implique leur
        acceptation.
      </p>

      <h2>2. Le Service</h2>
      <p>
        Le Service permet d&apos;importer une capture d&apos;écran d&apos;un graphique de prix et d&apos;obtenir une analyse
        technique générée automatiquement par intelligence artificielle : tendance, niveaux, figures et scénarios assortis de
        probabilités estimées.
      </p>
      <p>
        <strong>Les analyses ne constituent pas un conseil en investissement.</strong> Elles sont générales, peuvent contenir
        des erreurs, et ne tiennent pas compte de votre situation personnelle. Les probabilités affichées sont des estimations
        du modèle, pas des garanties. Vous restez seul responsable de vos décisions de trading.
      </p>

      <h2>3. Compte</h2>
      <p>
        Vous devez être majeur pour créer un compte. Vous êtes responsable de la confidentialité de vos identifiants et de
        l&apos;usage fait de votre compte. Il est interdit de revendre l&apos;accès, d&apos;automatiser massivement les
        requêtes ou de détourner le Service.
      </p>

      <h2>4. Offres et prix</h2>
      <ul>
        <li>
          <strong>
            {OFFERS.monthly.name} — {OFFERS.monthly.price} {OFFERS.monthly.period}
          </strong>{" "}
          : abonnement sans engagement, renouvelé automatiquement chaque mois.
        </li>
        <li>
          <strong>
            {OFFERS.lifetime.name} — {OFFERS.lifetime.price} ({OFFERS.lifetime.period})
          </strong>{" "}
          : accès au Service pour toute la durée de son exploitation, sans renouvellement.
        </li>
      </ul>
      <p>
        Les deux offres incluent {MONTHLY_CREDITS} analyses par mois (usage raisonnable). Le quota est rechargé à chaque
        échéance mensuelle (offre Mensuelle) ou au début de chaque mois civil (offre À vie) ; les analyses non utilisées ne
        sont pas reportées. Une analyse n&apos;est décomptée que si l&apos;image est reconnue comme un graphique de prix.
      </p>
      <p>Les prix sont indiqués en euros, toutes taxes comprises. Il n&apos;existe pas d&apos;offre gratuite.</p>

      <h2>5. Paiement</h2>
      <p>
        Le paiement est effectué en ligne par l&apos;intermédiaire de notre prestataire Stripe. Nous n&apos;avons jamais accès à
        vos données bancaires. Pour l&apos;offre Mensuelle, vous autorisez le prélèvement automatique à chaque échéance.
      </p>

      <h2>6. Droit de rétractation</h2>
      <p>
        Le Service est un contenu numérique fourni immédiatement après le paiement. Conformément à l&apos;article L221-28 13° du
        Code de la consommation, en demandant l&apos;accès immédiat au Service lors de la commande, vous acceptez
        expressément que son exécution commence avant la fin du délai de rétractation de 14 jours et vous{" "}
        <strong>renoncez à votre droit de rétractation</strong>.
      </p>

      <h2>7. Résiliation</h2>
      <p>
        L&apos;abonnement Mensuel est résiliable à tout moment depuis la rubrique « Mon abonnement » de votre tableau de bord.
        La résiliation prend effet à la fin de la période en cours ; aucun prorata n&apos;est remboursé. L&apos;achat de l&apos;offre
        À vie par un abonné Mensuel met fin au renouvellement de son abonnement : aucun prélèvement mensuel n&apos;a lieu
        ensuite. Nous pouvons suspendre
        un compte en cas de manquement grave aux présentes conditions.
      </p>

      <h2>8. Disponibilité et responsabilité</h2>
      <p>
        Nous nous efforçons d&apos;assurer la disponibilité du Service sans pouvoir la garantir en permanence (maintenance,
        incident d&apos;un prestataire). Notre responsabilité ne saurait être engagée au titre des pertes financières résultant
        de décisions prises sur la base des analyses.
      </p>

      <h2>9. Données personnelles</h2>
      <p>
        Le traitement de vos données est décrit dans notre <Link href="/legal/confidentialite">politique de confidentialité</Link>.
      </p>

      <h2>10. Réclamations, médiation et droit applicable</h2>
      <p>
        Pour toute réclamation : {COMPANY.email}. En cas de litige non résolu, vous pouvez recourir gratuitement au médiateur
        de la consommation : [À COMPLÉTER : nom et coordonnées du médiateur]. Les présentes conditions sont soumises au droit
        français.
      </p>
    </LegalPage>
  );
}
