import Projects from "@/components/pow/Projects";
import type { Metadata } from "next";
import { BreadcrumbJsonLd, PortfolioJsonLd } from "@/lib/seo-jsonld";
import { SITE_URL } from "@/lib/seo";
import { projects } from "@/lib/projectsData";

function getSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const metadata: Metadata = {
  title: "Web Development Projects & Case Studies | Production-Grade Apps",
  description:
    "Explore real-world web development projects built by Punyakrit Singh Makhni. Case studies featuring Next.js, React, TypeScript applications including CodeLens (AI code explorer), Pulse (uptime monitoring), and more. See proof of work from a top freelance developer.",
  keywords: [
    "Web Development Projects",
    "Developer Portfolio Projects",
    "Production-Grade Web Apps",
    "Next.js Projects",
    "React Case Studies",
    "Full-Stack Developer Portfolio",
    "Real-World Web Applications",
    "Open Source Projects",
    "SaaS Products",
    "Freelance Developer Work",
    "CodeLens AI",
    "Pulse Monitoring",
    "TypeScript Applications",
  ],
  alternates: {
    canonical: "/pow",
  },
  openGraph: {
    title: "Web Development Projects & Case Studies | Punyakrit Singh Makhni",
    description:
      "Real-world web development projects and case studies. Production-grade applications built with Next.js, React, TypeScript by a top freelance developer.",
    url: `${SITE_URL}/pow`,
    type: "website",
  },
};

function ProjectsPage() {
  const portfolioProjects = projects.map((project) => ({
    title: project.title,
    description: project.description,
    url: `${SITE_URL}/pow/${getSlug(project.title)}`,
    image: project.image,
    tech: project.tech,
  }));

  return (
    <div className="px-2 md:px-8 md:my-32 my-24">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Projects", url: `${SITE_URL}/pow` },
        ]}
      />
      <PortfolioJsonLd projects={portfolioProjects} />

      <header className="px-4 sm:px-6 md:px-0 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          Web Development Projects & Case Studies
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">
          Real production-grade applications I've built - from AI-powered developer tools to uptime monitoring platforms. 
          Each project demonstrates end-to-end development: problem definition, architecture, implementation, and deployment.
        </p>
      </header>

      <Projects showAll={true} />
    </div>
  );
}

export default ProjectsPage;
