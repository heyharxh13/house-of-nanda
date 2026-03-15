"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const PROCESS = [
  {
    step: "01",
    title: "Design",
    body: "Every motif originates in Kumaon's living visual tradition — Aipan folk patterns, temple facades, mountain geometry. Sketched by hand before anything is made.",
  },
  {
    step: "02",
    title: "Material",
    body: "We source only 925 sterling silver and 22KT BIS hallmarked gold. Every ingot is verified and certified before it reaches a karigar's hands.",
  },
  {
    step: "03",
    title: "Craft",
    body: "Made by master karigars from Kumaon and Garhwal — artisans who have inherited techniques refined over centuries. No casting from moulds on heritage pieces.",
  },
  {
    step: "04",
    title: "Certify",
    body: "Third-party tested and hallmarked. Each piece ships with a certificate of authenticity. What we say it is, it is.",
  },
]

const CRAFT_IMG = "/images/product-lumina-pendant.jpg"

export default function CraftSection() {
  const ref = useRef<HTMLElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.08 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-white overflow-hidden">

      {/* Top full-width image strip */}
      <div className="relative overflow-hidden" style={{ height: "45vh" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/product-heritage-bracelet.jpg"
          alt="Silvercraft"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0D0C0A]/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-[9px] tracking-[0.6em] uppercase text-white/40 mb-3 font-medium">The Craft</p>
            <h2 className="font-serif text-white leading-[0.9]"
              style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", fontWeight: 300 }}>
              Shaped by Artisans.<br /><em className="italic text/45">Always.</em>
            </h2>
          </div>
        </div>
      </div>

      {/* Process + image */}
      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-20 lg:py-28">
        <div className={`grid lg:grid-cols-[1fr_420px] gap-16 lg:gap-20 items-start transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Left — process steps */}
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-6 h-px bg-[#B8965A]" />
              <p className="text-[9px] tracking-[0.55em] uppercase text-[#B0AAA0] font-medium">How We Work</p>
            </div>

            <div className="space-y-0">
              {PROCESS.map((p, i) => (
                <div key={i}
                  className={`border-b border-[#E0DAD0] py-8 grid grid-cols-[56px_1fr] gap-6 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: `${i * 100}ms` }}>
                  <span className="font-serif text-[36px] text-[#E0DAD0] font-light leading-none mt-1">{p.step}</span>
                  <div>
                    <h3 className="text-[11px] tracking-[0.3em] uppercase font-bold text-[#0D0C0A] mb-2">{p.title}</h3>
                    <p className="text-[13px] text-[#7A756C] leading-relaxed">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link href="/about"
                className="group inline-flex items-center gap-3 bg-[#0D0C0A] text-white px-9 py-4 text-[10px] font-bold tracking-[0.28em] uppercase hover:bg-[#2A2820] transition-colors">
                Our Full Story
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right — image with stats */}
          <div className={`sticky top-24 transition-all duration-900 delay-200 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={CRAFT_IMG} alt="Sterling silver jewellery"
                className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C0A]/50 via-transparent to-transparent" />
              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-[#B8965A]/40" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-[#B8965A]/40" />
            </div>

            {/* Floating certifications */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { val: "925", label: "Sterling Silver" },
                { val: "22KT", label: "BIS Gold" },
                { val: "IGI", label: "Certified" },
              ].map(s => (
                <div key={s.val} className="bg-[#F8F5F0] border border-[#E0DAD0] py-4 text-center">
                  <p className="font-serif text-[20px] text-[#0D0C0A] font-light">{s.val}</p>
                  <p className="text-[8px] tracking-[0.3em] uppercase text-[#B0AAA0] mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
