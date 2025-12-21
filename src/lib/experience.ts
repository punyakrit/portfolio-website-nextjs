import { env } from "./env";
import { skills, Skill } from "./skills";
import { getLinkIconByType } from "./linkIcons";

export const getSkillByName = (name: string) => {
    return skills.find(skill => skill.name.toLowerCase() === name.toLowerCase());
};

interface Experience {
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    tech: Skill[];
    bullets: string[];
    links: {
        image: string;
        companyUrl: {
            url: string;
            icon: React.ComponentType<{ className?: string }> | undefined;
        };
        githubUrl: {
            url: string;
            icon: React.ComponentType<{ className?: string }> | undefined;
        };
        linkedinUrl: {
            url: string;
            icon: React.ComponentType<{ className?: string }> | undefined;
        };
    };
}

export const experience: Readonly<Experience[]> = [
    {
        company: "AgentProd",
        position: "Full Stack Engineer",
        location: "Remote (United States)",
        // AgentProd - >2 years experience per your profile; using an ongoing/present end date
        startDate: "2024-06-01",
        endDate: "2025-10-01",
        tech: [
            getSkillByName("Next.js"),
            getSkillByName("React"),
            getSkillByName("TypeScript"),
            getSkillByName("Tailwind CSS"),
            getSkillByName("Node.js"),
            getSkillByName("Docker"),
            getSkillByName("AWS"),
            getSkillByName("EC2"),
            getSkillByName("PostgreSQL"),
            getSkillByName("Redis"),
            getSkillByName("FastAPI"),
            getSkillByName("Supabase"),
            getSkillByName("GitHub"),
            getSkillByName("Vercel")
        ].filter((skill): skill is Skill => skill !== undefined),
        bullets: [
            "Owned and shipped the frontend and full-stack infrastructure for fast-moving product work - component system, routing, builds, and performance optimizations across multiple product areas.",
            "Led a multi-phase refactor toward component-driven architecture and stricter typing, which improved developer velocity and reduced regressions in production.",
            "Built resilient API integrations and performant data-fetching patterns (incremental static rendering / SWR-like caching) to reduce UI load times and error surface.",
            "Implemented CI/CD and Docker-based pipelines for repeatable deployments; collaborated on infra improvements (EC2, CloudFront, S3) to improve reliability at scale.",
            "Established a lightweight design system, accessibility baseline, and QA checklist that improved UX consistency across product flows."
        ],
        links: {
            image: `${env.NEXT_PUBLIC_CLOUDFRONT_URL}/agentprod_logo.jpeg`,
            companyUrl: {
                url: "https://muzecmo.com/",
                icon: getLinkIconByType("companyUrl")?.icon
            },
            githubUrl: {
                url: "https://github.com/Agent-Prod",
                icon: getLinkIconByType("githubUrl")?.icon
            },
            linkedinUrl: {
                url: "https://www.linkedin.com/company/agentprod/",
                icon: getLinkIconByType("linkedinUrl")?.icon
            }
        }
    },

    {
        company: "Independent / Freelance",
        position: "Full Stack Engineer - Founder / Contractor",
        location: "Remote",
        // Freelance work that overlaps with employment - kept as ongoing
        startDate: "2023-02-01",
        endDate: "Present",
        tech: [
            getSkillByName("Next.js"),
            getSkillByName("React"),
            getSkillByName("TypeScript"),
            getSkillByName("Tailwind CSS"),
            getSkillByName("Supabase"),
            getSkillByName("FastAPI"),
            getSkillByName("PostgreSQL"),
            getSkillByName("Docker"),
            getSkillByName("Vercel"),
            getSkillByName("Stripe"),
            getSkillByName("Clerk"),
            getSkillByName("GitHub")
        ].filter((skill): skill is Skill => skill !== undefined),
        bullets: [
            "Built and shipped multiple independent products and MVPs (Pulse, Codelens, SchemaPilot) from 0→1 - product design, frontend, API, and deployments.",
            "Designed and implemented user-facing dashboards, auth flows, billing integrations, and data models using Next.js + Supabase / FastAPI + Postgres.",
            "Handled end-to-end deployment and infra: containerized services with Docker, CI/CD deployments to Vercel/EC2, CloudFront for static assets, and basic observability.",
            "Worked directly with early users to iterate on product-market fit, instrumented analytics for usage-driven prioritization, and shipped frequent small releases to validate ideas."
        ],
        links: {
            image: `${env.NEXT_PUBLIC_CLOUDFRONT_URL}/freelance.png`,
            companyUrl: {
                // point to your portfolio as the canonical place for freelance work / projects
                url: "https://www.punyakrit.dev/",
                icon: getLinkIconByType("companyUrl")?.icon
            },
            githubUrl: {
                url: "https://github.com/punyakrit",
                icon: getLinkIconByType("githubUrl")?.icon
            },
            linkedinUrl: {
                url: "https://www.linkedin.com/in/punyakrit-singh-makhni/",
                icon: getLinkIconByType("linkedinUrl")?.icon
            }
        }
    }
];
