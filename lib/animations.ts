import { Variants, Transition } from 'framer-motion'
import { cubicBezier } from 'framer-motion'

// Common easing functions
export const easings = {
  linear: cubicBezier(0, 0, 1, 1),
  easeIn: cubicBezier(0.42, 0, 1, 1),
  easeOut: cubicBezier(0, 0, 0.58, 1),
  easeInOut: cubicBezier(0.42, 0, 0.58, 1),
  easeOutBack: cubicBezier(0.34, 1.56, 0.64, 1),
  easeInOutBack: cubicBezier(0.68, -0.6, 0.32, 1.6),
  easeOutExpo: cubicBezier(0.19, 1, 0.22, 1),
  spring: cubicBezier(0.22, 1, 0.36, 1), // Custom spring-like easing
  smooth: cubicBezier(0.4, 0, 0.2, 1),
  bounce: cubicBezier(0.68, -0.55, 0.265, 1.55),
}

// Common transitions
export const transitions = {
  fast: { duration: 0.2, ease: easings.easeOut },
  medium: { duration: 0.4, ease: easings.easeInOut },
  slow: { duration: 0.8, ease: easings.easeInOut },
  spring: { type: 'spring', stiffness: 100, damping: 20 },
  springLight: { type: 'spring', stiffness: 200, damping: 25 },
  springHeavy: { type: 'spring', stiffness: 80, damping: 15 },
  smooth: { duration: 0.6, ease: easings.smooth },
  bounce: { type: 'spring', stiffness: 400, damping: 10 },
} as const

// Page transitions
export const pageTransition: Transition = {
  duration: 0.6,
  ease: easings.easeInOut,
}

export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.easeOut,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: easings.easeIn,
    },
  },
}

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: transitions.medium,
  },
}

// Fade animations
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
}

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
}

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
}

export const fadeInScale: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.1 },
}

// Slide animations
export const slideUp: Variants = {
  initial: { y: '100%', opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: '-100%', opacity: 0 },
}

export const slideDown: Variants = {
  initial: { y: '-100%', opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: '100%', opacity: 0 },
}

export const slideLeft: Variants = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '-100%', opacity: 0 },
}

export const slideRight: Variants = {
  initial: { x: '-100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '100%', opacity: 0 },
}

// Scale animations
export const scaleUp: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 1.2, opacity: 0 },
}

export const scaleDown: Variants = {
  initial: { scale: 1.2, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
}

// Rotate animations
export const rotateIn: Variants = {
  initial: { rotate: -90, opacity: 0 },
  animate: { rotate: 0, opacity: 1 },
  exit: { rotate: 90, opacity: 0 },
}

export const rotateInLeft: Variants = {
  initial: { rotate: -45, x: -50, opacity: 0 },
  animate: { rotate: 0, x: 0, opacity: 1 },
}

export const rotateInRight: Variants = {
  initial: { rotate: 45, x: 50, opacity: 0 },
  animate: { rotate: 0, x: 0, opacity: 1 },
}

// Flip animations
export const flipX: Variants = {
  initial: { rotateX: -90, opacity: 0 },
  animate: { rotateX: 0, opacity: 1 },
  exit: { rotateX: 90, opacity: 0 },
}

export const flipY: Variants = {
  initial: { rotateY: -90, opacity: 0 },
  animate: { rotateY: 0, opacity: 1 },
  exit: { rotateY: 90, opacity: 0 },
}

// Bounce animations
export const bounceIn: Variants = {
  initial: { scale: 0.3, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 10,
    },
  },
}

export const bounceInUp: Variants = {
  initial: { y: 100, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 12,
    },
  },
}

// Text animations
export const textReveal: Variants = {
  initial: { opacity: 0, y: '100%' },
  animate: { opacity: 1, y: 0 },
}

export const textFadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
}

export const letterAnimation: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

// Grid animations
export const gridItem: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
}

export const gridStagger: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
}

// Card hover animations
export const cardHover: Variants = {
  initial: { scale: 1, y: 0 },
  hover: { 
    scale: 1.05, 
    y: -8,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
  tap: { scale: 0.95 },
}

export const cardHoverLift: Variants = {
  initial: { y: 0 },
  hover: { y: -10 },
}

export const cardHoverShadow: Variants = {
  initial: { boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' },
  hover: { boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)' },
}

// Button animations
export const buttonHover: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
}

export const buttonMagnetic: Variants = {
  hover: (custom: { x: number; y: number }) => ({
    x: custom.x * 10,
    y: custom.y * 10,
  }),
}

// Icon animations
export const iconHover: Variants = {
  initial: { scale: 1, rotate: 0 },
  hover: { scale: 1.2, rotate: 10 },
}

export const iconSpin: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      ease: 'linear',
      repeat: Infinity,
    },
  },
}

// Loading animations
export const loadingPulse: Variants = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export const loadingSpin: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      ease: 'linear',
      repeat: Infinity,
    },
  },
}

// Progress animations
export const progressFill: Variants = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1 },
}

// Parallax animations
export const parallaxUp: Variants = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
}

export const parallaxDown: Variants = {
  initial: { y: -50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
}

// Scroll animations
export const scrollReveal: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
}

// Complex animation sequences
export const heroReveal: Variants = {
  initial: { opacity: 0, y: 60, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: easings.easeOutBack,
    },
  },
}

export const modalAnimation: Variants = {
  initial: { opacity: 0, scale: 0.8, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
}

// Animation presets for common use cases
export const animationPresets = {
  page: pageVariants,
  fadeUp: fadeInUp,
  fadeDown: fadeInDown,
  fadeLeft: fadeInLeft,
  fadeRight: fadeInRight,
  slideUp: slideUp,
  slideDown: slideDown,
  scaleUp: scaleUp,
  bounce: bounceIn,
  card: cardHover,
  button: buttonHover,
  text: textFadeIn,
  grid: gridStagger,
  hero: heroReveal,
  modal: modalAnimation,
} as const

// Helper function to create staggered animations
export function createStagger(delay: number = 0.1): Variants {
  return {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
      },
    },
  }
}

// Helper function to create scroll-triggered animations
export function createScrollAnimation(
  yOffset: number = 50
): Variants {
  return {
    initial: { opacity: 0, y: yOffset },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easings.easeOut,
      },
    },
  };
}

// Type for animation variants
export type AnimationPreset = keyof typeof animationPresets