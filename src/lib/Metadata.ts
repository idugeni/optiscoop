import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | AstraLumen",
    default: "AstraLumen - Illuminate Digital Dreams",
  },
  description:
    "AstraLumen is a futuristic Next.js 15 theme that combines cutting-edge design with the elegance of Tailwind CSS and Shadcn UI to create stunning, responsive web experiences.",
  openGraph: {
    title: "AstraLumen - Illuminate Digital Dreams",
    description:
      "AstraLumen is a futuristic Next.js 15 theme that combines cutting-edge design with the elegance of Tailwind CSS and Shadcn UI to create stunning, responsive web experiences.",
    url: "https://astralumen.vercel.app",
    siteName: "AstraLumen - Illuminate Digital Dreams",
    images: [
      {
        url: "/astralumen.png",
        width: 1200,
        height: 630,
        alt: "AstraLumen",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AstraLumen - Illuminate Digital Dreams",
    description:
      "AstraLumen is a futuristic Next.js 15 theme that combines cutting-edge design with the elegance of Tailwind CSS and Shadcn UI to create stunning, responsive web experiences.",
    images: ["/astralumen.png"],
  },
  keywords: ["Next.js", "Boilerplate", "Turbopack", "Tailwind", "Shadcn UI"],
};
