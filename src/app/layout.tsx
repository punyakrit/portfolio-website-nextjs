import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";

import Script from "next/script";
import { ThemeProvider } from "@/providers/theme-provider";
import { env } from "@/lib/env";
import { SupportPageLayout } from "@/components/global/SupportPageLayout";
import VisitRecorder from "@/components/global/VisitRecorder";
import { RootJsonLd } from "@/components/seo/JsonLd";
import { SEO_CONFIG, PRIMARY_KEYWORDS, SITE_URL } from "@/lib/seo";

// The restored UI is a sans-serif interface, not the serif document. Geist is
// the body/UI face and Geist Mono backs the `font-mono` utilities and the
// explicit `var(--font-geist-mono)` references in home/Stack.tsx and
// pow/ProjectCard.tsx, which resolved to nothing while only Newsreader was
// loaded. Newsreader stays loaded and exposed as --font-newsreader so anything
// that still wants the serif can ask for it.
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#100f0e" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: `${SEO_CONFIG.name} | Full Stack Engineer - Web, Mobile, AI Features`,
    template: `%s | ${SEO_CONFIG.name}`,
  },
  description:
    "Full stack engineer shipping product end to end - web, mobile, and the AI features inside them. Next.js, React, React Native, TypeScript, Node.js, Python, FastAPI, PostgreSQL. Remote, open to full stack engineer roles.",
  applicationName: `${SEO_CONFIG.name} Portfolio`,
  category: "Technology",
  keywords: [...PRIMARY_KEYWORDS],
  authors: [{ name: SEO_CONFIG.name, url: SITE_URL }],
  creator: SEO_CONFIG.name,
  publisher: SEO_CONFIG.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SEO_CONFIG.name} | Full Stack Engineer`,
    description:
      "Full stack engineer building and shipping product end to end - web, mobile, and the AI features inside them.",
    url: SITE_URL,
    siteName: `${SEO_CONFIG.name} Portfolio`,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SEO_CONFIG.name} | Full Stack Engineer`,
    description:
      "I build and ship full stack products end to end - Next.js, React, React Native, TypeScript, Node.js - and the AI features inside them.",
    site: SEO_CONFIG.twitterHandle,
    creator: SEO_CONFIG.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/profile.jpeg",
    apple: "/profile.jpeg",
  },
  verification: {
    google: env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <RootJsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <VisitRecorder />
          <SupportPageLayout>{children}</SupportPageLayout>
        </ThemeProvider>
        {/* Analytics live inside <body>. They used to sit between </head>
            and <body> as direct children of <html>, which is invalid: the
            parser hoists stray elements into the body, so the server HTML
            and the client tree disagreed and React logged "Encountered a
            script tag while rendering React component". next/script
            injects these itself, so body is the correct home. */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${
            env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string
          }`}
        />
        <Script id="google-analytics">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', '${env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string}');`}
        </Script>
        <Script id="microsoft-clarity">
          {`
      (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", '${
        env.NEXT_PUBLIC_CLARITY_ID as string
      }');`}
        </Script>
      </body>
    </html>
  );
}
