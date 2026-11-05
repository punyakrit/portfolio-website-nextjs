import type { Metadata, Viewport } from "next";
import { Archivo, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";

import Script from "next/script";
import { ThemeProvider } from "@/providers/theme-provider";
import { env } from "@/lib/env";
import { SupportPageLayout } from "@/components/global/SupportPageLayout";
import VisitRecorder from "@/components/global/VisitRecorder";
import { MotionProvider } from "@/components/global/MotionProvider";
import { RootJsonLd } from "@/components/seo/JsonLd";
import { SEO_CONFIG, PRIMARY_KEYWORDS, SITE_URL } from "@/lib/seo";

// Archivo sets everything, with its width axis opened up for headlines.
// Newsreader italic is for captions and water labels on the map, the way an
// atlas sets them. Geist Mono stays for the small labels on /pow.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
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
    { media: "(prefers-color-scheme: light)", color: "#F5F7F8" },
    { media: "(prefers-color-scheme: dark)", color: "#10151E" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: `${SEO_CONFIG.name} | Full-Stack AI Engineer`,
    template: `%s | ${SEO_CONFIG.name}`,
  },
  description:
    "Full-stack AI engineer. I built RemJobs, 400K+ live jobs from 250K+ startups, searchable from Claude and ChatGPT. Open to remote full-stack, AI and founding engineer roles.",
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
    title: `${SEO_CONFIG.name} | Full-Stack AI Engineer`,
    description:
      "Full-stack AI engineer. I built RemJobs, 400K+ live jobs from 250K+ startups, searchable from Claude and ChatGPT. Open to remote full-stack, AI and founding engineer roles.",
    url: SITE_URL,
    siteName: `${SEO_CONFIG.name} Portfolio`,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SEO_CONFIG.name} | Full-Stack AI Engineer`,
    description:
      "Full-stack AI engineer. I built RemJobs, 400K+ live jobs from 250K+ startups, searchable from Claude and ChatGPT. Open to remote full-stack, AI and founding engineer roles.",
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
        suppressHydrationWarning
        className={`${archivo.variable} ${geistMono.variable} ${newsreader.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <VisitRecorder />
          <MotionProvider>
            <SupportPageLayout>{children}</SupportPageLayout>
          </MotionProvider>
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
