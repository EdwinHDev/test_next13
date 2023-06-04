import { DefaultLayout } from '@/components/DefaultLayout '
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CRUD',
  description: 'Página de creación, lectura, actualización y eliminación de usuarios',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body
        className={inter.className}
      >
        <DefaultLayout>
          {children}
        </DefaultLayout>
      </body>
    </html>
  )
}
