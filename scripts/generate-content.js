#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

/* =========================
 * Config
 * ========================= */
const CONTENT_DIR = process.env.CONTENT_DIR || path.join(process.cwd(), 'src/content');
const OUTPUT_DIR  = process.env.OUTPUT_DIR  || path.join(process.cwd(), 'src/lib/data');

/* =========================
 * Utils
 * ========================= */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function slugify(str = '') {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function toISODate(val) {
  if (!val) return new Date().toISOString().slice(0, 10);
  const d = new Date(val);
  return Number.isNaN(d.getTime())
    ? new Date().toISOString().slice(0, 10)
    : d.toISOString().slice(0, 10);
}

function wordCount(text = '') {
  return text.split(/\s+/).filter(Boolean).length;
}

function readDirMarkdown(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.toLowerCase().endsWith('.md'));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

/* =========================
 * Core transforms
 * ========================= */
function parseProjectFile(filePath, seenSlugs) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data = {}, content = '' } = matter(raw);

  const fileName = path.basename(filePath, '.md');
  const title = data.title ? String(data.title) : fileName;

  // slug priority: frontmatter.slug > fileName > slugify(title)
  const preferred = (data.slug ? String(data.slug) : '') || fileName || slugify(title);
  let slug = preferred;
  let i = 2;
  while (seenSlugs.has(slug)) slug = `${preferred}-${i++}`;
  seenSlugs.add(slug);

  // normalize arrays
  const techStack = Array.isArray(data.techStack)
    ? data.techStack.map(String)
    : (typeof data.techStack === 'string' && data.techStack.trim()
        ? [String(data.techStack)]
        : []);

  return {
    slug,
    title,
    description: data.description ? String(data.description) : '',
    category: data.category ? String(data.category) : 'General',
    featured: Boolean(data.featured),
    techStack,
    demoLink: data.demoLink ? String(data.demoLink) : '',
    githubLink: data.githubLink ? String(data.githubLink) : '',
    image: data.image ? String(data.image) : '',
    date: toISODate(data.date),
    content,
    readingTime: Math.max(1, Math.ceil(wordCount(content) / 200)),
  };
}

function sortProjects(projects) {
  // by date desc, then slug asc (stabil)
  return projects.sort((a, b) => {
    const diff = new Date(b.date).getTime() - new Date(a.date).getTime();
    return diff !== 0 ? diff : a.slug.localeCompare(b.slug);
  });
}

/* =========================
 * Generators
 * ========================= */
function generateProjectsData() {
  const projectsDir = path.join(CONTENT_DIR, 'projects');

  if (!fs.existsSync(projectsDir)) {
    console.log('Projects directory not found');
    return { projects: [], categories: [], techStack: [] };
  }

  const files = readDirMarkdown(projectsDir);
  const projects = [];
  const seenSlugs = new Set();

  for (const file of files) {
    const filePath = path.join(projectsDir, file);
    try {
      const project = parseProjectFile(filePath, seenSlugs);
      projects.push(project);
    } catch (err) {
      console.warn(`⚠️  Skip ${file}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  sortProjects(projects);

  ensureDir(OUTPUT_DIR);

  // write projects.json
  const projectsPath = path.join(OUTPUT_DIR, 'projects.json');
  writeJson(projectsPath, projects);
  console.log(`✅ Generated ${projects.length} projects in ${projectsPath}`);

  // categories.json (filter falsy)
  const categories = [...new Set(projects.map(p => p.category).filter(Boolean))];
  const categoriesPath = path.join(OUTPUT_DIR, 'categories.json');
  writeJson(categoriesPath, categories);
  console.log(`✅ Generated ${categories.length} categories in ${categoriesPath}`);

  // tech-stack.json
  const techStack = [
    ...new Set(projects.flatMap(p => Array.isArray(p.techStack) ? p.techStack : []))
  ];
  const techStackPath = path.join(OUTPUT_DIR, 'tech-stack.json');
  writeJson(techStackPath, techStack);
  console.log(`✅ Generated ${techStack.length} technologies in ${techStackPath}`);

  return { projects, categories, techStack };
}

function generateSitemap(projectsArg) {
  // allow passing in-memory projects to avoid re-read; fallback to disk
  let projects = projectsArg;
  if (!projects) {
    const projectsDataPath = path.join(OUTPUT_DIR, 'projects.json');
    if (!fs.existsSync(projectsDataPath)) {
      console.log('Projects data not found, run projects generation first');
      return;
    }
    projects = JSON.parse(fs.readFileSync(projectsDataPath, 'utf8'));
  }

  const sitemap = {
    static: [
      { url: '/',        priority: 1.0, changefreq: 'weekly'  },
      { url: '/about',   priority: 0.8, changefreq: 'monthly' },
      { url: '/projects',priority: 0.9, changefreq: 'weekly'  },
      { url: '/contact', priority: 0.7, changefreq: 'monthly' },
    ],
    dynamic: projects.map(p => ({
      url: `/projects/${p.slug}`,
      priority: 0.6,
      changefreq: 'monthly',
      lastmod: toISODate(p.date),
    })),
  };

  const sitemapPath = path.join(OUTPUT_DIR, 'sitemap.json');
  writeJson(sitemapPath, sitemap);
  console.log(`✅ Generated sitemap data in ${sitemapPath}`);
}

/* =========================
 * CLI
 * ========================= */
function main() {
  console.log('🚀 Generating content data...\n');
  try {
    const { projects } = generateProjectsData();
    generateSitemap(projects);
    console.log('\n✨ Content generation completed successfully!');
    console.log('\n📁 Generated files:');
    console.log('   - src/lib/data/projects.json');
    console.log('   - src/lib/data/categories.json');
    console.log('   - src/lib/data/tech-stack.json');
    console.log('   - src/lib/data/sitemap.json');
  } catch (error) {
    console.error('❌ Error generating content:', error);
    process.exit(1);
  }
}

if (require.main === module) main();

module.exports = { generateProjectsData, generateSitemap };
