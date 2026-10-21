import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import type { Locale } from "@/i18n/config";
import { getI18n, languageAlternates } from "@/i18n/server";
import { COMPANY } from "@/lib/legal";

export async function generateMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return { title: `${t.legal.privacyTitle} — Scanzivo`, alternates: languageAlternates(locale, "/legal/confidentialite") };
}

const CONTENT: Record<Locale, () => React.ReactNode> = {
  fr: () => (
    <>
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
          les résultats d&apos;analyse. Les captures sont conservées avec votre historique pour que vous puissiez les revoir
          annotées ; elles sont effacées avec votre compte.
        </li>
        <li>
          <strong>Avis</strong> : la note, le commentaire et votre accord de publication, si vous choisissez de laisser un avis.
          Un avis n&apos;est publié sur le site qu&apos;avec votre accord, sous votre prénom et l&apos;initiale de votre nom.
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
          <strong>Google (Firebase)</strong> — authentification, base de données, stockage des captures, hébergement.
        </li>
        <li>
          <strong>Anthropic</strong> — analyse des images par intelligence artificielle. Les captures lui sont transmises pour
          traitement au moment de l&apos;analyse ; {COMPANY.brand} conserve la capture et le résultat dans votre historique.
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

      <h2>Cookies et mesure d&apos;audience</h2>
      <p>
        Le site n&apos;utilise que des traceurs strictement nécessaires à son fonctionnement (maintien de votre session de
        connexion, sécurité du paiement, mémorisation de votre langue).
      </p>
      <p>
        Seulement si vous l&apos;acceptez dans le bandeau cookies, le site charge le pixel de Meta (Meta Platforms Ireland
        Ltd., éditeur de Facebook et Instagram). Il dépose des cookies et transmet à Meta les pages vues et les étapes clés
        (inscription, paiement lancé, achat et son montant), pour mesurer l&apos;efficacité de nos publicités et les montrer à
        des personnes susceptibles d&apos;être intéressées. Meta peut traiter ces données hors de l&apos;Union européenne,
        dans le cadre de ses propres garanties. Sans votre accord, rien n&apos;est chargé. Votre choix est conservé 6 mois dans
        votre navigateur et vous pouvez le changer à tout moment avec le lien « Gérer les cookies » en bas de chaque page.
      </p>
      <p>
        Pour savoir combien de personnes visitent le site et quelles publicités les amènent, nous utilisons notre propre mesure
        d&apos;audience, sans cookie : votre navigateur garde pendant la visite un simple indicateur de « visite commencée », et
        pendant 30 jours au plus le nom du site ou de la campagne par lequel vous êtes arrivé. Seuls des compteurs anonymes par
        jour sont enregistrés (pages vues, provenance, type d&apos;appareil, langue), sans adresse IP, sans identifiant et sans
        lien avec votre compte. En cas d&apos;achat, seul le nom de cette campagne est joint au paiement, pour compter les ventes
        par campagne. Ces données servent uniquement à nos statistiques et ne sont jamais partagées ni croisées avec
        d&apos;autres traitements ; cette mesure est donc dispensée de consentement selon les recommandations de la CNIL.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de limitation, d&apos;opposition et de
        portabilité de vos données. Vous pouvez supprimer vous-même votre compte et toutes vos analyses depuis votre tableau de
        bord (rubrique « Compte »). Pour exercer vos autres droits, écrivez à {COMPANY.email}. Vous pouvez également introduire
        une réclamation auprès de la CNIL (www.cnil.fr).
      </p>
    </>
  ),
  en: () => (
    <>
      <h2>Data controller</h2>
      <p>
        {COMPANY.name}, {COMPANY.address}. Contact: {COMPANY.email}.
      </p>

      <h2>Data collected</h2>
      <ul>
        <li>
          <strong>Account</strong>: name, email address, login identifier (and profile picture if you use Google).
        </li>
        <li>
          <strong>Analyses</strong>: the screenshots you upload, any context you type, and the analysis results. Screenshots are
          kept with your history so you can see them annotated again; they are erased with your account.
        </li>
        <li>
          <strong>Reviews</strong>: the rating, the comment and your consent to publication, if you choose to leave a review. A
          review is only published on the site with your consent, under your first name and the initial of your last name.
        </li>
        <li>
          <strong>Billing</strong>: offer purchased, payment history, Stripe customer identifier. Bank details are processed by
          Stripe only.
        </li>
      </ul>

      <h2>Purposes and legal bases</h2>
      <ul>
        <li>Providing the Service and managing your account and credits — performance of the contract.</li>
        <li>Billing and accounting obligations — legal obligation.</li>
        <li>Security and abuse prevention — legitimate interest.</li>
      </ul>
      <p>We do not sell your data and do not use it for advertising.</p>

      <h2>Processors</h2>
      <ul>
        <li>
          <strong>Google (Firebase)</strong> — authentication, database, screenshot storage, hosting.
        </li>
        <li>
          <strong>Anthropic</strong> — image analysis by artificial intelligence. Screenshots are sent to it for processing at
          the time of the analysis; {COMPANY.brand} keeps the screenshot and the result in your history.
        </li>
        <li>
          <strong>Stripe</strong> — payment and subscription management.
        </li>
      </ul>
      <p>
        Some of these providers may process data outside the European Union, in particular in the United States. These transfers
        are covered by the safeguards provided for by the GDPR (European Commission standard contractual clauses or the EU–US
        Data Privacy Framework).
      </p>

      <h2>Retention periods</h2>
      <ul>
        <li>Account and analysis history: until the account is deleted.</li>
        <li>Accounting records: 10 years, as required by law.</li>
      </ul>

      <h2>Cookies and audience measurement</h2>
      <p>
        The site only uses trackers that are strictly necessary for it to work (keeping you signed in, payment security,
        remembering your language).
      </p>
      <p>
        Only if you accept it in the cookie banner, the site loads the Meta pixel (Meta Platforms Ireland Ltd., publisher of
        Facebook and Instagram). It sets cookies and sends Meta the pages viewed and the key steps (sign-up, checkout started,
        purchase and its amount), to measure how well our ads work and show them to people likely to be interested. Meta may
        process this data outside the European Union under its own safeguards. Without your consent, nothing is loaded. Your
        choice is kept for 6 months in your browser and you can change it at any time with the &quot;Cookie settings&quot;
        link at the bottom of every page.
      </p>
      <p>
        To know how many people visit the site and which ads bring them, we use our own cookie-free audience measurement: your
        browser keeps a simple &quot;visit started&quot; flag during the visit and, for 30 days at most, the name of the site or
        campaign you came from. Only anonymous daily counters are stored (pages viewed, origin, device type, language), with no
        IP address, no identifier and no link to your account. When you make a purchase, only the name of that campaign is
        attached to the payment, to count sales per campaign. This data is used for our statistics only and is never shared or
        combined with other processing, so under the CNIL guidelines this measurement does not require consent.
      </p>

      <h2>Your rights</h2>
      <p>
        You have the right to access, rectify, erase, restrict, object to and port your data. You can delete your account and all
        your analyses yourself from your dashboard (&quot;Account&quot;). To exercise your other rights, write to {COMPANY.email}.
        You may also lodge a complaint with the CNIL (www.cnil.fr) or your local data protection authority.
      </p>
    </>
  ),
  es: () => (
    <>
      <h2>Responsable del tratamiento</h2>
      <p>
        {COMPANY.name}, {COMPANY.address}. Contacto: {COMPANY.email}.
      </p>

      <h2>Datos recogidos</h2>
      <ul>
        <li>
          <strong>Cuenta</strong>: nombre, dirección de email, identificador de acceso (y foto de perfil si usa Google).
        </li>
        <li>
          <strong>Análisis</strong>: las capturas de pantalla que sube, el contexto que pueda escribir y los resultados de los
          análisis. Las capturas se conservan con su historial para que pueda volver a verlas anotadas; se borran junto con su
          cuenta.
        </li>
        <li>
          <strong>Opiniones</strong>: la nota, el comentario y su consentimiento de publicación, si decide dejar una opinión. Una
          opinión solo se publica en el sitio con su consentimiento, con su nombre y la inicial de su apellido.
        </li>
        <li>
          <strong>Facturación</strong>: oferta contratada, historial de pagos, identificador de cliente de Stripe. Los datos
          bancarios los trata exclusivamente Stripe.
        </li>
      </ul>

      <h2>Finalidades y bases legales</h2>
      <ul>
        <li>Prestar el Servicio y gestionar su cuenta y sus créditos — ejecución del contrato.</li>
        <li>Facturación y obligaciones contables — obligación legal.</li>
        <li>Seguridad y prevención de abusos — interés legítimo.</li>
      </ul>
      <p>No vendemos sus datos ni los utilizamos con fines publicitarios.</p>

      <h2>Encargados del tratamiento</h2>
      <ul>
        <li>
          <strong>Google (Firebase)</strong> — autenticación, base de datos, almacenamiento de capturas, alojamiento.
        </li>
        <li>
          <strong>Anthropic</strong> — análisis de imágenes mediante inteligencia artificial. Las capturas se le transmiten para
          su tratamiento en el momento del análisis; {COMPANY.brand} conserva la captura y el resultado en su historial.
        </li>
        <li>
          <strong>Stripe</strong> — pago y gestión de suscripciones.
        </li>
      </ul>
      <p>
        Algunos de estos proveedores pueden tratar datos fuera de la Unión Europea, en particular en Estados Unidos. Estas
        transferencias están cubiertas por las garantías previstas por el RGPD (cláusulas contractuales tipo de la Comisión
        Europea o Marco de Privacidad de Datos UE–EE. UU.).
      </p>

      <h2>Plazos de conservación</h2>
      <ul>
        <li>Cuenta e historial de análisis: hasta la eliminación de la cuenta.</li>
        <li>Documentos contables: 10 años, conforme a la ley.</li>
      </ul>

      <h2>Cookies y medición de audiencia</h2>
      <p>
        El sitio solo utiliza rastreadores estrictamente necesarios para su funcionamiento (mantener su sesión, seguridad del
        pago, recordar su idioma).
      </p>
      <p>
        Solo si lo acepta en el banner de cookies, el sitio carga el píxel de Meta (Meta Platforms Ireland Ltd., editor de
        Facebook e Instagram). Instala cookies y envía a Meta las páginas vistas y los pasos clave (registro, pago iniciado,
        compra y su importe), para medir la eficacia de nuestros anuncios y mostrarlos a personas que puedan estar
        interesadas. Meta puede tratar estos datos fuera de la Unión Europea con sus propias garantías. Sin su consentimiento,
        no se carga nada. Su elección se conserva 6 meses en su navegador y puede cambiarla en cualquier momento con el enlace
        «Gestionar cookies» al pie de cada página.
      </p>
      <p>
        Para saber cuántas personas visitan el sitio y qué anuncios las traen, utilizamos nuestra propia medición de audiencia,
        sin cookies: su navegador guarda durante la visita un simple indicador de «visita iniciada» y, durante 30 días como
        máximo, el nombre del sitio o de la campaña por el que llegó. Solo se registran contadores anónimos por día (páginas
        vistas, procedencia, tipo de dispositivo, idioma), sin dirección IP, sin identificador y sin relación con su cuenta. En
        caso de compra, solo el nombre de esa campaña se adjunta al pago, para contar las ventas por campaña. Estos datos solo
        sirven para nuestras estadísticas y nunca se comparten ni se cruzan con otros tratamientos; por ello, según las
        recomendaciones de la CNIL, esta medición no requiere consentimiento.
      </p>

      <h2>Sus derechos</h2>
      <p>
        Tiene derecho de acceso, rectificación, supresión, limitación, oposición y portabilidad de sus datos. Puede eliminar usted
        mismo su cuenta y todos sus análisis desde su panel («Cuenta»). Para ejercer sus demás derechos, escriba a{" "}
        {COMPANY.email}. También puede presentar una reclamación ante la CNIL (www.cnil.fr) o ante la autoridad de protección de
        datos de su país.
      </p>
    </>
  ),
};

export default async function ConfidentialitePage() {
  const { locale, t } = await getI18n();
  return <LegalPage title={t.legal.privacyTitle}>{CONTENT[locale]()}</LegalPage>;
}
