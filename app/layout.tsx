import type { Metadata } from "next";
import { Cormorant_Garamond, EB_Garamond, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const serif = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const origin = "https://anteroom-studio.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: { default: "Anteroom — the room before the room", template: "%s · Anteroom" },
  description: "A research and engineering studio. Founded by ZAI in 2019.",
  openGraph: {
    siteName: "Anteroom",
    title: "Anteroom",
    description: "The room before the room. Founded by ZAI in 2019.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${mono.variable}`}>
      <body className="min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-bg-raised focus:px-4 focus:py-2 label"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
