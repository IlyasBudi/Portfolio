#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_DIR = path.join(process.cwd(), 'src/content');
const OUTPUT_DIR = path.join(process.cwd(), 'src/lib/data');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Convert markdown files to JSON
 */
function generateProjectsData() {
  const projectsDir = path.join(CONTENT_DIR, 'projects');
  
  if (!fs.existsSync(projectsDir)) {
    console.log('Projects directory not found');
    return;
  }

  const files = fs.readdirSync(projectsDir).filter(file => file.endsWith('.md'));
  const projects = [];

  files.forEach(file => {
    const filePath = path.join(projectsDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    const slug = file.replace('.md', '');
    
    projects.push({
      slug,
      ...data,
      content,
      readingTime: Math.ceil(content.split(' ').length / 200) // Estimate reading time
    });
  });

  // Sort by date (newest first)
  projects.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Write to JSON file
  const outputPath = path.join(OUTPUT_DIR, 'projects.json');
  fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));
  
  console.log(`✅ Generated ${projects.length} projects in ${outputPath}`);
  
  // Generate categories
  const categories = [...new Set(projects.map(p => p.category))];
  const categoriesPath = path.join(OUTPUT_DIR, 'categories.json');
  fs.writeFileSync(categoriesPath, JSON.stringify(categories, null, 2));
  
  console.log(`✅ Generated ${categories.length} categories in ${categoriesPath}`);
  
  // Generate tech stack
  const techStack = [...new Set(projects.flatMap(p => p.techStack || []))];
  const techStackPath = path.join(OUTPUT_DIR, 'tech-stack.json');
  fs.writeFileSync(techStackPath, JSON.stringify(techStack, null, 2));
  
  console.log(`✅ Generated ${techStack.length} technologies in ${techStackPath}`);
}

/**
 * Generate sitemap data
 */
function generateSitemap() {
  const projectsDataPath = path.join(OUTPUT_DIR, 'projects.json');
  
  if (!fs.existsSync(projectsDataPath)) {
    console.log('Projects data not found, run projects generation first');
    return;
  }

  const projects = JSON.parse(fs.readFileSync(projectsDataPath, 'utf8'));
  
  const sitemap = {
    static: [
      { url: '/', priority: 1.0, changefreq: 'weekly' },
      { url: '/about', priority: 0.8, changefreq: 'monthly' },
      { url: '/projects', priority: 0.9, changefreq: 'weekly' },
      { url: '/contact', priority: 0.7, changefreq: 'monthly' }
    ],
    dynamic: projects.map(project => ({
      url: `/projects/${project.slug}`,
      priority: 0.6,
      changefreq: 'monthly',
      lastmod: project.date
    }))
  };

  const sitemapPath = path.join(OUTPUT_DIR, 'sitemap.json');
  fs.writeFileSync(sitemapPath, JSON.stringify(sitemap, null, 2));
  
  console.log(`✅ Generated sitemap data in ${sitemapPath}`);
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 Generating content data...\n');
  
  try {
    generateProjectsData();
    generateSitemap();
    
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

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  generateProjectsData,
  generateSitemap
};

