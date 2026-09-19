import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

const TITLE = 'Luis Miguel Triana Rueda — Software Engineer & ML Student'
const DESCRIPTION =
  'Ingeniero de software y estudiante de ML Engineering en Colombia. IA aplicada a negocios reales de LatAm: trazable, con humano en el loop y local-first. Práctica QA Automation en Rappi · GCI World (U. Tokyo) · MBZUAI 2027.'

export const metadata: Metadata = {
  metadataBase: new URL('https://luistriana.dev'),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  authors: [{ name: 'Luis Miguel Triana Rueda', url: 'https://luistriana.dev' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    url: 'https://luistriana.dev',
    siteName: 'Luis Miguel Triana Rueda',
    locale: 'es_CO',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
}

const PERSON_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Luis Miguel Triana Rueda',
  url: 'https://luistriana.dev',
  jobTitle: 'Software Engineer & ML Engineering Student',
  description: DESCRIPTION,
  address: { '@type': 'PostalAddress', addressLocality: 'Socorro', addressRegion: 'Santander', addressCountry: 'CO' },
  alumniOf: [{ '@type': 'CollegeOrUniversity', name: 'Corporación Universitaria Iberoamericana' }],
  knowsAbout: ['Machine Learning', 'Software Engineering', 'Java', 'Spring Boot', 'Python', 'FastAPI', 'QA Automation'],
  sameAs: [
    'https://github.com/luistriana032006',
    'https://www.linkedin.com/in/luis-miguel-triana-rueda-2917202a2',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSON_LD) }}
        />
        {/* Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-P54CK4K0TC"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-P54CK4K0TC');
          `}
        </Script>
        {/* End Google Analytics */}

        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('set', 'autoConfig', false, '1016500994307068');
            fbq('init', '1016500994307068');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height={1}
            width={1}
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1016500994307068&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
        {children}
        <Analytics />
      </body>
    </html>
  )
}
