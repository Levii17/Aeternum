'use client'

import { ReactNode, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ParallaxSectionProps {
  children: ReactNode
  speed?: number
  className?: string
  offset?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  fade?: boolean
  triggerOnce?: boolean
}

export function ParallaxSection({
  children,
  speed = 0.5,
  className = '',
  offset = 0,
  direction = 'up',
  fade = true,
  triggerOnce = true,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${offset}% end`, `end start`],
  })

  // Calculate movement based on direction (hooks must be called at top-level)
  const upTransform = useTransform(scrollYProgress, [0, 1], ['0%', `${-100 * speed}%`])
  const downTransform = useTransform(scrollYProgress, [0, 1], ['0%', `${100 * speed}%`])
  const leftTransform = useTransform(scrollYProgress, [0, 1], ['0%', `${-100 * speed}%`])
  const rightTransform = useTransform(scrollYProgress, [0, 1], ['0%', `${100 * speed}%`])

  const y = direction === 'up' ? upTransform : direction === 'down' ? downTransform : undefined
  const x = direction === 'left' ? leftTransform : direction === 'right' ? rightTransform : undefined

  // Fade effect
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], fade ? [0, 1, 1, 0] : [1, 1, 1, 1])

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div
        style={{
          y: y,
          x: x,
          opacity: fade ? opacity : 1,
        }}
        initial={triggerOnce ? {} : { opacity: 0 }}
        whileInView={triggerOnce ? {} : { opacity: 1 }}
        viewport={{ once: triggerOnce, margin: '-20%' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// Specialized Parallax Components

interface ParallaxLayerProps {
  depth: number // 0-1, where 0 is background, 1 is foreground
  children: ReactNode
  className?: string
  offset?: number
}

export function ParallaxLayer({ depth, children, className, offset = 0 }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${offset}% end`, `end start`],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${-50 * depth}%`])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 + depth * 0.1])

  return (
    <div ref={ref} className={cn('relative', className)}>
      <motion.div style={{ y, scale }}>
        {children}
      </motion.div>
    </div>
  )
}

interface ParallaxTextProps {
  text: string
  speed?: number
  className?: string
  direction?: 'left' | 'right'
  repeat?: number
}

export function ParallaxText({
  text,
  speed = 0.5,
  className = '',
  direction = 'left',
  repeat = 2,
}: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'left' ? ['0%', `${-100 * speed}%`] : [`${-100 * speed}%`, '0%']
  )

  const repeatedText = Array(repeat).fill(text).join(' • ')

  return (
    <div ref={ref} className={cn('relative overflow-hidden py-8', className)}>
      <motion.div
        style={{ x }}
        className="whitespace-nowrap"
      >
        <span className="text-4xl md:text-6xl font-serif tracking-widest text-stone-300 dark:text-stone-700">
          {repeatedText}
        </span>
      </motion.div>
    </div>
  )
}

interface ParallaxImageProps {
  src: string
  alt: string
  speed?: number
  className?: string
  priority?: boolean
}

export function ParallaxImage({
  src,
  alt,
  speed = 0.3,
  className = '',
  priority = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${-50 * speed}%`])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05])

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div
        style={{ y, scale }}
        className="w-full h-full"
      >
        {/* Note: In a real project, use next/image */}
        <div 
          className="w-full h-full bg-gradient-to-br from-bronze-500/20 to-stone-500/20"
          style={{ backgroundImage: `url(${src})` }}
        />
      </motion.div>
    </div>
  )
}

// Staggered Parallax Children
interface StaggeredParallaxProps {
  children: ReactNode[]
  staggerDelay?: number
  className?: string
}

export function StaggeredParallax({ children, staggerDelay = 0.1, className }: StaggeredParallaxProps) {
  return (
    <div className={cn('space-y-8', className)}>
      {children.map((child, index) => (
        <ParallaxSection
          key={index}
          speed={0.3 + (index * 0.1)}
          offset={-50 + (index * 20)}
          fade
          triggerOnce={false}
        >
          {child}
        </ParallaxSection>
      ))}
    </div>
  )
}

// Glassmorphism Parallax
interface GlassParallaxProps {
  children: ReactNode
  blur?: number
  className?: string
}

export function GlassParallax({ children, blur = 8, className }: GlassParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['20%', '-20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  return (
    <div ref={ref} className={cn('relative', className)}>
      <motion.div
        style={{ y, opacity }}
        className={`
          backdrop-blur-${blur}
          bg-white/10 dark:bg-black/10
          border border-white/20 dark:border-white/10
          rounded-2xl p-8
        `}
      >
        {children}
      </motion.div>
    </div>
  )
}