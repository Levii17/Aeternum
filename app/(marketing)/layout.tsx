import { Metadata } from 'next'
import { Navigation } from '@/components/shared/Navigation'
import { ScrollProgress } from '@/components/shared/ScrollProgress'
import { CustomCursor } from '@/components/shared/CustomCursor'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

export const metadata: Metadata = {
  title: 'AETERNUM - Web Design & System Architecture Built to Endure',
  description: 'Enterprise-grade web interfaces and robust backend systems engineered with architectural precision. We build digital solutions that scale, perform, and last decades—not months.',
  keywords: ['web design', 'system architecture', 'enterprise software', 'full stack development'],
  openGraph: {
    title: 'AETERNUM - Web & System Design Built to Endure',
    description: 'Enterprise-grade web design and system architecture with Roman precision',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AETERNUM - Web Design & System Architecture',
      },
    ],
    url: 'https://aeternum.design',
    siteName: 'AETERNUM',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AETERNUM - Web Design & System Architecture',
    description: 'Built to endure. Enterprise-grade digital solutions.',
    images: ['/og-image.jpg'],
    creator: '@aeternum',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F4F2EE' },
    { media: '(prefers-color-scheme: dark)', color: '#1C1C1C' },
  ],
  alternates: {
    canonical: 'https://aeternum.design',
  },
  verification: {
    google: 'verification_token',
    yandex: 'verification_token',
    yahoo: 'verification_token',
  },
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ScrollProgress />
      <CustomCursor />
      <Navigation />
      <main className="min-h-screen">
        {children}
      </main>
    </ThemeProvider>
  )
}