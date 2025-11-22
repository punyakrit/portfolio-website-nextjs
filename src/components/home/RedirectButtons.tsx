"use client";
import React from "react";
import { Button } from "../ui/button";
import { FileText, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { socials } from "@/lib/socials";
import Link from "next/link";

function RedirectButtons() {
  const router = useRouter();
  return (
    <div className="flex flex-wrap gap-2 sm:gap-4">
      <Link href={socials.resume} target="_blank">
        <Button className="flex gap-2 items-center cursor-pointer" variant="outline">
          <FileText /> Resume / CV
        </Button>
      </Link>
    <Link href={socials.cal} target="_blank">
      <Button className="flex gap-2 items-center cursor-pointer border" variant="ghost">
        <Send /> Contact Me
      </Button>
    </Link>
    </div>
  );
}

export default RedirectButtons;
