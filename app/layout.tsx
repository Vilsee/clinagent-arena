import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: "ClinAgent Arena — Clinical AI Safety Benchmark",
  description:
    "An adversarial benchmark platform for evaluating clinical AI agent safety, reliability, and alignment.",
  openGraph: {
    title: "ClinAgent Arena",
    description: "A public safety record for every clinical AI agent.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
      <body className="antialiased">
        {/* Fixed background grid */}
        <div className="bg-grid" aria-hidden="true" />

        {/* Site shell */}
        <div className="site-shell">
          <Header />
          <div className="site-content">
            <PageTransition>{children}</PageTransition>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
