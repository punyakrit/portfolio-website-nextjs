import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiJavascript, 
  SiNodedotjs, 
  SiPython, 
  SiPostgresql, 
  SiMongodb, 
  SiRedis, 
  SiDocker, 
  SiAmazon, 
  SiTailwindcss, 
  SiHtml5, 
  SiCss3, 
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
  SiKubernetes,
  SiSocketdotio
} from 'react-icons/si';

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
    icon: SiCss3,
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
    icon: SiAmazon,
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
    name: 'Kubernetes',
    icon: SiKubernetes,
    category: 'devops'
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
    name: 'Figma',
    icon: SiFigma,
    category: 'tools'
  }
] as const;

