import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import type { Locale } from "@/i18n/config";
import { getI18n, languageAlternates } from "@/i18n/server";
import { COMPANY } from "@/lib/legal";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return { title: `${t.legal.mentionsTitle} — Scanzivo`, alternates: languageAlternates(locale, "/legal/mentions") };
}

const CONTENT: Record<Locale, () => React.ReactNode> = {
  fr: () => (
    <>
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
        L&apos;ensemble des éléments du site (textes, interface, logo, code) est la propriété de {COMPANY.brand}, sauf mention
        contraire. Toute reproduction sans autorisation est interdite. Les captures d&apos;écran que vous importez restent votre
        propriété.
      </p>
    </>
  ),
  en: () => (
    <>
      <h2>Hosting</h2>
      <p>
        The website is hosted by <strong>Google Cloud (Firebase)</strong>, Google Ireland Limited, Gordon House, Barrow Street,
        Dublin 4, Ireland.
      </p>

      <h2>Nature of the service</h2>
      <p>
        {COMPANY.brand} is an AI-based tool that helps read price charts. Its analyses are general, automated and provided for
        information and educational purposes. They are <strong>neither investment advice nor a personal recommendation</strong>,
        nor an incitement to buy or sell any financial instrument. {COMPANY.brand} is not an investment services provider or a
        financial investment adviser. Trading involves a high risk of capital loss; you remain solely responsible for your
        decisions.
      </p>

      <h2>Intellectual property</h2>
      <p>
        All elements of the website (texts, interface, logo, code) are the property of {COMPANY.brand}, unless stated otherwise.
        Any reproduction without permission is prohibited. The screenshots you upload remain your property.
      </p>
    </>
  ),
  es: () => (
    <>
      <h2>Alojamiento</h2>
      <p>
        El sitio está alojado por <strong>Google Cloud (Firebase)</strong>, Google Ireland Limited, Gordon House, Barrow Street,
        Dublín 4, Irlanda.
      </p>

      <h2>Naturaleza del servicio</h2>
      <p>
        {COMPANY.brand} es una herramienta de ayuda a la lectura de gráficos basada en inteligencia artificial. Los análisis son
        generales, automatizados y se ofrecen con fines informativos y pedagógicos. No constituyen{" "}
        <strong>ni un asesoramiento de inversión ni una recomendación personalizada</strong>, ni una incitación a comprar o vender
        un instrumento financiero. {COMPANY.brand} no es una empresa de servicios de inversión ni un asesor financiero. El trading
        conlleva un riesgo elevado de pérdida de capital; usted es el único responsable de sus decisiones.
      </p>

      <h2>Propiedad intelectual</h2>
      <p>
        Todos los elementos del sitio (textos, interfaz, logotipo, código) son propiedad de {COMPANY.brand}, salvo indicación en
        contrario. Queda prohibida cualquier reproducción sin autorización. Las capturas de pantalla que usted sube siguen siendo
        de su propiedad.
      </p>
    </>
  ),
  // Japanese, Korean, Vietnamese, Indonesian: the English text, the reference translation of these French terms.
  ja: () => CONTENT.en(),
  ko: () => CONTENT.en(),
  vi: () => CONTENT.en(),
  id: () => CONTENT.en(),
  it: () => CONTENT.en(),
  de: () => CONTENT.en(),
  pt: () => CONTENT.en(),
};

export default async function MentionsPage() {
  const { locale, t } = await getI18n();
  return <LegalPage title={t.legal.mentionsTitle}>{CONTENT[locale]()}</LegalPage>;
}
