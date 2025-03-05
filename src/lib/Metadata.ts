import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | OptiScoop",
    default: "OptiScoop - Empowering Institutional Narratives",
  },
  description:
    "OptiScoop empowers public relations professionals within Indonesia's Ministry of Immigration and Correctional sectors to produce optimized news and headlines with AI-powered tools.",
  metadataBase: new URL("https://optiscoop.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      'en-US': '/en-US',
      'id-ID': '/id-ID',
    },
  },
  applicationName: "OptiScoop",
  authors: [{ name: "OptiScoop Team" }],
  generator: "Next.js",
  keywords: [
    "AI news generator", 
    "headline optimization", 
    "public relations tools", 
    "institutional communications", 
    "Ministry of Immigration", 
    "Correctional sectors", 
    "Indonesia PR tools", 
    "AI writing assistant", 
    "news optimization", 
    "content generation"
  ],
  referrer: "origin-when-cross-origin",
  creator: "OptiScoop Team",
  publisher: "OptiScoop",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "OptiScoop - Empowering Institutional Narratives",
    description:
      "OptiScoop empowers public relations professionals within Indonesia's Ministry of Immigration and Correctional sectors to produce optimized news and headlines with AI-powered tools.",
    url: "https://optiscoop.vercel.app",
    siteName: "OptiScoop",
    images: [
      {
        url: "/optiscoop.png",
        width: 1200,
        height: 630,
        alt: "OptiScoop - AI-powered news and headline generation",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OptiScoop - Empowering Institutional Narratives",
    description:
      "OptiScoop empowers public relations professionals within Indonesia's Ministry of Immigration and Correctional sectors to produce optimized news and headlines with AI-powered tools.",
    images: ["/optiscoop.png"],
    creator: "@optiscoop",
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-verification-code",
  },
  category: "technology",
};
