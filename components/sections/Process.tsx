'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { Search, Palette, Code, Rocket, CheckCircle } from 'lucide-react'

const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'Requirements analysis, user research, technical assessment, and project scoping.',
    icon: Search,
    color: 'from-blue-500 to-cyan-500',
    details: [
      'Stakeholder interviews',
      'Market research',
      'Technical feasibility study',
      'Project roadmap creation',
    ],
  },
  {
    number: '02',
    title: 'Design & Architecture',
    description: 'UI/UX design, system architecture, database modeling, and technical specifications.',
    icon: Palette,
    color: 'from-purple-500 to-pink-500',
    details: [
      'Wireframing & prototyping',
      'System architecture design',
      'Database schema design',
      'Technology stack selection',
    ],
  },
  {
    number: '03',
    title: 'Development',
    description: 'Iterative development, testing, continuous integration, and quality assurance.',
    icon: Code,
    color: 'from-emerald-500 to-teal-500',
    details: [
      'Agile sprints',
      'Code reviews',
      'Automated testing',
      'Performance optimization',
    ],
  },
  {
    number: '04',
    title: 'Launch & Support',
    description: 'Deployment, monitoring, ongoing maintenance, and performance optimization.',
    icon: Rocket,
    color: 'from-amber-500 to-orange-500',
    details: [
      'Production deployment',
      'Performance monitoring',
      'Security updates',
      'Ongoing support',
    ],
  },
]

import { Section } from '@/components/shared/Section'

// ... (imports and data remain the same)

export function Process() {
  const [ref, inView] = useInView({ threshold: 0.1 })

  return (
    <Section id="process">
      <div className="section-title">
        <span className="roman-number">IV • METHODOLOGY</span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl"
        >
          Our Process
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lead max-w-3xl mx-auto"
        >
          A disciplined approach to building web and system solutions that last.
        </motion.p>
      </div>

      {/* Process Timeline */}
      <div ref={ref} className="relative mt-20">
        <div className="absolute left-9 top-0 w-px h-full bg-stone-300 dark:bg-stone-700" />
        {processSteps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="relative pl-20 mb-16"
          >
            <div className="absolute left-0 top-0 flex items-center">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                <step.icon className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div className="ml-4">
              <h3 className="text-2xl font-semibold mb-2 pt-5">{step.title}</h3>
              <p className="text-stone-600 dark:text-stone-400 mb-4">{step.description}</p>
              <ul className="space-y-2">
                {step.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}