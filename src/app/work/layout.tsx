import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Work Experience | Punyakrit Singh Makhni",
  description:
    "View the professional work experience and career journey of Punyakrit Singh Makhni. Full-stack developer with expertise in modern web technologies.",
  keywords: [
    "work experience",
    "career history",
    "professional experience",
    "full-stack developer experience",
    "software engineer career",
    "web developer portfolio",
  ],
  alternates: {
    canonical: "/work",
  },
  
}

function WorkLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>{children}</div>
  )
}

export default WorkLayout
