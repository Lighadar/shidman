import type { Metadata } from "next"
import { Cinzel } from "next/font/google"
import "./globals.css"
import { Header } from "@/layouts/Header"

const cinzel = Cinzel({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Shidman Holding",
  description: "Shidman Holding",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cinzel.className + " min-h-screen flex flex-col"}>
        <Header />
        {children}
      </body>
    </html>
  )
}
