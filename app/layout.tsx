import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Health Data Engine',
  description: 'Health Data Engine metrics and analytics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}