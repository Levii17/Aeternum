'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { 
  Monitor, 
  Server, 
  Database, 
  Cloud, 
  Cpu, 
  Zap,
  Shield,
  GitBranch,
  Terminal,
  Globe
} from 'lucide-react'
import { ArchitectureDiagram } from '@/components/ui/ArchitectureDiagram'

const techCategories = [
  {
    title: 'Frontend',
    icon: Monitor,
    description: 'Modern user interfaces built for performance and engagement',
    techs: [
      { name: 'React', level: 95, color: 'bg-blue-500' },
      { name: 'Next.js', level: 90, color: 'bg-black dark:bg-white' },
      { name: 'TypeScript', level: 92, color: 'bg-blue-600' },
      { name: 'Vue.js', level: 85, color: 'bg-emerald-500' },
      { name: 'Tailwind CSS', level: 88, color: 'bg-cyan-500' },
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    description: 'Scalable server-side solutions and API architectures',
    techs: [
      { name: 'Node.js', level: 93, color: 'bg-emerald-600' },
      { name: 'Python', level: 88, color: 'bg-yellow-500' },
      { name: 'Go', level: 82, color: 'bg-cyan-600' },
      { name: 'Java', level: 85, color: 'bg-red-600' },
      { name: 'GraphQL', level: 87, color: 'bg-pink-500' },
    ],
  },
  {
    title: 'Infrastructure',
    icon: Cloud,
    description: 'Cloud-native infrastructure and DevOps practices',
    techs: [
      { name: 'AWS', level: 90, color: 'bg-orange-500' },
      { name: 'Docker', level: 88, color: 'bg-blue-700' },
      { name: 'Kubernetes', level: 85, color: 'bg-blue-600' },
      { name: 'Terraform', level: 83, color: 'bg-purple-600' },
      { name: 'CI/CD', level: 90, color: 'bg-green-500' },
    ],
  },
  {
    title: 'Databases',
    icon: Database,
    description: 'Data storage and optimization solutions',
    techs: [
      { name: 'PostgreSQL', level: 92, color: 'bg-blue-800' },
      { name: 'MongoDB', level: 87, color: 'bg-green-600' },
      { name: 'Redis', level: 89, color: 'bg-red-500' },
      { name: 'MySQL', level: 85, color: 'bg-blue-600' },
      { name: 'Elasticsearch', level: 80, color: 'bg-yellow-600' },
    ],
  },
]

const capabilities = [
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Load times under 1.5s, 95+ Lighthouse scores',
  },
  {
    icon: Shield,
    title: 'Security First',
    description: 'OWASP compliance, zero-trust architecture',
  },
  {
    icon: Globe,
    title: 'Global Scale',
    description: 'Multi-region deployment, CDN integration',
  },
  {
    icon: Cpu,
    title: 'High Availability',
    description: '99.9% uptime, automated failover',
  },
  {
    icon: GitBranch,
    title: 'DevOps Excellence',
    description: 'Infrastructure as code, automated pipelines',
  },
  {
    icon: Terminal,
    title: 'Monitoring & Analytics',
    description: 'Real-time insights, proactive alerts',
  },
]

import { Section } from '@/components/shared/Section'

// ... (imports and data remain the same)

export function TechStack() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [ref, inView] = useInView({ threshold: 0.1 })

  return (
    <Section id="capabilities" className="bg-stone-100 dark:bg-stone-950">
      <div className="section-title">
        <span className="roman-number">II • CAPABILITIES</span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl"
        >
          Technologies & Tools
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lead max-w-3xl mx-auto"
        >
          Modern, battle-tested technologies chosen for reliability and performance.
        </motion.p>
      </div>

      {/* Tech Categories Grid */}
      <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
        {techCategories.map((category) => (
          <motion.div
            key={category.title}
            className="p-8 border border-stone-200/80 dark:border-stone-800/80 rounded-2xl"
            onHoverStart={() => setHoveredCategory(category.title)}
            onHoverEnd={() => setHoveredCategory(null)}
          >
            <div className="flex items-center gap-4 mb-6">
              <category.icon className="w-8 h-8 text-bronze-500" />
              <h3 className="text-2xl font-semibold">{category.title}</h3>
            </div>
            <p className="text-stone-600 dark:text-stone-400 mb-6">{category.description}</p>
            <div className="space-y-4">
              {category.techs.map((tech) => (
                <div key={tech.name} className="flex items-center gap-4">
                  <span className="w-24 font-medium">{tech.name}</span>
                  <div className="w-full bg-stone-200/80 dark:bg-stone-800/80 rounded-full h-2.5">
                    <motion.div
                      className={`h-2.5 rounded-full ${tech.color}`}
                      style={{ width: `${tech.level}%` }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${tech.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Capabilities Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {capabilities.map((capability) => (
          <div key={capability.title} className="p-6 border border-stone-200/80 dark:border-stone-800/80 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <capability.icon className="w-6 h-6 text-bronze-500" />
              <h4 className="text-lg font-semibold">{capability.title}</h4>
            </div>
            <p className="text-stone-600 dark:text-stone-400">{capability.description}</p>
          </div>
        ))}
      </motion.div>

      {/* Interactive Architecture Diagram */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-32"
      >
        <h3 className="text-3xl font-semibold text-center mb-8">System Architecture Example</h3>
        <ArchitectureDiagram hoveredCategory={hoveredCategory} />
      </motion.div>
    </Section>
  )
}