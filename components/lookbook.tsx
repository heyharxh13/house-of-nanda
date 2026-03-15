"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const PANELS = [
  {
    img: "/images/product-moonfall-earrings.jpg",
    label: "The Everyday Edit",
    sub: "925 silver for daily wear",
    href: "/silver-jewellery",
    wide: false,
  },
  {
    img: "/images/product-heritage-bracelet.jpg",
    label: "Heritage Collection",
    sub: "Aipan-inspired silverwork",
    href: "/silver-jewellery",
    wide: true,
  },
  {
    img: "/images/collection-diamond.jpg",
    label: "Men's Collection",
    sub: "Chains, rings & pendants",
    href: "/men",
    wide: false,
  },
]

export default function Lookbook() {
  const ref = useRef<HTMLElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-[#F0ECE5] py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* Header */}
        <div className={`mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-[#B8965A]" />
              <p className="text-[9px] tracking-[0.55em] uppercase text-[#B0AAA0] font-medium">Lookbook</p>
            </div>
            <h2 className="font-serif text-[#0D0C0A] leading-[0.9]"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 300 }}>
              Worn. Loved.<br /><em className="italic text-[#7A756C]">Passed down.</em>
            </h2>
          </div>
          <Link href="/silver-jewellery"
            className="group inline-flex items-center gap-2.5 text-[10px] font-bold tracking-[0.25em] uppercase text-[#0D0C0A] border-b border-[#0D0C0A]/25 hover:border-[#0D0C0A] pb-px transition-colors self-start">
            Full Collection <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Panel grid — 1 narrow · 1 wide · 1 narrow */}
        <div className={`grid grid-cols-1 sm:grid-cols-[1fr_1.4fr_1fr] gap-3 transition-all duration-900 ${vis ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "150ms" }}>
          {PANELS.map((p, i) => (
            <Link key={i} href={p.href}
              className="group relative img-zoom overflow-hidden block"
              style={{ aspectRatio: "4/5" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt={p.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-900 group-hover:scale-[1.06]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0A]/75 via-[#0D0C0A]/15 to-transparent" />

              {/* Number */}
              <div className="absolute top-5 left-5 font-serif text-white/20 text-[40px] font-light leading-none select-none">
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-1 group-hover:translate-y-0 transition-transform duration-400">
                <p className="text-[8.5px] tracking-[0.45em] uppercase text-white/40 mb-1.5">{p.sub}</p>
                <h3 className="font-serif text-white text-[20px] font-light leading-tight mb-3">{p.label}</h3>
                <span className="inline-flex items-center gap-2 text-[9px] tracking-[0.25em] uppercase font-bold text-white/0 group-hover:text-white/70 transition-colors duration-300">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
