import Link from "next/link";
import { RelatedPage } from "@/lib/seo/linking";

interface RelatedPagesProps {
  pages: RelatedPage[];
  title?: string;
  maxItems?: number;
}

export function RelatedPages({
  pages,
  title = "Related Pages",
  maxItems = 6,
}: RelatedPagesProps) {
  if (pages.length === 0) {
    return null;
  }

  const displayedPages = pages.slice(0, maxItems);

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedPages.map((page, index) => (
          <Link
            key={index}
            href={page.url}
            className="group p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
          >
            <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
              {page.title}
            </h3>
            {page.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {page.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
