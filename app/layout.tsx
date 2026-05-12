import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SplashScreen } from '@/components/splash-screen'
import './globals.css'

const _geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const _geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "WockyTech - Apple & Tech Store Premium",
  description: "Découvrez le meilleur de la technologie Apple et accessoires premium à Dakar.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "WockyTech",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: '/apple-icon.png',
    apple: '/apple-icon.png',
    shortcut: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${_geist.variable} ${_geistMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        <SplashScreen />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
