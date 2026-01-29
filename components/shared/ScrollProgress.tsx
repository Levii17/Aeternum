'use client'

import { motion } from 'framer-motion'
import { useScrollProgress } from '@/hooks/useScrollProgress'

export function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <motion.div
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-bronze-500 to-bronze-300 z-60"
      style={{ width: `${progress}%` }}
      transition={{ duration: 0.1 }}
    />
  )
}