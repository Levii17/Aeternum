// Site metadata
export const SITE_CONFIG = {
  name: 'AETERNUM',
  title: 'Web Design & System Architecture Built to Endure',
  description: 'Enterprise-grade web interfaces and robust backend systems engineered with architectural precision. We build digital solutions that scale, perform, and last decades—not months.',
  url: 'https://aeternum.design',
  ogImage: '/og-image.jpg',
  twitterHandle: '@aeternum',
  email: 'hello@aeternum.design',
  phone: '+1 (555) 123-4567',
  address: '123 Architecture Way, San Francisco, CA 94107',
  foundingYear: 2016,
} as const

// Navigation
export const NAVIGATION = {
  home: '/',
  services: '#services',
  capabilities: '#capabilities',
  work: '#work',
  process: '#process',
  contact: '#contact',
} as const

export const NAV_ITEMS = [
  { label: 'Services', href: NAVIGATION.services },
  { label: 'Capabilities', href: NAVIGATION.capabilities },
  { label: 'Work', href: NAVIGATION.work },
  { label: 'Process', href: NAVIGATION.process },
  { label: 'Contact', href: NAVIGATION.contact },
] as const

// Social media
export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/company/aeternum',
  github: 'https://github.com/aeternum',
  twitter: 'https://twitter.com/aeternum',
  dribbble: 'https://dribbble.com/aeternum',
  behance: 'https://behance.net/aeternum',
} as const

// Services
export const SERVICES = {
  webDesign: {
    title: 'Web Design',
    description: 'User-Facing Interfaces',
    items: [
      'Custom Website Design & Development',
      'Responsive UI/UX Design',
      'E-commerce Platforms',
      'Progressive Web Apps (PWA)',
      'Landing Pages & Marketing Sites',
      'Performance Optimization',
      'Accessibility Compliance (WCAG)',
    ],
  },
  systemArchitecture: {
    title: 'System Architecture',
    description: 'Backend Infrastructure',
    items: [
      'RESTful & GraphQL API Design',
      'Microservices Architecture',
      'Database Design & Optimization',
      'Cloud Infrastructure (AWS, Azure, GCP)',
      'DevOps & CI/CD Pipelines',
      'Security & Compliance',
      'System Monitoring & Maintenance',
    ],
  },
} as const

// Tech stack categories
export const TECH_STACK = {
  frontend: {
    title: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Vue.js', 'Tailwind CSS'],
  },
  backend: {
    title: 'Backend',
    items: ['Node.js', 'Python', 'Go', 'Java', 'GraphQL'],
  },
  infrastructure: {
    title: 'Infrastructure',
    items: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
  },
  databases: {
    title: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Elasticsearch'],
  },
} as const

// Portfolio projects
export const PORTFOLIO_PROJECTS = [
  {
    id: 1,
    title: 'FinTech Trading Platform',
    category: 'both' as const,
    description: 'Enterprise-grade trading platform handling $2B+ in daily transactions with real-time data processing and institutional-level security.',
    metrics: [
      { value: '99.99%', label: 'Uptime' },
      { value: '50ms', label: 'Avg Response' },
      { value: '10M+', label: 'Daily Users' },
    ],
    tech: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'WebSocket'],
  },
  {
    id: 2,
    title: 'Heritage Museum Digital Experience',
    category: 'web' as const,
    description: 'Immersive cultural heritage platform with 3D exhibits, AR integration, and accessible design serving 500K+ annual visitors.',
    metrics: [
      { value: '85%', label: 'Engagement' },
      { value: '1.2s', label: 'Load Time' },
      { value: 'AAA', label: 'Accessibility' },
    ],
    tech: ['Next.js', 'Three.js', 'TypeScript', 'Vercel'],
  },
  {
    id: 3,
    title: 'Global E-commerce Infrastructure',
    category: 'system' as const,
    description: 'Scalable microservices architecture powering international e-commerce operations across 40 countries with multi-currency support.',
    metrics: [
      { value: '100K+', label: 'TPS' },
      { value: '5M+', label: 'Orders/Day' },
      { value: '40', label: 'Countries' },
    ],
    tech: ['Kubernetes', 'Go', 'PostgreSQL', 'Redis', 'Kafka'],
  },
] as const

// Process steps
export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discovery',
    description: 'Requirements analysis, user research, technical assessment, and project scoping.',
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
    details: [
      'Production deployment',
      'Performance monitoring',
      'Security updates',
      'Ongoing support',
    ],
  },
] as const

// Capabilities
export const CAPABILITIES = [
  {
    title: 'Performance Optimization',
    description: 'Load times under 1.5s, 95+ Lighthouse scores',
  },
  {
    title: 'Security First',
    description: 'OWASP compliance, zero-trust architecture',
  },
  {
    title: 'Global Scale',
    description: 'Multi-region deployment, CDN integration',
  },
  {
    title: 'High Availability',
    description: '99.9% uptime, automated failover',
  },
  {
    title: 'DevOps Excellence',
    description: 'Infrastructure as code, automated pipelines',
  },
  {
    title: 'Monitoring & Analytics',
    description: 'Real-time insights, proactive alerts',
  },
] as const

// Client logos
export const CLIENT_LOGOS = [
  'ACME Corp',
  'TechStart',
  'FinanceGlobal',
  'HealthCare+',
  'EduLearn',
  'RetailCo',
] as const

// Stats
export const STATS = [
  { value: '8+', label: 'Years Experience' },
  { value: '150+', label: 'Projects Delivered' },
  { value: '99.9%', label: 'Uptime Average' },
  { value: '100%', label: 'Client Satisfaction' },
] as const

// Contact form options
export const CONTACT_OPTIONS = {
  projectTypes: [
    { value: 'web', label: 'Web Design' },
    { value: 'system', label: 'System Architecture' },
    { value: 'both', label: 'Full Stack (Web + System)' },
    { value: 'consultation', label: 'Consultation' },
  ] as const,
  budgetRanges: [
    { value: '10-25k', label: '$10K - $25K' },
    { value: '25-50k', label: '$25K - $50K' },
    { value: '50-100k', label: '$50K - $100K' },
    { value: '100k+', label: '$100K+' },
  ] as const,
} as const

// Footer links
export const FOOTER_LINKS = {
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
} as const

// Performance targets
export const PERFORMANCE_TARGETS = {
  lcp: 1.5, // seconds
  fid: 50, // milliseconds
  cls: 0.1, // score
  inp: 200, // milliseconds
  tti: 3.8, // seconds
  tbt: 200, // milliseconds
} as const

// Breakpoints (Tailwind default)
export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

// Colors
export const COLORS = {
  bronze: {
    50: '#FAF8F5',
    100: '#F4F0E8',
    200: '#E8DCC9',
    300: '#DCC8A9',
    400: '#D0B48A',
    500: '#8C6A43',
    600: '#765635',
    700: '#614228',
    800: '#4B2F1A',
    900: '#361B0D',
    950: '#2A1F0F',
  },
  stone: {
    50: '#F4F2EE',
    100: '#E6E1D6',
    150: '#DCD6C9',
    200: '#D2CEC4',
    400: '#B2B0AA',
    700: '#3A3A3A',
    900: '#1C1C1C',
  },
  accent: {
    blue: '#4A90E2',
    green: '#50C878',
    amber: '#F59E0B',
    purple: '#8B5CF6',
    rose: '#F43F5E',
  },
} as const

// Typography
export const TYPOGRAPHY = {
  fonts: {
    inter: 'var(--font-inter)',
    cinzel: 'var(--font-cinzel)',
    firaCode: 'var(--font-fira-code)',
  },
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.25rem',
    xl: '1.75rem',
    '2xl': '2.5rem',
    '3xl': '3.5rem',
    '4xl': '4.5rem',
    '5xl': '5rem',
    hero: '5rem',
  },
  spacing: {
    letter: {
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
    line: {
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
  },
} as const

// Animation durations
export const ANIMATION_DURATIONS = {
  fast: 120,
  medium: 240,
  slow: 420,
  verySlow: 600,
} as const

// Z-index layers
export const Z_INDEX = {
  hide: -1,
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const

// API endpoints
export const API_ENDPOINTS = {
  contact: '/api/contact',
  health: '/api/health',
  sitemap: '/api/sitemap',
} as const

// Feature flags
export const FEATURE_FLAGS = {
  enableCustomCursor: true,
  enableParallax: true,
  enableAnimations: true,
  enableDarkMode: true,
  enableAnalytics: false, // Set to true in production
} as const

// Environment variables (client-side safe)
export const ENV = {
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  isTest: process.env.NODE_ENV === 'test',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
} as const

// Cache keys
export const CACHE_KEYS = {
  theme: 'aeternum-theme',
  contactForm: 'aeternum-contact-form',
  portfolioFilter: 'aeternum-portfolio-filter',
} as const

// Regex patterns
export const REGEX = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^\+?[\d\s\-\(\)]{10,}$/,
  url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
} as const

// Error messages
export const ERROR_MESSAGES = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be at most ${max} characters`,
  pattern: 'Invalid format',
} as const

// Success messages
export const SUCCESS_MESSAGES = {
  contactForm: 'Thank you for your message! We\'ll get back to you within 24 hours.',
  newsletter: 'Successfully subscribed to our newsletter!',
  download: 'Download started successfully',
} as const

// Validation rules
export const VALIDATION_RULES = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  email: {
    required: true,
    pattern: REGEX.email,
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 5000,
  },
  phone: {
    required: false,
    pattern: REGEX.phone,
  },
} as const