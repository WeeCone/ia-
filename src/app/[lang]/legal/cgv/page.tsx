import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal-page";
import type { Locale } from "@/i18n/config";
import { formatEur } from "@/i18n/format";
import { getI18n, languageAlternates } from "@/i18n/server";
import { COMPANY } from "@/lib/legal";
import { MONTHLY_CREDITS, OFFER_PRICE_EUR } from "@/lib/plans";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return { title: t.legal.termsMetaTitle, alternates: languageAlternates(locale, "/legal/cgv") };
}

const CONTENT: Record<Locale, (privacyHref: string) => React.ReactNode> = {
  fr: (privacyHref) => (
    <>
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
          <strong>Mensuel — {formatEur("fr", OFFER_PRICE_EUR.monthly)} / mois</strong> : abonnement sans engagement, renouvelé
          automatiquement chaque mois.
        </li>
        <li>
          <strong>Essai — {formatEur("fr", OFFER_PRICE_EUR.trial)} (paiement unique)</strong> : une analyse, achetable une seule fois
          par compte, sans abonnement ni renouvellement. Le crédit d&apos;essai reste disponible jusqu&apos;à son utilisation.
        </li>
      </ul>
      <p>
        L&apos;abonnement inclut {MONTHLY_CREDITS} analyses par mois (usage raisonnable), rechargées à chaque échéance mensuelle ;
        les analyses non utilisées ne sont pas reportées. Une analyse n&apos;est décomptée que si l&apos;image est reconnue comme un graphique de prix.
      </p>
      <p>
        L&apos;offre À vie (paiement unique) n&apos;est plus proposée à la vente. Les clients qui l&apos;ont achetée conservent leur
        accès et leurs {MONTHLY_CREDITS} analyses par mois, rechargées au début de chaque mois civil, dans les conditions en
        vigueur lors de leur achat.
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
        La résiliation prend effet à la fin de la période en cours ; aucun prorata n&apos;est remboursé. Nous pouvons suspendre un compte en cas de manquement grave aux présentes conditions.
      </p>

      <h2>8. Disponibilité et responsabilité</h2>
      <p>
        Nous nous efforçons d&apos;assurer la disponibilité du Service sans pouvoir la garantir en permanence (maintenance,
        incident d&apos;un prestataire). Notre responsabilité ne saurait être engagée au titre des pertes financières résultant
        de décisions prises sur la base des analyses.
      </p>

      <h2>9. Données personnelles</h2>
      <p>
        Le traitement de vos données est décrit dans notre <Link href={privacyHref}>politique de confidentialité</Link>.
      </p>

      <h2>10. Réclamations, médiation et droit applicable</h2>
      <p>
        Pour toute réclamation : {COMPANY.email}. En cas de litige non résolu, vous pouvez recourir gratuitement au médiateur
        de la consommation : [À COMPLÉTER : nom et coordonnées du médiateur]. Les présentes conditions sont soumises au droit
        français.
      </p>
    </>
  ),
  en: (privacyHref) => (
    <>
      <h2>1. Purpose</h2>
      <p>
        These terms govern the use of the {COMPANY.brand} service (the &quot;Service&quot;) and the purchase of its paid offers
        from {COMPANY.name} (&quot;we&quot;). Creating an account or placing an order implies accepting them.
      </p>

      <h2>2. The Service</h2>
      <p>
        The Service lets you upload a screenshot of a price chart and receive a technical analysis generated automatically by
        artificial intelligence: trend, levels, patterns and scenarios with estimated probabilities.
      </p>
      <p>
        <strong>The analyses are not investment advice.</strong> They are general, may contain errors and do not take your
        personal situation into account. The probabilities shown are model estimates, not guarantees. You remain solely
        responsible for your trading decisions.
      </p>

      <h2>3. Account</h2>
      <p>
        You must be of legal age to create an account. You are responsible for keeping your credentials confidential and for any
        use of your account. Reselling access, mass-automating requests or misusing the Service is prohibited.
      </p>

      <h2>4. Offers and prices</h2>
      <ul>
        <li>
          <strong>Monthly — {formatEur("en", OFFER_PRICE_EUR.monthly)} / month</strong>: subscription with no commitment, renewed
          automatically every month.
        </li>
        <li>
          <strong>Trial — {formatEur("en", OFFER_PRICE_EUR.trial)} (one-off payment)</strong>: one analysis, which can be bought only
          once per account, with no subscription or renewal. The trial credit remains available until it is used.
        </li>
      </ul>
      <p>
        The subscription includes {MONTHLY_CREDITS} analyses per month (fair use), refilled at each monthly due date; unused
        analyses do not roll over. An analysis is
        only counted if the image is recognised as a price chart.
      </p>
      <p>
        The Lifetime offer (one-off payment) is no longer sold. Customers who bought it keep their access and their{" "}
        {MONTHLY_CREDITS} analyses per month, refilled at the start of each calendar month, under the terms in force when they
        bought it.
      </p>
      <p>Prices are in euros, all taxes included. There is no free offer.</p>

      <h2>5. Payment</h2>
      <p>
        Payment is made online through our provider Stripe. We never have access to your bank details. For the Monthly offer, you
        authorise automatic payment at each due date.
      </p>

      <h2>6. Right of withdrawal</h2>
      <p>
        The Service is digital content supplied immediately after payment. In accordance with article L221-28 13° of the French
        Consumer Code, by requesting immediate access to the Service when ordering, you expressly agree that its performance
        begins before the end of the 14-day withdrawal period and you <strong>waive your right of withdrawal</strong>.
      </p>

      <h2>7. Cancellation</h2>
      <p>
        The Monthly subscription can be cancelled at any time from &quot;My subscription&quot; in your dashboard. Cancellation
        takes effect at the end of the current period; no pro-rata refund is made. We may suspend an account in the
        event of a serious breach of these terms.
      </p>

      <h2>8. Availability and liability</h2>
      <p>
        We strive to keep the Service available but cannot guarantee it at all times (maintenance, provider incident). We cannot
        be held liable for financial losses resulting from decisions made on the basis of the analyses.
      </p>

      <h2>9. Personal data</h2>
      <p>
        How we process your data is described in our <Link href={privacyHref}>privacy policy</Link>.
      </p>

      <h2>10. Complaints, mediation and governing law</h2>
      <p>
        For any complaint: {COMPANY.email}. If a dispute remains unresolved, you may refer it free of charge to the consumer
        mediator: [À COMPLÉTER : nom et coordonnées du médiateur]. These terms are governed by French law.
      </p>
    </>
  ),
  es: (privacyHref) => (
    <>
      <h2>1. Objeto</h2>
      <p>
        Las presentes condiciones regulan el uso del servicio {COMPANY.brand} (el «Servicio») y la contratación de sus ofertas de
        pago con {COMPANY.name} («nosotros»). Crear una cuenta o realizar un pedido implica su aceptación.
      </p>

      <h2>2. El Servicio</h2>
      <p>
        El Servicio permite subir una captura de pantalla de un gráfico de precios y obtener un análisis técnico generado
        automáticamente por inteligencia artificial: tendencia, niveles, figuras y escenarios con probabilidades estimadas.
      </p>
      <p>
        <strong>Los análisis no constituyen asesoramiento de inversión.</strong> Son generales, pueden contener errores y no
        tienen en cuenta su situación personal. Las probabilidades mostradas son estimaciones del modelo, no garantías. Usted es
        el único responsable de sus decisiones de trading.
      </p>

      <h2>3. Cuenta</h2>
      <p>
        Debe ser mayor de edad para crear una cuenta. Es responsable de la confidencialidad de sus credenciales y del uso de su
        cuenta. Está prohibido revender el acceso, automatizar masivamente las solicitudes o hacer un uso indebido del Servicio.
      </p>

      <h2>4. Ofertas y precios</h2>
      <ul>
        <li>
          <strong>Mensual — {formatEur("es", OFFER_PRICE_EUR.monthly)} / mes</strong>: suscripción sin permanencia, renovada
          automáticamente cada mes.
        </li>
        <li>
          <strong>Prueba — {formatEur("es", OFFER_PRICE_EUR.trial)} (pago único)</strong>: un análisis, que solo puede comprarse una
          vez por cuenta, sin suscripción ni renovación. El crédito de prueba sigue disponible hasta que se utilice.
        </li>
      </ul>
      <p>
        La suscripción incluye {MONTHLY_CREDITS} análisis al mes (uso razonable), recargados en cada vencimiento mensual; los
        análisis no utilizados no se acumulan. Un
        análisis solo se descuenta si la imagen se reconoce como un gráfico de precios.
      </p>
      <p>
        La oferta De por vida (pago único) ya no se comercializa. Los clientes que la compraron conservan su acceso y sus{" "}
        {MONTHLY_CREDITS} análisis al mes, recargados al inicio de cada mes natural, en las condiciones vigentes en el momento de
        su compra.
      </p>
      <p>Los precios se indican en euros, impuestos incluidos. No existe oferta gratuita.</p>

      <h2>5. Pago</h2>
      <p>
        El pago se realiza en línea a través de nuestro proveedor Stripe. Nunca tenemos acceso a sus datos bancarios. Para la
        oferta Mensual, usted autoriza el cargo automático en cada vencimiento.
      </p>

      <h2>6. Derecho de desistimiento</h2>
      <p>
        El Servicio es un contenido digital suministrado inmediatamente después del pago. De conformidad con el artículo L221-28
        13° del Código de Consumo francés, al solicitar el acceso inmediato al Servicio en el momento del pedido, usted acepta
        expresamente que su ejecución comience antes del final del plazo de desistimiento de 14 días y{" "}
        <strong>renuncia a su derecho de desistimiento</strong>.
      </p>

      <h2>7. Cancelación</h2>
      <p>
        La suscripción Mensual puede cancelarse en cualquier momento desde «Mi suscripción» en su panel. La cancelación surte
        efecto al final del periodo en curso; no se reembolsa ningún prorrateo. Podemos
        suspender una cuenta en caso de incumplimiento grave de las presentes condiciones.
      </p>

      <h2>8. Disponibilidad y responsabilidad</h2>
      <p>
        Nos esforzamos por mantener el Servicio disponible sin poder garantizarlo en todo momento (mantenimiento, incidencia de un
        proveedor). No seremos responsables de las pérdidas financieras derivadas de decisiones tomadas a partir de los análisis.
      </p>

      <h2>9. Datos personales</h2>
      <p>
        El tratamiento de sus datos se describe en nuestra <Link href={privacyHref}>política de privacidad</Link>.
      </p>

      <h2>10. Reclamaciones, mediación y ley aplicable</h2>
      <p>
        Para cualquier reclamación: {COMPANY.email}. En caso de litigio no resuelto, puede recurrir gratuitamente al mediador de
        consumo: [À COMPLÉTER : nom et coordonnées du médiateur]. Las presentes condiciones se rigen por el derecho francés.
      </p>
    </>
  ),
};

export default async function CgvPage() {
  const { locale, t, href } = await getI18n();
  return <LegalPage title={t.legal.termsTitle}>{CONTENT[locale](href("/legal/confidentialite"))}</LegalPage>;
}
