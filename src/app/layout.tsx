import type { Metadata } from "next";
import { Cinzel, Outfit, Akaya_Kanadaka, EB_Garamond, Lavishly_Yours } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const akaya = Akaya_Kanadaka({
  subsets: ["latin"],
  variable: "--font-akaya",
  weight: "400",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  weight: ["400", "500", "600", "700", "800"],
});

const lavishly = Lavishly_Yours({
  subsets: ["latin"],
  variable: "--font-lavishly",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Premium Landing Page",
  description: "A scalable, themeable landing page architecture.",
};

import { SmoothScroll } from "@/components/ui/smooth-scroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${cinzel.variable} ${akaya.variable} ${ebGaramond.variable} ${lavishly.variable} antialiased font-sans`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
