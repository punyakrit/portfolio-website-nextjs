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
  const topSkills = SKILLS.filter((s) => s.proficiency === "expert").slice(0, 8);

  const topLocations = INTERNATIONAL_LOCATIONS.filter((l) => l.isTechHub).slice(
    0,
    8
  );

  const topIndustries = INDUSTRIES.slice(0, 6);

  const topRoles = ROLES.slice(0, 4);

  return (
    <section className="px-4 sm:px-6 md:px-8 py-12 md:py-16">
      <div className="space-y-10 md:space-y-12">
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-5 md:mb-6">Hire by Technology</h2>
          <div className="flex flex-wrap gap-2.5 md:gap-3">
            {topSkills.map((skill) => (
              <Link
                key={skill.slug}
                href={`/hire/${skill.slug}`}
                className="px-4 py-2 text-sm border border-border rounded-full hover:border-primary hover:bg-muted/50 hover:shadow-sm transition-all duration-200 font-medium"
              >
                {skill.name} Developer
              </Link>
            ))}
            <Link
              href="/hire"
              className="px-4 py-2 text-sm border border-primary bg-primary text-primary-foreground rounded-full hover:bg-primary/90 hover:shadow-md transition-all duration-200 font-medium"
            >
              View All →
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-5 md:mb-6">Serving Clients Worldwide</h2>
          <div className="flex flex-wrap gap-2.5 md:gap-3">
            {topLocations.map((location) => (
              <Link
                key={location.slug}
                href={`/hire/location/${location.slug}`}
                className="px-4 py-2 text-sm border border-border rounded-full hover:border-primary hover:bg-muted/50 hover:shadow-sm transition-all duration-200 font-medium"
              >
                {location.city}
              </Link>
            ))}
            <Link
              href="/hire/location/remote"
              className="px-4 py-2 text-sm border border-primary bg-primary text-primary-foreground rounded-full hover:bg-primary/90 hover:shadow-md transition-all duration-200 font-medium"
            >
              Remote / Worldwide
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-5 md:mb-6">By Industry</h2>
            <div className="flex flex-wrap gap-2.5 md:gap-3">
              {topIndustries.map((industry) => (
                <Link
                  key={industry.slug}
                  href={`/services/${industry.slug}`}
                  className="px-4 py-2 text-sm border border-border rounded-full hover:border-primary hover:bg-muted/50 hover:shadow-sm transition-all duration-200 font-medium"
                >
                  {industry.name}
                </Link>
              ))}
              <Link
                href="/services"
                className="px-4 py-2 text-sm border border-primary bg-primary text-primary-foreground rounded-full hover:bg-primary/90 hover:shadow-md transition-all duration-200 font-medium"
              >
                More →
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-5 md:mb-6">Engagement Types</h2>
            <div className="flex flex-wrap gap-2.5 md:gap-3">
              {topRoles.map((role) => (
                <Link
                  key={role.slug}
                  href={`/hire/${role.slug}`}
                  className="px-4 py-2 text-sm border border-border rounded-full hover:border-primary hover:bg-muted/50 hover:shadow-sm transition-all duration-200 font-medium"
                >
                  {role.title}
                </Link>
              ))}
              <Link
                href="/hire"
                className="px-4 py-2 text-sm border border-primary bg-primary text-primary-foreground rounded-full hover:bg-primary/90 hover:shadow-md transition-all duration-200 font-medium"
              >
                More →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SEOLinks;
