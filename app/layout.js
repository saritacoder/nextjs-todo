import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import ErrorBoundary from "@/components/ErrorBoundary"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "Topic Manager",
  description: "A simple topic management application",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
        <div className="max-w-4xl mx-auto p-4">
          <Navbar />
          <ErrorBoundary>
            <main className="mt-8 bg-white p-6 rounded-lg shadow-sm">{children}</main>
          </ErrorBoundary>
        </div>
      </body>
    </html>
  )
}



