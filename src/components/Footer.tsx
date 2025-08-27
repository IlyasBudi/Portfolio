import Link from 'next/link';
import { Github, Linkedin, Twitter, Instagram, Mail, MapPin } from 'lucide-react';
import { siteConfig } from '@/lib/config';

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t" 
            style={{ 
              backgroundColor: 'var(--muted)', 
              borderTopColor: 'var(--border)',
              color: 'var(--foreground)'
            }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
              {siteConfig.name}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              {siteConfig.description}
            </p>
            <div className="flex items-center space-x-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
              <MapPin size={16} />
              <span>{siteConfig.location}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {siteConfig.navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="transition-colors duration-200 text-sm hover:underline"
                    style={{ 
                      color: 'var(--muted-foreground)',
                      textDecorationColor: 'var(--primary)'
                    }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
              Get In Touch
            </h3>
            <div className="space-y-2">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center space-x-2 transition-colors duration-200 text-sm hover:underline"
                style={{ 
                  color: 'var(--muted-foreground)',
                  textDecorationColor: 'var(--primary)'
                }}
              >
                <Mail size={16} />
                <span>{siteConfig.email}</span>
              </a>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              {Object.entries(siteConfig.social).map(([platform, url]) => {
                if (!url) return null;
                const Icon = socialIcons[platform as keyof typeof socialIcons];
                if (!Icon) return null;
                
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg transition-all duration-200 hover:scale-105"
                    style={{ 
                      backgroundColor: 'var(--secondary)', 
                      color: 'var(--secondary-foreground)'
                    }}
                    aria-label={`Follow on ${platform}`}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t" style={{ borderTopColor: 'var(--border)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            {/* <p className="text-sm text-gray-600 dark:text-gray-400">
              Built with Next.js & Tailwind CSS
            </p> */}
          </div>
        </div>
      </div>
    </footer>
  );
}

