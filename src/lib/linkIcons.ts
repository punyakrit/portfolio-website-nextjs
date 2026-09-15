import React from 'react';
import { Github, Linkedin, ExternalLink, Building2, Globe } from 'lucide-react';

export interface LinkIcon {
  type: 'companyUrl' | 'githubUrl' | 'linkedinUrl' | 'website' | 'external';
  icon: React.ComponentType<{ className?: string }>;
}

export const linkIcons: Readonly<LinkIcon[]> = [
  {
    type: 'companyUrl',
    icon: Building2
  },
  {
    type: 'githubUrl',
    icon: Github
  },
  {
    type: 'linkedinUrl',
    icon: Linkedin
  },
  {
    type: 'website',
    icon: Globe
  },
  {
    type: 'external',
    icon: ExternalLink
  }
] as const;

export const getLinkIconByType = (type: string) => {
  return linkIcons.find(linkIcon => linkIcon.type === type);
};

