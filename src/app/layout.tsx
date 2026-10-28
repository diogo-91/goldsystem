import type { Metadata, Viewport } from "next";
import "@fontsource-variable/geist";
import "./globals.css";

export const metadata: Metadata = {
  title: "GoldSystem — O futuro é desenvolvido.",
  description:
    "Sistemas sob medida, automações e Inteligência Artificial. Transformamos a complexidade da sua operação em possibilidades. Experimente a GoldSystem.",
  ...(process.env.NEXT_PUBLIC_SITE_URL
    ? { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL) }
    : {}),
  openGraph: {
    title: "GoldSystem — O futuro é desenvolvido.",
    description:
      "Transformamos complexidade em possibilidades. Software, automação e IA construídos para a sua empresa.",
    locale: "pt_BR",
    type: "website",
    ...(process.env.NEXT_PUBLIC_SITE_URL
      ? {
          images: [
            {
              url: "/og.png",
              width: 1200,
              height: 630,
              alt: "GoldSystem — O futuro é desenvolvido",
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
