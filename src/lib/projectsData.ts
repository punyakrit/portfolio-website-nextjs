import { env } from "./env";

interface Project {
  title: string;
  description: string;
  image: string;
  /** Natural pixel size of `image`, so it lays out at its own shape before it loads. */
  imageSize?: [number, number];
  link?: string;
  github?: string;
  appStoreLink?: string;
  video: string;
  images?: string[];
  stats?: string[];
  /** Four proof points for the homepage card. No tiles = compact row. */
  tiles?: { value: string; label: string }[];
  summary: string;
  tech: string[];
  problem: string;
  solution: string;
  whyThis: string;
  category: "web" | "mobile";
}

// Ordered deliberately. RemJobs leads because it is the clearest full-stack
// evidence on the page - data pipeline, search, map, auth, billing and the MCP
// server are all mine, and it is live with numbers anyone can check.
export const projects: Project[] = [
{
  category: "web",
  title: "RemJobs",
  description:
    "A live map of 250K+ startups and 400K+ open jobs, read straight from their hiring systems. Members see who founded each company and how to reach them, and an MCP server puts all of it inside Claude, ChatGPT and Cursor.",
  image: "/remjobs.jpg",
  imageSize: [1280, 720],
  link: "https://www.remjobs.works/",
  video: "",
  stats: ["400K+ live jobs", "250K+ startups", "MCP server with OAuth", "Paying users"],
  tiles: [
    { value: "400K+", label: "live jobs" },
    { value: "250K+", label: "startups" },
    { value: "MCP", label: "server with OAuth" },
    { value: "Paying", label: "users since Oct" },
  ],
  summary:
    "A live map of 250K+ startups and 400K+ jobs, searchable from Claude and ChatGPT. Built alone.",
  tech: [
    "Next.js",
    "TypeScript",
    "Cloudflare Workers",
    "Durable Objects",
    "MCP",
    "Python",
    "PostgreSQL",
    "Supabase",
    "Clerk",
    "Dodo Payments",
    "MapLibre",
  ],
  problem:
    "Startup jobs are spread across dozens of hiring systems that each work differently, and a job search is only useful if it is current. RemJobs has to read every company's public board on a schedule, work out where each job really is and who can apply, and answer a filtered search across 400K+ jobs fast enough to feel instant, on a budget one person can carry.",
  solution:
    "A scheduled Cloudflare container reads each company's public board, with one reader per hiring system, then classifies every job by role, location and remote scope. Results are published to KV as shards under new versioned keys. A Durable Object holds the decoded index in memory and a one-minute ping keeps it warm, so a filtered search comes back in 8-16 ms. Clerk handles sign-in and Dodo Payments handles paid plans. The MCP server is stateless: each request is one JSON-RPC message with a Clerk OAuth token, so any Cloudflare location can answer it, and plan limits are checked on every call.",
  whyThis:
    "The decision I would defend in an interview is how the index gets published. On Oct 29 a half-finished publish left the site reading a corrupted index. Now nothing a reader uses is ever overwritten: new shards land under new keys, and the version key moves last, only after every earlier write worked. A crashed run writes nothing, and the next run resumes from the last good snapshot. It is also the project where the full stack is genuinely end to end: the readers, the index, the map, the auth, the billing and the MCP server are all mine.",
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
  imageSize: [1100, 560],
  github: "https://github.com/punyakrit/Ai-demo-video",
  video: "",
  stats: ["8-phase agent pipeline", "4 models orchestrated", "32 checks before render", "410 tests passing"],
  tiles: [
    { value: "4", label: "models" },
    { value: "8", label: "phases" },
    { value: "32", label: "checks before render" },
    { value: "410", label: "tests" },
  ],
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
  imageSize: [1280, 853],
  link: "https://www.infiniteugc.com/",
  video: "",
  stats: ["50+ brands served", "32+ languages", "No length cap"],
  tiles: [
    { value: "50+", label: "brands" },
    { value: "32+", label: "languages" },
    { value: "AWS", label: "render pipeline" },
    { value: "No", label: "length cap" },
  ],
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
  // Cropped: the full capture shows the demo's placeholder user counts.
  image: "/work/codelens.jpg",
  imageSize: [1320, 522],
  link: "https://codelens.punyakrit.dev/",
  github: "https://github.com/punyakrit/codelens",
  video: "",
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
  // Cropped: the full capture shows the demo's placeholder trust badges.
  image: "/work/pulse.jpg",
  imageSize: [1300, 600],
  link: "https://pulse.punyakrit.dev",
  github: "https://github.com/punyakrit/pulse",
  video: "",
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
  imageSize: [1284, 2778],
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
