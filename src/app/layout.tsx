import { Outfit } from 'next/font/google'
import './globals.css'

import { SidebarProvider } from '@/context/SidebarContext'
import { TechnologyProvider } from '@/context/TechnologyContext'
import { ThemeProvider } from '@/context/ThemeContext'
import Providers from './providers'

const outfit = Outfit({
  variable: '--font-outfit-sans',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} dark:bg-gray-900`}>
        <Providers>
          <ThemeProvider>
            <SidebarProvider>
              <TechnologyProvider>{children}</TechnologyProvider>
            </SidebarProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
