/**
 * Extended Programmatic SEO Data
 *
 * Additional data for scaling to 100,000+ pages:
 * - Skill + Location combinations
 * - Use-case specific pages
 * - More granular locations (US states, EU countries, more cities)
 * - Project-type pages
 */

import type { LocationData, SkillData, IndustryData, RoleData, ServiceData } from "./types";

// ============================================================================
// ADDITIONAL US CITIES - More granular coverage
// ============================================================================

export const US_CITIES_EXTENDED: LocationData[] = [
  // Tech Hubs
  { slug: "silicon-valley", city: "Silicon Valley", state: "California", country: "United States", countryCode: "US", region: "North America", population: "large", isTechHub: true },
  { slug: "palo-alto", city: "Palo Alto", state: "California", country: "United States", countryCode: "US", region: "North America", population: "medium", isTechHub: true },
  { slug: "san-jose", city: "San Jose", state: "California", country: "United States", countryCode: "US", region: "North America", population: "large", isTechHub: true },
  { slug: "mountain-view", city: "Mountain View", state: "California", country: "United States", countryCode: "US", region: "North America", population: "medium", isTechHub: true },
  { slug: "san-diego", city: "San Diego", state: "California", country: "United States", countryCode: "US", region: "North America", population: "large", isTechHub: true },
  { slug: "portland", city: "Portland", state: "Oregon", country: "United States", countryCode: "US", region: "North America", population: "large", isTechHub: true },
  { slug: "atlanta", city: "Atlanta", state: "Georgia", country: "United States", countryCode: "US", region: "North America", population: "large", isTechHub: true },
  { slug: "dallas", city: "Dallas", state: "Texas", country: "United States", countryCode: "US", region: "North America", population: "large", isTechHub: true },
  { slug: "houston", city: "Houston", state: "Texas", country: "United States", countryCode: "US", region: "North America", population: "metro" },
  { slug: "phoenix", city: "Phoenix", state: "Arizona", country: "United States", countryCode: "US", region: "North America", population: "large", isTechHub: true },
  { slug: "philadelphia", city: "Philadelphia", state: "Pennsylvania", country: "United States", countryCode: "US", region: "North America", population: "large" },
  { slug: "washington-dc", city: "Washington DC", state: "District of Columbia", country: "United States", countryCode: "US", region: "North America", population: "large", isCapital: true, isTechHub: true },
  { slug: "raleigh", city: "Raleigh", state: "North Carolina", country: "United States", countryCode: "US", region: "North America", population: "medium", isTechHub: true },
  { slug: "nashville", city: "Nashville", state: "Tennessee", country: "United States", countryCode: "US", region: "North America", population: "medium", isTechHub: true },
  { slug: "salt-lake-city", city: "Salt Lake City", state: "Utah", country: "United States", countryCode: "US", region: "North America", population: "medium", isTechHub: true },
  { slug: "minneapolis", city: "Minneapolis", state: "Minnesota", country: "United States", countryCode: "US", region: "North America", population: "large" },
  { slug: "detroit", city: "Detroit", state: "Michigan", country: "United States", countryCode: "US", region: "North America", population: "large" },
  { slug: "pittsburgh", city: "Pittsburgh", state: "Pennsylvania", country: "United States", countryCode: "US", region: "North America", population: "medium", isTechHub: true },
  { slug: "charlotte", city: "Charlotte", state: "North Carolina", country: "United States", countryCode: "US", region: "North America", population: "large" },
  { slug: "tampa", city: "Tampa", state: "Florida", country: "United States", countryCode: "US", region: "North America", population: "large" },
  { slug: "orlando", city: "Orlando", state: "Florida", country: "United States", countryCode: "US", region: "North America", population: "large" },
  { slug: "las-vegas", city: "Las Vegas", state: "Nevada", country: "United States", countryCode: "US", region: "North America", population: "large" },
  { slug: "brooklyn", city: "Brooklyn", state: "New York", country: "United States", countryCode: "US", region: "North America", population: "large", isTechHub: true },
  { slug: "manhattan", city: "Manhattan", state: "New York", country: "United States", countryCode: "US", region: "North America", population: "large", isTechHub: true },
];

// ============================================================================
// US STATES - For broader geographic targeting
// ============================================================================

export const US_STATES: LocationData[] = [
  { slug: "california", city: "California", country: "United States", countryCode: "US", region: "North America", population: "metro", isTechHub: true },
  { slug: "texas", city: "Texas", country: "United States", countryCode: "US", region: "North America", population: "metro", isTechHub: true },
  { slug: "new-york-state", city: "New York State", country: "United States", countryCode: "US", region: "North America", population: "metro", isTechHub: true },
  { slug: "florida", city: "Florida", country: "United States", countryCode: "US", region: "North America", population: "metro" },
  { slug: "washington-state", city: "Washington State", country: "United States", countryCode: "US", region: "North America", population: "large", isTechHub: true },
  { slug: "massachusetts", city: "Massachusetts", country: "United States", countryCode: "US", region: "North America", population: "large", isTechHub: true },
  { slug: "colorado", city: "Colorado", country: "United States", countryCode: "US", region: "North America", population: "large", isTechHub: true },
  { slug: "georgia", city: "Georgia", country: "United States", countryCode: "US", region: "North America", population: "large", isTechHub: true },
  { slug: "illinois", city: "Illinois", country: "United States", countryCode: "US", region: "North America", population: "large" },
  { slug: "north-carolina", city: "North Carolina", country: "United States", countryCode: "US", region: "North America", population: "large", isTechHub: true },
  { slug: "pennsylvania", city: "Pennsylvania", country: "United States", countryCode: "US", region: "North America", population: "large" },
  { slug: "arizona", city: "Arizona", country: "United States", countryCode: "US", region: "North America", population: "large", isTechHub: true },
  { slug: "oregon", city: "Oregon", country: "United States", countryCode: "US", region: "North America", population: "medium", isTechHub: true },
  { slug: "utah", city: "Utah", country: "United States", countryCode: "US", region: "North America", population: "medium", isTechHub: true },
  { slug: "virginia", city: "Virginia", country: "United States", countryCode: "US", region: "North America", population: "large", isTechHub: true },
  { slug: "maryland", city: "Maryland", country: "United States", countryCode: "US", region: "North America", population: "medium", isTechHub: true },
  { slug: "michigan", city: "Michigan", country: "United States", countryCode: "US", region: "North America", population: "large" },
  { slug: "ohio", city: "Ohio", country: "United States", countryCode: "US", region: "North America", population: "large" },
  { slug: "new-jersey", city: "New Jersey", country: "United States", countryCode: "US", region: "North America", population: "large" },
  { slug: "tennessee", city: "Tennessee", country: "United States", countryCode: "US", region: "North America", population: "medium", isTechHub: true },
];

// ============================================================================
// EUROPEAN COUNTRIES AND CITIES - Extended
// ============================================================================

export const EUROPE_EXTENDED: LocationData[] = [
  // More European countries
  { slug: "switzerland", city: "Switzerland", country: "Switzerland", countryCode: "CH", region: "Europe", population: "large", isTechHub: true },
  { slug: "zurich", city: "Zurich", country: "Switzerland", countryCode: "CH", region: "Europe", population: "medium", isTechHub: true },
  { slug: "ireland", city: "Ireland", country: "Ireland", countryCode: "IE", region: "Europe", population: "medium", isTechHub: true },
  { slug: "dublin", city: "Dublin", country: "Ireland", countryCode: "IE", region: "Europe", population: "medium", isCapital: true, isTechHub: true },
  { slug: "sweden", city: "Sweden", country: "Sweden", countryCode: "SE", region: "Europe", population: "large", isTechHub: true },
  { slug: "stockholm", city: "Stockholm", country: "Sweden", countryCode: "SE", region: "Europe", population: "medium", isCapital: true, isTechHub: true },
  { slug: "denmark", city: "Denmark", country: "Denmark", countryCode: "DK", region: "Europe", population: "medium", isTechHub: true },
  { slug: "copenhagen", city: "Copenhagen", country: "Denmark", countryCode: "DK", region: "Europe", population: "medium", isCapital: true, isTechHub: true },
  { slug: "norway", city: "Norway", country: "Norway", countryCode: "NO", region: "Europe", population: "medium" },
  { slug: "oslo", city: "Oslo", country: "Norway", countryCode: "NO", region: "Europe", population: "medium", isCapital: true },
  { slug: "finland", city: "Finland", country: "Finland", countryCode: "FI", region: "Europe", population: "medium", isTechHub: true },
  { slug: "helsinki", city: "Helsinki", country: "Finland", countryCode: "FI", region: "Europe", population: "medium", isCapital: true, isTechHub: true },
  { slug: "spain", city: "Spain", country: "Spain", countryCode: "ES", region: "Europe", population: "large" },
  { slug: "madrid", city: "Madrid", country: "Spain", countryCode: "ES", region: "Europe", population: "large", isCapital: true, isTechHub: true },
  { slug: "barcelona", city: "Barcelona", country: "Spain", countryCode: "ES", region: "Europe", population: "large", isTechHub: true },
  { slug: "italy", city: "Italy", country: "Italy", countryCode: "IT", region: "Europe", population: "large" },
  { slug: "milan", city: "Milan", country: "Italy", countryCode: "IT", region: "Europe", population: "large", isTechHub: true },
  { slug: "rome", city: "Rome", country: "Italy", countryCode: "IT", region: "Europe", population: "large", isCapital: true },
  { slug: "portugal", city: "Portugal", country: "Portugal", countryCode: "PT", region: "Europe", population: "medium", isTechHub: true },
  { slug: "lisbon", city: "Lisbon", country: "Portugal", countryCode: "PT", region: "Europe", population: "medium", isCapital: true, isTechHub: true },
  { slug: "belgium", city: "Belgium", country: "Belgium", countryCode: "BE", region: "Europe", population: "medium" },
  { slug: "brussels", city: "Brussels", country: "Belgium", countryCode: "BE", region: "Europe", population: "medium", isCapital: true },
  { slug: "austria", city: "Austria", country: "Austria", countryCode: "AT", region: "Europe", population: "medium" },
  { slug: "vienna", city: "Vienna", country: "Austria", countryCode: "AT", region: "Europe", population: "medium", isCapital: true, isTechHub: true },
  { slug: "poland", city: "Poland", country: "Poland", countryCode: "PL", region: "Europe", population: "large", isTechHub: true },
  { slug: "warsaw", city: "Warsaw", country: "Poland", countryCode: "PL", region: "Europe", population: "large", isCapital: true, isTechHub: true },
  { slug: "krakow", city: "Krakow", country: "Poland", countryCode: "PL", region: "Europe", population: "medium", isTechHub: true },
  { slug: "czech-republic", city: "Czech Republic", country: "Czech Republic", countryCode: "CZ", region: "Europe", population: "medium", isTechHub: true },
  { slug: "prague", city: "Prague", country: "Czech Republic", countryCode: "CZ", region: "Europe", population: "medium", isCapital: true, isTechHub: true },
  { slug: "munich", city: "Munich", country: "Germany", countryCode: "DE", region: "Europe", population: "large", isTechHub: true },
  { slug: "frankfurt", city: "Frankfurt", country: "Germany", countryCode: "DE", region: "Europe", population: "large", isTechHub: true },
  { slug: "hamburg", city: "Hamburg", country: "Germany", countryCode: "DE", region: "Europe", population: "large" },
];

// ============================================================================
// ASIA-PACIFIC EXTENDED
// ============================================================================

export const APAC_EXTENDED: LocationData[] = [
  { slug: "hong-kong", city: "Hong Kong", country: "Hong Kong", countryCode: "HK", region: "East Asia", population: "large", isTechHub: true },
  { slug: "south-korea", city: "South Korea", country: "South Korea", countryCode: "KR", region: "East Asia", population: "large", isTechHub: true },
  { slug: "seoul", city: "Seoul", country: "South Korea", countryCode: "KR", region: "East Asia", population: "metro", isCapital: true, isTechHub: true },
  { slug: "taiwan", city: "Taiwan", country: "Taiwan", countryCode: "TW", region: "East Asia", population: "large", isTechHub: true },
  { slug: "taipei", city: "Taipei", country: "Taiwan", countryCode: "TW", region: "East Asia", population: "large", isCapital: true, isTechHub: true },
  { slug: "indonesia", city: "Indonesia", country: "Indonesia", countryCode: "ID", region: "Southeast Asia", population: "metro" },
  { slug: "jakarta", city: "Jakarta", country: "Indonesia", countryCode: "ID", region: "Southeast Asia", population: "metro", isCapital: true, isTechHub: true },
  { slug: "vietnam", city: "Vietnam", country: "Vietnam", countryCode: "VN", region: "Southeast Asia", population: "large", isTechHub: true },
  { slug: "ho-chi-minh", city: "Ho Chi Minh City", country: "Vietnam", countryCode: "VN", region: "Southeast Asia", population: "large", isTechHub: true },
  { slug: "hanoi", city: "Hanoi", country: "Vietnam", countryCode: "VN", region: "Southeast Asia", population: "large", isCapital: true },
  { slug: "thailand", city: "Thailand", country: "Thailand", countryCode: "TH", region: "Southeast Asia", population: "large" },
  { slug: "bangkok", city: "Bangkok", country: "Thailand", countryCode: "TH", region: "Southeast Asia", population: "large", isCapital: true, isTechHub: true },
  { slug: "malaysia", city: "Malaysia", country: "Malaysia", countryCode: "MY", region: "Southeast Asia", population: "large" },
  { slug: "kuala-lumpur", city: "Kuala Lumpur", country: "Malaysia", countryCode: "MY", region: "Southeast Asia", population: "large", isCapital: true, isTechHub: true },
  { slug: "philippines", city: "Philippines", country: "Philippines", countryCode: "PH", region: "Southeast Asia", population: "large" },
  { slug: "manila", city: "Manila", country: "Philippines", countryCode: "PH", region: "Southeast Asia", population: "large", isCapital: true },
  { slug: "new-zealand", city: "New Zealand", country: "New Zealand", countryCode: "NZ", region: "Oceania", population: "medium" },
  { slug: "auckland", city: "Auckland", country: "New Zealand", countryCode: "NZ", region: "Oceania", population: "medium", isTechHub: true },
  { slug: "brisbane", city: "Brisbane", state: "Queensland", country: "Australia", countryCode: "AU", region: "Oceania", population: "large", isTechHub: true },
  { slug: "perth", city: "Perth", state: "Western Australia", country: "Australia", countryCode: "AU", region: "Oceania", population: "large" },
];

// ============================================================================
// MIDDLE EAST EXTENDED
// ============================================================================

export const MIDDLE_EAST_EXTENDED: LocationData[] = [
  { slug: "abu-dhabi", city: "Abu Dhabi", country: "United Arab Emirates", countryCode: "AE", region: "Middle East", population: "large", isCapital: true },
  { slug: "qatar", city: "Qatar", country: "Qatar", countryCode: "QA", region: "Middle East", population: "medium" },
  { slug: "doha", city: "Doha", country: "Qatar", countryCode: "QA", region: "Middle East", population: "medium", isCapital: true },
  { slug: "kuwait", city: "Kuwait", country: "Kuwait", countryCode: "KW", region: "Middle East", population: "medium" },
  { slug: "bahrain", city: "Bahrain", country: "Bahrain", countryCode: "BH", region: "Middle East", population: "small" },
  { slug: "oman", city: "Oman", country: "Oman", countryCode: "OM", region: "Middle East", population: "medium" },
  { slug: "riyadh", city: "Riyadh", country: "Saudi Arabia", countryCode: "SA", region: "Middle East", population: "large", isCapital: true },
  { slug: "jeddah", city: "Jeddah", country: "Saudi Arabia", countryCode: "SA", region: "Middle East", population: "large" },
  { slug: "israel", city: "Israel", country: "Israel", countryCode: "IL", region: "Middle East", population: "medium", isTechHub: true },
  { slug: "tel-aviv", city: "Tel Aviv", country: "Israel", countryCode: "IL", region: "Middle East", population: "medium", isTechHub: true },
];

// ============================================================================
// USE CASES - Specific project types people search for
// ============================================================================

export interface UseCaseData {
  slug: string;
  name: string;
  searchTerms: string[];
  description: string;
  deliverables: string[];
  technologies: string[];
  timeline: string;
  idealFor: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export const USE_CASES: UseCaseData[] = [
  {
    slug: "mvp-development",
    name: "MVP Development",
    searchTerms: ["mvp developer", "build mvp", "mvp development services", "hire mvp developer", "startup mvp"],
    description: "Rapid minimum viable product development for startups and entrepreneurs. Go from idea to working product in weeks, not months.",
    deliverables: ["Working web application", "User authentication", "Core features", "Admin dashboard", "Deployment to production", "Documentation"],
    technologies: ["Next.js", "React", "TypeScript", "PostgreSQL", "Supabase", "Vercel"],
    timeline: "4-8 weeks",
    idealFor: ["Startups", "Entrepreneurs", "Product validation", "Fundraising demos", "Market testing"],
    faqs: [
      { question: "How long does MVP development take?", answer: "Typically 4-8 weeks depending on complexity. Simple MVPs can be done in 3-4 weeks, while more complex ones may take 8-12 weeks." },
      { question: "What's included in MVP development?", answer: "Core features, user authentication, basic admin panel, responsive design, and production deployment. We focus on validating your main hypothesis." },
      { question: "Can you help with product strategy?", answer: "Yes, I help prioritize features for MVP scope based on your target users and business goals. Less is more for MVPs." },
    ]
  },
  {
    slug: "saas-development",
    name: "SaaS Application Development",
    searchTerms: ["saas developer", "build saas", "saas development", "hire saas developer", "saas platform"],
    description: "Build scalable Software-as-a-Service applications with multi-tenancy, subscription billing, and enterprise features.",
    deliverables: ["Multi-tenant architecture", "User/team management", "Subscription billing", "Admin dashboard", "API access", "Analytics"],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Redis", "AWS"],
    timeline: "8-16 weeks",
    idealFor: ["B2B products", "Subscription businesses", "Platform companies", "Enterprise software"],
    faqs: [
      { question: "Do you handle subscription billing?", answer: "Yes, I integrate Stripe for subscription management, handling plans, upgrades, downgrades, and usage-based billing." },
      { question: "How do you handle multi-tenancy?", answer: "I implement proper data isolation using PostgreSQL schemas or tenant IDs, ensuring each customer's data is secure and separate." },
      { question: "Can you build enterprise features?", answer: "Yes, including SSO (SAML/OAuth), audit logs, role-based permissions, and API rate limiting." },
    ]
  },
  {
    slug: "website-development",
    name: "Website Development",
    searchTerms: ["website developer", "build website", "website development", "hire website developer", "web developer"],
    description: "Modern, fast, SEO-optimized websites that look great and convert visitors into customers.",
    deliverables: ["Responsive website", "SEO optimization", "Contact forms", "CMS integration", "Analytics setup", "Performance optimization"],
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Vercel"],
    timeline: "2-4 weeks",
    idealFor: ["Businesses", "Agencies", "Portfolios", "Landing pages", "Corporate websites"],
    faqs: [
      { question: "Will my website be mobile-friendly?", answer: "Absolutely. All websites are built mobile-first and tested across devices. They look great on phones, tablets, and desktops." },
      { question: "How do you handle SEO?", answer: "I implement technical SEO best practices: proper meta tags, schema markup, fast loading, sitemap, and semantic HTML." },
      { question: "Can I update the content myself?", answer: "Yes, I can integrate a headless CMS like Sanity or Contentful so you can easily update content without touching code." },
    ]
  },
  {
    slug: "web-app-development",
    name: "Web Application Development",
    searchTerms: ["web app developer", "build web app", "web application development", "custom web app", "hire web app developer"],
    description: "Custom web applications with complex business logic, real-time features, and enterprise-grade reliability.",
    deliverables: ["Full-stack application", "Database design", "API development", "User authentication", "Real-time features", "Deployment"],
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis", "WebSockets"],
    timeline: "6-12 weeks",
    idealFor: ["Internal tools", "Customer portals", "Dashboards", "Complex workflows", "Data-intensive apps"],
    faqs: [
      { question: "What's the difference between a website and web app?", answer: "Web apps have complex interactivity, user accounts, data persistence, and business logic. Websites are primarily informational." },
      { question: "Can you handle complex business requirements?", answer: "Yes, I specialize in translating complex business logic into clean, maintainable code. I've built workflow automation, analytics dashboards, and more." },
      { question: "Do you build real-time features?", answer: "Yes, I implement real-time updates using WebSockets for features like live notifications, chat, and collaborative editing." },
    ]
  },
  {
    slug: "api-development",
    name: "API Development",
    searchTerms: ["api developer", "build api", "api development", "rest api developer", "backend developer"],
    description: "Robust, well-documented APIs that power your applications and integrations.",
    deliverables: ["REST or GraphQL API", "Authentication", "Rate limiting", "API documentation", "Testing suite", "Deployment"],
    technologies: ["Node.js", "Express", "FastAPI", "PostgreSQL", "Redis", "Docker"],
    timeline: "3-6 weeks",
    idealFor: ["Mobile app backends", "Third-party integrations", "Microservices", "Data services"],
    faqs: [
      { question: "REST or GraphQL?", answer: "It depends on your use case. REST is simpler and widely supported. GraphQL is better for complex data relationships and mobile apps. I'll recommend what fits best." },
      { question: "How do you handle API documentation?", answer: "I generate OpenAPI/Swagger documentation automatically, making it easy for other developers to integrate with your API." },
      { question: "What about security?", answer: "I implement industry-standard security: OAuth/JWT authentication, rate limiting, input validation, and CORS policies." },
    ]
  },
  {
    slug: "ecommerce-development",
    name: "E-commerce Development",
    searchTerms: ["ecommerce developer", "build online store", "ecommerce development", "shopify developer", "online store developer"],
    description: "High-converting e-commerce platforms with seamless checkout, inventory management, and analytics.",
    deliverables: ["Product catalog", "Shopping cart", "Checkout flow", "Payment integration", "Inventory management", "Order dashboard"],
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Redis", "Shopify API"],
    timeline: "6-10 weeks",
    idealFor: ["Online stores", "D2C brands", "Marketplaces", "Subscription boxes"],
    faqs: [
      { question: "Do you build custom or use platforms?", answer: "Both. I can build fully custom e-commerce or integrate with Shopify. Custom gives more control, Shopify is faster to launch." },
      { question: "How do you handle payments?", answer: "I integrate Stripe for secure payment processing, supporting cards, Apple Pay, Google Pay, and international payments." },
      { question: "Can you integrate with my inventory system?", answer: "Yes, I can build integrations with popular inventory and ERP systems, or create a custom inventory solution." },
    ]
  },
  {
    slug: "dashboard-development",
    name: "Dashboard & Analytics Development",
    searchTerms: ["dashboard developer", "build dashboard", "analytics dashboard", "data dashboard developer", "admin panel"],
    description: "Beautiful, interactive dashboards that turn your data into actionable insights.",
    deliverables: ["Data visualization", "Real-time updates", "Filtering and search", "Export functionality", "User permissions", "Mobile responsive"],
    technologies: ["Next.js", "React", "TypeScript", "PostgreSQL", "Charts.js", "Recharts"],
    timeline: "4-8 weeks",
    idealFor: ["Business intelligence", "SaaS products", "Internal tools", "Client portals", "Monitoring systems"],
    faqs: [
      { question: "What charting libraries do you use?", answer: "Typically Recharts or Chart.js for React applications. For complex visualizations, I use D3.js or custom solutions." },
      { question: "Can dashboards update in real-time?", answer: "Yes, I implement real-time data updates using WebSockets or polling, depending on your requirements." },
      { question: "How do you handle large datasets?", answer: "I implement pagination, virtualization, and server-side filtering to keep dashboards fast even with millions of rows." },
    ]
  },
  {
    slug: "ai-integration",
    name: "AI & LLM Integration",
    searchTerms: ["ai developer", "llm integration", "chatgpt integration", "ai integration developer", "openai developer"],
    description: "Integrate AI capabilities into your applications—chatbots, content generation, semantic search, and more.",
    deliverables: ["LLM integration", "Prompt engineering", "Vector embeddings", "RAG systems", "AI-powered features", "Usage tracking"],
    technologies: ["OpenAI", "Anthropic", "pgvector", "Pinecone", "LangChain", "TypeScript"],
    timeline: "3-6 weeks",
    idealFor: ["AI-powered products", "Chatbots", "Content tools", "Semantic search", "Knowledge bases"],
    faqs: [
      { question: "Which AI models do you work with?", answer: "I primarily work with OpenAI (GPT-4) and Anthropic (Claude). I can also integrate open-source models for specific use cases." },
      { question: "Can you build RAG systems?", answer: "Yes, I build Retrieval-Augmented Generation systems using vector databases like pgvector or Pinecone for knowledge-grounded AI responses." },
      { question: "How do you handle AI costs?", answer: "I implement caching, prompt optimization, and usage tracking to control costs. I also help you choose the right model for each task." },
    ]
  },
  {
    slug: "uptime-monitoring",
    name: "Uptime & Monitoring Solutions",
    searchTerms: ["monitoring developer", "uptime monitoring", "website monitoring", "server monitoring developer"],
    description: "Real-time monitoring solutions to keep your applications running smoothly with instant alerts.",
    deliverables: ["Uptime monitoring", "Performance metrics", "Alert system", "Status page", "Incident management", "Historical analytics"],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis", "WebSockets", "Email/SMS APIs"],
    timeline: "4-6 weeks",
    idealFor: ["SaaS companies", "DevOps teams", "Agencies", "E-commerce", "Critical applications"],
    faqs: [
      { question: "What do you monitor?", answer: "HTTP endpoints, response times, SSL certificates, and custom health checks. I can also integrate with your application for deeper metrics." },
      { question: "How do you handle alerts?", answer: "I implement multi-channel alerting (email, SMS, Slack, webhooks) with configurable thresholds and escalation policies." },
      { question: "Can you build a public status page?", answer: "Yes, I can create public or private status pages that show uptime history and current status to your users or team." },
    ]
  },
  {
    slug: "code-review-refactoring",
    name: "Code Review & Refactoring",
    searchTerms: ["code review service", "code refactoring", "legacy code modernization", "technical debt", "code audit"],
    description: "Improve your existing codebase with expert code review, refactoring, and modernization.",
    deliverables: ["Code audit report", "Refactoring plan", "Performance improvements", "TypeScript migration", "Testing setup", "Documentation"],
    technologies: ["TypeScript", "React", "Next.js", "Node.js", "Testing frameworks"],
    timeline: "1-4 weeks",
    idealFor: ["Legacy codebases", "Pre-acquisition due diligence", "Team scaling", "Performance issues", "Technical debt"],
    faqs: [
      { question: "What do you look for in a code review?", answer: "Architecture patterns, code quality, security vulnerabilities, performance issues, testing coverage, and maintainability." },
      { question: "Can you help migrate to TypeScript?", answer: "Yes, I've migrated multiple JavaScript codebases to TypeScript incrementally without breaking existing functionality." },
      { question: "How do you prioritize refactoring work?", answer: "I identify high-impact, low-risk changes first. We focus on the most critical paths and gradually improve the rest." },
    ]
  },
];

// ============================================================================
// COMBINATION PAGES - Skill + Location
// ============================================================================

export interface CombinationPageData {
  type: "skill-location" | "role-location" | "skill-industry";
  skillSlug?: string;
  roleSlug?: string;
  locationSlug?: string;
  industrySlug?: string;
  slug: string;
}

// Top skills for combinations
const TOP_SKILLS_FOR_COMBOS = [
  "react", "nextjs", "typescript", "nodejs", "python",
  "fullstack-development", "frontend-development", "backend-development",
  "postgresql", "api-development"
];

// Top locations for combinations (prioritize US/UK/EU)
const TOP_LOCATIONS_FOR_COMBOS = [
  "usa", "new-york", "san-francisco", "los-angeles", "seattle", "austin", "boston",
  "uk", "london", "manchester",
  "canada", "toronto", "vancouver",
  "australia", "sydney", "melbourne",
  "germany", "berlin",
  "remote", "worldwide"
];

export function generateAllCombinationPages(): CombinationPageData[] {
  const combinations: CombinationPageData[] = [];

  // Skill + Location combinations
  for (const skill of TOP_SKILLS_FOR_COMBOS) {
    for (const location of TOP_LOCATIONS_FOR_COMBOS) {
      combinations.push({
        type: "skill-location",
        skillSlug: skill,
        locationSlug: location,
        slug: `${skill}-developer-${location}`,
      });
    }
  }

  return combinations;
}

// ============================================================================
// CONSOLIDATED EXPORT OF ALL EXTENDED LOCATIONS
// ============================================================================

export const ALL_EXTENDED_LOCATIONS: LocationData[] = [
  ...US_CITIES_EXTENDED,
  ...US_STATES,
  ...EUROPE_EXTENDED,
  ...APAC_EXTENDED,
  ...MIDDLE_EAST_EXTENDED,
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getUseCaseBySlug(slug: string): UseCaseData | undefined {
  return USE_CASES.find(u => u.slug === slug);
}

export function getTotalExtendedPages(): number {
  const combos = generateAllCombinationPages();
  return ALL_EXTENDED_LOCATIONS.length + USE_CASES.length + combos.length;
}
