import type { Metadata } from "next";
import { Fondamento, Geist, Geist_Mono, Inter, Poppins,  } from "next/font/google";
import "./globals.css";

import Script from "next/script";
import { ThemeProvider } from "@/providers/theme-provider";
import { env } from "@/lib/env";
import NavBar from "@/components/global/NavBar";
import DevMode from "@/lib/DevMode";
import RefreshOverlay from "@/components/global/RefreshOverlay";
import Footer from "@/components/home/Footer";
import HorizontalLine from "@/components/global/HorizontalLine";

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

export const metadata: Metadata = {
  title: {
    default: "Punyakrit Singh Makhni | Portfolio",
    template: "%s | Punyakrit Singh Makhni",
  },
  description:
    "Personal portfolio of Punyakrit Singh Makhni showcasing web development projects, skills, and experience. Full-stack developer specializing in modern web technologies.",
  applicationName: "Punyakrit Singh Makhni Portfolio",
  category: "Portfolio",
  viewport: "width=device-width, initial-scale=1",
  keywords: [
    "Punyakrit Singh Makhni",
    "portfolio",
    "web developer",
    "full-stack developer",
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "JavaScript developer",
    "frontend developer",
    "backend developer",
    "UI/UX designer",
    "software engineer",
    "web application developer",
    "mobile app developer",
    "responsive web design",
    "modern web development",
    "React.js",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
    "GraphQL",
    "REST API",
    "Git",
    "GitHub",
    "AWS",
    "Vercel",
    "Netlify",
    "CSS3",
    "HTML5",
    "Tailwind CSS",
    "Bootstrap",
    "Redux",
    "Zustand",
    "Prisma",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "agile development",
    "scrum",
    "test-driven development",
    "unit testing",
    "integration testing",
    "performance optimization",
    "SEO optimization",
    "accessibility",
    "responsive design",
    "progressive web app",
    "PWA",
    "microservices",
    "serverless",
    "cloud computing",
    "database design",
    "API development",
    "web security",
    "authentication",
    "authorization",
    "JWT",
    "OAuth",
    "OpenID Connect",
  ],
  authors: [{ name: "Punyakrit Singh Makhni" }],
  creator: "Punyakrit Singh Makhni",
  publisher: "Punyakrit Singh Makhni",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://punyakrit.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Punyakrit Singh Makhni | Portfolio",
    description:
      "Personal portfolio of Punyakrit Singh Makhni showcasing web development projects, skills, and experience.",
    url: "https://punyakrit.dev",
    siteName: "Punyakrit Singh Makhni Portfolio",
    images: [
      {
        url: "/main.png",
        width: 1200,
        height: 630,
        alt: "Punyakrit Singh Makhni Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Punyakrit Singh Makhni | Portfolio",
    description:
      "Personal portfolio of Punyakrit Singh Makhni showcasing web development projects, skills, and experience.",
    images: ["/main.png"],
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
  other: {
    "google-site-verification": "your-google-verification-code",
    "msvalidate.01": "your-bing-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RefreshOverlay />
          <DevMode />
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
      </body>
    </html>
  );
}
