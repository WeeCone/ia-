import type { Metadata } from "next";
import { Archivo_Black, Bodoni_Moda, Inter, JetBrains_Mono, Libre_Franklin, Space_Grotesk } from "next/font/google";
import { AuthProvider } from "@/components/auth-provider";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] });
// Logo wordmark only.
const archivoBlack = Archivo_Black({ variable: "--font-archivo-black", subsets: ["latin"], weight: "400" });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });
// Public site ("annotated game" world): chess-book titling and a sturdy text face.
const bodoni = Bodoni_Moda({ variable: "--font-bodoni", subsets: ["latin"], style: ["normal", "italic"] });
const franklin = Libre_Franklin({ variable: "--font-franklin", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scanzivo — Analyse de graphiques par IA",
  description: "Déposez une capture de graphique : Scanzivo trace les niveaux, lit la structure et tranche. Un verdict, un plan chiffré, en moins d'une minute.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable} ${archivoBlack.variable} ${jetbrainsMono.variable} ${bodoni.variable} ${franklin.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
