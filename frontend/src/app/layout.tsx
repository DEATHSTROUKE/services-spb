import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header/Header'

const roboto = Roboto({
  subsets: ['cyrillic'],
  style: ['normal', 'italic'],
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'Билетопоиск Главная',
  description: 'Лучший сервис для покупки билетов',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={roboto.className}>
        <div className="wrapper">
          <Header />
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  )
}
