"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/data"

const BADGES: Record<string, { bg: string; text: string }> = {
  New:        { bg: "#1A1815",       text: "#F8F5F0" },
  Bestseller: { bg: "#B8965A",       text: "#FFFFFF" },
  Limited:    { bg: "#5A4A2E",       text: "#F5E6C8" },
  Trending:   { bg: "#3A3830",       text: "#E8E0D0" },
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart }                    = useCart()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const wishlisted = isInWishlist(product.id)
  const isMTO = product.category === "gold" && product.price === 0
  const badge = product.badge ? BADGES[product.badge] : null

  return (
    <article className="group relative flex flex-col" style={{ background: "#FAFAF7" }}>

      {/* ── IMAGE BLOCK ── */}
      <Link href={`/products/${product.slug}`} className="block relative" style={{ aspectRatio: "3 / 4" }}>
        <div className="absolute inset-0 overflow-hidden" style={{ background: "#F0ECE5" }}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.05]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            unoptimized
          />

          {/* Hover overlay — soft warm tint */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: "rgba(184,150,90,0.06)" }} />
        </div>

        {/* Badge — top-left */}
        {badge && (
          <span className="absolute top-0 left-0 z-10 text-[7.5px] font-bold tracking-[0.28em] uppercase px-3 py-1.5 leading-none"
            style={{ background: badge.bg, color: badge.text }}>
            {product.badge}
          </span>
        )}

        {/* MTO strip */}
        {isMTO && (
          <div className="absolute bottom-0 inset-x-0 py-2 px-3 z-10"
            style={{ background: "rgba(90,74,46,0.90)" }}>
            <p className="text-[7.5px] tracking-[0.3em] uppercase font-bold"
              style={{ color: "#F5E6C8" }}>
              ✦ Bespoke · Made to Order
            </p>
          </div>
        )}

        {/* Quick-add overlay — appears on hover */}
        {!isMTO && product.price > 0 && (
          <div className="absolute bottom-0 inset-x-0 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
            <button
              onClick={e => { e.preventDefault(); e.stopPropagation(); addToCart(product) }}
              className="w-full py-3 flex items-center justify-center gap-2 text-[9px] font-bold tracking-[0.25em] uppercase transition-colors duration-200"
              style={{ background: "#0D0C0A", color: "#EDE8E0" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#B8965A"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#0D0C0A"}>
              <ShoppingBag className="w-3 h-3" />
              Add to Bag
            </button>
          </div>
        )}
      </Link>

      {/* Wishlist */}
      <button
        onClick={() => toggleWishlist(product)}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        className={cn(
          "absolute top-2.5 right-2.5 w-8 h-8 flex items-center justify-center z-20 transition-all duration-200",
          wishlisted ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
        style={{ background: "rgba(255,255,255,0.90)", backdropFilter: "blur(6px)" }}>
        <Heart
          className="w-3.5 h-3.5"
          style={wishlisted ? { fill: "#C0392B", stroke: "#C0392B" } : { stroke: "#7A756C" }}
        />
      </button>

      {/* ── INFO BLOCK ── */}
      <div className="flex flex-col pt-3.5 pb-4 px-0.5" style={{ minHeight: 96 }}>
        {/* Material */}
        <p className="text-[7.5px] tracking-[0.35em] uppercase font-semibold mb-1.5"
          style={{ color: "#B8965A", opacity: 0.80 }}>
          {product.material}
        </p>

        {/* Name */}
        <Link href={`/products/${product.slug}`} className="block mb-0.5">
          <h3 className="font-serif leading-snug line-clamp-2 transition-colors duration-200"
            style={{ fontSize: 14.5, color: "#1A1815", fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
            onMouseEnter={e => (e.currentTarget.style.color = "#7A756C")}
            onMouseLeave={e => (e.currentTarget.style.color = "#1A1815")}>
            {product.name}
          </h3>
        </Link>

        {/* Pahadi name */}
        {product.pahadi_name && (
          <p className="text-[10px] font-light" style={{ color: "#C8C0B5", fontStyle: "italic" }}>
            {product.pahadi_name}
          </p>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-3">
          {product.price === 0 ? (
            <span className="text-[11px] italic font-light" style={{ color: "#B0AAA0" }}>
              {isMTO ? "Enquire for price" : "Coming soon"}
            </span>
          ) : (
            <div>
              <span className="font-semibold tracking-wide" style={{ fontSize: 14, color: "#0D0C0A" }}>
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.discount > 0 && (
                <span className="ml-2 text-[10px] line-through" style={{ color: "#C8C0B5" }}>
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>
          )}

          {isMTO ? (
            <Link href={`/products/${product.slug}`}
              className="text-[8px] tracking-[0.22em] uppercase font-bold pb-px"
              style={{ color: "#B8965A", borderBottom: "1px solid rgba(184,150,90,0.4)" }}>
              Enquire →
            </Link>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="text-[8px] tracking-[0.22em] uppercase font-bold pb-px transition-colors duration-150"
              style={{ color: "#7A6B50", borderBottom: "1px solid rgba(184,150,90,0.30)" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = "#0D0C0A"; el.style.borderBottomColor = "rgba(13,12,10,0.4)" }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = "#7A6B50"; el.style.borderBottomColor = "rgba(184,150,90,0.30)" }}>
              Add to Bag
            </button>
          )}
        </div>
      </div>

      {/* Bottom gold accent line on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "linear-gradient(90deg, transparent, rgba(184,150,90,0.4), transparent)" }} />
    </article>
  )
}
