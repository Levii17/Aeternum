'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useMousePosition } from '@/hooks/useMousePosition'

export function CustomCursor() {
  const { x, y } = useMousePosition()
  const [isPointer, setIsPointer] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const cursorX = useSpring(useMotionValue(0), { stiffness: 500, damping: 28 })
  const cursorY = useSpring(useMotionValue(0), { stiffness: 500, damping: 28 })

  useEffect(() => {
    cursorX.set(x)
    cursorY.set(y)
  }, [x, y, cursorX, cursorY])

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer')
      setIsHovering(target.closest('a, button, [role="button"]') !== null)
    }

    document.addEventListener('mouseover', updateCursor)
    return () => document.removeEventListener('mouseover', updateCursor)
  }, [])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-bronze-500/30 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: cursorX, y: cursorY }}
        animate={{
          scale: isPointer ? 2 : isHovering ? 1.5 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-bronze-500 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: cursorX, y: cursorY }}
        animate={{
          scale: isPointer ? 0.5 : 1,
        }}
        transition={{ duration: 0.1 }}
      />
    </>
  )
}