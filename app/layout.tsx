import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Portafolio Juan Camilo Campos',
  description: 'Ingeniero de Sistemas y Computación – UNAL',
  generator: 'v0.dev',
  icons: {
    icon: '/portafolio/images/favicon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
