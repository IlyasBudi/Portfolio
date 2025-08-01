'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import { Project } from '@/types';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Mock projects data
    const mockProjects: Project[] = [
      {
        slug: 'siakad-darunnajah',
        title: 'SIAKAD - Darunnajah Academic Information System',
        description: 'Academic information system for managing student data, grades, attendance, and schedules at Darunnajah Islamic Boarding School.',
        category: 'Web Development',
        featured: true,
        techStack: ['Express.js', 'Angular', 'TypeScript', 'Bootstrap', 'PostgreSQL'],
        demoLink: '#',
        githubLink: '#',
        image: '/images/projects/darunnajah/dn1.webp',
        content: '',
        date: '2024-01-15'
      },
      {
        slug: 'tracking-inventory-system',
        title: 'Garment Tracking & Inventory System',
        description: 'A platform to monitor production processes, raw material stock, and goods delivery in garment/textile factories.',
        category: 'Web Development',
        featured: true,
        techStack: ["Laravel", "TailwindCSS", "MySQL"],
        demoLink: '#',
        githubLink: '#',
        image: '/images/projects/garment/garment1.webp',
        content: '',
        date: '2023-11-20'
      },
      // {
      //   slug: 'data-visualization-dashboard',
      //   title: 'Data Visualization Dashboard',
      //   description: 'Interactive dashboard for business analytics with real-time data processing',
      //   category: 'Data Science',
      //   featured: false,
      //   techStack: ['React', 'D3.js', 'Python', 'FastAPI', 'PostgreSQL'],
      //   demoLink: 'https://dashboard-demo.com',
      //   githubLink: 'https://github.com/johndoe/data-dashboard',
      //   image: '/images/projects/dashboard.jpg',
      //   content: '',
      //   date: '2023-08-10'
      // }
    ];

    setProjects(mockProjects);
    setFilteredProjects(mockProjects);
    
    // Extract unique categories
    const uniqueCategories = Array.from(new Set(mockProjects.map(p => p.category)));
    setCategories(['All', ...uniqueCategories]);
  }, []);

  useEffect(() => {
    let filtered = projects;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredProjects(filtered);
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A collection of projects that showcase my skills and experience in various technologies
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-600 dark:text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.slug} project={project} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-gray-400 dark:text-gray-600 mb-4">
                <Filter size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No projects found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </motion.div>
      </div>
    </div>
  );
}

