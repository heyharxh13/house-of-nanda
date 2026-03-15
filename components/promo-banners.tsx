"use client"

import Link from "next/link"
import { ArrowRight, Sparkles, Shield, Gift, Zap } from "lucide-react"
import { useEffect, useState } from "react"

// ── Banner 1: Full-width announcement strip with rotating offers
const offerStrips = [
  { text: "🌟 New 2026 Collection Now Live — Galobandh, Hansuli, Men's Kada & More", cta: "Shop Now", href: "/shop" },
  { text: "💎 IGI Certified Lab Grown Diamonds — Real Diamonds, Ethical Sourcing", cta: "Explore", href: "/collections/diamonds" },
  { text: "🏔️ Uttarakhand Heritage Craft — Handmade by Pahadi Karigars in Uttarakhand", cta: "Our Story", href: "/about" },
  { text: "✨ Men's Collection Launched — Silver Kada, Gold Chains, Diamond Pendants", cta: "Shop Men's", href: "/men" },
]

export function OfferStrip() {
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx((i) => (i + 1) % offerStrips.length)
        setVisible(true)
      }, 300)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const offer = offerStrips[idx]
  return (
    <div className="bg-foreground text-background py-2.5 px-4 text-center">
      <div className={`flex items-center justify-center gap-3 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}>
        <p className="text-[12px] tracking-wide">{offer.text}</p>
        <Link href={offer.href}
          className="flex-shrink-0 text-[11px] font-semibold text-accent underline underline-offset-2 hover:no-underline">
          {offer.cta} →
        </Link>
      </div>
    </div>
  )
}

// ── Banner 2: Split promotion — two panels side by side
export function SplitPromoBanner() {
  return (
    <section className="py-8 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Left panel — Women's promo */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border border-amber-100 p-8 lg:p-10 flex flex-col justify-between min-h-[220px]">
            {/* Decorative SVG pattern */}
            <svg className="absolute right-0 bottom-0 w-52 h-52 opacity-[0.07]" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="90" stroke="#b8860b" strokeWidth="1.5" fill="none"/>
              <circle cx="100" cy="100" r="65" stroke="#b8860b" strokeWidth="1" fill="none"/>
              <circle cx="100" cy="100" r="40" stroke="#b8860b" strokeWidth="0.8" fill="none"/>
              {[0,45,90,135,180,225,270,315].map((d) => (
                <line key={d} x1="100" y1="10" x2="100" y2="190" stroke="#b8860b" strokeWidth="0.4" transform={`rotate(${d} 100 100)`}/>
              ))}
            </svg>
            <div>
              <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-amber-700 font-semibold bg-amber-100 px-3 py-1 rounded-full mb-3">
                <Sparkles className="w-3 h-3" /> Women's Collection
              </span>
              <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground mb-2 leading-tight">
                Galobandh.<br />Jhumka. Hansuli.
              </h3>
              <p className="text-[13px] text-muted-foreground mb-5 max-w-xs">
                Traditional Uttarakhand jewellery in 22KT BIS hallmarked gold and 925 sterling silver.
              </p>
            </div>
            <Link href="/shop?gender=women"
              className="inline-flex items-center gap-2 self-start px-5 py-2.5 bg-foreground text-background text-[12px] font-medium rounded-lg hover:opacity-85 transition-opacity">
              Shop Women's <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Right panel — Men's promo */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-neutral-700 p-8 lg:p-10 flex flex-col justify-between min-h-[220px]">
            <svg className="absolute right-0 top-0 w-48 h-48 opacity-[0.08]" viewBox="0 0 200 200">
              <rect x="20" y="20" width="160" height="160" rx="8" stroke="#c9a84c" strokeWidth="1.5" fill="none"/>
              <rect x="45" y="45" width="110" height="110" rx="5" stroke="#c9a84c" strokeWidth="1" fill="none"/>
              <rect x="70" y="70" width="60" height="60" rx="3" stroke="#c9a84c" strokeWidth="0.8" fill="none"/>
            </svg>
            <div>
              <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-amber-400 font-semibold bg-neutral-700 px-3 py-1 rounded-full mb-3">
                <Zap className="w-3 h-3" /> Men's Collection
              </span>
              <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-white mb-2 leading-tight">
                Bold. Certified.<br />Made for Men.
              </h3>
              <p className="text-[13px] text-neutral-400 mb-5 max-w-xs">
                Silver kada, gold chains, diamond pendants — fine jewellery for the modern Indian man.
              </p>
            </div>
            <Link href="/men"
              className="inline-flex items-center gap-2 self-start px-5 py-2.5 bg-accent text-white text-[12px] font-medium rounded-lg hover:opacity-90 transition-opacity">
              Shop Men's <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Banner 3: Full-width immersive feature banner
export function FeatureBanner() {
  return (
    <section className="py-4 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0d0d0d] via-[#1a150a] to-[#0d0d0d] min-h-[320px] flex items-center">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 1200 320" preserveAspectRatio="xMidYMid slice">
              {[...Array(8)].map((_, i) => (
                <circle key={i} cx={150 * i} cy="160" r={80 + i * 20} fill="none" stroke="#c9a84c" strokeWidth="0.8"/>
              ))}
            </svg>
            {/* Gold gradient sweeps */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 via-transparent to-amber-900/10"/>
            <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-amber-500/20 to-transparent"/>
          </div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center p-8 lg:p-14 w-full">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-6 h-px bg-accent"/>
                <span className="text-[10px] tracking-[0.3em] uppercase text-accent font-medium">New Launch 2026</span>
              </div>
              <h2 className="font-serif text-3xl lg:text-5xl font-semibold text-white mb-4 leading-[1.1]">
                Heritage Collection
                <span className="block text-accent italic">2026</span>
              </h2>
              <p className="text-neutral-400 text-[14px] leading-relaxed mb-7 max-w-md">
                Our most ambitious collection yet — 22KT Galobandh bridal gold, Aipan-engraved silver, 
                and IGI-certified diamond pieces named for Uttarakhand's sacred peaks.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/collections/heritage"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-medium text-[13px] rounded-xl hover:opacity-90 transition-opacity">
                  Explore Heritage <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-600 text-white font-medium text-[13px] rounded-xl hover:border-neutral-400 transition-colors">
                  Our Story
                </Link>
              </div>
            </div>
            {/* Right: stat cards */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { number: "22KT", label: "BIS Hallmark Gold", icon: "🥇" },
                { number: "925", label: "Sterling Silver", icon: "✦" },
                { number: "IGI", label: "Lab Grown Diamonds", icon: "💎" },
                { number: "40+", label: "Pahadi Karigars", icon: "🏔️" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition-colors">
                  <span className="text-xl mb-2 block">{stat.icon}</span>
                  <p className="font-serif text-2xl font-semibold text-white">{stat.number}</p>
                  <p className="text-[11px] text-neutral-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Banner 4: Three-column feature strip
export function FeatureStrip() {
  const features = [
    {
      icon: Shield,
      title: "100% Certified",
      desc: "Every piece BIS hallmarked or IGI certified. Scan the HUID on the BIS CARE app.",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      icon: Gift,
      title: "Gift Ready Always",
      desc: "Every order ships in a premium branded box. No extra charge. No exceptions.",
      color: "text-rose-500",
      bg: "bg-rose-50",
    },
    {
      icon: Sparkles,
      title: "Lifetime Polish",
      desc: "Free professional polish for the lifetime of your piece. Send it back, we'll return it new.",
      color: "text-violet-500",
      bg: "bg-violet-50",
    },
  ]

  return (
    <section className="py-0 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-8">
        <div className="grid md:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.title}
              className="flex items-start gap-4 p-6 bg-card border border-border rounded-2xl hover:border-accent/20 hover:shadow-sm transition-all">
              <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center flex-shrink-0`}>
                <f.icon className={`w-5 h-5 ${f.color}`} />
              </div>
              <div>
                <h3 className="text-[14px] font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Banner 5: Gift card / seasonal promo template
export function SeasonalBanner() {
  return (
    <section className="py-8 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Main promo card */}
          <div className="lg:col-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100 p-8 lg:p-10">
            <svg className="absolute right-4 top-4 w-32 h-32 opacity-10" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" stroke="#e11d48" strokeWidth="2" fill="none"/>
              <path d="M50 10 Q70 30 50 50 Q30 30 50 10Z" fill="#e11d48"/>
              <path d="M50 90 Q70 70 50 50 Q30 70 50 90Z" fill="#e11d48"/>
            </svg>
            <span className="inline-block text-[10px] tracking-[0.2em] uppercase text-rose-600 font-semibold bg-rose-100 px-3 py-1 rounded-full mb-4">
              🎁 Perfect Gift Idea
            </span>
            <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground mb-2">
              Gift Her Something That Lasts Forever
            </h3>
            <p className="text-[14px] text-muted-foreground mb-6 max-w-sm">
              Birthdays. Anniversaries. Weddings. Festivals. Every House of Nanda piece ships in a premium gift box — ready to give.
            </p>
            <Link href="/collections/gifting"
              className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 text-white font-medium text-[13px] rounded-xl hover:bg-rose-700 transition-colors">
              Shop Gift Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Gift card promo */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 p-8 flex flex-col justify-between">
            <div>
              <span className="inline-block text-[10px] tracking-[0.2em] uppercase text-amber-400 font-semibold bg-neutral-700 px-3 py-1 rounded-full mb-4">
                Gift Card
              </span>
              <h3 className="font-serif text-2xl font-semibold text-white mb-2">
                Let Her Choose
              </h3>
              <p className="text-[13px] text-neutral-400 mb-6 leading-relaxed">
                Not sure which piece? Gift a House of Nanda gift card — available in any amount, valid for 1 year.
              </p>
            </div>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-amber-500 text-amber-400 font-medium text-[12px] rounded-xl hover:bg-amber-500/10 transition-colors">
              Get Gift Card <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
