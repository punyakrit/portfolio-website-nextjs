/**
 * Programmatic SEO Data
 *
 * Comprehensive data for generating 100,000+ unique, intent-matched SEO pages.
 * Each entry is designed to create unique, valuable content without duplication.
 */

import type { LocationData, SkillData, IndustryData, RoleData, ServiceData } from "./types";
import {
  ALL_EXTENDED_LOCATIONS,
  US_CITIES_EXTENDED,
  US_STATES,
  EUROPE_EXTENDED,
  APAC_EXTENDED,
  MIDDLE_EAST_EXTENDED,
} from "./extended-data";

// ============================================================================
// LOCATIONS - Cities, States, Countries for "Freelancer in [Location]" pages
// ============================================================================

export const INDIA_CITIES: LocationData[] = [
  // Metro Cities (Tier 1)
  { slug: "mumbai", city: "Mumbai", state: "Maharashtra", country: "India", countryCode: "IN", region: "South Asia", population: "metro", isTechHub: true },
  { slug: "delhi", city: "Delhi", state: "Delhi NCR", country: "India", countryCode: "IN", region: "South Asia", population: "metro", isCapital: true, isTechHub: true },
  { slug: "bangalore", city: "Bangalore", state: "Karnataka", country: "India", countryCode: "IN", region: "South Asia", population: "metro", isTechHub: true },
  { slug: "bengaluru", city: "Bengaluru", state: "Karnataka", country: "India", countryCode: "IN", region: "South Asia", population: "metro", isTechHub: true },
  { slug: "hyderabad", city: "Hyderabad", state: "Telangana", country: "India", countryCode: "IN", region: "South Asia", population: "metro", isTechHub: true },
  { slug: "chennai", city: "Chennai", state: "Tamil Nadu", country: "India", countryCode: "IN", region: "South Asia", population: "metro", isTechHub: true },
  { slug: "kolkata", city: "Kolkata", state: "West Bengal", country: "India", countryCode: "IN", region: "South Asia", population: "metro", isTechHub: true },
  { slug: "pune", city: "Pune", state: "Maharashtra", country: "India", countryCode: "IN", region: "South Asia", population: "metro", isTechHub: true },

  // Tier 2 Cities
  { slug: "ahmedabad", city: "Ahmedabad", state: "Gujarat", country: "India", countryCode: "IN", region: "South Asia", population: "large", isTechHub: true },
  { slug: "jaipur", city: "Jaipur", state: "Rajasthan", country: "India", countryCode: "IN", region: "South Asia", population: "large" },
  { slug: "lucknow", city: "Lucknow", state: "Uttar Pradesh", country: "India", countryCode: "IN", region: "South Asia", population: "large" },
  { slug: "chandigarh", city: "Chandigarh", state: "Punjab", country: "India", countryCode: "IN", region: "South Asia", population: "medium", isTechHub: true },
  { slug: "noida", city: "Noida", state: "Uttar Pradesh", country: "India", countryCode: "IN", region: "South Asia", population: "large", isTechHub: true },
  { slug: "gurgaon", city: "Gurgaon", state: "Haryana", country: "India", countryCode: "IN", region: "South Asia", population: "large", isTechHub: true },
  { slug: "gurugram", city: "Gurugram", state: "Haryana", country: "India", countryCode: "IN", region: "South Asia", population: "large", isTechHub: true },
  { slug: "kochi", city: "Kochi", state: "Kerala", country: "India", countryCode: "IN", region: "South Asia", population: "medium", isTechHub: true },
  { slug: "thiruvananthapuram", city: "Thiruvananthapuram", state: "Kerala", country: "India", countryCode: "IN", region: "South Asia", population: "medium", isTechHub: true },
  { slug: "indore", city: "Indore", state: "Madhya Pradesh", country: "India", countryCode: "IN", region: "South Asia", population: "large" },
  { slug: "bhopal", city: "Bhopal", state: "Madhya Pradesh", country: "India", countryCode: "IN", region: "South Asia", population: "large" },
  { slug: "nagpur", city: "Nagpur", state: "Maharashtra", country: "India", countryCode: "IN", region: "South Asia", population: "large" },
  { slug: "coimbatore", city: "Coimbatore", state: "Tamil Nadu", country: "India", countryCode: "IN", region: "South Asia", population: "medium", isTechHub: true },
  { slug: "visakhapatnam", city: "Visakhapatnam", state: "Andhra Pradesh", country: "India", countryCode: "IN", region: "South Asia", population: "medium" },
  { slug: "surat", city: "Surat", state: "Gujarat", country: "India", countryCode: "IN", region: "South Asia", population: "large" },
  { slug: "vadodara", city: "Vadodara", state: "Gujarat", country: "India", countryCode: "IN", region: "South Asia", population: "medium" },
  { slug: "patna", city: "Patna", state: "Bihar", country: "India", countryCode: "IN", region: "South Asia", population: "large" },
  { slug: "kanpur", city: "Kanpur", state: "Uttar Pradesh", country: "India", countryCode: "IN", region: "South Asia", population: "large" },
  { slug: "mysore", city: "Mysore", state: "Karnataka", country: "India", countryCode: "IN", region: "South Asia", population: "medium" },
  { slug: "mangalore", city: "Mangalore", state: "Karnataka", country: "India", countryCode: "IN", region: "South Asia", population: "medium" },
  { slug: "trichy", city: "Tiruchirappalli", state: "Tamil Nadu", country: "India", countryCode: "IN", region: "South Asia", population: "medium" },
  { slug: "madurai", city: "Madurai", state: "Tamil Nadu", country: "India", countryCode: "IN", region: "South Asia", population: "medium" },
];

export const INDIA_STATES: LocationData[] = [
  { slug: "maharashtra", city: "Maharashtra", country: "India", countryCode: "IN", region: "South Asia", population: "metro" },
  { slug: "karnataka", city: "Karnataka", country: "India", countryCode: "IN", region: "South Asia", population: "metro" },
  { slug: "tamil-nadu", city: "Tamil Nadu", country: "India", countryCode: "IN", region: "South Asia", population: "metro" },
  { slug: "telangana", city: "Telangana", country: "India", countryCode: "IN", region: "South Asia", population: "large" },
  { slug: "kerala", city: "Kerala", country: "India", countryCode: "IN", region: "South Asia", population: "large" },
  { slug: "gujarat", city: "Gujarat", country: "India", countryCode: "IN", region: "South Asia", population: "large" },
  { slug: "rajasthan", city: "Rajasthan", country: "India", countryCode: "IN", region: "South Asia", population: "large" },
  { slug: "west-bengal", city: "West Bengal", country: "India", countryCode: "IN", region: "South Asia", population: "large" },
  { slug: "uttar-pradesh", city: "Uttar Pradesh", country: "India", countryCode: "IN", region: "South Asia", population: "metro" },
  { slug: "madhya-pradesh", city: "Madhya Pradesh", country: "India", countryCode: "IN", region: "South Asia", population: "large" },
  { slug: "punjab", city: "Punjab", country: "India", countryCode: "IN", region: "South Asia", population: "medium" },
  { slug: "haryana", city: "Haryana", country: "India", countryCode: "IN", region: "South Asia", population: "medium" },
  { slug: "andhra-pradesh", city: "Andhra Pradesh", country: "India", countryCode: "IN", region: "South Asia", population: "large" },
  { slug: "odisha", city: "Odisha", country: "India", countryCode: "IN", region: "South Asia", population: "medium" },
  { slug: "bihar", city: "Bihar", country: "India", countryCode: "IN", region: "South Asia", population: "large" },
];

export const INTERNATIONAL_LOCATIONS: LocationData[] = [
  // United States
  { slug: "usa", city: "United States", country: "United States", countryCode: "US", region: "North America", population: "metro" },
  { slug: "new-york", city: "New York", state: "New York", country: "United States", countryCode: "US", region: "North America", population: "metro", isTechHub: true },
  { slug: "san-francisco", city: "San Francisco", state: "California", country: "United States", countryCode: "US", region: "North America", population: "large", isTechHub: true },
  { slug: "los-angeles", city: "Los Angeles", state: "California", country: "United States", countryCode: "US", region: "North America", population: "metro", isTechHub: true },
  { slug: "seattle", city: "Seattle", state: "Washington", country: "United States", countryCode: "US", region: "North America", population: "large", isTechHub: true },
  { slug: "austin", city: "Austin", state: "Texas", country: "United States", countryCode: "US", region: "North America", population: "large", isTechHub: true },
  { slug: "chicago", city: "Chicago", state: "Illinois", country: "United States", countryCode: "US", region: "North America", population: "metro" },
  { slug: "boston", city: "Boston", state: "Massachusetts", country: "United States", countryCode: "US", region: "North America", population: "large", isTechHub: true },
  { slug: "denver", city: "Denver", state: "Colorado", country: "United States", countryCode: "US", region: "North America", population: "large", isTechHub: true },
  { slug: "miami", city: "Miami", state: "Florida", country: "United States", countryCode: "US", region: "North America", population: "large" },

  // United Kingdom
  { slug: "uk", city: "United Kingdom", country: "United Kingdom", countryCode: "GB", region: "Europe", population: "metro" },
  { slug: "london", city: "London", country: "United Kingdom", countryCode: "GB", region: "Europe", population: "metro", isCapital: true, isTechHub: true },
  { slug: "manchester", city: "Manchester", country: "United Kingdom", countryCode: "GB", region: "Europe", population: "large", isTechHub: true },
  { slug: "birmingham", city: "Birmingham", country: "United Kingdom", countryCode: "GB", region: "Europe", population: "large" },
  { slug: "edinburgh", city: "Edinburgh", country: "United Kingdom", countryCode: "GB", region: "Europe", population: "medium", isTechHub: true },

  // Canada
  { slug: "canada", city: "Canada", country: "Canada", countryCode: "CA", region: "North America", population: "metro" },
  { slug: "toronto", city: "Toronto", state: "Ontario", country: "Canada", countryCode: "CA", region: "North America", population: "metro", isTechHub: true },
  { slug: "vancouver", city: "Vancouver", state: "British Columbia", country: "Canada", countryCode: "CA", region: "North America", population: "large", isTechHub: true },
  { slug: "montreal", city: "Montreal", state: "Quebec", country: "Canada", countryCode: "CA", region: "North America", population: "large", isTechHub: true },

  // Australia
  { slug: "australia", city: "Australia", country: "Australia", countryCode: "AU", region: "Oceania", population: "metro" },
  { slug: "sydney", city: "Sydney", state: "New South Wales", country: "Australia", countryCode: "AU", region: "Oceania", population: "metro", isTechHub: true },
  { slug: "melbourne", city: "Melbourne", state: "Victoria", country: "Australia", countryCode: "AU", region: "Oceania", population: "metro", isTechHub: true },

  // Europe
  { slug: "germany", city: "Germany", country: "Germany", countryCode: "DE", region: "Europe", population: "metro" },
  { slug: "berlin", city: "Berlin", country: "Germany", countryCode: "DE", region: "Europe", population: "metro", isCapital: true, isTechHub: true },
  { slug: "netherlands", city: "Netherlands", country: "Netherlands", countryCode: "NL", region: "Europe", population: "large" },
  { slug: "amsterdam", city: "Amsterdam", country: "Netherlands", countryCode: "NL", region: "Europe", population: "large", isCapital: true, isTechHub: true },
  { slug: "france", city: "France", country: "France", countryCode: "FR", region: "Europe", population: "metro" },
  { slug: "paris", city: "Paris", country: "France", countryCode: "FR", region: "Europe", population: "metro", isCapital: true, isTechHub: true },

  // Middle East
  { slug: "uae", city: "United Arab Emirates", country: "United Arab Emirates", countryCode: "AE", region: "Middle East", population: "large" },
  { slug: "dubai", city: "Dubai", country: "United Arab Emirates", countryCode: "AE", region: "Middle East", population: "large", isTechHub: true },
  { slug: "saudi-arabia", city: "Saudi Arabia", country: "Saudi Arabia", countryCode: "SA", region: "Middle East", population: "large" },

  // Asia
  { slug: "singapore", city: "Singapore", country: "Singapore", countryCode: "SG", region: "Southeast Asia", population: "large", isCapital: true, isTechHub: true },
  { slug: "japan", city: "Japan", country: "Japan", countryCode: "JP", region: "East Asia", population: "metro" },
  { slug: "tokyo", city: "Tokyo", country: "Japan", countryCode: "JP", region: "East Asia", population: "metro", isCapital: true, isTechHub: true },
];

export const ALL_LOCATIONS: LocationData[] = [
  ...INDIA_CITIES,
  ...INDIA_STATES,
  ...INTERNATIONAL_LOCATIONS,
  ...ALL_EXTENDED_LOCATIONS,
  // Generic India
  { slug: "india", city: "India", country: "India", countryCode: "IN", region: "South Asia", population: "metro" },
  // Remote/Global
  { slug: "remote", city: "Remote", country: "Worldwide", countryCode: "WW", region: "Global", population: "metro" },
  { slug: "worldwide", city: "Worldwide", country: "Worldwide", countryCode: "WW", region: "Global", population: "metro" },
];

// Re-export extended data for convenience
export {
  US_CITIES_EXTENDED,
  US_STATES,
  EUROPE_EXTENDED,
  APAC_EXTENDED,
  MIDDLE_EAST_EXTENDED,
  ALL_EXTENDED_LOCATIONS,
};

// ============================================================================
// SKILLS - Technologies and expertise for "Hire [Skill] Developer" pages
// ============================================================================

export const SKILLS: SkillData[] = [
  // Frontend
  {
    slug: "react",
    name: "React",
    category: "frontend",
    experience: "4+ years",
    proficiency: "expert",
    relatedSkills: ["Next.js", "TypeScript", "Redux", "React Query"],
    useCases: ["Single Page Applications", "Complex UIs", "Dashboard Development", "E-commerce Frontends"],
    description: "Building interactive, component-based user interfaces with React's declarative paradigm"
  },
  {
    slug: "nextjs",
    name: "Next.js",
    category: "fullstack",
    experience: "3+ years",
    proficiency: "expert",
    relatedSkills: ["React", "TypeScript", "Vercel", "Server Components"],
    useCases: ["Full-Stack Web Apps", "SEO-Optimized Sites", "E-commerce Platforms", "SaaS Applications"],
    description: "Full-stack React framework for production-grade applications with SSR, SSG, and API routes"
  },
  {
    slug: "typescript",
    name: "TypeScript",
    category: "fullstack",
    experience: "3+ years",
    proficiency: "expert",
    relatedSkills: ["JavaScript", "React", "Node.js", "Type Safety"],
    useCases: ["Large-Scale Applications", "Enterprise Software", "API Development", "Type-Safe Codebases"],
    description: "Strongly-typed JavaScript for building maintainable, scalable applications"
  },
  {
    slug: "javascript",
    name: "JavaScript",
    category: "fullstack",
    experience: "5+ years",
    proficiency: "expert",
    relatedSkills: ["TypeScript", "Node.js", "React", "ES6+"],
    useCases: ["Web Development", "Full-Stack Apps", "Scripting", "Browser Extensions"],
    description: "Core web development language for both frontend and backend applications"
  },
  {
    slug: "tailwindcss",
    name: "Tailwind CSS",
    category: "frontend",
    experience: "3+ years",
    proficiency: "expert",
    relatedSkills: ["CSS", "React", "Responsive Design", "UI/UX"],
    useCases: ["Rapid UI Development", "Design Systems", "Responsive Layouts", "Custom Components"],
    description: "Utility-first CSS framework for building custom, responsive designs quickly"
  },
  {
    slug: "html-css",
    name: "HTML/CSS",
    category: "frontend",
    experience: "6+ years",
    proficiency: "expert",
    relatedSkills: ["Tailwind CSS", "Sass", "Responsive Design", "Accessibility"],
    useCases: ["Web Pages", "Email Templates", "Semantic Markup", "Cross-Browser Compatibility"],
    description: "Foundational web technologies for structure and styling"
  },

  // Backend
  {
    slug: "nodejs",
    name: "Node.js",
    category: "backend",
    experience: "4+ years",
    proficiency: "expert",
    relatedSkills: ["Express", "TypeScript", "REST APIs", "GraphQL"],
    useCases: ["REST APIs", "Real-time Applications", "Microservices", "Backend Development"],
    description: "Server-side JavaScript runtime for building scalable network applications"
  },
  {
    slug: "python",
    name: "Python",
    category: "backend",
    experience: "3+ years",
    proficiency: "advanced",
    relatedSkills: ["FastAPI", "Django", "Flask", "Data Science"],
    useCases: ["API Development", "Automation", "Data Processing", "Machine Learning"],
    description: "Versatile programming language for backend, automation, and data science"
  },
  {
    slug: "fastapi",
    name: "FastAPI",
    category: "backend",
    experience: "2+ years",
    proficiency: "advanced",
    relatedSkills: ["Python", "Async Programming", "REST APIs", "OpenAPI"],
    useCases: ["High-Performance APIs", "Microservices", "Async Applications", "ML Backends"],
    description: "Modern, fast Python web framework for building APIs with automatic documentation"
  },
  {
    slug: "express",
    name: "Express.js",
    category: "backend",
    experience: "4+ years",
    proficiency: "expert",
    relatedSkills: ["Node.js", "REST APIs", "Middleware", "Authentication"],
    useCases: ["REST APIs", "Web Servers", "Middleware Development", "Backend Services"],
    description: "Minimal and flexible Node.js web application framework"
  },
  {
    slug: "graphql",
    name: "GraphQL",
    category: "backend",
    experience: "2+ years",
    proficiency: "advanced",
    relatedSkills: ["Apollo", "Node.js", "React", "Type Safety"],
    useCases: ["Flexible APIs", "Data Fetching", "Mobile Backends", "Complex Data Models"],
    description: "Query language for APIs that provides exactly the data clients need"
  },

  // Database
  {
    slug: "postgresql",
    name: "PostgreSQL",
    category: "database",
    experience: "3+ years",
    proficiency: "advanced",
    relatedSkills: ["SQL", "Prisma", "Database Design", "Performance Tuning"],
    useCases: ["Relational Data", "Complex Queries", "Data Integrity", "Enterprise Applications"],
    description: "Powerful, open-source relational database for complex data requirements"
  },
  {
    slug: "mongodb",
    name: "MongoDB",
    category: "database",
    experience: "3+ years",
    proficiency: "advanced",
    relatedSkills: ["NoSQL", "Mongoose", "Document Databases", "Aggregation"],
    useCases: ["Document Storage", "Flexible Schemas", "Real-time Analytics", "Content Management"],
    description: "Document-oriented NoSQL database for flexible, scalable data storage"
  },
  {
    slug: "prisma",
    name: "Prisma",
    category: "database",
    experience: "2+ years",
    proficiency: "expert",
    relatedSkills: ["PostgreSQL", "TypeScript", "Database Migrations", "ORM"],
    useCases: ["Type-Safe Queries", "Database Migrations", "Schema Management", "Full-Stack Apps"],
    description: "Next-generation ORM for Node.js and TypeScript with type safety"
  },
  {
    slug: "redis",
    name: "Redis",
    category: "database",
    experience: "2+ years",
    proficiency: "advanced",
    relatedSkills: ["Caching", "Session Storage", "Real-time Data", "Pub/Sub"],
    useCases: ["Caching", "Session Management", "Real-time Features", "Rate Limiting"],
    description: "In-memory data store for caching, sessions, and real-time features"
  },
  {
    slug: "mysql",
    name: "MySQL",
    category: "database",
    experience: "3+ years",
    proficiency: "advanced",
    relatedSkills: ["SQL", "Relational Databases", "Data Modeling", "Performance"],
    useCases: ["Web Applications", "E-commerce", "Content Management", "Enterprise Systems"],
    description: "Popular open-source relational database for web applications"
  },

  // DevOps & Cloud
  {
    slug: "aws",
    name: "AWS",
    category: "devops",
    experience: "3+ years",
    proficiency: "advanced",
    relatedSkills: ["EC2", "S3", "Lambda", "CloudFront"],
    useCases: ["Cloud Hosting", "Serverless", "CDN", "Infrastructure"],
    description: "Amazon Web Services for scalable cloud infrastructure and services"
  },
  {
    slug: "docker",
    name: "Docker",
    category: "devops",
    experience: "3+ years",
    proficiency: "advanced",
    relatedSkills: ["Kubernetes", "Containerization", "CI/CD", "Microservices"],
    useCases: ["Containerization", "Development Environments", "Deployment", "Microservices"],
    description: "Container platform for building, shipping, and running applications"
  },
  {
    slug: "vercel",
    name: "Vercel",
    category: "devops",
    experience: "3+ years",
    proficiency: "expert",
    relatedSkills: ["Next.js", "Edge Functions", "CI/CD", "Serverless"],
    useCases: ["Frontend Hosting", "Serverless Functions", "Edge Deployment", "CI/CD"],
    description: "Cloud platform for frontend frameworks and serverless functions"
  },
  {
    slug: "git",
    name: "Git",
    category: "devops",
    experience: "5+ years",
    proficiency: "expert",
    relatedSkills: ["GitHub", "Version Control", "Collaboration", "CI/CD"],
    useCases: ["Version Control", "Team Collaboration", "Code Review", "Branching Strategies"],
    description: "Distributed version control for tracking changes and collaboration"
  },

  // Full-Stack Combinations
  {
    slug: "mern-stack",
    name: "MERN Stack",
    category: "fullstack",
    experience: "3+ years",
    proficiency: "expert",
    relatedSkills: ["MongoDB", "Express", "React", "Node.js"],
    useCases: ["Full-Stack Applications", "SaaS Products", "Startups", "MVPs"],
    description: "Full-stack JavaScript development with MongoDB, Express, React, and Node.js"
  },
  {
    slug: "fullstack-development",
    name: "Full-Stack Development",
    category: "fullstack",
    experience: "4+ years",
    proficiency: "expert",
    relatedSkills: ["React", "Node.js", "Databases", "APIs"],
    useCases: ["End-to-End Solutions", "Complete Web Applications", "SaaS", "Enterprise Software"],
    description: "Complete frontend and backend development for web applications"
  },
  {
    slug: "web-development",
    name: "Web Development",
    category: "fullstack",
    experience: "5+ years",
    proficiency: "expert",
    relatedSkills: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
    useCases: ["Websites", "Web Applications", "Landing Pages", "E-commerce"],
    description: "Comprehensive web development from simple sites to complex applications"
  },
  {
    slug: "frontend-development",
    name: "Frontend Development",
    category: "frontend",
    experience: "4+ years",
    proficiency: "expert",
    relatedSkills: ["React", "TypeScript", "CSS", "UI/UX"],
    useCases: ["User Interfaces", "Responsive Design", "Interactive Apps", "Design Implementation"],
    description: "Building engaging, responsive user interfaces and experiences"
  },
  {
    slug: "backend-development",
    name: "Backend Development",
    category: "backend",
    experience: "4+ years",
    proficiency: "expert",
    relatedSkills: ["Node.js", "Python", "Databases", "APIs"],
    useCases: ["APIs", "Server Logic", "Database Design", "System Architecture"],
    description: "Server-side development, APIs, and database architecture"
  },

  // Specialized
  {
    slug: "api-development",
    name: "API Development",
    category: "backend",
    experience: "4+ years",
    proficiency: "expert",
    relatedSkills: ["REST", "GraphQL", "Node.js", "Authentication"],
    useCases: ["REST APIs", "GraphQL APIs", "Microservices", "Third-Party Integrations"],
    description: "Designing and building robust, scalable APIs"
  },
  {
    slug: "ecommerce-development",
    name: "E-commerce Development",
    category: "fullstack",
    experience: "3+ years",
    proficiency: "advanced",
    relatedSkills: ["Shopify", "Stripe", "Payment Gateways", "Inventory Management"],
    useCases: ["Online Stores", "Payment Integration", "Inventory Systems", "Checkout Flows"],
    description: "Building complete e-commerce solutions with payments and inventory"
  },
  {
    slug: "saas-development",
    name: "SaaS Development",
    category: "fullstack",
    experience: "3+ years",
    proficiency: "advanced",
    relatedSkills: ["Multi-tenancy", "Subscription Billing", "Authentication", "Scalability"],
    useCases: ["SaaS Products", "Subscription Platforms", "B2B Software", "Multi-tenant Apps"],
    description: "Building scalable Software-as-a-Service applications"
  },
];

// ============================================================================
// INDUSTRIES - Vertical-specific pages for "Developer for [Industry]"
// ============================================================================

export const INDUSTRIES: IndustryData[] = [
  {
    slug: "startups",
    name: "Startups",
    verticals: ["Tech Startups", "Fintech", "Healthtech", "Edtech", "SaaS"],
    commonProjects: ["MVP Development", "Product Iteration", "Growth Features", "Investor Demos"],
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "Vercel"],
    challenges: ["Fast iteration", "Limited budget", "Scaling", "Technical debt management"],
    description: "Helping startups build and scale their technical products quickly"
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    verticals: ["Online Retail", "D2C Brands", "Marketplaces", "B2B Commerce"],
    commonProjects: ["Online Stores", "Payment Integration", "Inventory Systems", "Order Management"],
    technologies: ["Next.js", "Shopify", "Stripe", "PostgreSQL", "Redis"],
    challenges: ["Performance", "Security", "Scalability", "Payment compliance"],
    description: "Building high-performance e-commerce platforms that convert"
  },
  {
    slug: "fintech",
    name: "Fintech",
    verticals: ["Payments", "Banking", "Insurance", "Investment", "Lending"],
    commonProjects: ["Payment Gateways", "Dashboard Analytics", "Compliance Systems", "User Portals"],
    technologies: ["TypeScript", "Node.js", "PostgreSQL", "Redis", "AWS"],
    challenges: ["Security", "Compliance", "Real-time processing", "Data accuracy"],
    description: "Secure, compliant financial technology solutions"
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    verticals: ["Telemedicine", "Health Records", "Medical Devices", "Wellness Apps"],
    commonProjects: ["Patient Portals", "Telemedicine Apps", "Health Dashboards", "Appointment Systems"],
    technologies: ["React", "Node.js", "PostgreSQL", "HIPAA Compliance"],
    challenges: ["Privacy", "HIPAA compliance", "Data security", "Accessibility"],
    description: "Healthcare solutions with privacy and compliance at the core"
  },
  {
    slug: "education",
    name: "Education & EdTech",
    verticals: ["E-learning", "EdTech", "Schools", "Universities", "Corporate Training"],
    commonProjects: ["Learning Platforms", "Course Management", "Assessment Systems", "Student Portals"],
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "Video Streaming"],
    challenges: ["Engagement", "Scalability", "Content delivery", "Accessibility"],
    description: "Educational technology that enhances learning outcomes"
  },
  {
    slug: "saas",
    name: "SaaS Companies",
    verticals: ["B2B SaaS", "Productivity Tools", "Analytics", "Communication"],
    commonProjects: ["Multi-tenant Apps", "Dashboard Development", "API Integrations", "Billing Systems"],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "Stripe"],
    challenges: ["Multi-tenancy", "Scalability", "Feature velocity", "Subscription management"],
    description: "Building scalable SaaS products that grow with your business"
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    verticals: ["Property Listings", "PropTech", "Property Management", "Real Estate Agencies"],
    commonProjects: ["Listing Platforms", "Virtual Tours", "CRM Systems", "Lead Management"],
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "Maps Integration"],
    challenges: ["Search optimization", "Media handling", "Lead conversion", "Mobile experience"],
    description: "Digital solutions for modern real estate businesses"
  },
  {
    slug: "agencies",
    name: "Agencies & Studios",
    verticals: ["Digital Agencies", "Design Studios", "Marketing Agencies", "Development Shops"],
    commonProjects: ["Client Websites", "Campaign Landing Pages", "Portfolio Sites", "Branding Sites"],
    technologies: ["Next.js", "React", "Tailwind CSS", "CMS Integrations"],
    challenges: ["Design implementation", "Performance", "SEO", "Client management"],
    description: "Technical partner for agencies delivering client projects"
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    verticals: ["Large Corporations", "Fortune 500", "Government", "Non-profits"],
    commonProjects: ["Internal Tools", "Portals", "Data Dashboards", "Workflow Automation"],
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
    challenges: ["Scale", "Security", "Integration", "Compliance"],
    description: "Enterprise-grade solutions with security and scalability"
  },
  {
    slug: "media-entertainment",
    name: "Media & Entertainment",
    verticals: ["Streaming", "Publishing", "Gaming", "Content Platforms"],
    commonProjects: ["Content Platforms", "Streaming Apps", "CMS Systems", "Creator Tools"],
    technologies: ["React", "Node.js", "Video Streaming", "CDN", "PostgreSQL"],
    challenges: ["Content delivery", "Performance", "Rights management", "Monetization"],
    description: "Media platforms that engage and retain audiences"
  },
];

// ============================================================================
// ROLES - Different hiring terms for "Hire [Role]" pages
// ============================================================================

export const ROLES: RoleData[] = [
  {
    slug: "freelance-developer",
    title: "Freelance Developer",
    alternativeTitles: ["Freelancer", "Independent Developer", "Self-Employed Developer"],
    description: "Independent software developer available for project-based work",
    responsibilities: ["Full project ownership", "Direct communication", "Flexible engagement", "End-to-end delivery"],
    idealFor: ["Short-term projects", "Specific expertise needs", "Cost-effective solutions", "Flexible timelines"]
  },
  {
    slug: "contract-developer",
    title: "Contract Developer",
    alternativeTitles: ["Contractor", "Contract Engineer", "Contract Programmer"],
    description: "Professional developer for fixed-term contract engagements",
    responsibilities: ["Defined scope delivery", "Timeline commitment", "Technical expertise", "Documentation"],
    idealFor: ["Defined projects", "Team augmentation", "Specific deliverables", "Budget clarity"]
  },
  {
    slug: "remote-developer",
    title: "Remote Developer",
    alternativeTitles: ["Remote Engineer", "Work From Home Developer", "Distributed Developer"],
    description: "Developer working remotely with global availability",
    responsibilities: ["Async communication", "Self-management", "Virtual collaboration", "Timezone flexibility"],
    idealFor: ["Global teams", "Cost optimization", "Talent access", "Flexible arrangements"]
  },
  {
    slug: "fullstack-developer",
    title: "Full-Stack Developer",
    alternativeTitles: ["Full Stack Engineer", "Generalist Developer", "End-to-End Developer"],
    description: "Developer proficient in both frontend and backend technologies",
    responsibilities: ["Complete application development", "Database design", "API development", "UI implementation"],
    idealFor: ["Complete solutions", "Startups", "Small teams", "MVP development"]
  },
  {
    slug: "frontend-developer",
    title: "Frontend Developer",
    alternativeTitles: ["UI Developer", "Frontend Engineer", "Client-Side Developer"],
    description: "Specialist in user interface and user experience development",
    responsibilities: ["UI development", "Responsive design", "Performance optimization", "Accessibility"],
    idealFor: ["UI-focused projects", "Design implementation", "User experience", "Interactive applications"]
  },
  {
    slug: "backend-developer",
    title: "Backend Developer",
    alternativeTitles: ["Server-Side Developer", "Backend Engineer", "API Developer"],
    description: "Expert in server-side logic, databases, and API development",
    responsibilities: ["API development", "Database architecture", "Server optimization", "Security"],
    idealFor: ["API-heavy projects", "Data processing", "System integration", "Backend architecture"]
  },
  {
    slug: "web-developer",
    title: "Web Developer",
    alternativeTitles: ["Website Developer", "Web Programmer", "Web Engineer"],
    description: "Developer specializing in web-based applications and sites",
    responsibilities: ["Website development", "Web application creation", "Cross-browser compatibility", "Performance"],
    idealFor: ["Websites", "Web applications", "Landing pages", "Online presence"]
  },
  {
    slug: "software-developer",
    title: "Software Developer",
    alternativeTitles: ["Software Engineer", "Programmer", "Application Developer"],
    description: "Professional building software solutions across platforms",
    responsibilities: ["Software design", "Code development", "Testing", "Maintenance"],
    idealFor: ["Custom software", "Application development", "Technical solutions", "Product development"]
  },
  {
    slug: "consultant",
    title: "Technical Consultant",
    alternativeTitles: ["Tech Consultant", "Development Consultant", "IT Consultant"],
    description: "Expert advisor on technical strategy and implementation",
    responsibilities: ["Technical assessment", "Architecture advice", "Best practices", "Team guidance"],
    idealFor: ["Technical decisions", "Architecture review", "Team training", "Process improvement"]
  },
];

// ============================================================================
// SERVICES - Specific service offerings for service pages
// ============================================================================

export const SERVICES: ServiceData[] = [
  {
    slug: "web-application-development",
    name: "Web Application Development",
    description: "Custom web application development from concept to deployment",
    features: ["Custom development", "Responsive design", "API integration", "Database design", "Testing"],
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "TypeScript"],
    deliverables: ["Working application", "Source code", "Documentation", "Deployment support"],
    idealFor: ["Businesses needing custom solutions", "Startups", "Digital transformation"]
  },
  {
    slug: "mvp-development",
    name: "MVP Development",
    description: "Rapid minimum viable product development for startups",
    features: ["Fast iteration", "Core features first", "Scalable foundation", "User feedback integration"],
    technologies: ["Next.js", "React", "Node.js", "PostgreSQL", "Vercel"],
    deliverables: ["Functional MVP", "User testing support", "Iteration plan", "Scale roadmap"],
    idealFor: ["Startups", "New product ideas", "Market validation", "Fundraising"]
  },
  {
    slug: "api-integration",
    name: "API Integration & Development",
    description: "Building and integrating APIs for seamless data flow",
    features: ["REST API design", "Third-party integrations", "Authentication", "Documentation"],
    technologies: ["Node.js", "Express", "GraphQL", "OAuth", "JWT"],
    deliverables: ["API endpoints", "Integration code", "API documentation", "Testing suite"],
    idealFor: ["System integration", "Data connectivity", "Third-party services", "Automation"]
  },
  {
    slug: "ecommerce-solutions",
    name: "E-commerce Solutions",
    description: "Complete e-commerce platform development with payments",
    features: ["Product catalog", "Shopping cart", "Payment integration", "Order management", "Inventory"],
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Redis", "Shopify"],
    deliverables: ["E-commerce site", "Admin panel", "Payment setup", "Analytics dashboard"],
    idealFor: ["Online retailers", "D2C brands", "Marketplaces", "Product businesses"]
  },
  {
    slug: "saas-product-development",
    name: "SaaS Product Development",
    description: "Building scalable software-as-a-service products",
    features: ["Multi-tenancy", "Subscription billing", "User management", "Analytics", "API access"],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Redis"],
    deliverables: ["SaaS platform", "Billing integration", "Admin dashboard", "User portal"],
    idealFor: ["SaaS startups", "B2B products", "Subscription businesses", "Platform companies"]
  },
  {
    slug: "performance-optimization",
    name: "Performance Optimization",
    description: "Improving website and application performance",
    features: ["Core Web Vitals", "Load time reduction", "Caching strategies", "Code optimization"],
    technologies: ["Next.js", "CDN", "Redis", "Image optimization", "Code splitting"],
    deliverables: ["Performance audit", "Optimization implementation", "Monitoring setup", "Documentation"],
    idealFor: ["Slow websites", "SEO improvement", "User experience", "Conversion optimization"]
  },
  {
    slug: "technical-consultation",
    name: "Technical Consultation",
    description: "Expert advice on technical architecture and decisions",
    features: ["Architecture review", "Technology selection", "Best practices", "Team guidance"],
    technologies: ["Various based on project needs"],
    deliverables: ["Assessment report", "Recommendations", "Roadmap", "Implementation guidance"],
    idealFor: ["Technical decisions", "Project planning", "Team scaling", "Code review"]
  },
];

// ============================================================================
// COMBINED PAGE VARIATIONS - For generating unique combination pages
// ============================================================================

export interface CombinationPage {
  type: "skill-location" | "role-location" | "industry-skill" | "service-location";
  primary: string;
  secondary: string;
  slug: string;
}

export function generateCombinationPages(): CombinationPage[] {
  const combinations: CombinationPage[] = [];

  // Top skill + Top location combinations (e.g., "React Developer in Bangalore")
  const topSkills = SKILLS.filter(s => s.proficiency === "expert").slice(0, 10);
  const topLocations = [...INDIA_CITIES.filter(l => l.isTechHub), ...INTERNATIONAL_LOCATIONS.filter(l => l.isTechHub)].slice(0, 20);

  for (const skill of topSkills) {
    for (const location of topLocations) {
      combinations.push({
        type: "skill-location",
        primary: skill.slug,
        secondary: location.slug,
        slug: `${skill.slug}-developer-${location.slug}`
      });
    }
  }

  // Role + Location combinations (e.g., "Freelance Developer in Mumbai")
  const topRoles = ROLES.slice(0, 5);
  for (const role of topRoles) {
    for (const location of topLocations.slice(0, 10)) {
      combinations.push({
        type: "role-location",
        primary: role.slug,
        secondary: location.slug,
        slug: `${role.slug}-${location.slug}`
      });
    }
  }

  return combinations;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getLocationBySlug(slug: string): LocationData | undefined {
  return ALL_LOCATIONS.find(l => l.slug === slug);
}

export function getSkillBySlug(slug: string): SkillData | undefined {
  return SKILLS.find(s => s.slug === slug);
}

export function getIndustryBySlug(slug: string): IndustryData | undefined {
  return INDUSTRIES.find(i => i.slug === slug);
}

export function getRoleBySlug(slug: string): RoleData | undefined {
  return ROLES.find(r => r.slug === slug);
}

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES.find(s => s.slug === slug);
}

export function getAllSlugs() {
  return {
    locations: ALL_LOCATIONS.map(l => l.slug),
    skills: SKILLS.map(s => s.slug),
    industries: INDUSTRIES.map(i => i.slug),
    roles: ROLES.map(r => r.slug),
    services: SERVICES.map(s => s.slug),
  };
}

export function getTotalProgrammaticPages(): number {
  const combinations = generateCombinationPages();
  return (
    ALL_LOCATIONS.length +
    SKILLS.length +
    INDUSTRIES.length +
    ROLES.length +
    SERVICES.length +
    combinations.length
  );
}
