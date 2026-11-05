import React from "react";
import { socials } from "@/lib/socials";
import StartupMap from "./StartupMap";
import { Drift, Magnetic, Rise } from "./Motion";
import { Reveal } from "./Reveal";
import { WRAP } from "./Section";

function Intro() {
  return (
    <header id="top">
      <div className={`${WRAP} pt-8 sm:pt-12`}>
        <Rise
          as="h1"
          onLoad
          text="Punyakrit Singh Makhni"
          className="font-display text-[clamp(2.75rem,6.5vw,5.75rem)] leading-[1] tracking-[-0.03em]"
        />

        <div
          className="rise mt-5 grid gap-x-8 gap-y-6 sm:mt-7 lg:grid-cols-12 lg:items-end"
          style={{ animationDelay: "280ms" }}
        >
          <p className="max-w-[36ch] text-[clamp(1.25rem,2vw,1.625rem)] leading-[1.3] lg:col-span-7">
            Full-stack AI engineer. I build AI products end to end: the model
            makes the judgment calls and plain code carries them out.
          </p>

          <div className="lg:col-span-5 lg:justify-self-end">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <Magnetic>
                <a
                  href={socials.cal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center rounded-full bg-foreground px-5 text-sm font-medium text-background no-underline"
                >
                  Book a 15-minute call
                </a>
              </Magnetic>
              <a href={`mailto:${socials.email}`} className="text-sm underline-offset-4">
                Email me
              </a>
            </div>
            <p className="mt-3 text-sm leading-snug text-muted-foreground">
              Open to remote full-stack, AI and founding engineer roles.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 w-full max-w-[110rem] sm:mt-8">
        <Drift>
          <StartupMap />
        </Drift>
      </div>

      <div className={WRAP}>
        <div className="grid gap-x-8 gap-y-8 pb-16 pt-4 sm:pb-24 lg:grid-cols-12">
          <p className="font-serif text-[17px] italic leading-snug text-muted-foreground lg:col-span-4">
            Every dot is a place with startups on{" "}
            <a
              href="https://www.remjobs.works/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-4"
            >
              RemJobs
            </a>
            , the product I built alone. The orange pin is me.
          </p>

          <Reveal className="max-w-[60ch] space-y-5 text-lg leading-[1.6] lg:col-span-7 lg:col-start-6">
            <p>
              RemJobs is my own product: 400K+ live jobs from 250K+ startups,
              searchable from Claude and ChatGPT through an MCP server I built.
              About 200 people visit a day and it has paying users. I built all
              of it on my own.
            </p>
            <p className="text-muted-foreground">
              Before that I spent 2 years working remotely for US startups. I
              built Muze CMO from scratch, and the signup flow 15,000+ students
              used at Gradly to get US health insurance.
            </p>
          </Reveal>
        </div>
      </div>
    </header>
  );
}

export default Intro;
