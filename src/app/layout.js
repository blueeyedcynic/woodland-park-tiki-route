import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Woodland Park Tiki Route 🌴❄️',
  description: 'Your tropical guide to Colorado mountain snow conditions',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <div className="min-h-screen bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600">
          <div className="min-h-screen bg-gradient-to-b from-transparent via-blue-400/20 to-teal-500/30">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}