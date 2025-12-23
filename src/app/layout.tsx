import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter, Poppins, Fondamento } from "next/font/google";
import "./globals.css";

import Script from "next/script";
import { ThemeProvider } from "@/providers/theme-provider";
import { env } from "@/lib/env";
import NavBar from "@/components/global/NavBar";
import DevMode from "@/lib/DevMode";
import RefreshOverlay from "@/components/global/RefreshOverlay";
import FirstVisitNotification from "@/components/global/FirstVisitNotification";
import Footer from "@/components/home/Footer";
import HorizontalLine from "@/components/global/HorizontalLine";
import FixedBottomCta from "@/components/global/FixedBottomCta";
import { RootJsonLd } from "@/lib/seo-jsonld";
import { SEO_CONFIG, PRIMARY_KEYWORDS, SITE_URL } from "@/lib/seo";
import Provider from "@/providers/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const fondamento = Fondamento({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-fondamento",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: `${SEO_CONFIG.name} | Freelance Full-Stack Developer India - Hire for Web Projects`,
    template: `%s | ${SEO_CONFIG.name}`,
  },
  description:
    "Punyakrit Singh Makhni is a freelance full-stack developer from India. I build production-grade web apps with Next.js, React, TypeScript & Node.js. Hire me for your next project - remote-friendly, globally available.",
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
    title: `${SEO_CONFIG.name} | Freelance Full-Stack Developer India`,
    description:
      "Freelance full-stack developer from India building production-grade web applications. Hire me for Next.js, React, TypeScript, and Node.js projects.",
    url: SITE_URL,
    siteName: `${SEO_CONFIG.name} Portfolio`,
    images: [
      {
        url: `${SITE_URL}/main.png`,
        width: 1200,
        height: 630,
        alt: `${SEO_CONFIG.name} - Freelance Full-Stack Developer`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SEO_CONFIG.name} | Freelance Full-Stack Developer`,
    description:
      "Freelance full-stack developer from India. I build production-grade web apps with Next.js, React & TypeScript. Available for remote projects globally.",
    images: [`${SITE_URL}/main.png`],
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
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${fondamento.variable} ${inter.variable} antialiased dark:bg-[#121212] `}
      >
        <Provider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RefreshOverlay />
          <FirstVisitNotification />
          <DevMode />
          <FixedBottomCta />
          <div className="max-w-4xl container mx-auto">
            <div
              className="
      h-full w-full
      md:bg-[repeating-linear-gradient(135deg,rgba(0,0,0,0.06)_0_1px,transparent_1px_6px)] md:dark:bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.06)_0_1px,transparent_1px_6px)]
      md:border-x md:dark:border-[#1b1b1b]
      flex overflow-auto
    "
            >
              <div className="flex-1 md:mx-14 h-full dark:bg-[#121212] bg-white border-x dark:border-[#1b1b1b] z-10">
                <NavBar />
                <div className="mt-12">

                {children}
                <HorizontalLine />
                <Footer />
          
                </div>
              </div>
            </div>
          </div>
        </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
