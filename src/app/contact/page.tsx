'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Github, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { siteConfig } from '@/lib/config';

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
};

export default function ContactPage() {
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
          <h1 className="text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: 'var(--foreground)' }}>
            Get In Touch
          </h1>
          <p className="text-lg max-w-2xl mx-auto"
             style={{ color: 'var(--muted-foreground)' }}>
            Have a project in mind or just want to say hello? I&apos;d love to hear from you. 
            Let&apos;s discuss how we can work together to bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1 space-y-8"
          >
            {/* Contact Details */}
            <div className="rounded-xl shadow-lg p-8 border"
                 style={{
                   backgroundColor: 'var(--card)',
                   borderColor: 'var(--border)'
                 }}>
              <h3 className="text-xl font-semibold mb-6"
                  style={{ color: 'var(--card-foreground)' }}>
                Contact Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                       style={{
                         backgroundColor: 'var(--accent)',
                         color: 'var(--primary)'
                       }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Email</p>
                    <a 
                      href={`mailto:${siteConfig.email}`}
                      className="font-medium transition-colors duration-200"
                      style={{ color: 'var(--card-foreground)' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--card-foreground)'}
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                {/* <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
                    <Phone size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                    <a 
                      href={`tel:${siteConfig.phone}`}
                      className="text-gray-900 dark:text-white font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </div> */}

                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                       style={{
                         backgroundColor: 'var(--accent)',
                         color: 'var(--primary)'
                       }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Location</p>
                    <p className="font-medium" style={{ color: 'var(--card-foreground)' }}>
                      {siteConfig.location}
                    </p>
                  </div>
                </div>

                {/* <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
                    <Clock size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Response Time</p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      Within 24 hours
                    </p>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Social Media */}
            <div className="rounded-xl shadow-lg p-8 border"
                 style={{
                   backgroundColor: 'var(--card)',
                   borderColor: 'var(--border)'
                 }}>
              <h3 className="text-xl font-semibold mb-6"
                  style={{ color: 'var(--card-foreground)' }}>
                Follow Me
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
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
                      className="flex items-center p-3 rounded-lg transition-colors duration-200 group"
                      style={{
                        backgroundColor: 'var(--secondary)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--accent)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--secondary)';
                      }}
                    >
                      <Icon size={20} className="mr-3 transition-colors duration-200"
                            style={{ color: 'var(--muted-foreground)' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--muted-foreground)'} />
                      <span className="font-medium capitalize" 
                            style={{ color: 'var(--foreground)' }}>
                        {platform}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Availability */}
            <div className="rounded-xl p-8 border"
                 style={{
                   backgroundColor: 'var(--card)',
                   borderColor: 'var(--border)',
                   backgroundImage: 'linear-gradient(135deg, var(--accent) 0%, var(--secondary) 100%)'
                 }}>
              <h3 className="text-xl font-semibold mb-4"
                  style={{ color: 'var(--foreground)' }}>
                Current Availability
              </h3>
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="font-medium" style={{ color: 'var(--primary)' }}>
                  Available for new projects
                </span>
              </div>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                I&apos;m currently accepting new freelance projects and collaborations. 
                Let&apos;s discuss your next big idea!
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <ContactForm />
          </motion.div>
        </div>

        {/* FAQ Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Quick answers to common questions about working with me
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "What's your typical project timeline?",
                answer: "Project timelines vary based on complexity, but most websites take 2-6 weeks from start to finish."
              },
              {
                question: "Do you work with international clients?",
                answer: "Yes! I work with clients worldwide and am comfortable with different time zones and communication preferences."
              },
              {
                question: "What technologies do you specialize in?",
                answer: "I specialize in React, Next.js, Node.js, and modern web technologies. I'm always learning new tools to deliver the best solutions."
              },
              {
                question: "Do you provide ongoing support?",
                answer: "Yes, I offer maintenance packages and ongoing support to ensure your project continues to perform optimally."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {faq.question}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div> */}
      </div>
    </div>
  );
}

