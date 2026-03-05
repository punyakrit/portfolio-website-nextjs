import { env } from "./env";
import { skills, Skill } from "./skills";
import { getLinkIconByType } from "./linkIcons";

export const getSkillByName = (name: string) => {
    return skills.find(skill => skill.name.toLowerCase() === name.toLowerCase());
};

export type BulletSegment =
    | { type: "text"; value: string }
    | { type: "highlight"; value: string };

export type Bullet = string | BulletSegment[];

interface Experience {
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    blurred?: boolean;
    tech: Skill[];
    bullets: Bullet[];
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
        company: "It's a secret",
        position: "Full Stack Engineer",
        location: "United States (Remote)",
        startDate: "2026-01-01",
        endDate: "Present",
        blurred: true,
        tech: [
            getSkillByName("Next.js"),
            getSkillByName("React"),
            getSkillByName("TypeScript"),
            getSkillByName("Node.js"),
            getSkillByName("Python"),
            getSkillByName("Express"),
            getSkillByName("FastAPI"),
            getSkillByName("GraphQL"),
            getSkillByName("PostgreSQL"),
            getSkillByName("Redis"),
            getSkillByName("Prisma"),
            getSkillByName("Docker"),
            getSkillByName("AWS"),
            getSkillByName("Kubernetes"),
            getSkillByName("Tailwind CSS"),
            getSkillByName("Vercel"),
            getSkillByName("Git"),
            getSkillByName("GitHub"),
        ].filter((skill): skill is Skill => skill !== undefined),
        bullets: [
            [
                { type: "text", value: "Own end-to-end " },
                { type: "highlight", value: "full-stack" },
                { type: "text", value: " delivery: " },
                { type: "highlight", value: "Next.js" },
                { type: "text", value: ", " },
                { type: "highlight", value: "Node.js" },
                { type: "text", value: ", APIs, and " },
                { type: "highlight", value: "AI integration" },
                { type: "text", value: " - from design to production, shipping at scale." }
            ],
            [
                { type: "text", value: "Drive " },
                { type: "highlight", value: "devops" },
                { type: "text", value: " and infra: CI/CD, " },
                { type: "highlight", value: "Docker" },
                { type: "text", value: ", " },
                { type: "highlight", value: "Kubernetes" },
                { type: "text", value: ", " },
                { type: "highlight", value: "AWS" },
                { type: "text", value: ", and observability so systems stay reliable and fast." }
            ],
            [
                { type: "text", value: "Ship features using " },
                { type: "highlight", value: "multiple AI models" },
                { type: "text", value: " and " },
                { type: "highlight", value: "vector embeddings" },
                { type: "text", value: " for search, recommendations, and intelligent workflows." }
            ]
        ],
        links: {
            image: "https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png",
            companyUrl: {
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
    },
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
            [
                { type: "text", value: "Full-stack development for an " },
                { type: "highlight", value: "AI ads platform (Muze)" },
                { type: "text", value: ": built product UI, " },
                { type: "highlight", value: "APIs" },
                { type: "text", value: ", and integrations that power " },
                { type: "highlight", value: "AI-driven campaign creation" },
                { type: "text", value: ", creative generation, and auto-optimization for " },
                { type: "highlight", value: "Meta & Google Ads" },
                { type: "text", value: "." }
            ],
            [
                { type: "text", value: "Owned " },
                { type: "highlight", value: "devops and infra" },
                { type: "text", value: ": " },
                { type: "highlight", value: "CI/CD" },
                { type: "text", value: ", " },
                { type: "highlight", value: "Docker" },
                { type: "text", value: "-based deployments, and cloud (" },
                { type: "highlight", value: "EC2, CloudFront, S3" },
                { type: "text", value: ") to keep the platform reliable and scalable for " },
                { type: "highlight", value: "24/7 ad optimization" },
                { type: "text", value: "." }
            ]
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
            [
                { type: "text", value: "Built " },
                { type: "highlight", value: "React Native (Expo)" },
                { type: "text", value: " apps with real-time features using " },
                { type: "highlight", value: "Redis pub/sub" },
                { type: "text", value: " and " },
                { type: "highlight", value: "WebSockets" },
                { type: "text", value: " for live updates and sync." }
            ],
            [
                { type: "text", value: "Web applications with " },
                { type: "highlight", value: "AI integration" },
                { type: "text", value: ", " },
                { type: "highlight", value: "backend" },
                { type: "text", value: " APIs, " },
                { type: "highlight", value: "hosting" },
                { type: "text", value: ", and " },
                { type: "highlight", value: "devops" },
                { type: "text", value: " - " },
                { type: "highlight", value: "Docker" },
                { type: "text", value: ", CI/CD, Vercel, and cloud (EC2, CloudFront) for deployment and observability." }
            ],
            [
                { type: "text", value: "Partnered with " },
                { type: "highlight", value: "startup founders" },
                { type: "text", value: " across varied products, shipping solutions that " },
                { type: "highlight", value: "reach scale" },
                { type: "text", value: "." }
            ]
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
