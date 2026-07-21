import type { Metadata } from "next";
import { AssistantWidget } from "@/components/assistant-widget";
import "./globals.css";
import "./expanded.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://digitalarchitecture.trusted-eco.org"),
  title: "TRUSTed Digital Architecture | Designing the Digital Foundation of Modern Business",
  description: "Premium digital architecture for websites, software, AI systems, platforms, automation, and managed digital operations.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: { title: "TRUSTed Digital Architecture", description: "Designing the Digital Foundation of Modern Business.", url: "https://digitalarchitecture.trusted-eco.org", siteName: "TRUSTed Digital Architecture", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Organization", "@id": "https://digitalarchitecture.trusted-eco.org/#organization", name: "TRUSTed Digital Architecture", url: "https://digitalarchitecture.trusted-eco.org", email: "caleb@trustedacademy.net", description: "Digital architecture for websites, software, AI systems, platforms, automation, and managed digital operations." },
            { "@type": "WebSite", "@id": "https://digitalarchitecture.trusted-eco.org/#website", name: "TRUSTed Digital Architecture", url: "https://digitalarchitecture.trusted-eco.org", publisher: { "@id": "https://digitalarchitecture.trusted-eco.org/#organization" } },
          ],
        }) }} />
        {children}
        <AssistantWidget />
      </body>
    </html>
  );
}
