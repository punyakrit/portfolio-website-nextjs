/**
 * SEO Internal Linking Component
 *
 * Hub-and-spoke internal linking section for SEO.
 * Links to key programmatic pages to distribute page authority.
 */

import Link from "next/link";
import {
  SKILLS,
  ROLES,
  INDUSTRIES,
  INTERNATIONAL_LOCATIONS,
} from "@/lib/seo/programmatic";

export function SEOLinks() {
  // Top skills to highlight
  const topSkills = SKILLS.filter((s) => s.proficiency === "expert").slice(0, 8);

  // Top locations (focus on international)
  const topLocations = INTERNATIONAL_LOCATIONS.filter((l) => l.isTechHub).slice(
    0,
    8
  );

  // Top industries
  const topIndustries = INDUSTRIES.slice(0, 6);

  // Top roles
  const topRoles = ROLES.slice(0, 4);

  return (
    <section className="px-4 py-8">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Hire by Technology</h2>
        <div className="flex flex-wrap gap-2">
          {topSkills.map((skill) => (
            <Link
              key={skill.slug}
              href={`/hire/${skill.slug}`}
              className="px-3 py-1.5 text-sm border border-border rounded-full hover:border-primary hover:bg-muted/50 transition-all"
            >
              {skill.name} Developer
            </Link>
          ))}
          <Link
            href="/hire"
            className="px-3 py-1.5 text-sm border border-primary bg-primary/10 rounded-full hover:bg-primary/20 transition-all font-medium"
          >
            View All →
          </Link>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Serving Clients Worldwide</h2>
        <div className="flex flex-wrap gap-2">
          {topLocations.map((location) => (
            <Link
              key={location.slug}
              href={`/hire/location/${location.slug}`}
              className="px-3 py-1.5 text-sm border border-border rounded-full hover:border-primary hover:bg-muted/50 transition-all"
            >
              {location.city}
            </Link>
          ))}
          <Link
            href="/hire/location/remote"
            className="px-3 py-1.5 text-sm border border-primary bg-primary/10 rounded-full hover:bg-primary/20 transition-all font-medium"
          >
            Remote / Worldwide
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-bold mb-4">By Industry</h2>
          <div className="flex flex-wrap gap-2">
            {topIndustries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/services/${industry.slug}`}
                className="px-3 py-1.5 text-sm border border-border rounded-full hover:border-primary hover:bg-muted/50 transition-all"
              >
                {industry.name}
              </Link>
            ))}
            <Link
              href="/services"
              className="px-3 py-1.5 text-sm text-primary hover:underline"
            >
              More →
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Engagement Types</h2>
          <div className="flex flex-wrap gap-2">
            {topRoles.map((role) => (
              <Link
                key={role.slug}
                href={`/hire/${role.slug}`}
                className="px-3 py-1.5 text-sm border border-border rounded-full hover:border-primary hover:bg-muted/50 transition-all"
              >
                {role.title}
              </Link>
            ))}
            <Link
              href="/hire"
              className="px-3 py-1.5 text-sm text-primary hover:underline"
            >
              More →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SEOLinks;
