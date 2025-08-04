'use client';

import { motion } from 'framer-motion';
import { Download, MapPin, Calendar, Award } from 'lucide-react';
import { siteConfig } from '@/lib/config';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get to know more about my journey, skills, and passion for creating amazing digital experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 sticky top-24">
              {/* Profile Image */}
              <div className="relative w-48 h-48 mx-auto mb-6">
                <img
                  src="/images/Profile.jpg"
                  alt="Profile"
                  className="relative w-full h-full object-cover rounded-full border-4 border-white"
                />
                {/* <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 rounded-full"></div> */}
              </div>

              {/* Basic Info */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {siteConfig.name}
                </h2>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                  {siteConfig.title}
                </p>
                <div className="flex items-center justify-center text-gray-600 dark:text-gray-400 text-sm">
                  <MapPin size={16} className="mr-1" />
                  {siteConfig.location}
                </div>
              </div>

              {/* Quick Stats */}
              {/* <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Experience</span>
                  <span className="font-semibold text-gray-900 dark:text-white">5+ Years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Projects</span>
                  <span className="font-semibold text-gray-900 dark:text-white">50+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Clients</span>
                  <span className="font-semibold text-gray-900 dark:text-white">25+</span>
                </div>
              </div> */}

              {/* Download CV Button */}
              <button
                onClick={() => window.open('/files/CV - Ilyas Budi Wahyu Jati.pdf', '_blank')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <Download size={20} className="mr-2" />
                Download CV
              </button>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-12"
          >
            {/* About Text */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Summary
              </h3>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p>
                  Hello! I&apos;m {siteConfig.name}, a passionate {siteConfig.title.toLowerCase()} based in {siteConfig.location}.
                </p>
                <p>
                  I am an Informatics Engineering graduate with interest and skills in Web Development. I have experience
                  Building website with React.js, Laravel and Express.js frameworks to build and develop efficient and well -
                  structured web applications. I am passionate about Web development and always eager to learn new
                  things in this field.
                </p>
                {/* <p>
                  My journey in web development started over 5 years ago when I discovered the power of code to bring ideas to life. 
                  Since then, I&apos;ve had the privilege of working with various clients and companies, helping them build their digital presence 
                  and achieve their business goals.
                </p>
                <p>
                  I believe in writing clean, maintainable code and staying up-to-date with the latest technologies and best practices. 
                  When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my 
                  knowledge with the developer community.
                </p> */}
              </div>
            </div>

            {/* Skills */}
            {/* <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Skills & Expertise
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {siteConfig.skills.map((skillGroup, index) => (
                  <motion.div
                    key={skillGroup.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {skillGroup.category}
                    </h4>
                    <div className="space-y-2">
                      {skillGroup.items.map((skill) => (
                        <div key={skill} className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-400">{skill}</span>
                          <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${Math.floor(Math.random() * 30) + 70}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div> */}

            {/* Experience */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Experience
              </h3>
              <div className="space-y-6">
                {siteConfig.experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="border-l-4 border-blue-600 pl-6"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {exp.position}
                        </h4>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">
                          {exp.company}
                        </p>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                        <Calendar size={16} className="mr-1" />
                        {exp.duration}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                      {exp.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Education
              </h3>
              <div className="space-y-6">
                {siteConfig.education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="border-l-4 border-blue-600 pl-6"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {edu.degree}
                        </h4>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">
                          {edu.institution}
                        </p>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                        <Calendar size={16} className="mr-1" />
                        {edu.duration}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {edu.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Achievements & Certifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  '[Skilvul] MS Wellbeing Center - Kampus Merdeka 2022: Product Innvovation Challenge',
                  '[Skilvul] Beginner Web Development',
                  '[Dicoding] Learning to Build Front-End Web for Beginners',
                  '[Dicoding] Learning the Basics of JavaScript Programming'
                ].map((achievement, index) => (
                  <motion.div
                    key={achievement}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                  >
                    <Award size={20} className="text-blue-600 dark:text-blue-400 mr-3" />
                    <span className="text-gray-900 dark:text-white font-medium">
                      {achievement}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

