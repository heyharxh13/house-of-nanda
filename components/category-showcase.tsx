"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const CATEGORIES = [
  {
    title: "Silver Jewellery",
    sub: "Heritage & Contemporary",
    href: "/silver-jewellery",
    img: "/images/collection-silver.jpg",
    tag: "Our Signature",
    badge: "925 Sterling Silver",
    desc: "Solid 925 silver — from Aipan-inspired heritage forms to clean contemporary lines. Never plated. Third-party certified.",
    tall: true,
  },
  {
    title: "Men's Collection",
    sub: "Chains, Rings & Kada",
    href: "/men",
    img: "/images/cat-rings.jpg",
    tag: "Bold & Refined",
    badge: "Silver · Gold · Lab Diamonds",
    desc: "Silver kada, gold chains, diamond pendants — crafted for men who wear jewellery with intent.",
    tall: false,
  },
  {
    title: "Gold — Bespoke",
    sub: "22KT BIS Hallmarked · Made to Order",
    href: "/gold-jewellery",
    img: "/images/product-men-signet-ring.svg",
    tag: "3–4 Weeks",
    badge: "22KT BIS Hallmarked",
    desc: "Every gold piece is made fresh for your order. No stock. No shortcuts. Certified by BIS, hallmarked for life.",
    tall: false,
  },
]

export default function CategoryShowcase() {
  const ref = useRef<HTMLElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} style={{ background: "#F2EFE9" }} className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* Header */}
        <div className={`mb-12 flex items-end justify-between transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-[#B8965A]" />
              <p className="text-[9px] tracking-[0.55em] uppercase text-[#B0A898] font-medium">One House</p>
            </div>
            <h2 className="font-serif leading-[0.9]"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 300, color: "#1A1815" }}>
              Every collection.<br /><em className="italic" style={{ color: "#B0A898" }}>One catalogue.</em>
            </h2>
          </div>
          <Link href="/silver-jewellery"
            className="hidden sm:inline-flex items-center gap-2.5 text-[10px] font-bold tracking-[0.22em] uppercase pb-px transition-all"
            style={{ color: "#7A756C", borderBottom: "1px solid rgba(122,117,108,0.3)" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#1A1815"; (e.currentTarget as HTMLElement).style.borderBottomColor = "rgba(26,24,21,0.6)" }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#7A756C"; (e.currentTarget as HTMLElement).style.borderBottomColor = "rgba(122,117,108,0.3)" }}>
            All Jewellery <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Grid — 1 tall left + 2 stacked right */}
        <div className={`grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-4 transition-all duration-900 ${vis ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "150ms" }}>

          {/* Feature — Silver (tall) */}
          <Link href={CATEGORIES[0].href}
            className="group relative overflow-hidden block"
            style={{ minHeight: 580 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={CATEGORIES[0].img} alt={CATEGORIES[0].title}
              className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-[1200ms] group-hover:scale-[1.04]" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,9,8,0.05) 0%, rgba(10,9,8,0.22) 40%, rgba(10,9,8,0.82) 100%)" }} />

            <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
              <span className="text-[7.5px] tracking-[0.4em] uppercase font-bold px-3 py-1.5"
                style={{ background: "rgba(255,255,255,0.12)", color: "rgba(237,232,224,0.80)", backdropFilter: "blur(8px)" }}>
                {CATEGORIES[0].tag}
              </span>
              <span className="text-[7.5px] tracking-[0.3em] uppercase px-3 py-1.5 font-semibold"
                style={{ background: "rgba(184,150,90,0.90)", color: "#fff" }}>
                {CATEGORIES[0].badge}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="text-[8.5px] tracking-[0.4em] uppercase mb-2" style={{ color: "rgba(237,232,224,0.40)" }}>
                {CATEGORIES[0].sub}
              </p>
              <h3 className="font-serif text-white text-[30px] font-light leading-tight mb-3">
                {CATEGORIES[0].title}
              </h3>
              <p className="text-[12px] leading-relaxed mb-5 max-w-xs" style={{ color: "rgba(237,232,224,0.50)" }}>
                {CATEGORIES[0].desc}
              </p>
              <span className="inline-flex items-center gap-2 text-[9px] tracking-[0.25em] uppercase font-bold transition-colors duration-300"
                style={{ color: "rgba(237,232,224,0.50)" }}>
                Explore <ArrowRight className="w-3 h-3" />
              </span>
            </div>

            {/* Hover gold border */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ boxShadow: "inset 0 0 0 1px rgba(184,150,90,0.35)" }} />
          </Link>

          {/* Right column — 2 stacked */}
          <div className="flex flex-col gap-4">
            {CATEGORIES.slice(1).map((c, i) => (
              <Link key={i} href={c.href}
                className="group relative overflow-hidden block flex-1"
                style={{ minHeight: 280 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.img} alt={c.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-75 transition-transform duration-[1200ms] group-hover:scale-[1.04]" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,9,8,0.08) 0%, rgba(10,9,8,0.75) 100%)" }} />

                <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                  <span className="text-[7px] tracking-[0.35em] uppercase font-bold px-2.5 py-1"
                    style={{ background: "rgba(255,255,255,0.10)", color: "rgba(237,232,224,0.70)", backdropFilter: "blur(6px)" }}>
                    {c.tag}
                  </span>
                  <span className="text-[7px] tracking-[0.25em] uppercase px-2.5 py-1 font-semibold"
                    style={{ background: "rgba(184,150,90,0.88)", color: "#fff" }}>
                    {c.badge}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[8px] tracking-[0.4em] uppercase mb-1.5" style={{ color: "rgba(237,232,224,0.32)" }}>
                    {c.sub}
                  </p>
                  <h3 className="font-serif text-white text-[22px] font-light leading-tight mb-2">{c.title}</h3>
                  <p className="text-[11px] leading-relaxed mb-4 max-w-xs" style={{ color: "rgba(237,232,224,0.42)" }}>
                    {c.desc}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[9px] tracking-[0.22em] uppercase font-bold transition-colors duration-300"
                    style={{ color: "rgba(237,232,224,0.42)" }}>
                    Explore <ArrowRight className="w-3 h-3" />
                  </span>
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(184,150,90,0.35)" }} />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
