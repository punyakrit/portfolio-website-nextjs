/**
 * Programmatic SEO Safeguards
 *
 * Validation and protection against common programmatic SEO issues:
 * - Thin content
 * - Duplicate content
 * - Keyword cannibalization
 * - Missing essential elements
 */

import type { PageGenerationResult, ValidationResult, CanonicalGroup } from "./types";
import { SITE_URL } from "../../seo";

// ============================================================================
// CONTENT VALIDATION
// ============================================================================

const MIN_WORD_COUNT = 300;
const MAX_KEYWORD_DENSITY = 3; // percentage
const MIN_KEYWORD_DENSITY = 0.5; // percentage
const MIN_UNIQUE_WORDS_RATIO = 0.3; // 30% unique words

export function validatePageContent(
  page: PageGenerationResult,
  allPages?: PageGenerationResult[]
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Collect all text content
  const allText = collectAllText(page);
  const words = allText.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;

  // Check minimum word count
  if (wordCount < MIN_WORD_COUNT) {
    errors.push(`Page has only ${wordCount} words. Minimum required: ${MIN_WORD_COUNT}`);
  }

  // Check for thin content
  if (wordCount < 500) {
    warnings.push(`Page has ${wordCount} words. Consider adding more content for better SEO.`);
  }

  // Check title length
  const titleLength = page.metadata.title.length;
  if (titleLength < 30) {
    warnings.push(`Title too short (${titleLength} chars). Aim for 50-60 characters.`);
  }
  if (titleLength > 60) {
    warnings.push(`Title too long (${titleLength} chars). May be truncated in search results.`);
  }

  // Check description length
  const descLength = page.metadata.description.length;
  if (descLength < 100) {
    warnings.push(`Description too short (${descLength} chars). Aim for 120-160 characters.`);
  }
  if (descLength > 160) {
    warnings.push(`Description too long (${descLength} chars). May be truncated in search results.`);
  }

  // Check keyword density
  const keywordDensity = calculateKeywordDensity(page.metadata.keywords, allText);
  Object.entries(keywordDensity).forEach(([keyword, density]) => {
    if (density > MAX_KEYWORD_DENSITY) {
      warnings.push(`Keyword "${keyword}" appears too frequently (${density.toFixed(1)}%). May trigger spam filters.`);
    }
  });

  // Check uniqueness ratio
  const uniqueWords = new Set(words.map(w => w.toLowerCase()));
  const uniquenessRatio = uniqueWords.size / words.length;
  if (uniquenessRatio < MIN_UNIQUE_WORDS_RATIO) {
    warnings.push(`Low content uniqueness (${(uniquenessRatio * 100).toFixed(0)}%). Content may be repetitive.`);
  }

  // Check for required elements
  if (!page.content.h1) {
    errors.push("Missing H1 heading");
  }
  if (!page.content.intro) {
    errors.push("Missing intro content");
  }
  if (page.content.faqs.length < 3) {
    warnings.push(`Only ${page.content.faqs.length} FAQs. Consider adding more for FAQ schema.`);
  }
  if (!page.metadata.canonical) {
    errors.push("Missing canonical URL");
  }

  // Check for duplicate content (if all pages provided)
  if (allPages && allPages.length > 0) {
    const similarity = checkContentSimilarity(page, allPages);
    if (similarity.maxSimilarity > 0.8) {
      errors.push(`High similarity (${(similarity.maxSimilarity * 100).toFixed(0)}%) with page: ${similarity.similarTo}`);
    } else if (similarity.maxSimilarity > 0.6) {
      warnings.push(`Moderate similarity (${(similarity.maxSimilarity * 100).toFixed(0)}%) with page: ${similarity.similarTo}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    wordCount,
    uniquenessScore: uniquenessRatio,
    keywordDensity,
  };
}

function collectAllText(page: PageGenerationResult): string {
  const parts: string[] = [
    page.metadata.title,
    page.metadata.description,
    page.content.h1,
    page.content.intro,
    ...page.content.sections.flatMap(s => [
      s.heading || "",
      s.content,
      ...(s.bulletPoints || []),
    ]),
    ...page.content.faqs.flatMap(f => [f.question, f.answer]),
  ];

  return parts.filter(Boolean).join(" ");
}

function calculateKeywordDensity(keywords: string[], text: string): Record<string, number> {
  const textLower = text.toLowerCase();
  const wordCount = text.split(/\s+/).length;
  const density: Record<string, number> = {};

  for (const keyword of keywords.slice(0, 10)) {
    const keywordLower = keyword.toLowerCase();
    const matches = textLower.split(keywordLower).length - 1;
    density[keyword] = (matches / wordCount) * 100;
  }

  return density;
}

function checkContentSimilarity(
  page: PageGenerationResult,
  allPages: PageGenerationResult[]
): { maxSimilarity: number; similarTo: string } {
  const pageText = collectAllText(page);
  const pageWords = new Set(pageText.toLowerCase().split(/\s+/));

  let maxSimilarity = 0;
  let similarTo = "";

  for (const other of allPages) {
    if (other.metadata.canonical === page.metadata.canonical) continue;

    const otherText = collectAllText(other);
    const otherWords = new Set(otherText.toLowerCase().split(/\s+/));

    // Jaccard similarity
    const intersection = new Set([...pageWords].filter(w => otherWords.has(w)));
    const union = new Set([...pageWords, ...otherWords]);
    const similarity = intersection.size / union.size;

    if (similarity > maxSimilarity) {
      maxSimilarity = similarity;
      similarTo = other.metadata.canonical;
    }
  }

  return { maxSimilarity, similarTo };
}

// ============================================================================
// KEYWORD CANNIBALIZATION DETECTION
// ============================================================================

export interface CannibalizationIssue {
  keyword: string;
  pages: string[];
  severity: "high" | "medium" | "low";
  recommendation: string;
}

export function detectKeywordCannibalization(
  pages: PageGenerationResult[]
): CannibalizationIssue[] {
  const keywordToPages: Map<string, string[]> = new Map();
  const issues: CannibalizationIssue[] = [];

  // Build keyword -> pages mapping
  for (const page of pages) {
    for (const keyword of page.metadata.keywords) {
      const keywordLower = keyword.toLowerCase();
      const existingPages = keywordToPages.get(keywordLower) || [];
      existingPages.push(page.metadata.canonical);
      keywordToPages.set(keywordLower, existingPages);
    }
  }

  // Find keywords targeting multiple pages
  for (const [keyword, pagePaths] of keywordToPages) {
    if (pagePaths.length > 1) {
      const severity = getSeverity(keyword, pagePaths.length);
      const recommendation = getRecommendation(keyword, pagePaths.length, severity);

      issues.push({
        keyword,
        pages: pagePaths,
        severity,
        recommendation,
      });
    }
  }

  // Sort by severity
  return issues.sort((a, b) => {
    const severityOrder = { high: 0, medium: 1, low: 2 };
    return severityOrder[a.severity] - severityOrder[b.severity];
  });
}

function getSeverity(keyword: string, pageCount: number): "high" | "medium" | "low" {
  // High-value keywords with many competing pages are high severity
  const highValueKeywords = [
    "freelance developer",
    "hire developer",
    "web developer",
    "react developer",
    "next.js developer",
    "full-stack developer",
  ];

  const isHighValue = highValueKeywords.some(k => keyword.includes(k));

  if (isHighValue && pageCount > 3) return "high";
  if (pageCount > 5) return "high";
  if (pageCount > 3) return "medium";
  return "low";
}

function getRecommendation(keyword: string, pageCount: number, severity: "high" | "medium" | "low"): string {
  if (severity === "high") {
    return `Consolidate pages targeting "${keyword}" or make each page target a more specific variation (e.g., add location or skill modifiers).`;
  }
  if (severity === "medium") {
    return `Consider differentiating the keyword focus for pages targeting "${keyword}". Each page should have unique modifiers.`;
  }
  return `Multiple pages target "${keyword}" but this is acceptable for hub/spoke structures. Ensure internal linking is clear.`;
}

// ============================================================================
// CANONICAL URL MANAGEMENT
// ============================================================================

export function identifyCanonicalGroups(pages: PageGenerationResult[]): CanonicalGroup[] {
  const groups: CanonicalGroup[] = [];
  const processed = new Set<string>();

  for (const page of pages) {
    if (processed.has(page.metadata.canonical)) continue;

    // Find pages with very similar content
    const similar = pages.filter(p => {
      if (p.metadata.canonical === page.metadata.canonical) return false;
      if (processed.has(p.metadata.canonical)) return false;

      const pageText = collectAllText(page);
      const otherText = collectAllText(p);

      // Quick check: if intro is identical, they're duplicates
      if (page.content.intro === p.content.intro) return true;

      // Jaccard similarity > 0.9
      const pageWords = new Set(pageText.toLowerCase().split(/\s+/));
      const otherWords = new Set(otherText.toLowerCase().split(/\s+/));
      const intersection = new Set([...pageWords].filter(w => otherWords.has(w)));
      const union = new Set([...pageWords, ...otherWords]);
      return (intersection.size / union.size) > 0.9;
    });

    if (similar.length > 0) {
      groups.push({
        canonical: page.metadata.canonical,
        duplicates: similar.map(s => s.metadata.canonical),
        reason: "Content similarity > 90%",
      });

      similar.forEach(s => processed.add(s.metadata.canonical));
    }

    processed.add(page.metadata.canonical);
  }

  return groups;
}

// ============================================================================
// BATCH VALIDATION
// ============================================================================

export interface BatchValidationResult {
  totalPages: number;
  validPages: number;
  pagesWithErrors: number;
  pagesWithWarnings: number;
  cannibalizationIssues: CannibalizationIssue[];
  canonicalGroups: CanonicalGroup[];
  summary: string;
}

export function validateAllPages(pages: PageGenerationResult[]): BatchValidationResult {
  let validPages = 0;
  let pagesWithErrors = 0;
  let pagesWithWarnings = 0;

  for (const page of pages) {
    const validation = validatePageContent(page, pages);
    if (validation.isValid) {
      validPages++;
      if (validation.warnings.length > 0) {
        pagesWithWarnings++;
      }
    } else {
      pagesWithErrors++;
    }
  }

  const cannibalizationIssues = detectKeywordCannibalization(pages);
  const canonicalGroups = identifyCanonicalGroups(pages);

  const summary = generateValidationSummary({
    totalPages: pages.length,
    validPages,
    pagesWithErrors,
    pagesWithWarnings,
    cannibalizationIssues,
    canonicalGroups,
  });

  return {
    totalPages: pages.length,
    validPages,
    pagesWithErrors,
    pagesWithWarnings,
    cannibalizationIssues,
    canonicalGroups,
    summary,
  };
}

function generateValidationSummary(result: Omit<BatchValidationResult, "summary">): string {
  const lines: string[] = [
    `SEO Validation Summary`,
    `======================`,
    ``,
    `Total Pages: ${result.totalPages}`,
    `Valid Pages: ${result.validPages} (${((result.validPages / result.totalPages) * 100).toFixed(1)}%)`,
    `Pages with Errors: ${result.pagesWithErrors}`,
    `Pages with Warnings: ${result.pagesWithWarnings}`,
    ``,
  ];

  if (result.cannibalizationIssues.length > 0) {
    lines.push(`Keyword Cannibalization Issues: ${result.cannibalizationIssues.length}`);
    const highSeverity = result.cannibalizationIssues.filter(i => i.severity === "high");
    if (highSeverity.length > 0) {
      lines.push(`  - High Severity: ${highSeverity.length}`);
    }
    lines.push(``);
  }

  if (result.canonicalGroups.length > 0) {
    lines.push(`Duplicate Content Groups: ${result.canonicalGroups.length}`);
    lines.push(`  - Total affected pages: ${result.canonicalGroups.reduce((acc, g) => acc + g.duplicates.length, 0)}`);
    lines.push(``);
  }

  if (result.pagesWithErrors === 0 && result.cannibalizationIssues.filter(i => i.severity === "high").length === 0) {
    lines.push(`✅ All pages pass validation with no critical issues.`);
  } else {
    lines.push(`⚠️ Some pages require attention. Review errors and high-severity cannibalization issues.`);
  }

  return lines.join("\n");
}

// ============================================================================
// EXPORT UTILITIES
// ============================================================================

export function generateNoIndexList(pages: PageGenerationResult[]): string[] {
  const noIndexPages: string[] = [];

  for (const page of pages) {
    const validation = validatePageContent(page);
    if (!validation.isValid) {
      noIndexPages.push(page.metadata.canonical);
    }
  }

  return noIndexPages;
}

export function shouldNoIndex(page: PageGenerationResult): boolean {
  const validation = validatePageContent(page);
  return !validation.isValid;
}
