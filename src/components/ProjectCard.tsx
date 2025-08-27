'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
        color: 'var(--card-foreground)'
      }}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={Array.isArray(project.image) ? project.image[0] : project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        
        {/* Featured Badge */}
        {/* {project.featured && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-white text-xs font-medium rounded-full"
                  style={{ backgroundColor: 'var(--primary)' }}>
              Featured
            </span>
          </div>
        )} */}

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg transition-colors duration-200 hover:scale-105"
              style={{ 
                backgroundColor: 'var(--card)',
                color: 'var(--card-foreground)'
              }}
              aria-label="View demo"
            >
              <ExternalLink size={16} />
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg transition-colors duration-200 hover:scale-105"
              style={{ 
                backgroundColor: 'var(--card)',
                color: 'var(--card-foreground)'
              }}
              aria-label="View source code"
            >
              <Github size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Category & Date */}
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 text-xs font-medium rounded-full"
                style={{ 
                  backgroundColor: 'var(--secondary)', 
                  color: 'var(--secondary-foreground)' 
                }}>
            {project.category}
          </span>
          {/* <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
            <Calendar size={12} className="mr-1" />
            {new Date(project.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short' 
            })}
          </div> */}
        </div>

        {/* Title & Description */}
        <a href={`/projects/${project.slug}`} className="group">
          <h3 className="text-xl font-semibold mb-2 transition-colors duration-200"
              style={{ color: 'var(--foreground)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--foreground)'}>
            {project.title}
          </h3>
        </a>
        <p className="text-sm leading-relaxed mb-4"
           style={{ color: 'var(--muted-foreground)' }}>
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-medium rounded"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'var(--accent-foreground)'
              }}
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="px-2 py-1 text-xs font-medium rounded"
                  style={{ 
                    backgroundColor: 'var(--muted)', 
                    color: 'var(--muted-foreground)' 
                  }}>
              +{project.techStack.length - 4} more
            </span>
          )}
        </div>

        {/* Action Links */}
        <div className="flex items-center justify-between">
          <Link
            href={`/projects/${project.slug}`}
            className="font-medium text-sm transition-colors duration-200 hover:underline"
            style={{ color: 'var(--primary)' }}
          >
            Learn more →
          </Link>
          
          <div className="flex space-x-3">
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:scale-110"
                style={{ color: 'var(--muted-foreground)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--foreground)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted-foreground)'}
                aria-label="View demo"
              >
                <ExternalLink size={16} />
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:scale-110"
                style={{ color: 'var(--muted-foreground)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--foreground)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted-foreground)'}
                aria-label="View source code"
              >
                <Github size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

