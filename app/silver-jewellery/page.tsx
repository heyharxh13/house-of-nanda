"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CartDrawer from "@/components/cart-drawer"
import ProductCard from "@/components/product-card"
import Link from "next/link"
import { ArrowRight, Shield, Truck, RefreshCw } from "lucide-react"
import { womenProducts, menProducts } from "@/lib/data"

const allSilver = [...womenProducts, ...menProducts].filter(p => p.category === "silver")

// ── Silver sub-categories (mirrors men's structure) ──────────────────────────
const SILVER_CATS = [
  {
    key: "necklaces",
    label: "Necklaces & Pendants",
    pahadi: "हार",
    count: "40+ Designs",
    img: "/images/cat-necklaces.jpg",
    filter: (p: typeof allSilver[0]) => ["necklace", "chain", "pendant", "mangalsutra", "hansuli", "galobandh"].some(k => p.slug.includes(k) || p.name.toLowerCase().includes(k)),
  },
  {
    key: "earrings",
    label: "Earrings & Jhumka",
    pahadi: "झुमका",
    count: "50+ Designs",
    img: "/images/cat-earrings.jpg",
    filter: (p: typeof allSilver[0]) => ["earring", "jhumka", "drop", "stud", "chandelier", "hoop"].some(k => p.slug.includes(k) || p.name.toLowerCase().includes(k)),
  },
  {
    key: "rings",
    label: "Rings",
    pahadi: "अंगूठी",
    count: "35+ Designs",
    img: "/images/cat-rings.jpg",
    filter: (p: typeof allSilver[0]) => ["ring"].some(k => p.slug.includes(k) || p.name.toLowerCase().includes(k)),
  },
  {
    key: "bracelets",
    label: "Bracelets & Bangles",
    pahadi: "कड़ा",
    count: "30+ Designs",
    img: "/images/cat-bracelets.jpg",
    filter: (p: typeof allSilver[0]) => ["bracelet", "bangle", "cuff", "pahunchi", "kada"].some(k => p.slug.includes(k) || p.name.toLowerCase().includes(k)),
  },
  {
    key: "anklets",
    label: "Anklets & Payal",
    pahadi: "पायल",
    count: "20+ Designs",
    img: "/images/cat-anklets.jpg",
    filter: (p: typeof allSilver[0]) => ["anklet", "payal"].some(k => p.slug.includes(k) || p.name.toLowerCase().includes(k)),
  },
  {
    key: "heritage",
    label: "Heritage Pieces",
    pahadi: "परम्परा",
    count: "25+ Designs",
    img: "/images/product-heritage-bracelet.jpg",
    filter: (p: typeof allSilver[0]) => ["maangtika", "mangalsutra", "aipan", "kumaoni"].some(k => p.slug.includes(k) || p.name.toLowerCase().includes(k)),
  },
]

const pillars = [
  {
    icon: Shield,
    title: "925 Sterling Silver",
    body: "Every piece is solid 925 sterling silver — never plated, never hollow. Third-party certified for purity.",
  },
  {
    icon: RefreshCw,
    title: "Handcrafted Heritage",
    body: "Designs drawn from Kumaon's Aipan folk art and Pahadi temple geometry, reimagined for contemporary wear.",
  },
  {
    icon: Truck,
    title: "Free Insured Delivery",
    body: "Every order is insured and tracked. Delivered across India in 5–7 business days.",
  },
]

export default function SilverJewelleryPage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const displayed = activeCategory === "all"
    ? allSilver
    : allSilver.filter(p => {
        const cat = SILVER_CATS.find(c => c.key === activeCategory)
        return cat ? cat.filter(p) : true
      })

  return (
    <>
      <Navbar />
      <main className="bg-[#FAFAF7]">

        {/* ── HERO — split layout with image ──────────────────────────── */}
        <section className="grid lg:grid-cols-2 overflow-hidden" style={{ minHeight: "88vh" }}>

          {/* Left — text content */}
          <div className="relative bg-stone-950 flex flex-col justify-center px-8 sm:px-14 lg:px-16 py-24 lg:py-32 order-2 lg:order-1">
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 0% 100%, rgba(184,150,90,0.08) 0%, transparent 60%)" }} />
            <div className="relative z-10 max-w-lg">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-7 h-px" style={{ background: "#B8965A" }} />
                <p className="text-[10px] tracking-[0.55em] uppercase font-light"
                  style={{ color: "rgba(184,150,90,0.65)" }}>
                  925 Sterling Silver
                </p>
              </div>

              <h1 className="font-serif text-white leading-[0.9] mb-7"
                style={{ fontSize: "clamp(3.2rem, 6vw, 5.5rem)", fontWeight: 300, fontFamily: "'Cormorant Garamond', serif" }}>
                Silver<br />
                <em className="italic" style={{ color: "rgba(237,232,224,0.38)" }}>Jewellery</em>
              </h1>

              <p className="text-[14px] leading-relaxed mb-4 font-light" style={{ color: "rgba(237,232,224,0.50)" }}>
                A curated collection of 925 sterling silver — from Aipan-inspired heritage pieces to clean contemporary forms.
              </p>
              <p className="text-[13px] leading-relaxed mb-10 font-light" style={{ color: "rgba(237,232,224,0.32)" }}>
                Every piece certified, handcrafted in Kumaon, built to endure.
              </p>

              <Link href="#collection"
                className="group inline-flex items-center gap-3 px-9 py-4 text-[11px] font-bold tracking-[0.25em] uppercase transition-all self-start"
                style={{ background: "#B8965A", color: "#fff" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#A07848"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#B8965A"}>
                Explore Collection
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Certifications */}
              <div className="flex flex-wrap gap-8 mt-12 pt-8"
                style={{ borderTop: "1px solid rgba(237,232,224,0.07)" }}>
                {[
                  { n: "925", l: "Sterling Silver" },
                  { n: "Hallmarked", l: "Third-party Certified" },
                  { n: "∞", l: "Free Insured Delivery" },
                ].map(s => (
                  <div key={s.n}>
                    <p className="font-serif" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "rgba(237,232,224,0.55)", lineHeight: 1, fontWeight: 300 }}>{s.n}</p>
                    <p style={{ fontSize: 7.5, letterSpacing: "0.30em", textTransform: "uppercase", color: "rgba(237,232,224,0.22)", marginTop: 5 }}>{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — hero image */}
          <div className="relative overflow-hidden order-1 lg:order-2" style={{ minHeight: 380, background: "#2A2420" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/collection-silver.jpg"
              alt="House of Nanda Silver Jewellery"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "center 30%" }}
            />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(10,9,8,0.10) 0%, rgba(10,9,8,0.05) 50%, rgba(10,9,8,0.25) 100%)" }} />

            {/* Floating badge */}
            <div className="absolute bottom-8 left-8 px-5 py-4"
              style={{ background: "rgba(10,9,8,0.75)", backdropFilter: "blur(12px)", border: "1px solid rgba(184,150,90,0.20)" }}>
              <p style={{ fontSize: 7, letterSpacing: "0.40em", textTransform: "uppercase", color: "rgba(184,150,90,0.70)", marginBottom: 4 }}>Certified Purity</p>
              <p className="font-serif" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "#EDE8E0", fontWeight: 300 }}>925 Sterling Silver</p>
              <p style={{ fontSize: 9, color: "rgba(237,232,224,0.35)", marginTop: 3 }}>Hallmarked · Never Plated</p>
            </div>

            {/* Corner accent */}
            <div className="absolute top-6 right-6 w-10 h-10" style={{ borderTop: "1px solid rgba(184,150,90,0.35)", borderRight: "1px solid rgba(184,150,90,0.35)" }} />
          </div>
        </section>

        {/* ── SHOP BY CATEGORY ────────────────────────────────────────── */}
        <section className="py-20 lg:py-28" style={{ background: "#F4F2EF" }}>
          <div className="max-w-7xl mx-auto px-5 lg:px-10">

            <div className="mb-14">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-5 h-px" style={{ background: "#B8965A" }} />
                <p style={{ fontSize: 7.5, letterSpacing: "0.50em", textTransform: "uppercase", color: "rgba(184,150,90,0.65)" }}>Browse</p>
              </div>
              <div className="flex items-end justify-between">
                <h2 className="font-serif font-light" style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                  color: "#0E0D0B", letterSpacing: "-0.01em", lineHeight: 1.0,
                }}>
                  Shop by Category
                </h2>
                <Link href="#collection"
                  className="hidden lg:inline-flex items-center gap-2 transition-opacity duration-200 hover:opacity-40"
                  style={{ fontSize: 9, letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(14,13,11,0.38)" }}>
                  All silver <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* 3-column large + 3-column compact */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4 mb-4">
              {SILVER_CATS.slice(0, 3).map((cat) => (
                <button key={cat.key}
                  onClick={() => { setActiveCategory(cat.key); document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" }) }}
                  className="relative overflow-hidden group block text-left w-full"
                  style={{ aspectRatio: "3/4", background: "#E8E4DF" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cat.img} alt={cat.label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.05]"
                    style={{ objectPosition: "center center" }} />
                  <div className="absolute inset-0" style={{
                    background: "linear-gradient(180deg, rgba(8,7,6,0.0) 35%, rgba(8,7,6,0.72) 100%)"
                  }} />
                  <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                    <p style={{ fontSize: 7, letterSpacing: "0.40em", textTransform: "uppercase", color: "rgba(184,150,90,0.80)", marginBottom: 5 }}>
                      {cat.pahadi} · {cat.count}
                    </p>
                    <p className="font-serif font-light" style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(0.95rem, 1.6vw, 1.2rem)",
                      color: "#EDE8E0", lineHeight: 1.1,
                    }}>
                      {cat.label}
                    </p>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ boxShadow: "inset 0 0 0 1px rgba(184,150,90,0.40)" }} />
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
              {SILVER_CATS.slice(3).map((cat) => (
                <button key={cat.key}
                  onClick={() => { setActiveCategory(cat.key); document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" }) }}
                  className="relative overflow-hidden group flex items-center gap-4 p-5 text-left w-full"
                  style={{ background: "#EAE7E2", border: "1px solid rgba(14,13,11,0.06)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cat.img} alt={cat.label}
                    className="w-16 h-16 object-cover flex-shrink-0 transition-transform duration-700 group-hover:scale-[1.06]"
                    style={{ objectPosition: "center" }} />
                  <div>
                    <p style={{ fontSize: 6.5, letterSpacing: "0.38em", textTransform: "uppercase", color: "rgba(184,150,90,0.72)", marginBottom: 4 }}>
                      {cat.count}
                    </p>
                    <p className="font-serif font-light" style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
                      color: "#0E0D0B", lineHeight: 1.2,
                    }}>
                      {cat.label}
                    </p>
                    <p style={{ fontSize: 10, color: "rgba(14,13,11,0.38)", marginTop: 3 }}>{cat.pahadi}</p>
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-3.5 h-3.5" style={{ color: "#B8965A" }} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRODUCT COLLECTION ──────────────────────────────────────── */}
        <section id="collection" className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-5 lg:px-10">

            {/* Header */}
            <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
              <div>
                <p className="text-[9px] tracking-[0.55em] uppercase mb-3" style={{ color: "#B0AAA0" }}>The Collection</p>
                <h2 className="font-serif leading-[0.92]"
                  style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", fontWeight: 300, color: "#0D0C0A", fontFamily: "'Cormorant Garamond', serif" }}>
                  925 Sterling Silver
                </h2>
              </div>
              <p className="text-[12px] max-w-xs text-right hidden sm:block" style={{ color: "#B0AAA0" }}>
                All pieces are solid 925 silver — certified, hallmarked, made to last generations.
              </p>
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-0 mb-10 self-start overflow-x-auto" style={{ border: "1px solid #E0DAD0" }}>
              {[{ key: "all", label: "All Silver" }, ...SILVER_CATS].map(c => (
                <button key={c.key} onClick={() => setActiveCategory(c.key)}
                  className="px-5 py-2.5 text-[10px] font-bold tracking-[0.18em] uppercase whitespace-nowrap transition-all"
                  style={{
                    borderRight: "1px solid #E0DAD0",
                    background: activeCategory === c.key ? "#0D0C0A" : "white",
                    color: activeCategory === c.key ? "white" : "#B0AAA0",
                  }}>
                  {c.label}
                </button>
              ))}
            </div>

            {/* Grid */}
            {displayed.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
                {displayed.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="font-serif text-2xl font-light mb-3" style={{ color: "#0D0C0A" }}>Coming Soon</p>
                <p className="text-[13px]" style={{ color: "#B0AAA0" }}>New pieces in this category are being crafted.</p>
                <button onClick={() => setActiveCategory("all")} className="mt-6 text-[10px] tracking-[0.22em] uppercase font-bold"
                  style={{ color: "#B8965A" }}>← Back to All Silver</button>
              </div>
            )}
          </div>
        </section>

        {/* ── BRAND PILLARS ───────────────────────────────────────────── */}
        <section style={{ borderTop: "1px solid #E0DAD0", background: "white" }} className="py-16">
          <div className="max-w-7xl mx-auto px-5 lg:px-10">
            <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x" style={{ borderColor: "#F0ECE5" }}>
              {pillars.map((p, i) => (
                <div key={i} className="py-10 lg:py-0 lg:px-10 first:lg:pl-0 last:lg:pr-0 flex items-start gap-5">
                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1"
                    style={{ background: "#F4F2EF" }}>
                    <p.icon className="w-4 h-4" style={{ color: "#7A756C" }} />
                  </div>
                  <div>
                    <h3 className="text-[11px] tracking-[0.22em] uppercase font-bold mb-2" style={{ color: "#0D0C0A" }}>{p.title}</h3>
                    <p className="text-[13px] leading-relaxed" style={{ color: "#7A756C" }}>{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SPLIT FEATURE — Aipan tradition ─────────────────────────── */}
        <section className="grid lg:grid-cols-2" style={{ background: "#0D0C0A" }}>
          <div className="relative overflow-hidden" style={{ minHeight: "520px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/product-silver-bangle.jpg"
              alt="Heritage Silver Jewellery"
              className="absolute inset-0 w-full h-full object-cover opacity-70" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent 70%, rgba(13,12,10,0.5) 100%)" }} />
          </div>
          <div className="flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-20">
            <div className="w-8 h-px mb-7" style={{ background: "rgba(184,150,90,0.5)" }} />
            <p className="text-[9px] tracking-[0.55em] uppercase mb-5" style={{ color: "#4A4840" }}>Rooted in Kumaon</p>
            <h2 className="font-serif text-white leading-[0.92] mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, fontFamily: "'Cormorant Garamond', serif" }}>
              The Aipan Tradition<br />in Silver
            </h2>
            <p className="text-[13px] leading-relaxed mb-4" style={{ color: "#5A5550" }}>
              Aipan is the sacred folk art of Kumaon — geometric patterns drawn by women on doorways and floors during festivals. House of Nanda translates these devotional motifs into sterling silver.
            </p>
            <p className="text-[13px] leading-relaxed mb-8" style={{ color: "#4A4840" }}>
              Each Aipan-inspired piece carries the visual memory of a living tradition — not as pastiche, but as genuine continuation.
            </p>
            <Link href="/about"
              className="group inline-flex items-center gap-2.5 px-7 py-3 text-[10px] font-bold tracking-[0.22em] uppercase transition-all self-start"
              style={{ border: "1px solid #2A2820", color: "#7A756C" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "white"; el.style.color = "white" }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "#2A2820"; el.style.color = "#7A756C" }}>
              Read Our Story <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
