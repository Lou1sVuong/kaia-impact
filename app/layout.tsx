import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import { Sidebar } from '@/components/sidebar'
import Providers from '@/providers'
import { Toaster } from '@/components/ui/toaster'

const myFont = localFont({
  src: [
    {
      path: './fonts/IBMPlexMono-Bold.ttf',
      weight: '700'
    },
    {
      path: './fonts/IBMPlexMono-ExtraLight.ttf',
      weight: '200'
    },
    {
      path: './fonts/IBMPlexMono-Light.ttf',
      weight: '300'
    },
    {
      path: './fonts/IBMPlexMono-Medium.ttf',
      weight: '500'
    },
    {
      path: './fonts/IBMPlexMono-Regular.ttf',
      weight: '400'
    },
    {
      path: './fonts/IBMPlexMono-SemiBold.ttf',
      weight: '600'
    },
    {
      path: './fonts/IBMPlexMono-Thin.ttf',
      weight: '100'
    }
  ],
  display: 'swap',
  variable: '--font-ibm-plex-mono'
})

export const metadata: Metadata = {
  title: 'FundStreaming Platform',
  description: 'Blockchain-based crowdfunding with milestone-based fund release'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${myFont.className} ${myFont.variable} antialiased`}>
        <Providers>
          <div className='flex h-screen'>
            <Sidebar />
            <main className='flex-1 overflow-auto bg-dot-pattern'>{children}</main>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
