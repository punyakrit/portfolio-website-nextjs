import React from "react";
import Link from "next/link";
import GithubCalendarWrapper from "@/components/home/GithubCalendarWrapper";
import { getContributions } from "@/components/home/Github";
import { projects } from "@/lib/projectsData";
import { projectSlug } from "@/lib/projectSlug";
import { CRAFT_PHONES, REMJOBS_SHOTS } from "@/lib/showcase";
import { socials } from "@/lib/socials";
import CardStack from "./CardStack";
import PriceLine from "./PriceLine";
import PulseLines from "./PulseLines";
import RepoQuery from "./RepoQuery";
import Pipeline from "./Pipeline";
import { Rise, Tile } from "./Motion";
import { Reveal, CountUp } from "./Reveal";
import { WRAP } from "./Section";

// Used by /pow and the case studies.
export function Facts({
  project,
  columns,
}: {
  project: (typeof projects)[number];
  columns: string;
}) {
  if (!project.tiles) return null;
  return (
    <dl className={`mt-5 grid gap-x-6 gap-y-4 ${columns}`}>
      {project.tiles.map((tile) => (
        <div key={tile.label} className="flex flex-col-reverse">
          <dt className="text-sm leading-snug text-muted-foreground">{tile.label}</dt>
          <dd className="font-display text-xl leading-tight sm:text-2xl">{tile.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-[1.6rem] leading-none sm:text-4xl">
        <CountUp value={value} />
      </p>
      <p className="mt-1.5 text-[13px] leading-snug text-white/60 sm:text-sm">{label}</p>
    </div>
  );
}

function Caption({ title, text }: { title: string; text: string }) {
  return (
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/55 to-transparent p-5 pt-16 text-white sm:p-6 sm:pt-20">
      <h3 className="font-display text-xl leading-tight sm:text-2xl">{title}</h3>
      <p className="mt-1 text-sm leading-snug text-white/80">{text}</p>
    </div>
  );
}

async function Work() {
  const contributions = await getContributions(
    socials.github.split("/").pop() || "punyakrit"
  );
  const total = contributions?.reduce((sum, day) => sum + day.count, 0);

  return (
    <section id="work" className={`${WRAP} scroll-mt-20 pb-20 sm:pb-28`}>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-2 sm:mb-10">
        <Rise
          text="What I've built"
          className="font-display text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.05] tracking-[-0.02em]"
        />
        <p className="text-muted-foreground">Open any tile for the full case study.</p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-6 sm:gap-4 lg:grid-cols-12">
        {/* RemJobs leads, and takes the most room. */}
        <Tile href="/pow/remjobs" label="RemJobs case study" className="sm:col-span-6 lg:col-span-8">
          <div className="flex h-full min-h-[30rem] sm:min-h-[34rem] flex-col justify-between overflow-hidden bg-ink p-6 text-white sm:p-9">
            <div className="relative z-10 flex flex-col items-start gap-x-6 gap-y-3 sm:flex-row sm:justify-between">
              <div>
                <h3 className="font-display text-3xl leading-tight sm:text-4xl">RemJobs</h3>
                <p className="mt-2 max-w-[32ch] leading-snug text-white/70">
                  A live map of startups and their jobs, searchable from Claude
                  and ChatGPT. I built all of it alone.
                </p>
              </div>
              <span className="flex shrink-0 items-center gap-2 text-sm text-white/70 sm:mt-2">
                <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
                Paying users
              </span>
            </div>

            <div className="relative mx-auto my-8 w-[84%] max-w-[34rem] -translate-x-[4%] translate-y-[6%]">
              <CardStack srcs={REMJOBS_SHOTS} />
            </div>

            <div className="relative z-10 grid grid-cols-3 gap-3 sm:gap-4">
              <Stat value="400K+" label="live jobs" />
              <Stat value="250K+" label="startups" />
              <Stat value="MCP" label="server with OAuth" />
            </div>
          </div>
        </Tile>

        <Tile href="/pow/ai-demo-video-builder" label="AI Demo Video Builder case study" className="sm:col-span-6 lg:col-span-4" delay={0.08}>
          <div className="flex h-full flex-col bg-[#15132a] p-6 text-white sm:p-7">
            <h3 className="font-display text-2xl leading-tight">AI Demo Video Builder</h3>
            <p className="mt-2 leading-snug text-white/70">
              A screen recording in, a narrated demo out. AI decides, code executes.
            </p>
            <div className="mt-6 flex flex-1 flex-col">
              <Pipeline />
            </div>
            <p className="mt-5 text-sm text-white/60">4 models, 8 phases, 410 tests</p>
          </div>
        </Tile>

        <Tile href="/pow/infiniteugc" label="InfiniteUGC case study" className="sm:col-span-6 lg:col-span-5">
          <div className="relative h-[22rem] bg-[#cfe9fb]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/work/infiniteugc-hero.jpg"
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-left transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <Caption title="InfiniteUGC" text="AI video ads, 50+ brands in 32+ languages" />
          </div>
        </Tile>

        <Tile href="/pow/craft-trading" label="Craft Trading case study" className="sm:col-span-3 lg:col-span-3" delay={0.06}>
          <div className="relative h-[24rem] overflow-hidden bg-gradient-to-b from-[#0f766e] to-[#0b4f4a] p-6 text-white sm:h-[22rem]">
            <h3 className="font-display text-xl leading-tight sm:text-2xl">Craft Trading</h3>
            <p className="mt-1 text-sm leading-snug text-white/80">React Native, on the App Store</p>
            <PriceLine />
            <div className="absolute inset-x-0 -bottom-16 flex justify-center gap-3 px-6">
              {CRAFT_PHONES.map((src, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={src}
                  src={src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={`w-[46%] max-w-[9rem] rounded-t-xl shadow-2xl transition-transform duration-500 ${
                    i === 0
                      ? "translate-y-6 -rotate-3 group-hover:translate-y-3"
                      : "rotate-3 group-hover:-translate-y-3"
                  }`}
                />
              ))}
            </div>
          </div>
        </Tile>

        <Tile href="/pow/codelens" label="CodeLens case study" className="sm:col-span-3 lg:col-span-4" delay={0.12}>
          <div className="relative h-[22rem] bg-[#f7f8fb]">
            <RepoQuery />
            <Caption title="CodeLens" text="Ask an unfamiliar repo questions about itself" />
          </div>
        </Tile>

        <Tile href="/pow/pulse" label="Pulse case study" className="sm:col-span-6 lg:col-span-4">
          <div className="relative h-[20rem] bg-black">
            <PulseLines />
            <Caption title="Pulse" text="Uptime checks that corroborate across regions" />
          </div>
        </Tile>

        {contributions && (
          <Reveal className="min-w-0 sm:col-span-6 lg:col-span-8" delay={0.08}>
            <div className="flex h-full flex-col justify-between rounded-3xl bg-surface p-6 sm:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <p className="font-display text-2xl leading-tight">
                  {total?.toLocaleString("en-US")} contributions this year
                </p>
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground underline-offset-4"
                >
                  Most are private. See GitHub
                </a>
              </div>
              <div className="mt-5">
                <GithubCalendarWrapper data={contributions} />
              </div>
            </div>
          </Reveal>
        )}
      </div>

      <Reveal className="mt-6">
        <Link href="/pow" className="underline-offset-4">
          All case studies
        </Link>
      </Reveal>
    </section>
  );
}

export default Work;
