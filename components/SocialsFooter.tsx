import { Github, Linkedin, Mail, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const socials = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/punyakrit-singh-makhni/",
    icon: Linkedin,
  },
  {
    name: "GitHub",
    url: "https://github.com/punyakrit",
    icon: Github,
  },
  {
    name: "X",
    url: "https://www.x.com/punyakrit_22",
    icon: X,
  },
  {
    name: "Email",
    url: "mailto:punyakritsinghmakhni@gmail.com",
    icon: Mail,
  },
];

function SocialsFooter() {
  return (
    <nav className="fixed bottom-4 sm:bottom-10 left-0 right-0 z-50 flex justify-center">
      <div className="flex items-center backdrop-blur-sm border border-white/10 rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-lg">
        <div className="flex items-center gap-4 sm:gap-6">
          {socials.map((social, index) => (
            <a 
              href={social.url} 
              key={index} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 cursor-pointer hover:text-white transition-all duration-300 hover:scale-110"
            >
              <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          ))}
          <div className="bg-white/20 w-px h-4 sm:h-6 mx-1"></div>
          <Link href="/" className="cursor-pointer">
          <Image 
            src="/img.jpg" 
            alt="Profile" 
            width={24} 
            height={24} 
            className="rounded-lg hover:border-white/40 transition-colors duration-300 object-cover aspect-square sm:w-8 sm:h-8" 
            />
            </Link>
        </div>
      </div>
    </nav>
  );
}

export default SocialsFooter;
