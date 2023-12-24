'use client'

import { Box } from '@mui/joy'
import './globals.css'
import Header from '@/components/Header/Header'
import ThemeProvider from '@/components/ThemeProvider/ThemeProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Услуги СПБ</title>
      </head>
      <body>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <div className="wrapper">
              <Header />
              <main className="main">
                <Box
                  sx={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    width: '100%',
                    padding: '0 20px',
                  }}
                >
                  {children}
                </Box>
              </main>
            </div>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
