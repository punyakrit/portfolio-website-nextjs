import {
  checkKeywordCannibalization,
  generateUniqueTitle,
  generateUniqueDescription,
  validateContent,
  type ContentValidation,
} from "./content";

export interface PageValidationResult {
  isValid: boolean;
  issues: string[];
  warnings: string[];
  suggestions: string[];
}

export interface PageData {
  title: string;
  description: string;
  path: string;
  content: string;
  keywords?: string[];
  tags?: string[];
}

export interface ExistingPage {
  title: string;
  description: string;
  path: string;
}

export function validatePageForSEO(
  page: PageData,
  existingPages: ExistingPage[] = []
): PageValidationResult {
  const issues: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];

  const contentValidation = validateContent(page.content);
  if (!contentValidation.isValid) {
    issues.push(...contentValidation.issues);
  }
  warnings.push(...contentValidation.warnings);

  if (page.title.length < 30) {
    warnings.push("Title is shorter than recommended (30-60 characters)");
  }
  if (page.title.length > 60) {
    warnings.push("Title exceeds recommended length (60 characters)");
  }

  if (page.description.length < 120) {
    warnings.push("Description is shorter than recommended (120-160 characters)");
  }
  if (page.description.length > 160) {
    warnings.push("Description exceeds recommended length (160 characters)");
  }

  if (!page.keywords || page.keywords.length === 0) {
    warnings.push("No keywords specified");
  }

  if (!page.tags || page.tags.length === 0) {
    suggestions.push("Consider adding tags for better categorization");
  }

  const duplicateTitle = existingPages.find(
    (existing) =>
      existing.path !== page.path &&
      checkKeywordCannibalization(existing.title, page.title)
  );

  if (duplicateTitle) {
    issues.push(
      `Title may cannibalize keywords with existing page: ${duplicateTitle.path}`
    );
    suggestions.push(
      `Consider using: ${generateUniqueTitle(page.title, existingPages.map((p) => p.title))}`
    );
  }

  const duplicateDescription = existingPages.find((existing) => {
    if (existing.path === page.path) return false;
    const similarity =
      existing.description.toLowerCase() === page.description.toLowerCase();
    return similarity;
  });

  if (duplicateDescription) {
    warnings.push(
      `Description is identical to existing page: ${duplicateDescription.path}`
    );
    suggestions.push(
      `Consider using: ${generateUniqueDescription(page.description, existingPages.map((p) => p.description))}`
    );
  }

  if (!page.path.startsWith("/")) {
    issues.push("Path must start with '/'");
  }

  if (page.path.length > 100) {
    warnings.push("URL path is very long, consider shortening");
  }

  return {
    isValid: issues.length === 0,
    issues,
    warnings,
    suggestions,
  };
}

export function validateBulkPages(
  pages: PageData[]
): Map<string, PageValidationResult> {
  const results = new Map<string, PageValidationResult>();
  const existingPages: ExistingPage[] = [];

  for (const page of pages) {
    const validation = validatePageForSEO(page, existingPages);
    results.set(page.path, validation);
    existingPages.push({
      title: page.title,
      description: page.description,
      path: page.path,
    });
  }

  return results;
}
