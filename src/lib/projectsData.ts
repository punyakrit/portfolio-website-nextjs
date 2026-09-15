import { env } from "./env";

interface Project {
  title: string;
  description: string;
  image: string;
  link?: string;
  github?: string;
  appStoreLink?: string;
  video: string;
  images?: string[];
  stats?: string[];
  summary: string;
  tech: string[];
  problem: string;
  solution: string;
  whyThis: string;
  category: "web" | "mobile";
}

// Ordered deliberately. RemJobs leads because it is the clearest full-stack
// evidence on the page - scrapers, schema, search, auth, billing and front end
// are all mine, and it is live with numbers anyone can check. FeaturedProjects
// on the homepage shows [0] and [1] in full and blurs [2] as the "show more"
// teaser.
export const projects: Project[] = [
{
  category: "web",
  title: "RemJobs",
  description:
    "A remote job board that reads company career pages and the hiring systems behind them - Greenhouse, Ashby, Lever - the moment they change. A scheduled worker sweeps every source on a 45-minute cycle. Browsing is free; the alert is the product.",
  image: "/remjobs.jpg",
  link: "https://www.remjobs.works/",
  video: "",
  // Three system metrics, no traffic number.
  //
  // The traffic figure was dropped rather than relabelled. It is site visits,
  // not signups, so "users" would read to a hiring manager as adoption; and a
  // visit count is the weakest thing this card can say about the engineering
  // anyway. What is left describes the machine: how many sources it watches,
  // how much it has indexed, and how often it sweeps.
  //
  // Rounded down deliberately - the live counters move every sweep, so an exact
  // figure goes stale the day it ships and invites a reader to diff it against
  // the site. "Roles indexed" is cumulative (expired roles included); the site
  // header shows currently-open roles, which is the smaller number.
  stats: ["4,900+ career pages watched", "100,000+ roles indexed", "45-min sweep cycle"],
  summary:
    "Job aggregator with a scheduled scraper, Postgres full-text search and an email alert engine. Live.",
  tech: [
    "Next.js",
    "TypeScript",
    "Python",
    "FastAPI",
    "PostgreSQL",
    "Supabase",
    "Redis",
    "APScheduler",
    "Clerk",
    "Dodo Payments",
    "Railway",
  ],
  problem:
    "A job board is only worth opening if it is fresher than the company's own careers page. That means continuously re-reading thousands of sources that each break differently, storing the result so it can be searched and filtered in milliseconds, and then deciding - per subscriber, per role - which of tens of thousands of postings is worth an email. Done naively you either miss the window that makes an early application worth anything, or you send noise until people unsubscribe.",
  solution:
    "FastAPI and Supabase Postgres behind an APScheduler worker that sweeps every source on a 45-minute cycle, with a separate priority pass for the sources that move fastest. Search, faceting and salary filters run as Postgres RPCs against generated tsvector columns rather than in application code, so a filtered query stays a single round trip. Alerts match subscribers against new rows through freshness gates and a defined dispatch order, and delivery receipts make sends idempotent so a retry cannot double-email. Upstash Redis handles rate limiting. Twenty-seven migrations carry the schema, and Clerk and Dodo Payments handle auth and plans.",
  whyThis:
    "The architecture decision I would defend in an interview is what is not deployed. The HTTP API exists and runs locally, but nothing calls it in production - the Next.js site reads Supabase directly under row-level security, so the only thing running on Railway is the scraping worker. That takes an always-on service, and every failure mode it owns, off the critical path of every page view. It is also the project where the full stack is genuinely end to end: the scrapers, the schema, the search, the auth, the billing, the programmatic SEO routes and the front end are all mine.",
},
{
  category: "web",
  title: "AI Demo Video Builder",
  description:
    "A multi-model agent pipeline that turns a silent screen recording into a narrated, captioned product demo. Four models across eight phases - one perceives the video, one directs the edit, two render it - with deterministic code holding the seams.",
  // A real frame from the pipeline's own output (storage/keep/
  // 2026-08-22_FINAL_with_avatar.mp4): the screen recording it was given,
  // with the presenter and captions it generated on top. The CloudFront
  // object this used to point at returns 403, so the card rendered its alt
  // text instead of an image.
  image: "/ai-demo-video.jpg",
  github: "https://github.com/punyakrit/Ai-demo-video",
  video: "",
  stats: ["8-phase agent pipeline", "4 models orchestrated", "410 tests passing"],
  summary:
    "Turns a screen recording into a narrated demo. Four models, none of which touch ffmpeg.",
  tech: [
    "Python",
    "FastAPI",
    "Gemini 3.1 Pro",
    "Interfaze",
    "ElevenLabs",
    "HeyGen",
    "Pydantic",
    "ffmpeg",
    "React",
    "TypeScript",
  ],
  problem:
    "Turning a raw screen capture into a product demo means watching it back, deciding what matters, cutting it, writing narration that matches what is on screen, and rendering voice and avatar in sync. Handing all of that to one LLM produces confident nonsense: hallucinated features, drifting timestamps, and ffmpeg commands that fail halfway through a render.",
  solution:
    "I split the system on a hard line - AI makes editorial decisions, deterministic code executes them. Interfaze perceives the video and returns structured observations; a reconciliation phase with zero model calls merges coarse and refined timelines and grades every claim as observed, strongly inferred, or product context, rejecting anything unsupported; Gemini 3.1 Pro then directs across six reasoning stages and emits a validated EditPlan that passes 32 checks before a single frame is rendered. ElevenLabs and HeyGen render, ffmpeg composites, and a verification phase runs deterministic checks with bounded revision loops.",
  whyThis:
    "This is the project that best shows how I think about AI systems. Most of the hard problems were not prompting - they were failure modes you only find by shipping. Per-line narration produced 32.3 Hz of pitch drift between takes, so narration batches into a single take. Per-block avatar rendering made the presenter vanish during planned pauses, so it renders once over the whole narration bed. And no phase is allowed to discover an error mid-ffmpeg. Models are treated as unreliable components inside a system engineered to contain them.",
},
{
  category: "web",
  title: "InfiniteUGC",
  description:
    "A production AI video pipeline that turns a plain script into a finished, TikTok-native ad - prompting, AI creator, voice, captions, and edit handled end to end, with no length cap. Runs on AWS infrastructure I built to render, store, and serve video at scale. Used by 50+ brands across 32+ languages.",
  image: "/infiniteugc.jpg",
  link: "https://www.infiniteugc.com/",
  video: "",
  stats: ["50+ brands served", "32+ languages", "No length cap"],
  summary:
    "Script in, ready-to-post UGC ad out. AWS render pipeline, 50+ brands, 32+ languages.",
  tech: [
    "Next.js",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "LLM Orchestration",
    "Generative Video",
    "TTS",
    "AWS",
  ],
  problem:
    "E-commerce brands need a constant stream of authentic UGC-style video ads, but filming with real creators is slow, expensive, and impossible to scale across languages. Generating them naively produces clips that read as synthetic and stop working after a few seconds of watch time.",
  solution:
    "Built a multi-stage generation pipeline that takes a script and a chosen UGC style and composes the ad end to end - prompt construction, AI creator selection, voice, caption timing, and edit - then built the AWS infrastructure underneath it to render, store, and serve the finished video at scale. Made it hold quality across 32+ languages rather than only English.",
  whyThis:
    "This was my first system where generation quality was the product, not a feature. Two things decided whether it worked: treating the model as one stage in a pipeline with its own failure modes rather than the whole answer, and building infrastructure that could absorb long, expensive render jobs without falling over. Generative video turns out to be as much an infrastructure problem as a model problem.",
},
{
  category: "web",
  title: "CodeLens",
  description:
    "RAG over codebases too large to read. Semantic search, automated documentation, and natural-language querying of a repository using pgvector embeddings and LLM reasoning over real code structure.",
  image: `${env.NEXT_PUBLIC_CLOUDFRONT_URL}/codelens.png`,
  link: "https://codelens.punyakrit.dev/",
  github: "https://github.com/punyakrit/codelens",
  video: `${env.NEXT_PUBLIC_CLOUDFRONT_URL}/codelens.mp4`,
  stats: ["pgvector embeddings", "Natural-language repo queries"],
  summary:
    "Makes an unfamiliar repo answer questions about itself. Structure-aware retrieval over pgvector.",
  tech: [
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "pgvector",
    "RAG",
    "LLM",
    "tRPC",
    "Clerk",
    "Redis",
    "GitHub API",
  ],
  problem:
    "Developers lose hours jumping across files in repositories they did not write. Keyword search does not understand code semantics, relationships, or intent - and naive RAG over source files retrieves plausible-looking chunks that answer the wrong question.",
  solution:
    "Built an ingestion and retrieval pipeline that embeds a repository into pgvector with structure preserved, then lets developers query it in natural language, generate documentation, and perform semantic search where the LLM reasons over retrieved context instead of guessing.",
  whyThis:
    "I built CodeLens because I deal with large, messy codebases constantly and context-switching kills productivity. It is also where I learned that retrieval quality - not model choice - is what decides whether a RAG system is useful or a demo.",
},
{
  category: "web",
  title: "Pulse",
  description:
    "Real-time uptime and performance monitoring with distributed regional checks, false-positive filtering, and automated alerting.",
  image: `${env.NEXT_PUBLIC_CLOUDFRONT_URL}/pulse.png`,
  link: "https://pulse.punyakrit.dev",
  github: "https://github.com/punyakrit/pulse",
  video: `${env.NEXT_PUBLIC_CLOUDFRONT_URL}/pulse.mp4`,
  summary:
    "Uptime monitoring that corroborates across regions before it pages you.",
  tech: [
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "Distributed Systems",
    "Tailwind CSS",
    "Framer Motion",
  ],
  problem:
    "Most small teams rely on monitoring that is expensive, noisy, or single-region - sending false alerts or missing real downtime because checks only run from one place.",
  solution:
    "Designed a distributed monitoring system that runs checks globally, logs real metrics, filters false positives, and sends instant alerts through email, SMS, and webhooks.",
  whyThis:
    "Not an AI project - it is the infrastructure half of the same skill set. Scheduling distributed work, reasoning about partial failure, and deciding when a signal is real are the same problems that show up underneath every agent system I build.",
},
{
  category: "mobile",
  title: "Craft Trading",
  description:
    "A cross-platform paper-trading simulator for the Indian stock market, live on the App Store. Real-time trading, portfolio management, and social sharing.",
  image: `${env.NEXT_PUBLIC_CLOUDFRONT_URL}/ct1.png`,
  appStoreLink: "https://apps.apple.com/us/app/craft-trading/id6759801377",
  video: "",
  images: [
    `${env.NEXT_PUBLIC_CLOUDFRONT_URL}/ct1.png`,
    `${env.NEXT_PUBLIC_CLOUDFRONT_URL}/ct2.png`,
    `${env.NEXT_PUBLIC_CLOUDFRONT_URL}/ct3.png`,
    `${env.NEXT_PUBLIC_CLOUDFRONT_URL}/ct4.png`,
  ],
  stats: ["Live on the App Store"],
  summary:
    "Paper-trading on live Indian market data. React Native, shipped on the App Store.",
  tech: ["React Native", "Expo", "TypeScript", "Node.js", "PostgreSQL", "Redis", "WebSockets", "AWS"],
  problem:
    "Existing paper-trading apps are either too complex for beginners or lack the feedback loop that makes practice stick.",
  solution:
    "Built a mobile-first experience combining intuitive trading with social accountability, real-time price sync over WebSockets, and performance visualisation.",
  whyThis:
    "Proof I take things all the way to shipped. Real-time sync, Redis pub/sub, App Store review, and production users - the unglamorous half of engineering that decides whether a system is real.",
},
];
