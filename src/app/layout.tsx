import type { Metadata, Viewport } from "next";
import { Newsreader } from "next/font/google";
import "./globals.css";

import Script from "next/script";
import { ThemeProvider } from "@/providers/theme-provider";
import { env } from "@/lib/env";
import { SupportPageLayout } from "@/components/global/SupportPageLayout";
import VisitRecorder from "@/components/global/VisitRecorder";
import { RootJsonLd } from "@/components/seo/JsonLd";
import { SEO_CONFIG, PRIMARY_KEYWORDS, SITE_URL } from "@/lib/seo";

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
    default: `${SEO_CONFIG.name} | AI Engineer - Agents, LLM Pipelines, RAG`,
    template: `%s | ${SEO_CONFIG.name}`,
  },
  description:
    "AI engineer building multi-model agent systems and LLM pipelines that run in production - agent orchestration, RAG, evaluation loops, and the infrastructure underneath them. Python, FastAPI, Gemini, OpenAI, pgvector, TypeScript, Next.js.",
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
    title: `${SEO_CONFIG.name} | AI Engineer`,
    description:
      "AI engineer building agents and multi-model pipelines that hold up in production - agent orchestration, RAG, and evals, shipped end to end.",
    url: SITE_URL,
    siteName: `${SEO_CONFIG.name} Portfolio`,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SEO_CONFIG.name} | AI Engineer`,
    description:
      "I build AI agents and multi-model pipelines that hold up in production - systems where models make the judgment calls and deterministic code does the execution.",
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
      <body
        className={newsreader.variable}
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
      </body>
    </html>
  );
}
