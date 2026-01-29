import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { TechStack } from '@/components/sections/TechStack'
import { Portfolio } from '@/components/sections/Portfolio'
import { Process } from '@/components/sections/Process'
import { Contact } from '@/components/sections/Contact'
// import { ClientLogos } from '@/components/sections/ClientLogos'
import Script from 'next/script'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

export default function Home() {
  return (
    <>
      {/* Structured Data for SEO */}
      <Script
        id="structured-data"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'AETERNUM',
            description: 'Web Design & System Architecture Built to Endure',
            url: 'https://aeternum.design',
            logo: 'https://aeternum.design/logo.png',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '10 Buit',
              addressLocality: 'Koffiefontein',
              addressRegion: 'FS',
              postalCode: '9986',
              addressCountry: 'SA',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+27 67 188 4529',
              contactType: 'Customer Service',
              email: 'hello@aeternum.design',
              areaServed: 'SA',
              availableLanguage: ['English'],
            },
            sameAs: [
              'https://linkedin.com/company/aeternum',
              'https://github.com/aeternum',
              'https://twitter.com/aeternum',
            ],
          }),
        }}
      />
      
      {/* Performance Monitoring Scripts */}
      {process.env.NODE_ENV === 'production' && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `}
          </Script>
        </>
      )}

      {/* Main Content */}
      <div className="relative">
        <Hero />
        <Services />
        <TechStack />
        <Portfolio />
        {/* <ClientLogos /> */}
        <Process />
        <Contact />
      </div>

      {/* Vercel Analytics */}
      <Analytics />
      <SpeedInsights />
    </>
  )
}