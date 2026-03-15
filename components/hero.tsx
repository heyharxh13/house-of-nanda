"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"

const SLIDES = [
  {
    img: "/images/hero-jewellery.jpg",
    pos: "center 40%",
    sub: "Heritage Collection",
  },
  {
    img: "/images/product-heritage-bracelet.jpg",
    pos: "center 50%",
    sub: "Sterling Silver",
  },
  {
    img: "/images/collection-diamond.jpg",
    pos: "center 35%",
    sub: "New Arrivals",
  },
]

export default function Hero() {
  const [idx, setIdx]     = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [prev, setPrev]   = useState<number | null>(null)

  useEffect(() => { setTimeout(() => setLoaded(true), 60) }, [])

  useEffect(() => {
    const t = setInterval(() => {
      setIdx(i => {
        setPrev(i)
        return (i + 1) % SLIDES.length
      })
    }, 6000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative bg-[#0D0C0A]" style={{ height: "92vh", minHeight: 580, overflow: "hidden", contain: "paint" }}>

      {/* Slides */}
      {SLIDES.map((s, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={i} src={s.img} alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1400ms] ease-in-out ${i === idx ? "opacity-100" : "opacity-0"}`}
          style={{ objectPosition: s.pos }}
        />
      ))}

      {/* Multi-layer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D0C0A]/90 via-[#0D0C0A]/50 to-[#0D0C0A]/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0A]/60 via-transparent to-[#0D0C0A]/25" />

      {/* Left vertical text — editorial detail */}
      <div className={`absolute left-5 lg:left-8 bottom-24 flex items-center gap-3 transition-all duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}>
        <div className="vertical-text text-[8px] tracking-[0.5em] uppercase text-white/25 font-medium">
          Nainital · Kumaon · Est. 2025
        </div>
        <div className="w-px h-20 bg-white/15" />
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 sm:px-14 lg:px-20 max-w-7xl mx-auto">

        <div className={`transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
          <div className="flex items-center gap-3 mb-9">
            <div className="w-8 h-px bg-[#B8965A]" />
            <p className="text-[9px] tracking-[0.6em] uppercase text-white/40 font-light">House of Nanda</p>
          </div>
        </div>

        {/* Giant headline */}
        <div className="overflow-hidden">
          <h1 className={`font-serif text-white leading-[0.88] transition-all duration-1000 delay-100 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ fontSize: "clamp(4rem, 12vw, 10.5rem)", fontWeight: 300, letterSpacing: "-0.02em" }}>
            Craft of
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className={`font-serif leading-[0.88] transition-all duration-1000 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            style={{ fontSize: "clamp(4rem, 12vw, 10.5rem)", fontWeight: 300, letterSpacing: "-0.02em" }}>
            <em className="text-white/35 italic">the Peaks.</em>
          </h1>
        </div>

        <div className={`mt-8 flex flex-col sm:flex-row sm:items-end gap-8 sm:gap-14 transition-all duration-700 delay-400 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="text-white/45 text-[14px] leading-relaxed max-w-xs font-light tracking-wide">
            Fine silver jewellery rooted in the craft traditions of Kumaon. Certified. Handcrafted. Made to endure.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/silver-jewellery"
              className="group inline-flex items-center gap-3 bg-white text-[#0D0C0A] px-8 py-3.5 text-[10px] font-bold tracking-[0.28em] uppercase hover:bg-[#F8F5F0] transition-colors">
              Explore Collection
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/about"
              className="inline-flex items-center border border-white/20 text-white/55 px-8 py-3.5 text-[10px] font-bold tracking-[0.28em] uppercase hover:border-white/40 hover:text-white/80 transition-all">
              Our Story
            </Link>
          </div>
        </div>

        {/* Certifications row */}
        <div className={`mt-14 pt-7 border-t border-white/8 flex flex-wrap gap-8 sm:gap-12 transition-all duration-700 delay-500 ${loaded ? "opacity-100" : "opacity-0"}`}>
          {[
            { n: "925", l: "Sterling Silver" },
            { n: "18KT", l: "BIS Hallmarked" },
            { n: "IGI", l: "Lab Certified" },
          ].map(s => (
            <div key={s.n}>
              <p className="font-serif text-[22px] text-white/80 font-light">{s.n}</p>
              <p className="text-[8px] tracking-[0.3em] uppercase text-white/28 mt-0.5">{s.l}</p>
            </div>
          ))}
          {/* Slide indicator */}
          <div className="ml-auto hidden sm:flex flex-col justify-center gap-1.5">
            {SLIDES.map((_, i) => (
              <button key={i} onClick={() => { setPrev(idx); setIdx(i) }}
                className={`block w-6 h-px transition-all duration-400 ${i === idx ? "bg-[#B8965A]" : "bg-white/20 hover:bg-white/40"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
