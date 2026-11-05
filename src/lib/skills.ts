import { 
  SiReact, 
  SiExpo,
  SiNextdotjs, 
  SiTypescript, 
  SiJavascript, 
  SiNodedotjs, 
  SiPython, 
  SiPostgresql, 
  SiMongodb, 
  SiRedis, 
  SiDocker, 
  SiTailwindcss, 
  SiHtml5, 
  SiCss, 
  SiGit, 
  SiGithub, 
  SiExpress, 
  SiFastapi,
  SiSupabase,
  SiPostman,
  SiVercel,
  SiBun,
  SiPrisma,
  SiGraphql,
  SiJest,
  SiTestinglibrary,
  SiFigma,
  SiLinux,
  SiNginx,
  SiClaude,
  SiGooglegemini,
  SiCloudflare,
  SiSocketdotio,
  SiClerk
} from 'react-icons/si';
// react-icons 5.7.0 removed SiAmazon; the AWS mark now lives in the fa6 set.
import { FaAws } from 'react-icons/fa6';
import { TbBrandOpenai } from 'react-icons/tb';
import { Plug, Search, Workflow } from 'lucide-react';

export interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'devops' | 'other';
}

export const skills: Readonly<Skill[]> = [
  {
    name: 'React',
    icon: SiReact,
    category: 'frontend'
  },
  {
    name: 'React Native',
    icon: SiReact,
    category: 'frontend'
  },
  {
    name: 'Expo',
    icon: SiExpo,
    category: 'frontend'
  },
  {
    name: 'Next.js',
    icon: SiNextdotjs,
    category: 'frontend'
  },
  {
    name: 'TypeScript',
    icon: SiTypescript,
    category: 'frontend'
  },
  {
    name: 'JavaScript',
    icon: SiJavascript,
    category: 'frontend'
  },
  {
    name: 'HTML5',
    icon: SiHtml5,
    category: 'frontend'
  },
  {
    name: 'CSS3',
    icon: SiCss,
    category: 'frontend'
  },
  {
    name: 'Tailwind CSS',
    icon: SiTailwindcss,
    category: 'frontend'
  },
  {
    name: 'Node.js',
    icon: SiNodedotjs,
    category: 'backend'
  },
  {
    name: 'Python',
    icon: SiPython,
    category: 'backend'
  },
  {
    name: 'Express',
    icon: SiExpress,
    category: 'backend'
  },
  {
    name: 'FastAPI',
    icon: SiFastapi,
    category: 'backend'
  },
  {
    name: 'GraphQL',
    icon: SiGraphql,
    category: 'backend'
  },
  {
    name: 'WebSockets',
    icon: SiSocketdotio,
    category: 'backend'
  },
  {
    name: 'PostgreSQL',
    icon: SiPostgresql,
    category: 'database'
  },
  {
    name: 'MongoDB',
    icon: SiMongodb,
    category: 'database'
  },
  {
    name: 'Redis',
    icon: SiRedis,
    category: 'database'
  },
  {
    name: 'Supabase',
    icon: SiSupabase,
    category: 'database'
  },
  {
    name: 'Prisma',
    icon: SiPrisma,
    category: 'database'
  },
  {
    name: 'Docker',
    icon: SiDocker,
    category: 'devops'
  },
  {
    name: 'AWS',
    icon: FaAws,
    category: 'devops'
  },
  {
    name: 'Nginx',
    icon: SiNginx,
    category: 'devops'
  },
  {
    name: 'Linux',
    icon: SiLinux,
    category: 'devops'
  },
  {
    name: 'Cloudflare',
    icon: SiCloudflare,
    category: 'devops'
  },
  {
    name: 'Claude',
    icon: SiClaude,
    category: 'other'
  },
  {
    name: 'OpenAI',
    icon: TbBrandOpenai,
    category: 'other'
  },
  {
    name: 'Gemini',
    icon: SiGooglegemini,
    category: 'other'
  },
  {
    name: 'AI Agents',
    icon: Workflow,
    category: 'other'
  },
  {
    name: 'MCP',
    icon: Plug,
    category: 'other'
  },
  {
    name: 'RAG',
    icon: Search,
    category: 'other'
  },
  {
    name: 'Git',
    icon: SiGit,
    category: 'tools'
  },
  {
    name: 'GitHub',
    icon: SiGithub,
    category: 'tools'
  },
  {
    name: 'Postman',
    icon: SiPostman,
    category: 'tools'
  },
  {
    name: 'Bun',
    icon: SiBun,
    category: 'tools'
  },
  {
    name: 'Vercel',
    icon: SiVercel,
    category: 'tools'
  },
  {
    name: 'Jest',
    icon: SiJest,
    category: 'tools'
  },
  {
    name: 'Testing Library',
    icon: SiTestinglibrary,
    category: 'tools'
  },
  {
    name: 'Clerk',
    icon: SiClerk,
    category: 'tools'
  },
  {
    name: 'Figma',
    icon: SiFigma,
    category: 'tools'
  }
] as const;

