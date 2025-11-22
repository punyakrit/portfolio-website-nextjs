import Image from "next/image";
import React from "react";
import logo from "../../../public/img.jpg";
import { Button } from "../ui/button";
import { ModeToggle } from "./ModeToggle";
import Music from "./Music";
import Link from "next/link";
import { env } from "@/lib/env";
function NavBar() {

  const image = env.NEXT_PUBLIC_CLOUDFRONT_URL + "/img.jpg"
  return (
    <nav
      className="h-20 backdrop-blur-sm fixed top-0 left-0 right-0 max-w-4xl mx-auto px-16 py-4 z-20"
      style={{ fontFamily: "var(--font-fondamento)" }}
    >
      <div className=" flex justify-between ">
        <div className=" flex items-end gap-8">
          <Link href="/" className="mb-3 text-lg cursor-pointer hover:underline delay-700">
          <Image
            src={image}
            alt="logo"
            width={100}
            height={100}
            className="w-16 h-16 rounded-2xl object-cover "
          />
          </Link>
          <div className="flex gap-4">

          <Link href="/pow" className="mb-7 text-lg cursor-pointer hover:underline delay-700">proof-of-work</Link>
          <Link href="/work" className="mb-7 text-lg cursor-pointer hover:underline delay-700">work</Link>
          <Link href="/blogs" className="mb-7 text-lg cursor-pointer hover:underline transition duration-700">blogs</Link>
          </div>
        </div>
        <div className=" flex gap-4 items-end">
          <div className="mb-6">
            <Music />
          </div>{" "}
          <div className="mb-6">
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
