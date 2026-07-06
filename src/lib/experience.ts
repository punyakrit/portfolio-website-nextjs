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

export const experience: Readonly<Experience[]> = [
    {
        company: "Gradly.us",
        position: "Software Engineer",
        location: "United States (Remote)",
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
                { type: "text", value: "Built the user " },
                { type: "highlight", value: "onboarding flows" },
                { type: "text", value: " and customer " },
                { type: "highlight", value: "dashboard" },
                { type: "text", value: " in " },
                { type: "highlight", value: "Next.js" },
                { type: "text", value: " for Gradly, an insurance & onboarding platform for international students in the US, serving " },
                { type: "highlight", value: "15,000+ users" },
                { type: "text", value: "." }
            ],
            [
                { type: "text", value: "Shipped " },
                { type: "highlight", value: "internal tools" },
                { type: "text", value: " and admin workflows that run the team's day-to-day operations." }
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
        company: "TheFocus.AI",
        position: "Software Engineer (Contract)",
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
                { type: "text", value: " where members refer peers and showcase their work, with an " },
                { type: "highlight", value: "admin dashboard" },
                { type: "text", value: ", " },
                { type: "highlight", value: "AI features" },
                { type: "text", value: ", and a " },
                { type: "highlight", value: "drag-and-drop" },
                { type: "text", value: " UI." }
            ],
            [
                { type: "text", value: "Made the app " },
                { type: "highlight", value: "~80–90% faster" },
                { type: "text", value: " by overhauling its " },
                { type: "highlight", value: "infrastructure" },
                { type: "text", value: ", " },
                { type: "highlight", value: "authentication" },
                { type: "text", value: ", and rendering." }
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
        company: "Muze",
        position: "Software Engineer",
        location: "Remote (United States)",
        // Muze (muzecmo.com) - AI marketing platform; company was formerly shown as AgentProd.
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
                { type: "text", value: "Built " },
                { type: "highlight", value: "Muze" },
                { type: "text", value: ", an " },
                { type: "highlight", value: "AI marketing platform" },
                { type: "text", value: ", " },
                { type: "highlight", value: "from scratch" },
                { type: "text", value: ": connect " },
                { type: "highlight", value: "Meta & Google Ads" },
                { type: "text", value: ", auto-analyze live campaigns and competitors, then generate and publish " },
                { type: "highlight", value: "AI image & video ads" },
                { type: "text", value: "." }
            ],
            [
                { type: "text", value: "Cut " },
                { type: "highlight", value: "API latency ~40%" },
                { type: "text", value: ", speeding up campaign analysis and creative generation." }
            ],
            [
                { type: "text", value: "Shipped product UI and AI ad flows that drove a " },
                { type: "highlight", value: "~25% increase in user engagement" },
                { type: "text", value: "." }
            ],
            [
                { type: "text", value: "Overhauled " },
                { type: "highlight", value: "CI/CD" },
                { type: "text", value: " and " },
                { type: "highlight", value: "Docker" },
                { type: "text", value: "-based deploys on " },
                { type: "highlight", value: "AWS (EC2, CloudFront, S3)" },
                { type: "text", value: ", cutting " },
                { type: "highlight", value: "deployment time from days to hours" },
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
        company: "Independent Projects",
        position: "Founder & Software Engineer",
        location: "Remote",
        // Independent client & product work that overlaps with employment - kept as ongoing
        startDate: "2023-02-01",
        endDate: "Present",
        hideWorkingBadge: true,
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
                { type: "text", value: "Shipped client products end-to-end, including " },
                { type: "highlight", value: "Craft Trading" },
                { type: "text", value: " - a " },
                { type: "highlight", value: "React Native (Expo)" },
                { type: "text", value: " paper-trading app for the " },
                { type: "highlight", value: "Indian stock market" },
                { type: "text", value: ", live on the " },
                { type: "highlight", value: "App Store" },
                { type: "text", value: "." }
            ],
            [
                { type: "text", value: "Built " },
                { type: "highlight", value: "InfiniteUGC" },
                { type: "text", value: ", an " },
                { type: "highlight", value: "AI UGC" },
                { type: "text", value: " platform that turns scripts into TikTok-native video ads, used by " },
                { type: "highlight", value: "50+ brands" },
                { type: "text", value: " across " },
                { type: "highlight", value: "32+ languages" },
                { type: "text", value: "." }
            ],
            [
                { type: "text", value: "Owned the full stack on each: " },
                { type: "highlight", value: "real-time sync" },
                { type: "text", value: " (Redis pub/sub, WebSockets), " },
                { type: "highlight", value: "AI integration" },
                { type: "text", value: ", backend APIs, and " },
                { type: "highlight", value: "devops" },
                { type: "text", value: " (Docker, CI/CD, Vercel, EC2/CloudFront)." }
            ]
        ],
        links: {
            image: "/independent-logo.png",
            companyUrl: {
                // point to your portfolio as the canonical place for independent work / projects
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
