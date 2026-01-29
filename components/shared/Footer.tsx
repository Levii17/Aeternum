'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Linkedin, 
  Github, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Building,
  Code,
  Shield,
  Server,
  Globe
} from 'lucide-react'
import { useInView } from '@/hooks/useInView'

const footerLinks = {
  services: [
    { name: 'Web Design', href: '#services' },
    { name: 'System Architecture', href: '#services' },
    { name: 'Full Stack Development', href: '#services' },
    { name: 'Consultation', href: '#services' },
    { name: 'Performance Optimization', href: '#services' },
  ],
  company: [
    { name: 'Our Process', href: '#process' },
    { name: 'Portfolio', href: '#work' },
    { name: 'Technologies', href: '#capabilities' },
    { name: 'Contact', href: '#contact' },
    { name: 'Careers', href: '#' },
  ],
  resources: [
    { name: 'Case Studies', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Support', href: '#' },
    { name: 'Privacy Policy', href: '#' },
  ],
}

const capabilities = [
  { icon: Server, label: 'High Performance', color: 'text-emerald-500' },
  { icon: Shield, label: 'Enterprise Security', color: 'text-blue-500' },
  { icon: Globe, label: 'Global Scale', color: 'text-amber-500' },
  { icon: Code, label: 'Clean Code', color: 'text-purple-500' },
]

export function Footer() {
  const [ref, inView] = useInView({ threshold: 0.1 })

  return (
    <footer className="bg-stone-900 text-stone-100 pt-32 pb-16">
      {/* Top Section */}
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-lg bg-bronze-500 flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-serif tracking-widest">AETERNUM</h2>
                <p className="text-sm text-stone-400">Built to Endure</p>
              </div>
            </div>
            
            <p className="text-lg text-stone-300 mb-8 max-w-xl">
              Enterprise-grade web interfaces and robust backend systems engineered 
              with architectural precision. We build digital solutions that scale, 
              perform, and last decades.
            </p>
            
            {/* Capabilities */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {capabilities.map((cap, index) => {
                const Icon = cap.icon
                return (
                  <motion.div
                    key={cap.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <Icon className={`w-5 h-5 ${cap.color}`} />
                    <span className="text-sm text-stone-300">{cap.label}</span>
                  </motion.div>
                )
              })}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-bronze-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-bronze-500 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-bronze-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="mailto:A3ternum@proton.me"
                whileHover={{ y: -2 }}
                className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-bronze-500 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-8"
          >
            <div>
              <h3 className="font-serif text-lg mb-6 text-stone-300">Services</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="text-stone-400 hover:text-bronze-500 transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-lg mb-6 text-stone-300">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="text-stone-400 hover:text-bronze-500 transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-lg mb-6 text-stone-300">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="text-stone-400 hover:text-bronze-500 transition-colors flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-y border-stone-800 mb-12"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-bronze-500/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-bronze-500" />
            </div>
            <div>
              <h4 className="font-serif mb-1">Email</h4>
              <a 
                href="mailto:A3ternum@proton.me" 
                className="text-stone-400 hover:text-bronze-500 transition-colors"
              >
                A3ternum@proton.me
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-bronze-500/10 flex items-center justify-center">
              <Phone className="w-5 h-5 text-bronze-500" />
            </div>
            <div>
              <h4 className="font-serif mb-1">Phone</h4>
              <a 
                href="tel:+27671884529" 
                className="text-stone-400 hover:text-bronze-500 transition-colors"
              >
                +27 67 188 4529
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-bronze-500/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-bronze-500" />
            </div>
            <div>
              <h4 className="font-serif mb-1">Location</h4>
              <p className="text-stone-400">
                South Africa
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="text-center md:text-left">
            <p className="text-stone-400 text-sm">
              &copy; {new Date().getFullYear()} AETERNUM. All rights reserved. Built to endure.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Link 
              href="/privacy" 
              className="text-sm text-stone-400 hover:text-bronze-500 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="text-sm text-stone-400 hover:text-bronze-500 transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              href="/cookies" 
              className="text-sm text-stone-400 hover:text-bronze-500 transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Back to Top */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-bronze-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow z-50"
        aria-label="Back to top"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </footer>
  )
}