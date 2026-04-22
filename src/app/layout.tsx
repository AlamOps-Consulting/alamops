import React from "react";
import { cookies, headers } from "next/headers";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import "./globals.css";
import { LocaleProvider } from "@/components/locale-provider";
import { ChatWidgetMount } from "@/components/chat-widget-mount";
import { SPANISH_COUNTRIES, type Locale } from "@/lib/i18n";

const SITE_URL = "https://alamops.com";
const SITE_NAME = "AlamOps";
const SITE_TAGLINE =
  "DevOps & Multi-cloud Consulting — AWS, Azure, GCP";
const SITE_DESCRIPTION =
  "AlamOps is a DevOps and multi-cloud consulting firm. We transform infrastructure into agility and efficiency, driving your success with innovative DevOps solutions across AWS, Azure and GCP — strategy, security, automation and FinOps.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `AlamOps — ${SITE_TAGLINE}`,
    template: "%s | AlamOps",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  category: "technology",
  keywords: [
    "AlamOps",
    "DevOps consulting",
    "Cloud consulting",
    "Multi-cloud consulting",
    "Cloud services",
    "Cloud migration",
    "Cloud strategy",
    "Multi-cloud strategy",
    "Cloud security",
    "DevOps automation",
    "CI/CD",
    "FinOps",
    "Cloud cost optimization",
    "AWS consulting",
    "Azure consulting",
    "GCP consulting",
    "Infrastructure as Code",
    "Terraform",
    "Consultoría DevOps",
    "Consultoría cloud",
    "Consultoría multi-cloud Zaragoza",
    "Servicios cloud España",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "es-ES": "/",
    },
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f3" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a17" },
  ],
  openGraph: {
    title: `AlamOps — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/alamops-logo.svg",
        width: 1200,
        height: 630,
        alt: "AlamOps — DevOps & Multi-cloud consulting",
      },
    ],
    locale: "en_US",
    alternateLocale: ["es_ES"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `AlamOps — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    creator: "@alamops",
    site: "@alamops",
    images: "/alamops-logo.svg",
  },
  icons: {
    icon: "/alamops-logo.svg",
    shortcut: "/alamops-logo.svg",
    apple: "/alamops-logo.svg",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: SITE_NAME,
  alternateName: "AlamOps Consulting",
  url: SITE_URL,
  logo: `${SITE_URL}/alamops-logo.svg`,
  image: `${SITE_URL}/alamops-logo.svg`,
  description: SITE_DESCRIPTION,
  slogan:
    "Transformamos la infraestructura en agilidad y eficiencia, impulsando tu éxito con soluciones DevOps innovadoras.",
  foundingDate: "2024",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Zaragoza",
    addressCountry: "ES",
  },
  areaServed: [
    { "@type": "Country", name: "Spain" },
    { "@type": "Place", name: "European Union" },
    { "@type": "Place", name: "Latin America" },
    { "@type": "Place", name: "Worldwide" },
  ],
  serviceType: [
    "DevOps consulting",
    "Multi-cloud strategy",
    "Cloud security",
    "DevOps automation",
    "FinOps",
    "Cloud migration",
  ],
  knowsAbout: [
    "AWS",
    "Microsoft Azure",
    "Google Cloud Platform",
    "Terraform",
    "Kubernetes",
    "CI/CD",
    "Cloud security",
    "FinOps",
    "Infrastructure as Code",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AlamOps Cloud Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Multi-cloud Strategy",
          description:
            "Design and implementation of optimized multi-cloud strategies across AWS, Azure and GCP to maximize performance and avoid single-provider lock-in.",
          serviceType: "Cloud consulting",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cloud Security",
          description:
            "Integrated security and governance in multi-cloud environments with industry best practices and compliance policies (ISO 27001, SOC 2, GDPR).",
          serviceType: "Cloud security",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "DevOps & Automation",
          description:
            "End-to-end CI/CD automation on any cloud provider, accelerating development and deployment with safer pipelines.",
          serviceType: "DevOps automation",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "FinOps",
          description:
            "Smart cost optimization across all cloud platforms through detailed analysis, tagging, rightsizing and savings strategies.",
          serviceType: "FinOps / cloud cost optimization",
        },
      },
    ],
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "support@alamops.com",
      telephone: "+34-614-020-961",
      contactType: "customer support",
      areaServed: "Worldwide",
      availableLanguage: ["English", "Spanish"],
    },
    {
      "@type": "ContactPoint",
      email: "support@alamops.com",
      contactType: "sales",
      areaServed: "Worldwide",
      availableLanguage: ["English", "Spanish"],
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/alamops/",
    "https://github.com/AlamOps-Consulting",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/news?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

async function detectLocaleFromHeaders(): Promise<Locale> {
  const h = await headers();
  const country = (
    h.get("x-vercel-ip-country") ??
    h.get("cf-ipcountry") ??
    ""
  ).toUpperCase();
  if (country && SPANISH_COUNTRIES.has(country)) return "es";
  const al = (h.get("accept-language") ?? "").toLowerCase();
  if (al.startsWith("es") || al.includes(",es") || al.includes(";es"))
    return "es";
  return "en";
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jar = await cookies();
  const cookieLang = jar.get("lang")?.value as Locale | undefined;
  const initialLocale: Locale =
    cookieLang === "es" || cookieLang === "en"
      ? cookieLang
      : await detectLocaleFromHeaders();

  return (
    <html lang={initialLocale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <GoogleAnalytics gaId="G-35GB1BKXPS" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        <LocaleProvider initialLocale={initialLocale}>
          <main>{children}</main>
          <ChatWidgetMount />
          <Toaster />
        </LocaleProvider>
      </body>
    </html>
  );
}
