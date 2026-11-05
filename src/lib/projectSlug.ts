/** URL slug for a project page, from its title. One definition for every caller. */
export function projectSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
