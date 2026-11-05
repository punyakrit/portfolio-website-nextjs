import React from "react";

// NOT ON THE PAGE YET. The Oct 15 Loom below says "over 200,000 jobs" and the old
// always-on scraper setup, which contradicts the numbers on the page. Record a
// new one, swap the id here, then add <Walkthrough /> to src/app/page.tsx below
// FeaturedProjects.
const LOOM_EMBED =
  "https://www.loom.com/embed/ef416a942d8949c5b34a357a74a9cc69?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true";

function Walkthrough() {
  return (
    <div className="px-4 sm:px-6 md:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold">Walkthrough</h2>
      <p className="mt-2 mb-5 text-sm sm:text-base text-muted-foreground">
        About 3 minutes on what I built at Gradly, InfiniteUGC and RemJobs.
      </p>
      <div className="relative aspect-[1110/832] w-full overflow-hidden rounded-xl border border-border/40 bg-muted/40">
        <iframe
          src={LOOM_EMBED}
          title="Walkthrough of Gradly, InfiniteUGC and RemJobs"
          loading="lazy"
          allow="fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  );
}

export default Walkthrough;
