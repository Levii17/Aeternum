'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { Monitor, Server, Shield, Zap, Globe, Code, Database, Cloud } from 'lucide-react'

const services = [
  {
    title: 'Web Design',
    subtitle: 'User-Facing Interfaces',
    icon: Monitor,
    items: [
      'Custom Website Design & Development',
      'Responsive UI/UX Design',
      'E-commerce Platforms',
      'Progressive Web Apps (PWA)',
      'Landing Pages & Marketing Sites',
      'Performance Optimization',
      'Accessibility Compliance (WCAG)',
    ],
    gradient: 'from-blue-500/10 to-bronze-500/10',
  },
  {
    title: 'System Architecture',
    subtitle: 'Backend Infrastructure',
    icon: Server,
    items: [
      'RESTful & GraphQL API Design',
      'Microservices Architecture',
      'Database Design & Optimization',
      'Cloud Infrastructure (AWS, Azure, GCP)',
      'DevOps & CI/CD Pipelines',
      'Security & Compliance',
      'System Monitoring & Maintenance',
    ],
    gradient: 'from-emerald-500/10 to-bronze-500/10',
  },
]

const capabilities = [
  { icon: Zap, title: 'Performance Optimization' },
  { icon: Shield, title: 'Security First' },
  { icon: Globe, title: 'Global Scale' },
  { icon: Cloud, title: 'High Availability' },
]

import { Section } from '@/components/shared/Section'

// ... (imports and data remain the same)

export function Services() {
  const [ref, inView] = useInView({ threshold: 0.1 })

  return (
    <Section id="services">
      <div className="section-title">
        <span className="roman-number">I • DISCIPLINES</span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl"
        >
          Web Design & System Architecture
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lead max-w-3xl mx-auto"
        >
          Two complementary disciplines: beautiful interfaces that users love, and robust systems that never fail.
        </motion.p>
      </div>

      <div ref={ref} className="grid md:grid-cols-2 gap-12 mt-20">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`p-8 rounded-2xl bg-gradient-to-br ${service.gradient} border border-stone-200/50 dark:border-stone-800/50`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/80 dark:bg-black/80 rounded-lg">
                <service.icon className="w-6 h-6 text-bronze-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-stone-600 dark:text-stone-400">{service.subtitle}</p>
              </div>
            </div>
            <ul className="space-y-3 mt-6 pl-4 border-l-2 border-stone-200 dark:border-stone-800">
              {service.items.map((item) => (
                <li key={item} className="text-stone-700 dark:text-stone-300">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Additional capabilities */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {capabilities.map((capability, index) => (
          <div key={index} className="flex items-center gap-3 p-4 border border-stone-200/80 dark:border-stone-800/80 rounded-lg">
            <capability.icon className="w-5 h-5 text-bronze-500" />
            <span className="font-semibold">{capability.title}</span>
          </div>
        ))}
      </motion.div>
    </Section>
  )
}