import type { Metadata, Viewport } from 'next'
import { cookies } from 'next/headers'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Chatbot } from '@/components/chatbot'
import { LanguageProvider } from '@/components/language-provider'
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

const metadataByLanguage = {
  en: {
    title: 'Vestate Properties | Premium Luxury Land Investment in Mauritius',
    description:
      'Discover exclusive luxury land investment opportunities in Mauritius. Premium plots, gated developments, and high-end investment properties.',
    keywords: ['luxury land', 'investment', 'Mauritius', 'premium plots', 'real estate', 'gated developments'],
    openGraphTitle: 'Vestate Properties | Premium Luxury Land Investment',
    openGraphDescription: 'Discover exclusive luxury land investment opportunities in Mauritius.',
  },
  fr: {
    title: 'Vestate Properties | Investissement foncier premium a Maurice',
    description:
      'Decouvrez des opportunites foncieres exclusives a Maurice, incluant terrains premium, domaines securises et biens d investissement.',
    keywords: ['terrain de luxe', 'investissement', 'Maurice', 'terrains premium', 'immobilier', 'domaines securises'],
    openGraphTitle: 'Vestate Properties | Investissement foncier premium',
    openGraphDescription: 'Decouvrez des opportunites foncieres exclusives a Maurice.',
  },
} as const

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies()
  const cookieLanguage = cookieStore.get('vestate-language')?.value
  const language = cookieLanguage === 'fr' ? 'fr' : 'en'
  const copy = metadataByLanguage[language]

  return {
    title: copy.title,
    description: copy.description,
    keywords: [...copy.keywords],
    authors: [{ name: 'Vestate Properties' }],
    openGraph: {
      title: copy.openGraphTitle,
      description: copy.openGraphDescription,
      type: 'website',
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#0d0d0d',
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const cookieLanguage = cookieStore.get('vestate-language')?.value
  const hasLanguageCookie = cookieLanguage === 'en' || cookieLanguage === 'fr'
  const initialLanguage = cookieLanguage === 'fr' ? 'fr' : 'en'

  return (
    <html
      lang={initialLanguage}
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} bg-background`}
    >
      <body className="font-sans antialiased bg-background text-foreground">
        <LanguageProvider
          initialLanguage={initialLanguage}
          hasLanguageCookie={hasLanguageCookie}
        >
          {children}
          <Chatbot />
        </LanguageProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
