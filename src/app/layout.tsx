import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SocialsFooter from "../../components/SocialsFooter";

import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Punyakrit Singh Makhni | Portfolio",
  description:
    "Personal portfolio of Punyakrit Singh Makhni showcasing web development projects, skills, and experience. Full-stack developer specializing in modern web technologies.",
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
        url: "/img.png",
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
    images: ["/img.png"],
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
    icon: "/favicon.ico",
    apple: "/favicon.ico",
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
        src="https://www.googletagmanager.com/gtag/js?id=G-GH95JVWL77"
      />
      <Script id="google-analytics">
        {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-GH95JVWL77');`}
      </Script>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SocialsFooter />
      </body>
    </html>
  );
}
