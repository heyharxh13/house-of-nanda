import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Cormorant_Garamond } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/context/cart-context"
import { WishlistProvider } from "@/context/wishlist-context"
import Script from 'next/script'
import { AuthProvider } from '@/context/auth-context'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "House of Nanda — Fine Jewellery | Gold, Silver & Lab Diamonds",
  description: "Shop BIS Hallmark gold, 925 sterling silver and IGI-certified lab grown diamonds for women and men. Heritage craft from Uttarakhand. Free insured shipping across India.",
  keywords: "fine jewellery, BIS hallmark gold, 925 silver, IGI lab diamonds, Uttarakhand jewellery, men's jewellery, women's jewellery",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
<head>
    <Script src="https://checkout.razorpay.com/v1/checkout.js" />
  </head>
      <body className={`${inter.variable} ${cormorant.variable} font-sans antialiased`}>
        <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
