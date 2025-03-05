import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import structuredData from "../../public/structured-data.json"

export const metadata: Metadata = {
  title: "OptiScoop - Empowering Institutional Narratives",
  description: "OptiScoop empowers public relations professionals within Indonesia's Ministry of Immigration and Correctional sectors to produce optimized news and headlines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData),
            }}
          />
          <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        </head>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 pt-16">
                {children}
              </main>
              <Footer />
              <Toaster />  
            </div>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}