import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import { Sidebar } from '@/components/sidebar'
import Providers from '@/providers'
import { Toaster } from '@/components/ui/toaster'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
