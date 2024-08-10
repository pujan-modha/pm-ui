import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { siteConfig } from "@/config/site";
import { fontMono, fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { themeScript } from "@/hooks/theme-script";
import { Toaster as Sonner } from "@/registry/default/ui/sonner";
import { Toaster as DefaultToaster } from "@/registry/default/ui/toaster";
import { useThemeColor } from "@/components/theme-color";





export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
    "Pujan Modha",
    "Pujan",
    "pm-ui",
    "pmui",
    "pm/ui",
    "shadcnui",
    "shadcn",
    "shadcn-ui",
    "shadcn/ui",
  ],
  authors: [
    {
      name: "Pujan Modha",
      url: "https://pujan.pm",
    },
  ],
  creator: "Pujan Modha",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@pujan-modha",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  const themeColor = useThemeColor.getState().themeColor

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <script dangerouslySetInnerHTML={{ __html: themeScript }} />
          <Script id="theme-script" strategy="afterInteractive">
            {themeScript}
          </Script>
        </head>
        <body
          className={cn(
            "bg-background min-h-screen font-sans antialiased",
            fontSans.variable,
            fontMono.variable,
            themeColor
          )}
        >
          <div vaul-drawer-wrapper="">
            <div className="bg-background relative flex min-h-screen flex-col">
              {children}
            </div>
          </div>
          <DefaultToaster />
          <Sonner />
          <Analytics/>
          <SpeedInsights/>
        </body>
      </html>
    </>
  )
}