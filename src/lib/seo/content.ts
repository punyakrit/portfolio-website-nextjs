export interface ContentValidation {
  isValid: boolean;
  issues: string[];
  warnings: string[];
}

export interface ContentMetrics {
  wordCount: number;
  headingCount: number;
  imageCount: number;
  linkCount: number;
  readingTime: number;
}

export function validateContent(
  content: string,
  minWords: number = 300,
  minHeadings: number = 2
): ContentValidation {
  const issues: string[] = [];
  const warnings: string[] = [];

  const wordCount = content.split(/\s+/).filter((word) => word.length > 0).length;
  const headingMatches = content.match(/<h[1-6][^>]*>/gi) || [];
  const headingCount = headingMatches.length;

  if (wordCount < minWords) {
    issues.push(`Content is too short: ${wordCount} words (minimum: ${minWords})`);
  }

  if (headingCount < minHeadings) {
    warnings.push(
      `Low heading count: ${headingCount} headings (recommended: ${minHeadings}+)`
    );
  }

  if (wordCount < 100) {
    issues.push("Content is extremely thin and may be penalized by search engines");
  }

  const imageMatches = content.match(/<img[^>]*>/gi) || [];
  if (imageMatches.length === 0) {
    warnings.push("No images found in content. Consider adding relevant images.");
  }

  return {
    isValid: issues.length === 0,
    issues,
    warnings,
  };
}

export function calculateReadingTime(content: string): number {
  const textContent = content.replace(/<[^>]*>/g, " ");
  const words = textContent
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  const wordsPerMinute = 200;
  const minutes = Math.ceil(words.length / wordsPerMinute);
  return Math.max(1, minutes);
}

export function getContentMetrics(content: string): ContentMetrics {
  const textContent = content.replace(/<[^>]*>/g, " ");
  const wordCount = textContent
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  const headingMatches = content.match(/<h[1-6][^>]*>/gi) || [];
  const imageMatches = content.match(/<img[^>]*>/gi) || [];
  const linkMatches = content.match(/<a[^>]*>/gi) || [];

  return {
    wordCount,
    headingCount: headingMatches.length,
    imageCount: imageMatches.length,
    linkCount: linkMatches.length,
    readingTime: calculateReadingTime(content),
  };
}

export function extractKeywords(content: string, limit: number = 10): string[] {
  const textContent = content
    .replace(/<[^>]*>/g, " ")
    .toLowerCase()
    .replace(/[^\w\s]/g, " ");

  const words = textContent
    .split(/\s+/)
    .filter((word) => word.length > 3);

  const stopWords = new Set([
    "the",
    "be",
    "to",
    "of",
    "and",
    "a",
    "in",
    "that",
    "have",
    "i",
    "it",
    "for",
    "not",
    "on",
    "with",
    "he",
    "as",
    "you",
    "do",
    "at",
    "this",
    "but",
    "his",
    "by",
    "from",
    "they",
    "we",
    "say",
    "her",
    "she",
    "or",
    "an",
    "will",
    "my",
    "one",
    "all",
    "would",
    "there",
    "their",
  ]);

  const wordFreq: Record<string, number> = {};

  words.forEach((word) => {
    if (!stopWords.has(word)) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });

  return Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word]) => word);
}

export function checkKeywordCannibalization(
  title1: string,
  title2: string,
  threshold: number = 0.7
): boolean {
  const words1 = new Set(
    title1
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2)
  );

  const words2 = new Set(
    title2
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2)
  );

  const intersection = new Set([...words1].filter((x) => words2.has(x)));
  const union = new Set([...words1, ...words2]);

  const similarity = intersection.size / union.size;

  return similarity >= threshold;
}

export function generateUniqueTitle(
  baseTitle: string,
  existingTitles: string[],
  modifier?: string
): string {
  let uniqueTitle = baseTitle;

  if (modifier) {
    uniqueTitle = `${baseTitle} ${modifier}`;
  }

  const isUnique = !existingTitles.some((existing) =>
    checkKeywordCannibalization(uniqueTitle, existing)
  );

  if (isUnique) {
    return uniqueTitle;
  }

  let counter = 1;
  while (
    existingTitles.some((existing) =>
      checkKeywordCannibalization(`${baseTitle} - ${counter}`, existing)
    )
  ) {
    counter++;
  }

  return `${baseTitle} - ${counter}`;
}

export function generateUniqueDescription(
  baseDescription: string,
  existingDescriptions: string[],
  minSimilarity: number = 0.8
): string {
  const similarity = (str1: string, str2: string): number => {
    const words1 = new Set(str1.toLowerCase().split(/\s+/));
    const words2 = new Set(str2.toLowerCase().split(/\s+/));
    const intersection = new Set([...words1].filter((x) => words2.has(x)));
    const union = new Set([...words1, ...words2]);
    return intersection.size / union.size;
  };

  const isUnique = !existingDescriptions.some(
    (existing) => similarity(baseDescription, existing) >= minSimilarity
  );

  if (isUnique) {
    return baseDescription;
  }

  const variations = [
    `${baseDescription} Learn more about this topic.`,
    `${baseDescription} Discover insights and best practices.`,
    `${baseDescription} Explore detailed information and examples.`,
  ];

  for (const variation of variations) {
    const isVariationUnique = !existingDescriptions.some(
      (existing) => similarity(variation, existing) >= minSimilarity
    );
    if (isVariationUnique) {
      return variation;
    }
  }

  return baseDescription;
}
