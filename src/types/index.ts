export interface Project {
  slug: string;
  title: string;
  description: string;
  category: string;
  featured: boolean;
  techStack: string[];
  demoLink?: string;
  githubLink?: string;
  image: string | string[];
  content: string;
  date: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
  tags: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  description: string;
}

export interface Social {
  github?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
}

