'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import Image from 'next/image'
import { ExternalLink, GitBranch, Zap, Users, Globe } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'FinTech Trading Platform',
    category: 'both',
    description: 'Enterprise-grade trading platform handling $2B+ in daily transactions with real-time data processing and institutional-level security.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'WebSocket'],
    gradient: 'from-blue-500/20 to-cyan-500/20',
    liveUrl: '#',
    githubUrl: '#',
    imageUrl: 'https://via.placeholder.com/800x600',
  },
  {
    id: 2,
    title: 'Heritage Museum Digital Experience',
    category: 'web',
    description: 'Immersive cultural heritage platform with 3D exhibits, AR integration, and accessible design serving 500K+ annual visitors.',
    tech: ['Next.js', 'Three.js', 'TypeScript', 'Vercel'],
    gradient: 'from-emerald-500/20 to-teal-500/20',
    liveUrl: '#',
    githubUrl: '#',
    imageUrl: 'https://via.placeholder.com/800x600',
  },
  {
    id: 3,
    title: 'Global E-commerce Infrastructure',
    category: 'system',
    description: 'Scalable microservices architecture powering international e-commerce operations across 40 countries with multi-currency support.',
    tech: ['Kubernetes', 'Go', 'PostgreSQL', 'Redis', 'Kafka'],
    gradient: 'from-purple-500/20 to-pink-500/20',
    liveUrl: '#',
    githubUrl: '#',
    imageUrl: 'https://via.placeholder.com/800x600',
  },
]

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web Design' },
  { id: 'system', label: 'System Architecture' },
  { id: 'both', label: 'Full Stack' },
]

import { Section } from '@/components/shared/Section'

// ... (imports and data remain the same)

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

      {/* Filter Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 md:mb-16"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveFilter(category.id)}
            className={`px-4 py-2 md:px-6 md:py-3 text-sm md:text-base rounded-full border transition-all duration-300 ${
              activeFilter === category.id
                ? 'bg-bronze-500 text-white border-bronze-500'
                : 'border-stone-300 dark:border-stone-700 hover:border-bronze-500'
            }`}
          >
            {category.label}
          </button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <div ref={ref} className="space-y-12 sm:space-y-16 md:space-y-24">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.15 }}
            whileHover={{ y: -8 }}
            className={`grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl ${project.gradient} 
                       border border-stone-200/20 dark:border-stone-800/20 hover:shadow-xl transition-all duration-400`}
          >
            {/* Project Details */}
            <div className={`md:order-${index % 2 === 1 ? 'last' : 'first'}`}>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4">{project.title}</h3>
              <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 mb-5 sm:mb-6">{project.description}</p>
              
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm sm:btn-md">
                  Visit Live
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm sm:btn-md">
                  GitHub
                  <GitBranch className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.map(tech => (
                  <span key={tech} className="px-2.5 py-1 text-xs sm:text-sm bg-black/5 dark:bg-white/10 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Image */}
            <div className="h-48 sm:h-64 md:h-80 bg-stone-300 dark:bg-stone-700 rounded-md md:rounded-lg flex items-center justify-center">
              <Image src={project.imageUrl} alt={project.title} width={800} height={600} className="object-cover rounded-md md:rounded-lg" />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}