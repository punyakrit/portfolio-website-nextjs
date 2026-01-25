/**
 * Programmatic SEO Module
 *
 * Central export for all programmatic SEO functionality.
 * Designed to scale to 100,000+ pages while maintaining quality.
 */

// Types
export * from "./types";

// Data
export {
  // Location Data
  INDIA_CITIES,
  INDIA_STATES,
  INTERNATIONAL_LOCATIONS,
  ALL_LOCATIONS,

  // Extended Location Data
  US_CITIES_EXTENDED,
  US_STATES,
  EUROPE_EXTENDED,
  APAC_EXTENDED,
  MIDDLE_EAST_EXTENDED,
  ALL_EXTENDED_LOCATIONS,

  // Skill Data
  SKILLS,

  // Industry Data
  INDUSTRIES,

  // Role Data
  ROLES,

  // Service Data
  SERVICES,

  // Combinations
  generateCombinationPages,

  // Lookup Functions
  getLocationBySlug,
  getSkillBySlug,
  getIndustryBySlug,
  getRoleBySlug,
  getServiceBySlug,
  getAllSlugs,
  getTotalProgrammaticPages,
} from "./data";

// Extended Data (Use Cases, Combinations)
export {
  USE_CASES,
  getUseCaseBySlug,
  generateAllCombinationPages,
  getTotalExtendedPages,
  type UseCaseData,
  type CombinationPageData,
} from "./extended-data";

// Content Generation
export {
  // Title Generators
  generateLocationTitle,
  generateSkillTitle,
  generateIndustryTitle,
  generateRoleTitle,

  // Description Generators
  generateLocationDescription,
  generateSkillDescription,
  generateIndustryDescription,
  generateRoleDescription,

  // FAQ Generators
  generateLocationFAQs,
  generateSkillFAQs,
  generateIndustryFAQs,
  generateRoleFAQs,

  // Full Page Generators
  generateLocationPage,
  generateSkillPage,
  generateIndustryPage,
  generateRolePage,
} from "./generator";

// Safeguards
export {
  validatePageContent,
  detectKeywordCannibalization,
  identifyCanonicalGroups,
  validateAllPages,
  generateNoIndexList,
  shouldNoIndex,
  type CannibalizationIssue,
  type BatchValidationResult,
} from "./safeguards";
