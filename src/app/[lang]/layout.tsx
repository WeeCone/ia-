import type { Metadata } from "next";
import { Archivo_Black, Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { AuthProvider } from "@/components/auth-provider";
import { ChartReadyDialog } from "@/components/chart-ready-dialog";
import { CheckoutDialog } from "@/components/checkout-dialog";
import { CookieBanner } from "@/components/cookie-banner";
import { LanguageSuggestion } from "@/components/language-suggestion";
import { VisitTracker } from "@/components/visit-tracker";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { LocaleProvider } from "@/i18n/client";
import { localePath, LOCALES } from "@/i18n/config";
import { metaDescription } from "@/lib/seo";
import { getI18n } from "@/i18n/server";
import "../globals.css";

// Google's tag, in the head as Google Ads asks. Consent mode starts every storage type on "denied"; it flips to "granted"
// only for a visitor who accepted in the cookie banner (stored in this browser, see lib/consent.ts), and it is updated live
// when the banner is answered (lib/google-tag.ts).
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
const GTM_HEAD = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
var d={ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",analytics_storage:"denied",wait_for_update:500};
gtag("consent","default",d);
try{var c=JSON.parse(localStorage.getItem("scanzivo:consent")||"null");if(c&&c.value==="granted"&&Date.now()-c.at<${182 * 24 * 3600 * 1000}){gtag("consent","update",{ad_storage:"granted",ad_user_data:"granted",ad_personalization:"granted",analytics_storage:"granted"})}}catch(e){}
gtag("js",new Date());`;

const inter = Inter({ variable: "--font-inter", subsets: ["latin", "latin-ext", "vietnamese"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin", "latin-ext", "vietnamese"] });
// Logo wordmark only.
const archivoBlack = Archivo_Black({ variable: "--font-archivo-black", subsets: ["latin"], weight: "400" });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });

const OG_LOCALE = { fr: "fr_FR", en: "en_GB", es: "es_ES", ja: "ja_JP", ko: "ko_KR", vi: "vi_VN", id: "id_ID", it: "it_IT", de: "de_DE", pt: "pt_BR" } as const;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { t, locale } = await getI18n();
  return {
    metadataBase: new URL("https://scanzivo.com"),
    title: t.meta.title,
    description: metaDescription(t.meta.description),
    applicationName: "Scanzivo",
    // The share card is drawn by the og route (one for the site, one per article, see blog/[slug]/og).
    openGraph: {
      siteName: "Scanzivo",
      type: "website",
      locale: OG_LOCALE[locale],
      title: t.meta.title,
      description: t.meta.description,
      images: [{ url: localePath(locale, "/og"), width: 1200, height: 630, alt: t.meta.title }],
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description, images: [localePath(locale, "/og")] },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const { locale, t } = await getI18n();
  return (
    <html lang={locale} className={`${inter.variable} ${spaceGrotesk.variable} ${archivoBlack.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      {GTM_ID && (
        <head>
          <script async src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`} />
          <script dangerouslySetInnerHTML={{ __html: GTM_HEAD }} />
        </head>
      )}
      <body className="min-h-full flex flex-col">
        <a
          href="#contenu"
          className="sr-only z-50 rounded-lg bg-accent px-4 py-2 font-semibold text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:px-4 focus:py-2"
        >
          {t.meta.skipLink}
        </a>
        <LocaleProvider locale={locale}>
          <AuthProvider>
            {children}
            <CheckoutDialog />
            <ChartReadyDialog />
          </AuthProvider>
          <WhatsAppButton />
          <LanguageSuggestion />
          <VisitTracker />
          <CookieBanner />
        </LocaleProvider>
      </body>
    </html>
  );
}
