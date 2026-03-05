import { env } from "./env";

interface Project {
  title: string;
  description: string;
  image: string;
  link?: string;
  github?: string;
  video: string;
  images?: string[];
  summary: string;
  tech: string[];
  problem: string;
  solution: string;
  whyThis: string;
  category: "web" | "mobile";
}
export const projects: Project[] = [{
  category: "web",
  title: "Kill Switch",
  description: "A self-destruct private chat application built with Next.js and WebSockets. Messages automatically delete after a fixed time, ensuring privacy and ephemerality.",
  github: "https://github.com/punyakrit/kill-switch",
  image: `${env.NEXT_PUBLIC_CLOUDFRONT_URL}/kill.png`,
  link: "https://kill-switch.punyakrit.dev/",
  video: `${env.NEXT_PUBLIC_CLOUDFRONT_URL}/kill-switch.mov`,
  summary: "A self-destruct private chat application built with Next.js and WebSockets. Messages automatically delete after a fixed time, ensuring privacy and ephemerality.",
  tech: [
    "Next.js",
    "TypeScript",
    "Redis",
    "Tailwind CSS",
    "Supabase"
  ],
  problem: "Most people use chat applications that are not private and not ephemeral. This means that messages are not deleted after a certain time and are not private.",
  solution: "I built a self-destruct private chat application that deletes messages after a fixed time, ensuring privacy and ephemerality.",
  whyThis: "I built Kill Switch because I wanted to create a private and ephemeral chat application that is not available to anyone else.",
}
  ,
{
  category: "web",
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
  category: "web",
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
    "Designed a distributed monitoring system that runs checks globally, logs real metrics, filters false positives, and sends instant alerts through email/SMS/webhooks - all in a clean dashboard.",
  whyThis:
    "I built Pulse because uptime issues are painful - especially when you hear about them from a user instead of your own system. Pulse gives affordable, accurate monitoring that doesn’t spam developers with useless alerts."
},
{
  category: "mobile",
  title: "Craft Trading",
  description: "A cross-platform mobile paper trading simulator application built with React Native and Expo. Features real-time trading, portfolio management, and social sharing.",
  image: `${env.NEXT_PUBLIC_CLOUDFRONT_URL}/ct1.png`,
  // link: "https://expo.dev/@punyakrit/fittrack",
  // github: "https://github.com/punyakrit/fittrack",
  video: "",
  images: [
    `${env.NEXT_PUBLIC_CLOUDFRONT_URL}/ct1.png`,
    `${env.NEXT_PUBLIC_CLOUDFRONT_URL}/ct2.png`,
    `${env.NEXT_PUBLIC_CLOUDFRONT_URL}/ct3.png`,
    `${env.NEXT_PUBLIC_CLOUDFRONT_URL}/ct4.png`,
    
  ],
  summary: "Comprehensive paper trading simulator mobile app with social features and real-time metrics.",
  tech: ["React Native", "Expo", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS", "Redis", "AWS"],
  problem: "Existing paper trading apps are either too complex or lack social motivation features. Users struggle to practice trading effectively without a real-time trading simulator.",
  solution: "Built a mobile-first experience that combines intuitive trading with social accountability. Users can share trades, analyze their performance, and visualize progress effortlessly.",
  whyThis: "I wanted to build a mobile-first experience that combines intuitive trading with social accountability. Users can practice trading, and visualize progress effortlessly."
}
];
