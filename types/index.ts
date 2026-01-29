import { ReactNode } from 'react'
import { StaticImageData } from 'next/image'

// Common component props
export interface ChildrenProps {
  children: ReactNode
}

export interface ClassNameProps {
  className?: string
}

export interface WithChildrenAndClassName extends ChildrenProps, ClassNameProps {}

// Navigation types
export type NavItem = {
  label: string
  href: string
  icon?: ReactNode
  description?: string
  isExternal?: boolean
  isActive?: boolean
}

export type NavigationConfig = {
  main: NavItem[]
  footer: {
    services: NavItem[]
    company: NavItem[]
    resources: NavItem[]
  }
}

// Service types
export type ServiceCategory = 'web' | 'system' | 'both' | 'consultation'

export type Service = {
  id: string
  title: string
  category: ServiceCategory
  description: string
  icon: string
  features: string[]
  duration?: string
  deliverables?: string[]
}

// Tech stack types
export type TechCategory = 'frontend' | 'backend' | 'infrastructure' | 'databases' | 'tools' | 'design'

export type TechItem = {
  name: string
  category: TechCategory
  proficiency: number // 0-100
  years?: number
  isFavorite?: boolean
  url?: string
}

// Portfolio types
export type ProjectCategory = 'all' | 'web' | 'system' | 'both'

export type ProjectMetric = {
  value: string | number
  label: string
  icon?: string
}

export type Project = {
  id: string | number
  title: string
  category: ProjectCategory
  description: string
  client?: string
  year: number
  duration?: string
  metrics: ProjectMetric[]
  techStack: string[]
  featured?: boolean
  caseStudyUrl?: string
  liveUrl?: string
  githubUrl?: string
  image?: StaticImageData | string
  thumbnail?: StaticImageData | string
  colorScheme?: string
  tags?: string[]
  challenges?: string[]
  solutions?: string[]
  results?: string[]
}

// Process types
export type ProcessStep = {
  number: string
  title: string
  description: string
  duration?: string
  deliverables?: string[]
  icon?: string
  details: string[]
}

// Contact form types
export type BudgetRange = '10-25k' | '25-50k' | '50-100k' | '100k+' | 'custom'

export type ContactFormData = {
  name: string
  email: string
  company?: string
  projectType: ServiceCategory
  budget?: BudgetRange
  message: string
  referralSource?: string
  timeline?: string
  attachments?: File[]
}

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>

// Theme types
export type Theme = 'light' | 'dark' | 'system'

export type ThemeContextType = {
  theme: Theme
  setTheme: (theme: Theme) => void
  isDarkMode: boolean
}

// Animation types
export type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'none'
export type AnimationType = 'fade' | 'slide' | 'scale' | 'rotate' | 'flip'
export type AnimationEasing = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'spring'

export type AnimationConfig = {
  type: AnimationType
  direction?: AnimationDirection
  duration?: number
  delay?: number
  easing?: AnimationEasing
  threshold?: number
  once?: boolean
  amount?: 'some' | 'all' | number
}

// Performance metrics
export type PerformanceMetrics = {
  lcp?: number
  fid?: number
  cls?: number
  inp?: number
  tti?: number
  tbt?: number
  fcp?: number
}

export type PerformanceReport = {
  timestamp: Date
  url: string
  metrics: PerformanceMetrics
  userAgent?: string
  connection?: string
}

// SEO types
export type MetaTags = {
  title: string
  description: string
  keywords?: string[]
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  twitterCard?: 'summary' | 'summary_large_image' | 'player' | 'app'
  twitterSite?: string
  twitterCreator?: string
  canonicalUrl?: string
  robots?: string
}

export type StructuredData = {
  '@context': string
  '@type': string
  [key: string]: unknown
}

// API response types
export type ApiResponse<T = unknown> = {
  success: boolean
  data?: T
  error?: string
  message?: string
  code?: number
  timestamp: Date
}

export type PaginatedResponse<T> = ApiResponse<{
  items: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
  totalPages: number
}>

// Form validation types
export type ValidationRule = {
  required?: boolean | string
  minLength?: number | { value: number; message: string }
  maxLength?: number | { value: number; message: string }
  pattern?: RegExp | { value: RegExp; message: string }
  validate?: (value: unknown) => boolean | string
  min?: number | { value: number; message: string }
  max?: number | { value: number; message: string }
}

export type ValidationSchema<T> = {
  [K in keyof T]?: ValidationRule
}

// Image types
export type ImageAsset = {
  src: StaticImageData | string
  alt: string
  width?: number
  height?: number
  caption?: string
  priority?: boolean
  placeholder?: 'blur' | 'empty'
  quality?: number
}

// Breakpoint types
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

// Color scheme types
export type ColorPalette = {
  primary: string
  secondary: string
  accent: string
  background: string
  foreground: string
  muted: string
  border: string
  success: string
  warning: string
  error: string
  info: string
}

// Component variants
export type ButtonVariant = 
  | 'default' 
  | 'destructive' 
  | 'outline' 
  | 'secondary' 
  | 'ghost' 
  | 'link' 
  | 'gradient' 
  | 'glass'

export type ButtonSize = 'default' | 'sm' | 'lg' | 'xl' | 'icon'

export type CardVariant = 'default' | 'glass' | 'gradient' | 'outline'

// Event types
export type MouseEventData = {
  x: number
  y: number
  clientX: number
  clientY: number
  pageX: number
  pageY: number
  screenX: number
  screenY: number
  movementX: number
  movementY: number
  target: EventTarget | null
  isMoving: boolean
  isDown: boolean
}

// Scroll types
export type ScrollDirection = 'up' | 'down' | 'none'

export type ScrollPosition = {
  x: number
  y: number
  direction: ScrollDirection
  progress: number // 0-1
  isAtTop: boolean
  isAtBottom: boolean
  velocity: number
}

// Parallax types
export type ParallaxConfig = {
  speed: number
  offset: number
  direction: AnimationDirection
  fade: boolean
  triggerOnce: boolean
  rootMargin?: string
  threshold?: number
}

// Analytics types
export type AnalyticsEvent = {
  name: string
  category: string
  label?: string
  value?: number
  timestamp: Date
  properties?: Record<string, unknown>
}

export type PageView = {
  url: string
  referrer?: string
  timestamp: Date
  duration?: number
  scrollDepth?: number
}

// Cache types
export type CacheEntry<T = unknown> = {
  data: T
  timestamp: number
  expiresAt: number
  staleAt: number
}

export type CacheConfig = {
  ttl: number // Time to live in milliseconds
  staleWhileRevalidate?: number
  maxSize?: number
}

// Environment types
export type Environment = 'development' | 'production' | 'test'

// Feature flag types
export type FeatureFlag = {
  key: string
  enabled: boolean
  description?: string
  environments?: Environment[]
  users?: string[]
  percentage?: number
}

// Configuration types
export type AppConfig = {
  site: {
    name: string
    title: string
    description: string
    url: string
    email: string
    phone: string
    address: string
  }
  features: {
    darkMode: boolean
    animations: boolean
    parallax: boolean
    analytics: boolean
  }
  performance: {
    imageOptimization: boolean
    fontOptimization: boolean
    scriptOptimization: boolean
  }
  integrations: {
    googleAnalytics?: string
    sentry?: string
    resend?: string
    stripe?: string
  }
}

// Export utility types
export type ValueOf<T> = T[keyof T]
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
export type RequireKeys<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type Nullable<T> = T | null
export type Maybe<T> = T | undefined

// Component-specific types
export type SectionProps = WithChildrenAndClassName & {
  id?: string
  title?: string
  subtitle?: string
  description?: string
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  background?: 'default' | 'alternate' | 'gradient' | 'dark'
  fullWidth?: boolean
}

export type HeroProps = {
  title: string
  subtitle?: string
  description?: string
  ctaPrimary?: {
    label: string
    href: string
  }
  ctaSecondary?: {
    label: string
    href: string
  }
  stats?: Array<{
    value: string | number
    label: string
  }>
  background?: 'default' | 'gradient' | 'video' | 'particles'
}

// Export all types
export type {
  // Re-export for convenience
  ReactNode,
  StaticImageData,
}