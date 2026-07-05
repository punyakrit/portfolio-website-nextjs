"use client";
import React from "react";
import { Button } from "../ui/button";
import { FileText, Send } from "lucide-react";
import { socials } from "@/lib/socials";
import Link from "next/link";

function RedirectButtons() {
  return (
    <div className="flex flex-wrap gap-3">
      <Link href={socials.resume} target="_blank" rel="noopener noreferrer">
        <Button
          variant="outline"
          className="gap-2 cursor-pointer transition-transform duration-200 hover:-translate-y-0.5"
        >
          <FileText />
          Resume / CV
        </Button>
      </Link>
      <Link href={socials.cal} target="_blank" rel="noopener noreferrer">
        <Button
          variant="ghost"
          className="gap-2 cursor-pointer transition-transform duration-200 hover:-translate-y-0.5"
        >
          <Send />
          Contact Me
        </Button>
      </Link>
    </div>
  );
}

export default RedirectButtons;
