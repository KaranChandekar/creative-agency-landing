import type { Metadata } from "next";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "700"],
});

const clashDisplay = localFont({
  src: [
    {
      path: "../fonts/ClashDisplay-Variable.woff2",
      style: "normal",
    },
  ],
  variable: "--font-clash-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VORTEX — Creative Digital Agency",
  description:
    "Award-winning creative agency crafting digital experiences that push boundaries. We blend art, technology, and storytelling.",
  keywords: [
    "creative agency",
    "digital design",
    "web development",
    "brand storytelling",
    "motion design",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} ${jetbrainsMono.variable} ${clashDisplay.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
