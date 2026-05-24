import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Versate | Premium Luxury Land Investment in Mauritius',
  description: 'Discover exclusive luxury land investment opportunities in Mauritius. Premium plots, gated developments, and high-end investment properties.',
  keywords: ['luxury land', 'investment', 'Mauritius', 'premium plots', 'real estate', 'gated developments'],
  authors: [{ name: 'Versate' }],
  openGraph: {
    title: 'Versate | Premium Luxury Land Investment',
    description: 'Discover exclusive luxury land investment opportunities in Mauritius.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0d0d0d',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
