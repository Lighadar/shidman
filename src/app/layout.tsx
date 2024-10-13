import type { Metadata } from "next"
import { Cinzel } from "next/font/google"
import "./globals.css"
import { Header } from "@/layouts/Header"

const cinzel = Cinzel({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark h-full overflow-hidden">
      <body className={cinzel.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
