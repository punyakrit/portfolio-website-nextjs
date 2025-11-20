import Image from "next/image";
import React from "react";
import logo from "../../../public/img.jpg";
import { Button } from "../ui/button";
import { ModeToggle } from "./ModeToggle";
import Music from "./Music";

function NarBar() {
  return (
    <nav
      className="h-20 backdrop-blur-sm fixed top-0 left-0 right-0 max-w-4xl mx-auto px-16 py-4"
      style={{ fontFamily: "var(--font-fondamento)" }}
    >
      <div className=" flex justify-between ">
        <div className=" flex items-end gap-8">
          <Image
            src={logo}
            alt="logo"
            width={100}
            height={100}
            className="w-16 h-16 rounded-2xl object-cover"
          />
          <div className="flex gap-4">

          <div className="mb-3 text-lg cursor-pointer hover:underline delay-700">proof-of-work</div>
          <div className="mb-3 text-lg cursor-pointer hover:underline transition duration-700">blogs</div>
          </div>
        </div>
        <div className=" flex gap-4 items-end">
          <div className="mb-2">
            <Music />
          </div>{" "}
          <div className="mb-2">
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NarBar;
