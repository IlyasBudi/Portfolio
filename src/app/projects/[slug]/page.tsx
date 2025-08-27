import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github, Tag } from 'lucide-react'
import { getProjectBySlug, getAllProjects } from '@/lib/markdown'
import { siteConfig } from '@/lib/config'
import ProjectContent from '@/components/ProjectContent'

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  const images = Array.isArray(project.image) ? project.image : [project.image]
  const mainImage = images[0]

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      url: `${siteConfig.url}/projects/${project.slug}`,
      images: [
        {
          url: mainImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [mainImage],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const images = Array.isArray(project.image) ? project.image : [project.image]

  return (
    <div className="min-h-screen py-20" 
         style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/projects"
          className="inline-flex items-center mb-8 transition-colors duration-200 rounded-md px-2 py-1 hover:opacity-80"
          style={{ color: 'var(--primary)' }}
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Projects
        </Link>

        {/* Project Header */}
        <div className="mb-12">
          <ProjectContent project={project} images={images} />

          {/* Project Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                  style={{ color: 'var(--foreground)' }}>
                {project.title}
              </h1>
              <p className="text-xl leading-relaxed"
                 style={{ color: 'var(--muted-foreground)' }}>
                {project.description}
              </p>
            </div>

            {/* Meta Information */}
            <div className="flex flex-wrap gap-6 text-sm"
                 style={{ color: 'var(--muted-foreground)' }}>
              <div className="flex items-center">
                <Tag size={16} className="mr-2" />
                {project.category}
              </div>
              {/* Uncomment if you want to add date and featured badge
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                {new Date(project.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              {project.featured && (
                <span className="px-3 py-1 text-xs font-medium rounded-full border"
                      style={{ 
                        backgroundColor: 'rgba(var(--primary), 0.1)',
                        color: 'var(--primary)',
                        borderColor: 'rgba(var(--primary), 0.2)'
                      }}>
                  Featured
                </span>
              )} */}
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-lg font-semibold mb-3"
                  style={{ color: 'var(--foreground)' }}>
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm font-medium rounded-lg border transition-colors duration-200 cursor-default hover:opacity-80"
                    style={{
                      backgroundColor: 'var(--accent)',
                      color: 'var(--accent-foreground)',
                      borderColor: 'var(--border)'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="flex flex-col sm:flex-row gap-4">
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md hover:opacity-90"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-foreground)'
                  }}
                >
                  <ExternalLink size={20} className="mr-2" />
                  View Live Demo
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md hover:opacity-80"
                  style={{
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--card)',
                    color: 'var(--card-foreground)'
                  }}
                >
                  <Github size={20} className="mr-2" />
                  View Source Code
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Project Content */}
        <div className="prose prose-lg max-w-none mb-16"
             style={{ color: 'var(--foreground)' }}>
          <div dangerouslySetInnerHTML={{ __html: project.content }} />
        </div>

        {/* Navigation */}
        <div className="mt-16 pt-8 border-t"
             style={{ borderColor: 'var(--border)' }}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center transition-colors duration-200 rounded-md px-2 py-1 hover:opacity-80"
              style={{ color: 'var(--primary)' }}
            >
              <ArrowLeft size={20} className="mr-2" />
              All Projects
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-4 py-2 font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md hover:opacity-90"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)'
              }}
            >
              Discuss This Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}