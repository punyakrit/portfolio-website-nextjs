import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Professional Experience | Full-Stack Developer with Startup & Freelance Background",
  description:
    "View the professional work experience of Punyakrit Singh Makhni. 2+ years as a full-stack developer working with US-based startups, building production systems, and delivering freelance projects. Expertise in Next.js, React, TypeScript, FastAPI, and cloud infrastructure.",
  keywords: [
    "Full-Stack Developer Experience",
    "Freelance Developer Resume",
    "Startup Developer",
    "Remote Developer Experience",
    "Next.js Developer Work History",
    "React Developer Portfolio",
    "Professional Web Developer",
    "Software Engineer Experience",
    "India-based Developer",
    "Remote Full-Stack Engineer",
  ],
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Professional Experience | Punyakrit Singh Makhni",
    description:
      "Full-stack developer with 2+ years experience building production systems for startups. Specialized in Next.js, React, TypeScript, and cloud infrastructure.",
    url: `${SITE_URL}/work`,
    type: "profile",
  },
};

function WorkLayout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export default WorkLayout;
