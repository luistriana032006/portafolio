import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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
    url: 'https://luistriana.vercel.app',
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
        {children}
        <Analytics />
      </body>
    </html>
  )
}
