'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { FloatingOrbs } from '@/components/ui/FloatingOrbs'

import { Section } from '@/components/shared/Section'

export function Hero() {
  const constraintsRef = useRef(null)

  return (
    <Section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern bg-[length:100px_100px] opacity-10" />
      <FloatingOrbs />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-bronze-500/5 via-transparent to-stone-500/5" />
      
      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="text-center">
          {/* Roman numeral decorator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <span className="text-sm text-bronze-500 font-semibold tracking-widest">
              AETERNALIS • ROMAN ENGINEERING
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl font-serif font-semibold tracking-wider mb-12 leading-[0.95]"
          >
            Web Design &
            <br />
            <span className="gradient-text">System Architecture</span>
            <br />
            Built to Endure
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl max-w-4xl mx-auto mb-16 text-stone-700 dark:text-stone-300 font-light"
          >
            Enterprise-grade web interfaces and robust backend systems engineered with architectural precision. 
            We build digital solutions that scale, perform, and last decades—not months.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
          >
            <Link
              href="#contact"
              className="btn btn-primary group"
            >
              Start a Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#work"
              className="btn group"
            >
              View Our Work
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest text-stone-500">SCROLL</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-px h-12 bg-gradient-to-b from-bronze-500 to-transparent"
          />
        </div>
      </motion.div>
    </Section>
  )
}