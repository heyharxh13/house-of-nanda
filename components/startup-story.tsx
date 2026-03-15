"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const STORY_IMG = "/images/product-moonfall-earrings.jpg"

export default function BrandStory() {
  const ref = useRef<HTMLElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true) },
      { threshold: 0.08 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-[#0D0C0A] relative overflow-hidden">

      {/* Top thin gold line */}
      <div className="gold-divider" />

      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-20 lg:py-32">
        <div className="grid lg:grid-cols-[1fr_480px] gap-16 lg:gap-24 items-center">

          {/* Left — copy */}
          <div>
            <div className={`transition-all duration-800 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="flex items-center gap-3 mb-7">
                <div className="w-6 h-px bg-[#B8965A]" />
                <p className="text-[9px] tracking-[0.55em] uppercase text-[#6B6358] font-medium">Founded in Nainital</p>
              </div>

              <h2 className="font-serif text-white leading-[0.9] mb-8"
                style={{ fontSize: "clamp(2.6rem, 5.5vw, 5.2rem)", fontWeight: 300 }}>
                Where mountains<br />
                <em className="italic text-[#6B6358]">meet craft.</em>
              </h2>

              {/* Pull quote */}
              <blockquote className="border-l-2 border-[#B8965A] pl-6 mb-8">
                <p className="font-serif text-[19px] text-white/60 leading-snug font-light italic">
                  "The jewellery traditions of Kumaon deserve to reach the world in their finest form — not as souvenirs, but as heirlooms."
                </p>
                <footer className="mt-3 text-[9px] tracking-[0.35em] uppercase text-[#6B6358]">
                  — House of Nanda, Founded in Nainital
                </footer>
              </blockquote>

              <div className="space-y-4 text-[#6B6358] text-[13px] leading-relaxed max-w-lg">
                <p>
                  House of Nanda was founded in Nainital, Kumaon, with a singular purpose: to carry the jewellery heritage of Uttarakhand to the world — certified, handcrafted, and uncompromised in craft.
                </p>
                <p>
                  We work with master karigars from Kumaon and Garhwal. Every piece is 925 sterling silver or 22KT BIS hallmarked gold. No plating. No shortcuts. Gold is made fresh for each order — never stocked, never sitting idle.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/about"
                  className="group inline-flex items-center gap-3 border border-[#3A3830] text-[#A09880] px-8 py-3 text-[10px] font-bold tracking-[0.22em] uppercase hover:border-white hover:text-white transition-all">
                  Our Story
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link href="/contact"
                  className="inline-flex items-center border border-[#2A2820] text-[#5A5550] px-8 py-3 text-[10px] font-bold tracking-[0.22em] uppercase hover:border-[#3A3830] hover:text-[#7A756C] transition-all">
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>

          {/* Right — image with overlay detail */}
          <div className={`relative transition-all duration-1000 delay-200 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={STORY_IMG} alt="House of Nanda jewellery"
                className="w-full h-full object-cover opacity-75" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0A]/80 via-transparent to-transparent" />

              {/* Bottom caption card */}
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <p className="text-[8px] tracking-[0.45em] uppercase text-white/30 mb-1.5">Handcrafted</p>
                <p className="font-serif text-white text-[18px] font-light">925 Sterling Silver</p>
                <p className="text-[11px] text-white/35 mt-0.5">Nainital · Kumaon</p>
              </div>

              {/* Decorative corner frame */}
              <div className="absolute top-5 left-5 w-10 h-10 border-t border-l border-[#B8965A]/30" />
              <div className="absolute bottom-5 right-5 w-10 h-10 border-b border-r border-[#B8965A]/30" />
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-5 -left-5 bg-[#F8F5F0] px-6 py-5 shadow-2xl">
              <p className="font-serif text-[42px] text-[#0D0C0A] font-light leading-none">925</p>
              <p className="text-[8.5px] tracking-[0.35em] uppercase text-[#B0AAA0] mt-1">Sterling Silver — Always</p>
            </div>
          </div>

        </div>

        {/* ── Three craft pillars ── */}
        <div className={`mt-20 lg:mt-24 border-t border-[#1E1C18] pt-12 grid sm:grid-cols-3 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#1E1C18] transition-all duration-700 delay-300 ${vis ? "opacity-100" : "opacity-0"}`}>
          {[
            { n: "01", title: "Heritage Craft", body: "Designs drawn from Kumaon's Aipan folk art and Pahadi temple geometry — living tradition in its finest material form." },
            { n: "02", title: "Certified Materials", body: "925 sterling silver. 22KT BIS hallmarked gold. IGI-certified lab diamonds. Every piece documented, every claim verified." },
            { n: "03", title: "Made to Endure", body: "Gold jewellery made fresh for each order. Silver in limited runs. We build pieces designed to outlast fashion." },
          ].map((p, i) => (
            <div key={i} className="py-8 sm:py-0 sm:px-10 first:sm:pl-0 last:sm:pr-0">
              <p className="font-serif text-[#3A3830] text-[38px] font-light leading-none mb-5">{p.n}</p>
              <h3 className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#7A756C] mb-3">{p.title}</h3>
              <p className="text-[12px] text-[#4A4840] leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="gold-divider" />
    </section>
  )
}
