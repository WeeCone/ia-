import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { COMPANY } from "@/lib/legal";

export const metadata: Metadata = { title: "Mentions légales — Scanzivo" };

export default function MentionsPage() {
  return (
    <LegalPage title="Mentions légales">
      <h2>Éditeur du site</h2>
      <p>
        Le site {COMPANY.brand} est édité par <strong>{COMPANY.name}</strong>, {COMPANY.legalForm}, dont le siège social est
        situé {COMPANY.address}, immatriculée sous le numéro {COMPANY.registration}.
      </p>
      <ul>
        <li>TVA intracommunautaire : {COMPANY.vat}</li>
        <li>Directeur de la publication : {COMPANY.director}</li>
        <li>Contact : {COMPANY.email}</li>
      </ul>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par <strong>Google Cloud (Firebase)</strong>, Google Ireland Limited, Gordon House, Barrow Street,
        Dublin 4, Irlande.
      </p>

      <h2>Nature du service</h2>
      <p>
        {COMPANY.brand} est un outil d&apos;aide à la lecture de graphiques reposant sur l&apos;intelligence artificielle. Les
        analyses produites sont générales, automatisées et fournies à titre informatif et pédagogique. Elles ne constituent{" "}
        <strong>ni un conseil en investissement, ni une recommandation personnalisée</strong>, ni une incitation à acheter ou
        vendre un instrument financier. {COMPANY.brand} n&apos;est pas un prestataire de services d&apos;investissement ni un
        conseiller en investissements financiers. Le trading comporte un risque élevé de perte en capital ; vous restez seul
        responsable de vos décisions.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des éléments du site (textes, interface, logo, code) est la propriété de {COMPANY.name}, sauf mention
        contraire. Toute reproduction sans autorisation est interdite. Les captures d&apos;écran que vous importez restent votre
        propriété.
      </p>
    </LegalPage>
  );
}
