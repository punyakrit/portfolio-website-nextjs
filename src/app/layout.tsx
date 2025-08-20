import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SocialsFooter from "../../components/SocialsFooter";
  
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
  description: "Personal portfolio of Punyakrit Singh Makhni showcasing web development projects, skills, and experience. Full-stack developer specializing in modern web technologies.",
  keywords: ["Punyakrit Singh Makhni", "portfolio", "web developer", "full-stack", "React", "Next.js", "TypeScript", "JavaScript"],
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
    description: "Personal portfolio of Punyakrit Singh Makhni showcasing web development projects, skills, and experience.",
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
    description: "Personal portfolio of Punyakrit Singh Makhni showcasing web development projects, skills, and experience.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SocialsFooter />
      </body>
    </html>
  );
}
