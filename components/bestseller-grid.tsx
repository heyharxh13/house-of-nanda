"use client"

import { useState } from "react"
import { womenProducts, menProducts } from "@/lib/data"
import ProductCard from "@/components/product-card"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const tabs = [
  { key: "silver", label: "Silver Jewellery",  href: "/silver-jewellery",  note: "Heritage & Contemporary" },
  { key: "men",    label: "Men's Collection",   href: "/men",               note: "Chains, Rings & Pendants" },
  { key: "gold",   label: "Gold — Bespoke",     href: "/gold-jewellery",    note: "Made to Order · 3–4 Weeks" },
]

export default function BestsellerGrid() {
  const [active, setActive] = useState("silver")
  const all = [...womenProducts, ...menProducts]

  const products =
    active === "men"  ? menProducts.slice(0, 8) :
    active === "gold" ? all.filter(p => p.category === "gold").slice(0, 8) :
    all.filter(p => p.category === "silver").slice(0, 8)

  const tab = tabs.find(t => t.key === active)!

  return (
    <section className="bg-[#F8F5F0] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* Header */}
        <div className="mb-14 grid lg:grid-cols-2 items-end gap-8">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-[#B8965A]" />
              <p className="text-[9px] tracking-[0.55em] uppercase text-[#B0AAA0] font-medium">The Collection</p>
            </div>
            <h2 className="font-serif text-[#0D0C0A] leading-[0.9]"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 300 }}>
              Crafted with<br /><em className="italic text-[#7A756C]">intention.</em>
            </h2>
          </div>

          <div className="flex flex-col gap-1 lg:items-end">
            {tabs.map(t => (
              <button key={t.key} onClick={() => setActive(t.key)}
                className={`flex items-center gap-4 py-2.5 px-4 text-left transition-all w-full lg:w-auto ${
                  active === t.key
                    ? "border-l-2 border-[#B8965A] text-[#0D0C0A] bg-[#EDE8DF]"
                    : "border-l-2 border-transparent text-[#7A756C] hover:text-[#0D0C0A] hover:bg-[#EDE8DF]/60"
                }`}>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase">{t.label}</span>
                {active === t.key && (
                  <span className="text-[9px] text-white/45 ml-auto hidden lg:inline">{t.note}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Gold notice */}
        {active === "gold" && (
          <div className="mb-10 border-l-2 border-[#B8965A] pl-6 py-1">
            <p className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#6B5C3E] mb-2">Bespoke Gold Jewellery</p>
            <p className="text-[13px] text-[#7A756C] leading-relaxed">
              All gold pieces crafted in 22KT BIS hallmarked gold, made specifically for your order.{" "}
              <Link href="/contact" className="text-[#0D0C0A] font-semibold underline underline-offset-2 hover:no-underline">Enquire via WhatsApp →</Link>
            </p>
          </div>
        )}

        {/* Uniform 4-column grid — same card size for every product */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        <div className="mt-12 pt-7 border-t border-[#E0DAD0] flex items-center justify-between">
          <p className="text-[9px] tracking-[0.4em] uppercase text-[#C0B9AE]">{tab.note}</p>
          <Link href={tab.href}
            className="group inline-flex items-center gap-2.5 text-[10px] font-bold tracking-[0.22em] uppercase text-[#7A6B50] border-b border-[#B8965A]/30 hover:text-[#0D0C0A] hover:border-[#0D0C0A]/50 pb-px transition-colors">
            View Full Collection
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
