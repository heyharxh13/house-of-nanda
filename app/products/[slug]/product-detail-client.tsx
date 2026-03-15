"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, ShoppingBag, Shield, Truck, RotateCcw, Check, Star } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/data"
import ProductCard from "@/components/product-card"

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price)
}

export default function ProductDetailClient({ product, related }: { product: Product; related: Product[] }) {
  const { addToCart } = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const wishlisted = isInWishlist(product.id)

  return (
    <main className="bg-background min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-secondary">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
            <span>/</span>
            <Link href={`/shop?category=${product.category}`} className="hover:text-foreground transition-colors capitalize">{product.category}</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">

          {/* Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary image-frame">
            <Image src={product.images[0]} alt={product.name} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" unoptimized />
            {product.badge && (
              <span className={`absolute top-4 left-4 text-[11px] font-semibold tracking-wide uppercase px-3 py-1.5 rounded ${product.badge === "Bestseller" ? "bg-foreground text-background" : "bg-accent text-accent-foreground"}`}>
                {product.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-5">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[11px] tracking-[0.2em] uppercase text-accent font-medium">{product.material}</span>
                {product.pahadi_name && <><span className="text-border/60">·</span><span className="text-[11px] text-muted-foreground">{product.pahadi_name}</span></>}
              </div>
              <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mb-3">{product.name}</h1>
              {/* Stars */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />)}</div>
                <span className="text-[12px] text-muted-foreground">4.9 (127 reviews)</span>
              </div>
              <p className="text-[15px] text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            {/* Cultural note */}
            {product.culturalNote && (
              <div className="bg-amber-50/60 rounded-xl p-4 border-l-2 border-accent">
                <p className="text-[11px] text-accent font-semibold uppercase tracking-wider mb-1.5">Heritage Story</p>
                <p className="text-[13px] text-foreground/75 leading-relaxed italic">{product.culturalNote}</p>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 py-4 border-y border-border">
              {product.price === 0 ? (
                <span className="text-xl text-muted-foreground italic font-medium">Price to be updated</span>
              ) : (
                <>
                  <span className="text-3xl font-semibold text-foreground">₹{product.price.toLocaleString("en-IN")}</span>
                  {product.originalPrice > 0 && <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>}
                  {product.discount > 0 && <span className="text-[12px] font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded">{product.discount}% off</span>}
                </>
              )}
            </div>

            {/* Size selector */}
            {product.sizes && (
              <div>
                <p className="text-[12px] font-semibold text-foreground uppercase tracking-wide mb-2">Ring Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button key={size} className="w-10 h-10 border border-border rounded-lg text-[13px] font-medium text-foreground hover:border-accent hover:text-accent transition-colors">
                      {size}
                    </button>
                  ))}
                </div>
                <Link href="/care" className="text-[12px] text-accent hover:underline mt-2 inline-block">Size guide →</Link>
              </div>
            )}

            {/* Details */}
            <div>
              <h3 className="text-[12px] font-semibold text-foreground mb-2.5 uppercase tracking-wide">Product Details</h3>
              <ul className="flex flex-col gap-1.5">
                {product.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2.5 text-[14px] text-muted-foreground">
                    <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <button onClick={() => addToCart(product)} className="w-full flex items-center justify-center gap-2 py-4 bg-foreground text-background font-medium tracking-wide rounded-lg hover:opacity-85 transition-opacity">
                <ShoppingBag className="w-5 h-5" /> Add to Cart
              </button>
              <button onClick={() => toggleWishlist(product)}
                className={cn("w-full flex items-center justify-center gap-2 py-4 border font-medium tracking-wide rounded-lg transition-all",
                  wishlisted ? "border-red-200 text-red-500 bg-red-50" : "border-border text-foreground hover:border-accent/40 hover:text-accent")}>
                <Heart className={cn("w-5 h-5", wishlisted && "fill-red-400 text-red-500")} />
                {wishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
              </button>
            </div>

            {/* Trust */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
              {[{ icon: Shield, label: "BIS / IGI Certified" }, { icon: Truck, label: "Free Insured Delivery" }, { icon: RotateCcw, label: "30-Day Returns" }].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1.5">
                  <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-[11px] text-muted-foreground leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16 lg:mt-24 pt-10 border-t border-border">
            <div className="text-center mb-8">
              <div className="label-rule mb-3">
                <span className="text-[11px] tracking-[0.22em] uppercase text-accent font-medium px-4">You May Also Like</span>
              </div>
              <h2 className="font-serif text-2xl font-semibold text-foreground">Related Pieces</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}

        <div className="mt-10 pt-6 border-t border-border">
          <Link href="/shop" className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to all jewellery
          </Link>
        </div>
      </div>
    </main>
  )
}
