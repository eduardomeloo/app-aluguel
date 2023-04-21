import { Nunito } from 'next/font/google'
import './globals.css'

export const metadata = {
  title: 'App Aluguel',
  description: 'Procurando um lugar para chamar de lar? Temos a solução perfeita para você! Venha conferir nossas opções de imóveis para aluguel e encontre o seu novo lar dos sonhos.',
}

const font = Nunito({
    subsets: ["latin"]
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className} >{children}</body>
    </html>
  )
}
