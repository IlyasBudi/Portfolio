import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Project } from '@/types';

const projectsDirectory = path.join(process.cwd(), 'src/content/projects');

export async function getProjectSlugs(): Promise<string[]> {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames
    .filter(name => name.endsWith('.md'))
    .map(name => name.replace(/\.md$/, ''));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const fullPath = path.join(projectsDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const processedContent = await remark()
      .use(html)
      .process(content);
    
    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      category: data.category || '',
      featured: data.featured || false,
      techStack: data.techStack || [],
      demoLink: data.demoLink,
      githubLink: data.githubLink,
      image: data.image || '',
      content: processedContent.toString(),
      date: data.date || new Date().toISOString(),
    };
  } catch (error) {
    console.error(`Error reading project ${slug}:`, error);
    return null;
  }
}

export async function getAllProjects(): Promise<Project[]> {
  const slugs = await getProjectSlugs();
  const projects = await Promise.all(
    slugs.map(slug => getProjectBySlug(slug))
  );
  
  return projects
    .filter((project): project is Project => project !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const allProjects = await getAllProjects();
  return allProjects.filter(project => project.featured);
}

export async function getProjectsByCategory(category: string): Promise<Project[]> {
  const allProjects = await getAllProjects();
  return allProjects.filter(project => 
    project.category.toLowerCase() === category.toLowerCase()
  );
}

export function getUniqueCategories(projects: Project[]): string[] {
  const categories = projects.map(project => project.category);
  return Array.from(new Set(categories)).sort();
}

