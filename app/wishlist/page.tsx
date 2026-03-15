"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CartDrawer from "@/components/cart-drawer"
import ProductCard from "@/components/product-card"
import { useWishlist } from "@/context/wishlist-context"
import Link from "next/link"
import { Heart, ArrowRight } from "lucide-react"

export default function WishlistPage() {
  const { wishlist, totalWishlistItems } = useWishlist()

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <div className="bg-secondary border-b border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-accent" />
              <div>
                <h1 className="font-serif text-3xl font-semibold text-foreground">My Wishlist</h1>
                <p className="text-muted-foreground text-[13px] mt-0.5">{totalWishlistItems} saved pieces</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
          {wishlist.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-secondary border border-border flex items-center justify-center mb-5">
                <Heart className="w-7 h-7 text-muted-foreground" />
              </div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground text-[14px] mb-6">Save pieces you love and come back to them anytime.</p>
              <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-[13px] font-medium rounded-lg hover:opacity-85 transition-opacity">
                Shop All Jewellery <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {wishlist.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
