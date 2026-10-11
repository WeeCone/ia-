import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { COMPANY } from "@/lib/legal";

export const metadata: Metadata = { title: "Politique de confidentialité — NeuralTrade" };

export default function ConfidentialitePage() {
  return (
    <LegalPage title="Politique de confidentialité">
      <h2>Responsable du traitement</h2>
      <p>
        {COMPANY.name}, {COMPANY.address}. Contact : {COMPANY.email}.
      </p>

      <h2>Données collectées</h2>
      <ul>
        <li>
          <strong>Compte</strong> : nom, adresse email, identifiant de connexion (et photo de profil si vous utilisez Google).
        </li>
        <li>
          <strong>Analyses</strong> : les captures d&apos;écran que vous importez, le contexte éventuel que vous saisissez, et
          les résultats d&apos;analyse.
        </li>
        <li>
          <strong>Facturation</strong> : offre souscrite, historique de paiement, identifiant client Stripe. Les données
          bancaires sont traitées exclusivement par Stripe.
        </li>
      </ul>

      <h2>Finalités et bases légales</h2>
      <ul>
        <li>Fournir le Service et gérer votre compte et vos crédits — exécution du contrat.</li>
        <li>Facturation et obligations comptables — obligation légale.</li>
        <li>Sécurité et prévention des abus — intérêt légitime.</li>
      </ul>
      <p>Nous ne vendons pas vos données et ne les utilisons pas à des fins publicitaires.</p>

      <h2>Sous-traitants</h2>
      <ul>
        <li>
          <strong>Google (Firebase)</strong> — authentification, base de données, hébergement.
        </li>
        <li>
          <strong>Anthropic</strong> — analyse des images par intelligence artificielle. Les captures sont transmises pour
          traitement au moment de l&apos;analyse ; elles ne sont pas conservées par {COMPANY.brand} après l&apos;analyse, seul le
          résultat l&apos;est.
        </li>
        <li>
          <strong>Stripe</strong> — paiement et gestion des abonnements.
        </li>
      </ul>
      <p>
        Certains de ces prestataires peuvent traiter des données hors de l&apos;Union européenne, notamment aux États-Unis. Ces
        transferts sont encadrés par les garanties prévues par le RGPD (clauses contractuelles types de la Commission
        européenne ou cadre de protection des données UE–États-Unis).
      </p>

      <h2>Durées de conservation</h2>
      <ul>
        <li>Compte et historique d&apos;analyses : jusqu&apos;à la suppression du compte.</li>
        <li>Pièces comptables : 10 ans, conformément à la loi.</li>
      </ul>

      <h2>Cookies</h2>
      <p>
        Le site n&apos;utilise que des traceurs strictement nécessaires à son fonctionnement (maintien de votre session de
        connexion, sécurité du paiement). Aucun cookie publicitaire ni de mesure d&apos;audience n&apos;est déposé ; aucun
        consentement n&apos;est donc requis.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation, d&apos;opposition et de
        portabilité de vos données. Pour les exercer, écrivez à {COMPANY.email}. Vous pouvez également introduire une
        réclamation auprès de la CNIL (www.cnil.fr).
      </p>
    </LegalPage>
  );
}
