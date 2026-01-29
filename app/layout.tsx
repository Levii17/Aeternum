import './globals.css'
import type { Metadata } from 'next'
import { Inter, Cinzel, Fira_Code } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { ScrollProgress } from '@/components/shared/ScrollProgress'
import { CustomCursor } from '@/components/shared/CustomCursor'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'AETERNUM - Web Design & System Architecture Built to Endure',
  description: 'Enterprise-grade web interfaces and robust backend systems engineered with architectural precision. We build digital solutions that scale, perform, and last decades—not months.',
  keywords: ['web design', 'system architecture', 'enterprise software', 'full stack development'],
  openGraph: {
    title: 'AETERNUM - Web & System Design Built to Endure',
    description: 'Enterprise-grade web design and system architecture with Roman precision',
    type: 'website',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AETERNUM - Web Design & System Architecture',
    description: 'Built to endure. Enterprise-grade digital solutions.',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable} ${firaCode.variable}`} suppressHydrationWarning>
      <body className="antialiased scrollbar-thin">
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
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}