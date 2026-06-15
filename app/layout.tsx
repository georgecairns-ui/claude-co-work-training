import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Zilla_Slab, Nunito_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const zilla = Zilla_Slab({
  variable: '--font-zilla',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})
const nunito = Nunito_Sans({
  variable: '--font-nunito',
  subsets: ['latin'],
})
const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Claude Cowork Academy — Interactive Training Platform',
  description:
    'Learn to turn Claude into a co-worker that does the work, not just answers the question. Read each section, then play the quiz to lock it in.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#2f2f2d',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${zilla.variable} ${nunito.variable} ${jetbrains.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
