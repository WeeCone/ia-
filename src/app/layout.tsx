import type { Metadata } from "next";
import { Archivo_Black, Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { AuthProvider } from "@/components/auth-provider";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });
// Logo wordmark only.
const archivoBlack = Archivo_Black({ variable: "--font-archivo-black", subsets: ["latin"], weight: "400" });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scanzivo — Analyse de graphiques par IA",
  description: "Importez une capture de graphique et obtenez une analyse technique et des scénarios de trading générés par IA.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable} ${archivoBlack.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a
          href="#contenu"
          className="sr-only z-50 rounded-lg bg-accent px-4 py-2 font-semibold text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:px-4 focus:py-2"
        >
          Aller au contenu
        </a>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
