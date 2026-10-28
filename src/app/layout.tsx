import type { Metadata, Viewport } from "next";
import "@fontsource-variable/geist";
import "./globals.css";
import "./business.css";

export const metadata: Metadata = {
  title: "GoldSystem — Sistemas, automações e IA para sua empresa",
  description:
    "A GoldSystem desenvolve sistemas personalizados, automações de processos e soluções com Inteligência Artificial para organizar e conectar a operação da sua empresa.",
  ...(process.env.NEXT_PUBLIC_SITE_URL
    ? { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL) }
    : {}),
  openGraph: {
    title: "GoldSystem — Tecnologia sob medida para sua empresa",
    description:
      "Sistemas que organizam, automações que agilizam e IA que apoia sua equipe. Conheça as três frentes da GoldSystem.",
    locale: "pt_BR",
    type: "website",
    ...(process.env.NEXT_PUBLIC_SITE_URL
      ? {
          images: [
            {
              url: "/og.png",
              width: 1200,
              height: 630,
              alt: "GoldSystem — Sistemas, automações e Inteligência Artificial",
            },
          ],
        }
      : {}),
  },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#071B36" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
