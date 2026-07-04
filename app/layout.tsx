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

export const metadata: Metadata = {
  title: 'Luis Miguel Triana Rueda — Software Engineer & ML Student',
  description:
    'Portfolio de Luis Miguel Triana Rueda, Ingeniero de Software y estudiante de ML Engineering. Construyendo IA para agricultura colombiana. MBZUAI 2027.',
  keywords: ['Luis Miguel Triana Rueda', 'Luis Triana', 'Software Engineer', 'ML Engineering', 'Colombia', 'MBZUAI', 'AI', 'Java', 'Python', 'FastAPI'],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'Luis Miguel Triana Rueda — Software Engineer & ML Student',
    description: 'Portfolio de Luis Miguel Triana Rueda, construyendo IA para agricultura colombiana.',
    type: 'website',
    url: 'https://luistriana.dev',
    siteName: 'Luis Miguel Triana Rueda',
  },
  twitter: {
    card: 'summary',
    title: 'Luis Miguel Triana Rueda — Software Engineer & ML Student',
    description: 'Portfolio de Luis Miguel Triana Rueda, construyendo IA para agricultura colombiana.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
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
