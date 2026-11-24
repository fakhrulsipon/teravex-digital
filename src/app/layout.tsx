import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { Providers } from "@/components/layout/providers";
import { InteractiveEffects } from "@/components/layout/interactive-effects";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/data/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "web design Qatar",
    "website development Doha",
    "digital marketing agency Qatar",
    "mobile app development Qatar",
    "SEO Qatar",
    "Arabic English website",
    "social media management Doha",
    "Google Ads Qatar",
    "Meta Ads Qatar",
  ],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f7faff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${jakarta.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <noscript>
          <style>{".gsap-reveal,.gsap-item{visibility:visible!important}"}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-lift"
        >
          Skip to content
        </a>
        <Providers>
          <InteractiveEffects />
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </Providers>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
