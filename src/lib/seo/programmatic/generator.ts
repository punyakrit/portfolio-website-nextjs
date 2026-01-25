/**
 * Programmatic SEO Content Generator
 *
 * Generates unique, intent-matched content for each programmatic page.
 * Designed to avoid thin content and duplication while scaling to 100k+ pages.
 *
 * KEY POSITIONING: Developer based in India, serving clients WORLDWIDE,
 * with special focus on US, UK, Europe, and other global markets.
 */

import type {
  LocationData,
  SkillData,
  IndustryData,
  RoleData,
  ServiceData,
  FAQItem,
  ContentBlock,
  PageGenerationResult,
  BreadcrumbItem,
} from "./types";
import { SITE_URL, SEO_CONFIG } from "../../seo";

// ============================================================================
// CONTENT VARIATION SYSTEM - Prevents duplicate/similar content
// ============================================================================

interface ContentVariations {
  heroIntros: string[];
  valueProps: string[];
  processSteps: string[];
  ctaTexts: string[];
  testimonialStyles: string[];
}

const BASE_VARIATIONS: ContentVariations = {
  heroIntros: [
    "Looking for a skilled developer who understands your timezone and business needs?",
    "Need a reliable development partner for your next project?",
    "Searching for an experienced developer to bring your vision to life?",
    "Ready to work with a developer who delivers production-grade code?",
    "Want a technical partner who communicates clearly and ships on time?",
  ],
  valueProps: [
    "I work with clients globally, offering flexible hours that align with your schedule.",
    "With experience serving US, UK, and European clients, I understand Western business culture and communication expectations.",
    "Clear English communication, predictable timelines, and production-ready code.",
    "Direct collaboration—no agencies, no middlemen, just focused development work.",
    "Timezone flexibility means we can have real-time calls and quick iterations.",
  ],
  processSteps: [
    "Discovery → Planning → Development → Testing → Deployment → Support",
    "Understanding your needs → Technical planning → Iterative development → Quality assurance → Launch",
    "Requirements analysis → Architecture design → Agile development → Rigorous testing → Deployment",
    "Initial consultation → Scope definition → Sprint-based development → Review cycles → Go-live",
    "Deep dive into goals → Technical roadmap → Build in iterations → Thorough QA → Launch & iterate",
  ],
  ctaTexts: [
    "Let's discuss your project",
    "Schedule a free consultation",
    "Get started today",
    "Book a discovery call",
    "Let's build something great",
  ],
  testimonialStyles: [
    "Results-focused",
    "Collaboration-focused",
    "Quality-focused",
    "Speed-focused",
    "Communication-focused",
  ],
};

// Use slug hash to select consistent variations per page
function getVariationIndex(slug: string, variations: string[]): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    const char = slug.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash) % variations.length;
}

function getVariation(slug: string, variations: string[]): string {
  return variations[getVariationIndex(slug, variations)];
}

// ============================================================================
// TITLE & DESCRIPTION GENERATORS
// ============================================================================

export function generateLocationTitle(location: LocationData): string {
  const templates = [
    `Hire a Freelance Developer for ${location.city} Projects | ${SEO_CONFIG.name}`,
    `${location.city} Remote Developer | Full-Stack Web Development`,
    `Freelance Web Developer for ${location.city} Businesses | Hire Now`,
    `Expert Developer Available for ${location.city} Companies`,
    `${location.city} Web Development Services | Remote Full-Stack Developer`,
  ];
  return templates[getVariationIndex(location.slug, templates)];
}

export function generateLocationDescription(location: LocationData): string {
  const isInternational = location.countryCode !== "IN";
  const timezoneNote = isInternational
    ? `I offer flexible hours to align with ${location.city} business hours.`
    : `Available for remote projects with clear communication and timely delivery.`;

  const templates = [
    `Looking for a freelance developer for your ${location.city} project? I'm a full-stack developer with ${SKILLS_EXPERIENCE} experience, specializing in React, Next.js, and Node.js. ${timezoneNote} Let's build something great together.`,
    `Hire an experienced freelance web developer for ${location.city} businesses. I build production-grade applications using modern technologies. ${timezoneNote} Get a free consultation today.`,
    `Professional freelance developer available for ${location.city} companies. Expert in React, TypeScript, and full-stack development. ${timezoneNote} Direct communication, quality code, on-time delivery.`,
  ];
  return templates[getVariationIndex(location.slug, templates)].slice(0, 160);
}

export function generateSkillTitle(skill: SkillData): string {
  const templates = [
    `Hire a ${skill.name} Developer | Freelance ${skill.name} Expert`,
    `${skill.name} Developer for Hire | ${skill.experience} Experience`,
    `Freelance ${skill.name} Developer | Build Your Project with ${skill.name}`,
    `Expert ${skill.name} Developer | Remote & Available Now`,
    `${skill.name} Development Services | Hire Freelance Developer`,
  ];
  return templates[getVariationIndex(skill.slug, templates)];
}

export function generateSkillDescription(skill: SkillData): string {
  const templates = [
    `Hire a freelance ${skill.name} developer with ${skill.experience} experience. I build ${skill.useCases.slice(0, 2).join(", ")} using ${skill.name}. Available for remote projects worldwide.`,
    `Looking for a ${skill.name} expert? I'm a freelance developer specializing in ${skill.name} with ${skill.experience} of hands-on experience. ${skill.description}`,
    `Professional ${skill.name} developer for hire. ${skill.experience} building ${skill.useCases[0].toLowerCase()}. Let's discuss your ${skill.name} project today.`,
  ];
  return templates[getVariationIndex(skill.slug, templates)].slice(0, 160);
}

export function generateIndustryTitle(industry: IndustryData): string {
  const templates = [
    `${industry.name} Web Developer | Build Your ${industry.name} Project`,
    `Freelance Developer for ${industry.name} | Specialized Experience`,
    `Hire ${industry.name} Tech Expert | Full-Stack Development`,
    `${industry.name} Development Services | Experienced Freelance Developer`,
    `Web Developer for ${industry.name} Companies | Available Now`,
  ];
  return templates[getVariationIndex(industry.slug, templates)];
}

export function generateIndustryDescription(industry: IndustryData): string {
  const templates = [
    `Experienced freelance developer for ${industry.name.toLowerCase()} projects. I understand ${industry.challenges.slice(0, 2).join(" and ")}. Building ${industry.commonProjects.slice(0, 2).join(", ").toLowerCase()} with ${industry.technologies.slice(0, 3).join(", ")}.`,
    `Looking for a developer who understands ${industry.name.toLowerCase()}? I build ${industry.commonProjects[0].toLowerCase()} and ${industry.commonProjects[1].toLowerCase()} for ${industry.verticals.slice(0, 2).join(" and ")}.`,
    `${industry.description} Specializing in ${industry.technologies.slice(0, 3).join(", ")} for ${industry.name.toLowerCase()} projects.`,
  ];
  return templates[getVariationIndex(industry.slug, templates)].slice(0, 160);
}

export function generateRoleTitle(role: RoleData): string {
  const templates = [
    `Hire ${role.title} | ${role.alternativeTitles[0]} for Your Project`,
    `${role.title} for Hire | Experienced & Available`,
    `Looking for a ${role.title}? | Hire Me Today`,
    `Professional ${role.title} | Remote & Reliable`,
    `Best ${role.title} | Full-Stack Web Development`,
  ];
  return templates[getVariationIndex(role.slug, templates)];
}

export function generateRoleDescription(role: RoleData): string {
  const templates = [
    `Hire an experienced ${role.title.toLowerCase()}. ${role.description} Ideal for ${role.idealFor.slice(0, 2).join(" and ").toLowerCase()}.`,
    `Looking for a reliable ${role.title.toLowerCase()}? I offer ${role.responsibilities.slice(0, 2).join(" and ").toLowerCase()}. ${role.idealFor[0]} made simple.`,
    `Professional ${role.title.toLowerCase()} available for projects. ${role.description} Let's discuss your requirements.`,
  ];
  return templates[getVariationIndex(role.slug, templates)].slice(0, 160);
}

const SKILLS_EXPERIENCE = "4+ years";

// ============================================================================
// FAQ GENERATORS - Unique FAQs per page type
// ============================================================================

export function generateLocationFAQs(location: LocationData): FAQItem[] {
  const isInternational = location.countryCode !== "IN";
  const timezoneAnswer = isInternational
    ? `Yes, I offer flexible working hours to align with ${location.city} business hours. I regularly work with US, UK, and European clients and am comfortable with async communication and scheduled calls.`
    : `Absolutely. I work with clients globally and offer flexible hours. For ${location.city} clients, we can easily coordinate schedules for real-time collaboration.`;

  const pricingAnswer = isInternational
    ? `My rates are competitive for ${location.region} markets while offering exceptional value. I provide fixed-price quotes for defined projects or hourly rates for ongoing work. Let's discuss your budget and requirements.`
    : `I offer competitive rates with transparent pricing. Whether you need a fixed-price project or ongoing development support, I can provide a quote that works for your budget.`;

  return [
    {
      question: `Can you work with ${location.city} clients remotely?`,
      answer: timezoneAnswer,
    },
    {
      question: `What technologies do you use for ${location.city} projects?`,
      answer: `I specialize in modern web technologies: React, Next.js, TypeScript, Node.js, and PostgreSQL. These are battle-tested technologies used by leading ${location.city} companies for building scalable applications.`,
    },
    {
      question: `How do you handle communication with ${location.city} clients?`,
      answer: `Clear communication is my priority. I use Slack, email, and video calls (Zoom/Google Meet) for regular updates. You'll always know the project status, and I'm responsive to questions and feedback.`,
    },
    {
      question: `What's your pricing for ${location.city} projects?`,
      answer: pricingAnswer,
    },
    {
      question: `How quickly can you start a project for a ${location.city} company?`,
      answer: `I can typically start within 1-2 weeks, depending on my current workload. For urgent projects, I may be able to accommodate faster timelines. Let's discuss your timeline during our initial call.`,
    },
    {
      question: `Do you provide ongoing support after project completion?`,
      answer: `Yes, I offer post-launch support and maintenance packages. Whether you need bug fixes, feature additions, or ongoing development, I'm here to support your ${location.city} business long-term.`,
    },
  ];
}

export function generateSkillFAQs(skill: SkillData): FAQItem[] {
  return [
    {
      question: `How experienced are you with ${skill.name}?`,
      answer: `I have ${skill.experience} of professional experience with ${skill.name}. I've built ${skill.useCases.slice(0, 2).join(" and ").toLowerCase()} for clients ranging from startups to established businesses.`,
    },
    {
      question: `What kind of projects do you build with ${skill.name}?`,
      answer: `I use ${skill.name} to build ${skill.useCases.join(", ").toLowerCase()}. ${skill.description}`,
    },
    {
      question: `Do you work with ${skill.relatedSkills.slice(0, 2).join(" and ")} as well?`,
      answer: `Yes! ${skill.name} works great with ${skill.relatedSkills.join(", ")}. I often combine these technologies to build complete, production-ready solutions.`,
    },
    {
      question: `How do you stay current with ${skill.name} best practices?`,
      answer: `I actively follow the ${skill.name} ecosystem—reading documentation updates, following core contributors, and building projects with new features. I ensure my ${skill.name} code follows current best practices.`,
    },
    {
      question: `Can you migrate an existing project to ${skill.name}?`,
      answer: `Absolutely. I can assess your current codebase and create a migration plan to ${skill.name}. I've helped clients modernize their applications while minimizing disruption to their business.`,
    },
    {
      question: `What's the typical timeline for a ${skill.name} project?`,
      answer: `Timeline depends on project scope. A simple ${skill.useCases[0].toLowerCase()} might take 2-4 weeks, while complex applications can take 2-3 months. I'll provide a detailed timeline after understanding your requirements.`,
    },
  ];
}

export function generateIndustryFAQs(industry: IndustryData): FAQItem[] {
  return [
    {
      question: `Do you have experience with ${industry.name.toLowerCase()} projects?`,
      answer: `Yes, I've worked with ${industry.verticals.slice(0, 2).join(" and ")} companies on projects like ${industry.commonProjects.slice(0, 2).join(" and ").toLowerCase()}. I understand the unique challenges of ${industry.name.toLowerCase()}.`,
    },
    {
      question: `What technologies do you recommend for ${industry.name.toLowerCase()}?`,
      answer: `For ${industry.name.toLowerCase()} projects, I typically use ${industry.technologies.join(", ")}. The specific stack depends on your requirements, scale, and existing infrastructure.`,
    },
    {
      question: `How do you handle ${industry.challenges[0].toLowerCase()}?`,
      answer: `${industry.challenges[0]} is a common challenge in ${industry.name.toLowerCase()}. I address this through careful architecture planning, proven patterns, and continuous testing throughout development.`,
    },
    {
      question: `Can you build a ${industry.commonProjects[0].toLowerCase()} for my ${industry.name.toLowerCase()} company?`,
      answer: `Absolutely. I have experience building ${industry.commonProjects[0].toLowerCase()} for ${industry.name.toLowerCase()} businesses. Let's discuss your specific requirements and I'll show you relevant examples from my portfolio.`,
    },
    {
      question: `What makes you suitable for ${industry.name.toLowerCase()} projects?`,
      answer: `${industry.description} I understand the technical requirements, compliance needs, and user expectations specific to ${industry.name.toLowerCase()}.`,
    },
  ];
}

export function generateRoleFAQs(role: RoleData): FAQItem[] {
  return [
    {
      question: `What does a ${role.title.toLowerCase()} do?`,
      answer: `A ${role.title.toLowerCase()} ${role.description.toLowerCase()} Key responsibilities include ${role.responsibilities.slice(0, 2).join(" and ").toLowerCase()}.`,
    },
    {
      question: `Why should I hire a ${role.title.toLowerCase()} instead of a full-time developer?`,
      answer: `Hiring a ${role.title.toLowerCase()} is ideal for ${role.idealFor.join(", ").toLowerCase()}. You get expertise without long-term commitments, and can scale up or down based on project needs.`,
    },
    {
      question: `How do you handle ${role.responsibilities[0].toLowerCase()}?`,
      answer: `I approach ${role.responsibilities[0].toLowerCase()} with a focus on clear communication and quality delivery. You'll have visibility into progress and can provide feedback throughout the process.`,
    },
    {
      question: `What's the engagement model for a ${role.title.toLowerCase()}?`,
      answer: `I offer flexible engagement models: fixed-price for defined projects, hourly for ongoing work, or retainer for dedicated availability. We'll choose what works best for your needs.`,
    },
    {
      question: `How do I know you're the right ${role.title.toLowerCase()} for my project?`,
      answer: `Let's start with a free consultation call. I'll ask about your project, share relevant examples from my portfolio, and we'll see if there's a good fit. No commitment required.`,
    },
  ];
}

// ============================================================================
// CONTENT BLOCK GENERATORS
// ============================================================================

export function generateHeroContent(
  type: "location" | "skill" | "industry" | "role",
  data: LocationData | SkillData | IndustryData | RoleData
): ContentBlock {
  const slug = data.slug;
  const intro = getVariation(slug, BASE_VARIATIONS.heroIntros);
  const valueProp = getVariation(slug, BASE_VARIATIONS.valueProps);

  let specificContent = "";

  if (type === "location") {
    const loc = data as LocationData;
    const isInternational = loc.countryCode !== "IN";
    specificContent = isInternational
      ? `I work with ${loc.city} businesses, offering timezone-aligned availability and clear communication. No language barriers, no cultural mismatches—just quality development work.`
      : `I serve clients in ${loc.city} and globally, bringing production-grade development expertise to your projects.`;
  } else if (type === "skill") {
    const skill = data as SkillData;
    specificContent = `With ${skill.experience} of ${skill.name} experience, I build ${skill.useCases[0].toLowerCase()} that scale. ${skill.description}`;
  } else if (type === "industry") {
    const ind = data as IndustryData;
    specificContent = `I understand the ${ind.name.toLowerCase()} space—from ${ind.challenges[0].toLowerCase()} to ${ind.challenges[1]?.toLowerCase() || "technical requirements"}. Let's build something that works for your specific needs.`;
  } else if (type === "role") {
    const role = data as RoleData;
    specificContent = `${role.description} ${role.idealFor[0]} is what I do best.`;
  }

  return {
    type: "hero",
    heading: "Your Technical Partner",
    content: `${intro}\n\n${specificContent}\n\n${valueProp}`,
  };
}

export function generateProcessContent(slug: string): ContentBlock {
  const process = getVariation(slug, BASE_VARIATIONS.processSteps);

  return {
    type: "process",
    heading: "How I Work",
    content: "I follow a proven process that keeps projects on track and clients informed at every step.",
    bulletPoints: process.split(" → "),
  };
}

export function generateSkillsContent(skills: string[]): ContentBlock {
  return {
    type: "skills",
    heading: "Technologies I Use",
    content: "Modern, battle-tested technologies for building production-grade applications.",
    bulletPoints: skills,
  };
}

export function generateCTAContent(slug: string): ContentBlock {
  const ctaText = getVariation(slug, BASE_VARIATIONS.ctaTexts);

  return {
    type: "cta",
    heading: ctaText,
    content: "Ready to discuss your project? Schedule a free 30-minute consultation call. No commitment, just a conversation about how I can help bring your vision to life.",
  };
}

// ============================================================================
// FULL PAGE GENERATION
// ============================================================================

export function generateLocationPage(location: LocationData): PageGenerationResult {
  const title = generateLocationTitle(location);
  const description = generateLocationDescription(location);
  const h1 = `Hire a Freelance Developer for ${location.city}`;

  const isInternational = location.countryCode !== "IN";
  const intro = isInternational
    ? `Looking for a skilled developer who can work on your ${location.city} timeline? I'm a full-stack developer with expertise in React, Next.js, TypeScript, and Node.js. I've worked with clients across the US, UK, Europe, and Asia, and I understand the communication and quality standards expected by ${location.region} businesses.`
    : `I help ${location.city} businesses build production-grade web applications. Whether you're a startup building an MVP or an established company modernizing your tech stack, I bring expertise in React, Next.js, and full-stack development to your project.`;

  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Home", url: "/" },
    { name: "Hire Developer", url: "/hire" },
    { name: location.city, url: `/hire/location/${location.slug}` },
  ];

  const keywords = [
    `freelance developer ${location.city}`,
    `hire developer ${location.city}`,
    `web developer ${location.city}`,
    `remote developer ${location.city}`,
    `${location.city} freelancer`,
    location.state ? `developer ${location.state}` : null,
    `${location.country} developer`,
    "React developer",
    "Next.js developer",
    "full-stack developer",
  ].filter(Boolean) as string[];

  return {
    metadata: {
      title,
      description,
      keywords,
      canonical: `${SITE_URL}/hire/location/${location.slug}`,
      openGraph: {
        type: "website",
        title,
        description,
        url: `${SITE_URL}/hire/location/${location.slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    },
    schemas: [
      generateServiceSchema(location),
      generateBreadcrumbSchema(breadcrumbs),
      generateFAQSchemaObj(generateLocationFAQs(location)),
    ],
    content: {
      h1,
      intro,
      sections: [
        generateHeroContent("location", location),
        generateSkillsContent(["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"]),
        generateProcessContent(location.slug),
        generateCTAContent(location.slug),
      ],
      faqs: generateLocationFAQs(location),
    },
    links: {
      breadcrumbs,
      related: generateRelatedLocations(location),
      hub: { title: "Hire Developer", url: "/hire" },
    },
  };
}

export function generateSkillPage(skill: SkillData): PageGenerationResult {
  const title = generateSkillTitle(skill);
  const description = generateSkillDescription(skill);
  const h1 = `Hire a Freelance ${skill.name} Developer`;

  const intro = `${skill.description} With ${skill.experience} of professional experience, I build ${skill.useCases.slice(0, 3).join(", ").toLowerCase()} for clients worldwide. Whether you need a complete application or help with a specific ${skill.name} challenge, I can help.`;

  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Home", url: "/" },
    { name: "Hire Developer", url: "/hire" },
    { name: skill.name, url: `/hire/${skill.slug}` },
  ];

  const keywords = [
    `${skill.name} developer`,
    `hire ${skill.name} developer`,
    `freelance ${skill.name} developer`,
    `${skill.name} expert`,
    `${skill.name} freelancer`,
    ...skill.relatedSkills.map(s => `${s} developer`),
    ...skill.useCases.map(u => u.toLowerCase()),
  ];

  return {
    metadata: {
      title,
      description,
      keywords,
      canonical: `${SITE_URL}/hire/${skill.slug}`,
      openGraph: {
        type: "website",
        title,
        description,
        url: `${SITE_URL}/hire/${skill.slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    },
    schemas: [
      generateSkillServiceSchema(skill),
      generateBreadcrumbSchema(breadcrumbs),
      generateFAQSchemaObj(generateSkillFAQs(skill)),
    ],
    content: {
      h1,
      intro,
      sections: [
        generateHeroContent("skill", skill),
        generateSkillsContent(skill.relatedSkills),
        {
          type: "features",
          heading: `What I Build with ${skill.name}`,
          content: `Real-world applications that solve business problems.`,
          bulletPoints: skill.useCases,
        },
        generateProcessContent(skill.slug),
        generateCTAContent(skill.slug),
      ],
      faqs: generateSkillFAQs(skill),
    },
    links: {
      breadcrumbs,
      related: generateRelatedSkills(skill),
      hub: { title: "Hire Developer", url: "/hire" },
    },
  };
}

export function generateIndustryPage(industry: IndustryData): PageGenerationResult {
  const title = generateIndustryTitle(industry);
  const description = generateIndustryDescription(industry);
  const h1 = `Web Developer for ${industry.name}`;

  const intro = `${industry.description} I've worked with ${industry.verticals.slice(0, 2).join(" and ")} companies on ${industry.commonProjects.slice(0, 2).join(" and ").toLowerCase()}. I understand the challenges specific to ${industry.name.toLowerCase()}—from ${industry.challenges.slice(0, 2).join(" to ")}—and build solutions that address them.`;

  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Home", url: "/" },
    { name: "Industries", url: "/services/industries" },
    { name: industry.name, url: `/services/${industry.slug}` },
  ];

  const keywords = [
    `${industry.name.toLowerCase()} developer`,
    `${industry.name.toLowerCase()} web developer`,
    ...industry.verticals.map(v => `${v.toLowerCase()} developer`),
    ...industry.commonProjects.map(p => p.toLowerCase()),
    ...industry.technologies.map(t => `${t} developer`),
  ];

  return {
    metadata: {
      title,
      description,
      keywords,
      canonical: `${SITE_URL}/services/${industry.slug}`,
      openGraph: {
        type: "website",
        title,
        description,
        url: `${SITE_URL}/services/${industry.slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    },
    schemas: [
      generateIndustryServiceSchema(industry),
      generateBreadcrumbSchema(breadcrumbs),
      generateFAQSchemaObj(generateIndustryFAQs(industry)),
    ],
    content: {
      h1,
      intro,
      sections: [
        generateHeroContent("industry", industry),
        {
          type: "features",
          heading: `${industry.name} Projects I Build`,
          content: `Specialized solutions for ${industry.name.toLowerCase()} companies.`,
          bulletPoints: industry.commonProjects,
        },
        generateSkillsContent(industry.technologies),
        generateProcessContent(industry.slug),
        generateCTAContent(industry.slug),
      ],
      faqs: generateIndustryFAQs(industry),
    },
    links: {
      breadcrumbs,
      related: generateRelatedIndustries(industry),
      hub: { title: "Industries", url: "/services/industries" },
    },
  };
}

export function generateRolePage(role: RoleData): PageGenerationResult {
  const title = generateRoleTitle(role);
  const description = generateRoleDescription(role);
  const h1 = `Hire ${role.title}`;

  const intro = `${role.description} I offer ${role.responsibilities.slice(0, 2).join(" and ").toLowerCase()}, making me ideal for ${role.idealFor.slice(0, 2).join(" and ").toLowerCase()}. Whether you need a ${role.alternativeTitles[0].toLowerCase()} for a specific project or ongoing development support, I can help.`;

  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Home", url: "/" },
    { name: "Hire Developer", url: "/hire" },
    { name: role.title, url: `/hire/${role.slug}` },
  ];

  const keywords = [
    `hire ${role.title.toLowerCase()}`,
    ...role.alternativeTitles.map(t => `hire ${t.toLowerCase()}`),
    ...role.idealFor.map(i => i.toLowerCase()),
    "remote developer",
    "freelance developer",
  ];

  return {
    metadata: {
      title,
      description,
      keywords,
      canonical: `${SITE_URL}/hire/${role.slug}`,
      openGraph: {
        type: "website",
        title,
        description,
        url: `${SITE_URL}/hire/${role.slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    },
    schemas: [
      generateRoleServiceSchema(role),
      generateBreadcrumbSchema(breadcrumbs),
      generateFAQSchemaObj(generateRoleFAQs(role)),
    ],
    content: {
      h1,
      intro,
      sections: [
        generateHeroContent("role", role),
        {
          type: "features",
          heading: "What I Offer",
          content: `As a ${role.title.toLowerCase()}, I provide:`,
          bulletPoints: role.responsibilities,
        },
        {
          type: "features",
          heading: "Ideal For",
          content: `This engagement works best for:`,
          bulletPoints: role.idealFor,
        },
        generateProcessContent(role.slug),
        generateCTAContent(role.slug),
      ],
      faqs: generateRoleFAQs(role),
    },
    links: {
      breadcrumbs,
      related: generateRelatedRoles(role),
      hub: { title: "Hire Developer", url: "/hire" },
    },
  };
}

// ============================================================================
// SCHEMA GENERATORS
// ============================================================================

function generateServiceSchema(location: LocationData) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${SEO_CONFIG.name} - Freelance Developer for ${location.city}`,
    description: `Professional freelance web development services for ${location.city} businesses`,
    url: `${SITE_URL}/hire/location/${location.slug}`,
    provider: {
      "@id": `${SITE_URL}/#person`,
    },
    areaServed: {
      "@type": location.state ? "City" : "Country",
      name: location.city,
      ...(location.state && { containedInPlace: { "@type": "State", name: location.state } }),
    },
    serviceType: ["Web Development", "Full-Stack Development", "React Development", "Next.js Development"],
  };
}

function generateSkillServiceSchema(skill: SkillData) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${SEO_CONFIG.name} - ${skill.name} Developer`,
    description: skill.description,
    url: `${SITE_URL}/hire/${skill.slug}`,
    provider: {
      "@id": `${SITE_URL}/#person`,
    },
    serviceType: [`${skill.name} Development`, ...skill.useCases],
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
  };
}

function generateIndustryServiceSchema(industry: IndustryData) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${SEO_CONFIG.name} - ${industry.name} Developer`,
    description: industry.description,
    url: `${SITE_URL}/services/${industry.slug}`,
    provider: {
      "@id": `${SITE_URL}/#person`,
    },
    serviceType: industry.commonProjects,
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
  };
}

function generateRoleServiceSchema(role: RoleData) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${SEO_CONFIG.name} - ${role.title}`,
    description: role.description,
    url: `${SITE_URL}/hire/${role.slug}`,
    provider: {
      "@id": `${SITE_URL}/#person`,
    },
    serviceType: role.responsibilities,
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
  };
}

function generateBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

function generateFAQSchemaObj(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ============================================================================
// RELATED CONTENT GENERATORS
// ============================================================================

import { SKILLS, ALL_LOCATIONS, INDUSTRIES, ROLES } from "./data";

function generateRelatedLocations(location: LocationData): Array<{ title: string; url: string; description: string }> {
  // Find locations in same region or country
  const related = ALL_LOCATIONS
    .filter(l => l.slug !== location.slug)
    .filter(l => l.region === location.region || l.country === location.country)
    .slice(0, 6)
    .map(l => ({
      title: `Developer for ${l.city}`,
      url: `/hire/location/${l.slug}`,
      description: `Freelance development services for ${l.city} businesses`,
    }));

  return related;
}

function generateRelatedSkills(skill: SkillData): Array<{ title: string; url: string; description: string }> {
  // Find related skills
  const relatedSlugs = skill.relatedSkills.map(s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
  const related = SKILLS
    .filter(s => s.slug !== skill.slug)
    .filter(s => relatedSlugs.includes(s.slug) || s.category === skill.category)
    .slice(0, 6)
    .map(s => ({
      title: `${s.name} Developer`,
      url: `/hire/${s.slug}`,
      description: s.description,
    }));

  return related;
}

function generateRelatedIndustries(industry: IndustryData): Array<{ title: string; url: string; description: string }> {
  return INDUSTRIES
    .filter(i => i.slug !== industry.slug)
    .slice(0, 6)
    .map(i => ({
      title: `Developer for ${i.name}`,
      url: `/services/${i.slug}`,
      description: i.description,
    }));
}

function generateRelatedRoles(role: RoleData): Array<{ title: string; url: string; description: string }> {
  return ROLES
    .filter(r => r.slug !== role.slug)
    .slice(0, 6)
    .map(r => ({
      title: `Hire ${r.title}`,
      url: `/hire/${r.slug}`,
      description: r.description,
    }));
}
