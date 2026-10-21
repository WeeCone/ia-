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
import { LOCALES } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import "../globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });
// Logo wordmark only.
const archivoBlack = Archivo_Black({ variable: "--font-archivo-black", subsets: ["latin"], weight: "400" });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return {
    metadataBase: new URL("https://scanzivo.com"),
    title: t.meta.title,
    description: t.meta.description,
  };
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const { locale, t } = await getI18n();
  return (
    <html lang={locale} className={`${inter.variable} ${spaceGrotesk.variable} ${archivoBlack.variable} ${jetbrainsMono.variable} h-full antialiased`}>
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
