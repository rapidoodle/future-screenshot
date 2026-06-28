import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Future Screenshot – See Your Future Self',
  description: 'Generate funny, motivational fake screenshots from your future self. Visualize your goals and get inspired to achieve them.',
  openGraph: {
    title: 'Future Screenshot – See Your Future Self',
    description: 'Generate funny, motivational fake screenshots from your future self.',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Future Screenshot – See Your Future Self',
    description: 'Generate funny, motivational fake screenshots from your future self.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  )
}
