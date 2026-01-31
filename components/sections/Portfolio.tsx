'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import Image from 'next/image'
import { ExternalLink, GitBranch } from 'lucide-react'

import fornoNero from '@/public/assets/forno-nero.png'
import structura from '@/public/assets/structura.png'
import axisLogistic from '@/public/assets/axis-logistic.png'

const projects = [
  {
    id: 1,
    title: 'Forno Nero',
    category: 'web',
    description: 'Enterprise-grade trading platform handling $2B+ in daily transactions with real-time data processing and institutional-level security.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'WebSocket'],
    gradient: 'from-blue-500/20 to-cyan-500/20',
    liveUrl: '#',
    githubUrl: '#',
    imageUrl: fornoNero,
  },
  {
    id: 2,
    title: 'Structura',
    category: 'web',
    description: 'Immersive cultural heritage platform with 3D exhibits, AR integration, and accessible design serving 500K+ annual visitors.',
    tech: ['Next.js', 'Three.js', 'TypeScript', 'Vercel'],
    gradient: 'from-emerald-500/20 to-teal-500/20',
    liveUrl: '#',
    githubUrl: '#',
    imageUrl: structura,
  },
  {
    id: 3,
    title: 'Axis Logistics',
    category: 'web',
    description: 'Scalable microservices architecture powering international e-commerce operations across 40 countries with multi-currency support.',
    tech: ['Figma'],
    gradient: 'from-purple-500/20 to-pink-500/20',
    liveUrl: '#',
    githubUrl: '#',
    imageUrl: axisLogistic,
  },
]

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web Design' },
  { id: 'system', label: 'System Architecture' },
  { id: 'both', label: 'Full Stack' },
]

import { Section } from '@/components/shared/Section'

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [ref, inView] = useInView({ threshold: 0.1 })

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  return (
    <Section id="work">
      <div className="section-title mb-8 md:mb-12">
        <span className="roman-number">III • PORTFOLIO</span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl"
        >
          Selected Projects
        </motion.h2>
      </div>

      {/* Filter Buttons - Improved mobile layout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-wrap justify-center gap-3 mb-12 md:mb-16 px-4"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveFilter(category.id)}
            className={`
              px-4 py-2.5 text-sm font-medium rounded-full border-2 
              transition-all duration-300 whitespace-nowrap
              ${activeFilter === category.id
                ? 'bg-bronze-500 text-white border-bronze-500 shadow-lg'
                : 'border-stone-300 dark:border-stone-700 hover:border-bronze-500 hover:bg-bronze-500/5'
              }
            `}
          >
            {category.label}
          </button>
        ))}
      </motion.div>

      {/* Projects Grid - Completely redesigned for mobile */}
      <div ref={ref} className="space-y-8 md:space-y-12">
        {filteredProjects.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.15 }}
            className={`
              group relative overflow-hidden rounded-2xl 
              border border-stone-200/50 dark:border-stone-800/50
              bg-gradient-to-br ${project.gradient}
              hover:shadow-2xl transition-all duration-500
            `}
          >
            {/* Mobile-first layout: Image on top, content below */}
            <div className="flex flex-col">
              {/* Project Image - Full width on mobile */}
              <div className="relative w-full aspect-video md:aspect-[16/10] overflow-hidden">
                <Image 
                  src={project.imageUrl} 
                  alt={project.title} 
                  width={800} 
                  height={600} 
                  className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-700" 
                />
                {/* Gradient overlay for better text readability on mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent md:hidden" />
                
                {/* Tech stack badges - Overlay on image for mobile */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 md:hidden">
                  {project.tech.map(tech => (
                    <span 
                      key={tech} 
                      className="px-3 py-1.5 text-xs font-medium bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full border border-white/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Details - Better spacing on mobile */}
              <div className="p-6 md:p-8">
                {/* Category badge */}
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-bronze-500/10 text-bronze-500 rounded-full">
                    {categories.find(c => c.id === project.category)?.label}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-4 leading-tight">
                  {project.title}
                </h3>

                {/* Description - Better line height for mobile */}
                <p className="text-base md:text-lg text-stone-700 dark:text-stone-300 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech stack - Hidden on mobile (shown in image overlay) */}
                <div className="hidden md:flex flex-wrap gap-2 mb-6">
                  {project.tech.map(tech => (
                    <span 
                      key={tech} 
                      className="px-3 py-1.5 text-sm font-medium bg-white/50 dark:bg-black/30 backdrop-blur-sm rounded-full border border-stone-200 dark:border-stone-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action buttons - Full width on mobile */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="
                      flex items-center justify-center gap-2 
                      px-6 py-3 rounded-lg
                      bg-bronze-500 text-white border-2 border-bronze-500
                      hover:bg-bronze-600 hover:border-bronze-600
                      transition-all duration-300
                      font-medium text-sm
                      w-full sm:w-auto
                    "
                  >
                    <span>Visit Live</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="
                      flex items-center justify-center gap-2 
                      px-6 py-3 rounded-lg
                      bg-transparent text-bronze-500 border-2 border-bronze-500
                      hover:bg-bronze-500 hover:text-white
                      transition-all duration-300
                      font-medium text-sm
                      w-full sm:w-auto
                    "
                  >
                    <span>View Code</span>
                    <GitBranch className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Empty state if no projects match filter */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-xl text-stone-500">No projects found in this category.</p>
        </motion.div>
      )}
    </Section>
  )
}