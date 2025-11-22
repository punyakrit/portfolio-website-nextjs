import { env } from "./env";

interface Project {
    title: string;
    description: string;
    image: string;
    link: string;
    github: string;
    video: string;
    summary: string;
    tech: string[];
    problem: string;
    solution: string;
    whyThis: string;
}
export const projects: Project[] = [
    {
      title: "CodeLens",
      description:
        "AI-powered GitHub code exploration tool with semantic search, automated documentation, and natural language codebase querying.",
      image: `${env.NEXT_PUBLIC_CLOUDFRONT_URL}/codelens.png`,
      link: "https://codelens.punyakrit.dev/",
      github: "https://github.com/punyakrit/codelens",
      video: `${env.NEXT_PUBLIC_CLOUDFRONT_URL}/codelens.mp4`,
      summary:
        "A developer productivity tool that understands large repositories using LLMs, pgvector, and type-safe APIs.",
      tech: [
        "Next.js",
        "TypeScript",
        "PostgreSQL",
        "pgvector",
        "tRPC",
        "Clerk",
        "Redis",
        "GitHub API"
      ],
      problem:
        "Developers spend hours jumping across files, reading unfamiliar code, and manually searching large repositories. Traditional search is keyword-based and doesn’t understand code semantics, relationships, or intent.",
      solution:
        "Built an AI-powered analysis engine that lets developers query codebases in natural language, generate documentation, and perform semantic code search using pgvector embeddings and LLM reasoning.",
      whyThis:
        "I built CodeLens because I constantly deal with large, messy codebases in real-world projects, and context-switching kills productivity. This tool reduces research time from hours to minutes by making the codebase itself ‘talk back.’"
    },
  
    {
      title: "Pulse",
      description:
        "Real-time uptime and performance monitoring platform with distributed regional checks and automated alerting.",
      image: `${env.NEXT_PUBLIC_CLOUDFRONT_URL}/pulse.png`,
      link: "https://pulse.punyakrit.dev",
      github: "https://github.com/punyakrit/pulse",
      video: `${env.NEXT_PUBLIC_CLOUDFRONT_URL}/pulse.mp4`,
      summary:
        "A fast, reliable monitoring tool for tracking uptime, latency, and incidents across global regions.",
      tech: [
        "Next.js",
        "TypeScript",
        "PostgreSQL",
        "Tailwind CSS",
        "Shadcn UI",
        "Framer Motion"
      ],
      problem:
        "Most small teams and indie developers rely on expensive, noisy, or slow monitoring tools. Many send false alerts or miss downtime because checks only run from one region.",
      solution:
        "Designed a distributed monitoring system that runs checks globally, logs real metrics, filters false positives, and sends instant alerts through email/SMS/webhooks — all in a clean dashboard.",
      whyThis:
        "I built Pulse because uptime issues are painful — especially when you hear about them from a user instead of your own system. Pulse gives affordable, accurate monitoring that doesn’t spam developers with useless alerts."
    }
  ];
  