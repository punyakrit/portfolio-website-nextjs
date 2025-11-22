import Projects from "@/components/pow/Projects"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects | Punyakrit Singh Makhni",
  description:
    "Explore my portfolio of web development projects including CodeLens, Pulse, and more. Full-stack applications built with React, Next.js, TypeScript, and modern technologies.",
  keywords: [
    "web development projects",
    "portfolio projects",
    "React projects",
    "Next.js projects",
    "full-stack projects",
    "open source projects",
    "CodeLens",
    "Pulse monitoring",
    "TypeScript projects",
  ],
  alternates: {
    canonical: "/pow",
  },
  
}

function page() {
  return (
    <div className='px-2 md:px-8 md:my-32 my-24'>
      <Projects showAll={true} />
    </div>
  )
}
export default page