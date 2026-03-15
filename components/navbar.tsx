"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Heart, Menu, X, ShoppingBag } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import { cn } from "@/lib/utils"

const NAV = [
  { label: "Silver", href: "/silver-jewellery" },
  { label: "Men's", href: "/men" },
  { label: "Gold", href: "/gold-jewellery", accent: true },
  { label: "Our Story", href: "/about" },
]

export default function Navbar() {
  const { totalItems: cartCount = 0 } = useCart() ?? {}
  const { wishlist: wishlistItems = [] } = useWishlist() ?? {}
  const [open, setOpen] = useState(false)
  const [searching, setSearching] = useState(false)
  const [query, setQuery] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const [results, setResults] = useState<any[]>([])

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", h)
    return () => window.removeEventListener("scroll", h)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open || searching ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open, searching])

  useEffect(() => {
    if (query.length < 2) { setResults([]); return }
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/products?search=${query}`)
        const data = await res.json()
        setResults(Array.isArray(data) ? data.slice(0, 5) : [])
      } catch {
        setResults([])
      }
    }, 300)
    return () => clearTimeout(timeout)
  }, [query])

  return (
    <>
      {/* Announcement strip */}
      <div className="bg-[#0D0C0A] py-2.5 text-center">
        <p className="text-[9px] tracking-[0.5em] uppercase text-stone-400 font-light">
          Free insured delivery across India &nbsp;·&nbsp; BIS Hallmark &nbsp;·&nbsp; 925 Sterling Silver
        </p>
      </div>

      {/* Main navbar */}
      <header className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#F8F5F0]/96 backdrop-blur-md border-b border-[#E0DAD0] shadow-sm"
          : "bg-[#F8F5F0] border-b border-[#E0DAD0]"
      )}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 flex items-center h-[72px]">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 mr-auto lg:mr-0 group">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <div style={{ width: 18, height: '0.5px', background: '#5C4A1E' }} />
                <span style={{ fontSize: 6, letterSpacing: '0.65em', textTransform: 'uppercase', color: '#5C4A1E', fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>Fine Jewellery</span>
                <div style={{ width: 18, height: '0.5px', background: '#5C4A1E' }} />
              </div>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, letterSpacing: '0.18em', color: '#0A0908', textTransform: 'uppercase', lineHeight: 1, marginLeft: '-4px' }}>
                House of Nanda
              </span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 9, fontStyle: 'italic', letterSpacing: '0.22em', color: '#5C4A1E', fontWeight: 400, marginTop: 5 }}>
                — Wear the Legacy —
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10 mx-auto">
            {NAV.map(n => (
              <Link key={n.href} href={n.href}
                className={cn(
                  "text-[10px] font-semibold tracking-[0.22em] uppercase transition-colors relative group",
                  n.accent ? "text-[#B8965A] hover:text-[#96742A]" : "text-[#7A756C] hover:text-[#0D0C0A]"
                )}>
                {n.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#0D0C0A] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-0.5 ml-auto lg:ml-0">
            <button onClick={() => setSearching(s => !s)}
              className="w-10 h-10 flex items-center justify-center text-[#7A756C] hover:text-[#0D0C0A] transition-colors">
              <Search className="w-[17px] h-[17px]" />
            </button>

            <Link href="/wishlist"
              className="relative w-10 h-10 flex items-center justify-center text-[#7A756C] hover:text-[#0D0C0A] transition-colors">
              <Heart className="w-[17px] h-[17px]" />
              {wishlistItems.length > 0 && (
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500" />
              )}
            </Link>

            <Link href="/account"
              className="relative w-10 h-10 flex items-center justify-center text-[#7A756C] hover:text-[#0D0C0A] transition-colors">
              <ShoppingBag className="w-[17px] h-[17px]" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[15px] h-[15px] bg-[#0D0C0A] text-[#F8F5F0] text-[8px] font-bold flex items-center justify-center px-0.5">
                  {cartCount}
                </span>
              )}
            </Link>

            <button className="lg:hidden w-10 h-10 flex items-center justify-center text-[#7A756C] hover:text-[#0D0C0A] transition-colors"
              onClick={() => setOpen(true)}>
              <Menu className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searching && (
          <div className="border-t border-[#E0DAD0] bg-[#F8F5F0] px-5 lg:px-10 py-4">
            <div className="max-w-lg mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A756C]" />
              <input autoFocus value={query} onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === "Escape" && setSearching(false)}
                placeholder="Search jewellery…"
                className="w-full pl-9 pr-10 py-2.5 bg-white border border-[#E0DAD0] text-[13px] text-[#0D0C0A] placeholder-[#B0AAA0] outline-none focus:border-[#0D0C0A] transition-colors" />
              <button onClick={() => { setSearching(false); setQuery("") }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B0AAA0] hover:text-[#0D0C0A]">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            {results.length > 0 && (
              <div className="max-w-lg mx-auto mt-1.5 border border-[#E0DAD0] bg-white divide-y divide-[#F0EBE0]">
                {results.map((p: any) => (
                  <Link key={p.id} href={`/products/${p.slug}`}
                    onClick={() => { setSearching(false); setQuery("") }}
                    className="flex items-center justify-between px-4 py-3 hover:bg-[#F8F5F0] transition-colors">
                    <span className="font-serif text-[14px] text-[#0D0C0A]">{p.name}</span>
                    <span className="text-[9px] tracking-[0.2em] uppercase text-[#B0AAA0]">{p.material}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-[#0D0C0A]/40" onClick={() => setOpen(false)} />
          <div className="w-80 bg-[#F8F5F0] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-7 h-16 border-b border-[#E0DAD0]">
              <span className="font-serif text-[17px] text-[#0A0908]" style={{ letterSpacing: '0.16em', fontFamily: "'Cormorant Garamond', serif" }}>
                House of Nanda
              </span>
              <button onClick={() => setOpen(false)} className="text-[#7A756C] hover:text-[#0D0C0A]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <nav className="flex-1 px-7 py-8 flex flex-col">
              {NAV.map(n => (
                <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
                  className={cn(
                    "py-4 text-[11px] font-semibold tracking-[0.25em] uppercase border-b border-[#E0DAD0] last:border-0 transition-colors",
                    n.accent ? "text-[#B8965A]" : "text-[#7A756C] hover:text-[#0D0C0A]"
                  )}>
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="px-7 pb-8">
              <p className="text-[9px] tracking-[0.4em] uppercase text-[#B0AAA0]">Nainital · Kumaon · Est. 2025</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}