import { skills, type Skill } from "./skills";
import { getLinkIconByType } from "./linkIcons";

export const getSkillByName = (name: string) => {
    return skills.find(skill => skill.name.toLowerCase() === name.toLowerCase());
};

export type BulletSegment =
    | { type: "text"; value: string }
    | { type: "highlight"; value: string };

export type Bullet = string | BulletSegment[];

interface Role {
    /**
     * Lowercase, as the document UI renders it. Also the React key in both
     * consumers, so it stays exactly as written.
     */
    company: string;
    /** Title-case name for the expanded experience UI. Falls back to `company`. */
    displayName?: string;
    /** Company homepage. Empty string if there isn't one worth linking. */
    url: string;
    position: string;
    /** One short line. This is all the document view renders. */
    oneLiner: string;
    location: string;
    startDate: string;
    endDate: string;
    blurred?: boolean;
    hideWorkingBadge?: boolean;
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

export const experience: Readonly<Role[]> = [
    {
        company: "gradly.us",
        displayName: "Gradly.us",
        url: "https://gradly.us",
        position: "Software Engineer",
        oneLiner:
            "Built the onboarding flow, the customer dashboard and the internal tools the team runs on.",
        location: "Remote",
        startDate: "2026-03-01",
        endDate: "2026-07-01",
        blurred: false,
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
                { type: "text", value: "Built the " },
                { type: "highlight", value: "user onboarding flow" },
                { type: "text", value: " and " },
                { type: "highlight", value: "customer dashboard" },
                { type: "text", value: " in Next.js for an insurance and onboarding platform for international students in the US." }
            ],
            [
                { type: "text", value: "Shipped the " },
                { type: "highlight", value: "internal tools and admin workflows" },
                { type: "text", value: " the team runs day to day - the half of a product nobody demos, and the half that decides whether it can actually be operated." }
            ],
            [
                { type: "text", value: "Ran in production for " },
                { type: "highlight", value: "15,000+ international students" },
                { type: "text", value: " getting insured in the US." }
            ]
        ],
        links: {
            image: "/gradly-logo.png",
            companyUrl: {
                url: "https://gradly.us",
                icon: getLinkIconByType("companyUrl")?.icon
            },
            githubUrl: {
                url: "",
                icon: undefined
            },
            linkedinUrl: {
                url: "https://www.linkedin.com/company/gradly",
                icon: getLinkIconByType("linkedinUrl")?.icon
            }
        }
    },
    {
        company: "thefocus.ai",
        displayName: "TheFocus.AI",
        url: "https://thefocus.ai",
        position: "Software Engineer (Contract)",
        oneLiner:
            "Rebuilt an invite-only professional network across three layers - infra, auth and rendering - and cut load times ~80%.",
        location: "Remote",
        startDate: "2025-12-01",
        endDate: "2026-03-01",
        blurred: false,
        tech: [
            getSkillByName("Next.js"),
            getSkillByName("React"),
            getSkillByName("TypeScript"),
            getSkillByName("Node.js"),
            getSkillByName("Python"),
            getSkillByName("PostgreSQL"),
            getSkillByName("Docker"),
        ].filter((skill): skill is Skill => skill !== undefined),
        bullets: [
            [
                { type: "text", value: "Rebuilt an " },
                { type: "highlight", value: "invite-only professional network" },
                { type: "text", value: " where members refer peers and showcase their work - admin dashboard, " },
                { type: "highlight", value: "AI features" },
                { type: "text", value: " and a drag-and-drop UI." }
            ],
            [
                { type: "text", value: "Cut load times " },
                { type: "highlight", value: "~80%" },
                { type: "text", value: " by overhauling " },
                { type: "highlight", value: "infrastructure, authentication and rendering" },
                { type: "text", value: " - the slowness was spread across three layers, so fixing any one of them alone would not have moved the number." }
            ]
        ],
        links: {
            image: "/thefocus-logo.png",
            companyUrl: {
                url: "https://thefocus.ai",
                icon: getLinkIconByType("companyUrl")?.icon
            },
            githubUrl: {
                url: "https://github.com/The-Focus-AI",
                icon: getLinkIconByType("githubUrl")?.icon
            },
            linkedinUrl: {
                url: "https://www.linkedin.com/company/thefocusai",
                icon: getLinkIconByType("linkedinUrl")?.icon
            }
        }
    },
    {
        // Muze (muzecmo.com) - AI marketing platform, formerly shown as AgentProd.
        company: "muze",
        displayName: "Muze",
        url: "https://muzecmo.com/",
        position: "Software Engineer",
        oneLiner:
            "Built Muze CMO from scratch - reads live Meta and Google Ads data, scores creative before spend, then generates the next ad.",
        location: "Remote",
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
            getSkillByName("PostgreSQL"),
            getSkillByName("Redis"),
            getSkillByName("FastAPI"),
            getSkillByName("Supabase"),
            getSkillByName("GitHub"),
            getSkillByName("Vercel")
        ].filter((skill): skill is Skill => skill !== undefined),
        bullets: [
            [
                { type: "text", value: "Built the platform " },
                { type: "highlight", value: "from scratch" },
                { type: "text", value: ": connects " },
                { type: "highlight", value: "Meta and Google Ads" },
                { type: "text", value: ", analyses live campaigns and competitors, scores creative " },
                { type: "highlight", value: "before spend" },
                { type: "text", value: ", then generates and publishes the next image or video ad." }
            ],
            [
                { type: "text", value: "Cut API latency " },
                { type: "highlight", value: "~40%" },
                { type: "text", value: ", which is what turned live campaign analysis from a loading screen into something usable during a working session." }
            ],
            [
                { type: "text", value: "Overhauled " },
                { type: "highlight", value: "CI/CD and Docker-based deploys" },
                { type: "text", value: " on " },
                { type: "highlight", value: "AWS (EC2, CloudFront, S3)" },
                { type: "text", value: " - shipping went from " },
                { type: "highlight", value: "days to hours" },
                { type: "text", value: "." }
            ]
        ],
        links: {
            image: "/muze-logo.png",
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
        // Own product work that overlaps with employment - kept as ongoing.
        company: "independent projects",
        displayName: "Independent Projects",
        url: "https://github.com/punyakrit",
        position: "Founder & Software Engineer",
        oneLiner:
            "RemJobs, an AI video pipeline and an App Store app - backend, real-time sync, AI integration and the deploys on each.",
        location: "Remote",
        startDate: "2023-02-01",
        endDate: "Present",
        // Job hunting: no green "Working" badge implying current employment.
        hideWorkingBadge: true,
        tech: [
            getSkillByName("Next.js"),
            getSkillByName("React"),
            getSkillByName("React Native"),
            getSkillByName("Expo"),
            getSkillByName("TypeScript"),
            getSkillByName("Tailwind CSS"),
            getSkillByName("FastAPI"),
            getSkillByName("PostgreSQL"),
            getSkillByName("Redis"),
            getSkillByName("Supabase"),
            getSkillByName("Docker"),
            getSkillByName("AWS"),
            getSkillByName("Vercel"),
            getSkillByName("Clerk"),
            getSkillByName("GitHub")
        ].filter((skill): skill is Skill => skill !== undefined),
        bullets: [
            [
                { type: "text", value: "Built " },
                { type: "highlight", value: "RemJobs" },
                { type: "text", value: ", a remote job platform: career-page scrapers on a scheduled worker, " },
                { type: "highlight", value: "Postgres full-text search" },
                { type: "text", value: ", email alerts and billing. The HTTP API is deliberately " },
                { type: "highlight", value: "not deployed" },
                { type: "text", value: " - the site reads Supabase directly under row-level security, so the only always-on service is the scraper." }
            ],
            [
                { type: "text", value: "Built AI Demo Video Builder, an " },
                { type: "highlight", value: "8-phase agent pipeline" },
                { type: "text", value: " orchestrating " },
                { type: "highlight", value: "4 models" },
                { type: "text", value: " to turn a silent screen recording into a narrated, captioned product demo - " },
                { type: "highlight", value: "410 tests" },
                { type: "text", value: " passing." }
            ],
            [
                { type: "text", value: "Built " },
                { type: "highlight", value: "InfiniteUGC" },
                { type: "text", value: ", an AI video pipeline on " },
                { type: "highlight", value: "AWS" },
                { type: "text", value: " infrastructure I built to render, store and serve video at scale - used by " },
                { type: "highlight", value: "50+ brands" },
                { type: "text", value: " across " },
                { type: "highlight", value: "32+ languages" },
                { type: "text", value: "." }
            ],
            [
                { type: "text", value: "Shipped " },
                { type: "highlight", value: "Craft Trading" },
                { type: "text", value: ", a " },
                { type: "highlight", value: "React Native" },
                { type: "text", value: " paper-trading simulator for the " },
                { type: "highlight", value: "Indian stock market" },
                { type: "text", value: ", live on the " },
                { type: "highlight", value: "App Store" },
                { type: "text", value: ", with real-time sync over " },
                { type: "highlight", value: "Redis pub/sub" },
                { type: "text", value: "." }
            ]
        ],
        links: {
            image: "/independent-logo.png",
            // No separate company site: GitHub is the canonical link, below.
            companyUrl: {
                url: "",
                icon: undefined
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
