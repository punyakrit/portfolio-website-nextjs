"use client";

import { socials } from "@/lib/socials";
import React from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, FileText, Calendar } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SocialLink = {
  name: string;
  url: string;
  icon: React.ElementType;
  // The original called this `show` and set it to `!showAll`, then gated with
  // `if (social.show && !showAll) return null` - a double negative that happened
  // to land on the right answer. Same behaviour, named for what it does.
  showOnlyWhenExpanded?: boolean;
};

function MultiSocials({ showAll }: { showAll: boolean }) {
  const socialLinks: SocialLink[] = [
    {
      // The original used lucide's `X` - the close glyph - as the X logo. This is
      // the actual mark, and matches the one the Footer renders.
      name: "X",
      url: socials.x,
      icon: FaXTwitter,
    },
    {
      name: "GitHub",
      url: socials.github,
      icon: Github,
    },
    {
      name: "LinkedIn",
      url: socials.linkedin,
      icon: Linkedin,
    },
    {
      name: "Email",
      url: `mailto:${socials.email}`,
      icon: Mail,
    },
    {
      name: "Resume",
      url: socials.resume,
      icon: FileText,
      showOnlyWhenExpanded: true,
    },
    {
      name: "Cal",
      url: socials.cal,
      icon: Calendar,
      showOnlyWhenExpanded: true,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1">
      {socialLinks.map((social) => {
        const Icon = social.icon;
        if (social.showOnlyWhenExpanded && !showAll) return null;
        const isEmail = social.name === "Email";
        return (
          // ui/tooltip nests its own TooltipProvider inside every Tooltip, so an
          // outer provider's delayDuration is swallowed. Set it per tooltip
          // instead - Radix's Root prop wins over the provider default.
          <Tooltip key={social.name} delayDuration={100}>
            <TooltipTrigger asChild>
              <Link
                href={social.url}
                target={isEmail ? undefined : "_blank"}
                rel={isEmail ? undefined : "noopener noreferrer"}
                aria-label={social.name}
                className="flex h-10 w-10 items-center justify-center text-muted-foreground no-underline transition-colors duration-200 hover:bg-foreground/5 hover:text-foreground"
              >
                <Icon className="h-5 w-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{social.name}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}

export default MultiSocials;
