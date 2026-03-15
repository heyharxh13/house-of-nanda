"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CartDrawer from "@/components/cart-drawer"
import ProductCard from "@/components/product-card"
import Link from "next/link"
import { menProducts, menCategories } from "@/lib/data"
import { ArrowRight } from "lucide-react"

// ── Editorial panels — Himalayan material stories ─────────────────────────
const PANELS = [
  {
    img: "/images/collection-silver.jpg",
    pos: "50% 40%",
    overline: "925 Sterling Silver",
    headline: "Shaped by\nthe cold.",
    sub: "Hammered kada. Oxidised shadow bands. Silver that carries the silence of the high passes.",
    href: "/shop?gender=men&material=silver",
    cta: "Shop Silver",
    alignRight: false,
  },
  {
    img: "/images/collection-gold.jpg",
    pos: "50% 50%",
    overline: "22KT BIS Hallmarked Gold",
    headline: "Gold of the\nhigh ranges.",
    sub: "Box chains. Signet rings. Gold hallmarked with the weight of generations.",
    href: "/shop?gender=men&material=gold",
    cta: "Shop Gold",
    alignRight: true,
  },

]

// ── Category images — jewellery-matched ───────────────────────────────────
const CAT_IMAGES: Record<string, string> = {
  "men-rings":     "/images/cat-rings.jpg",
  "men-chains":    "/images/product-aurora-necklace.jpg",
  "men-bracelets": "/images/product-heritage-bracelet.jpg",
  "men-earrings":  "/images/product-diamond-studs.jpg",
  "men-diamonds":  "/images/collection-diamond.jpg",
  "men-gold":      "/images/collection-gold.jpg",
}

export default function MenPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ══════════════════════════════════════════════════════════════
            HERO — Himalayan landscape
        ══════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden" style={{ height: "100vh", minHeight: 660 }}>
          <div className="absolute inset-0">
            {/* Himalayan peaks — Annapurna range */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero-jewellery.jpg"
              alt=""
              className="w-full h-full object-cover"
              style={{ objectPosition: "50% 55%" }}
            />
            {/* Deep gradient left, keeps image visible right */}
            <div className="absolute inset-0" style={{
              background: "linear-gradient(108deg, rgba(8,7,6,0.95) 0%, rgba(8,7,6,0.80) 36%, rgba(8,7,6,0.28) 65%, rgba(8,7,6,0.50) 100%)"
            }} />
            <div className="absolute inset-0" style={{
              background: "linear-gradient(180deg, rgba(8,7,6,0.10) 0%, transparent 30%, rgba(8,7,6,0.72) 100%)"
            }} />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto px-8 lg:px-16 pb-20 lg:pb-28">
            <div>
              {/* Gold overline */}
              <div className="flex items-center gap-4 mb-9">
                <span className="w-7 h-px" style={{ background: "#B8965A" }} />
                <span style={{ fontSize: 8, letterSpacing: "0.50em", textTransform: "uppercase", color: "rgba(184,150,90,0.72)" }}>
                  House of Nanda · Men's Collection
                </span>
              </div>

              {/* Bold Himalayan headline */}
              <h1
                className="font-serif font-light mb-7"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(3rem, 5.5vw, 5.2rem)",
                  color: "#EDE8E0",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.05,
                }}>
                Forged in{" "}
                <em style={{ color: "rgba(237,232,224,0.42)", fontStyle: "italic" }}>the peaks</em>
                <br />of Kumaon.
              </h1>

              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 16.5,
                lineHeight: 1.85,
                color: "rgba(237,232,224,0.38)",
                letterSpacing: "0.02em",
                maxWidth: 370,
                marginBottom: 34,
                fontWeight: 300,
              }}>
                Silver kada. Gold chains. Diamond pendants.
                Born from the craft traditions of Uttarakhand.
              </p>

              <Link href="/shop?gender=men"
                className="inline-flex items-center gap-3 group transition-all duration-200 hover:opacity-55"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 10.5,
                  letterSpacing: "0.36em",
                  textTransform: "uppercase",
                  color: "#EDE8E0",
                  borderBottom: "1px solid rgba(237,232,224,0.28)",
                  paddingBottom: 3,
                }}>
                Explore the Collection
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            {/* Certifications */}
            <div className="flex flex-wrap gap-10 lg:gap-14 mt-14 pt-7"
              style={{ borderTop: "1px solid rgba(237,232,224,0.07)" }}>
              {[
                { val: "925",   label: "Sterling Silver" },
                { val: "22KT", label: "BIS Hallmarked"  },
                { val: "IGI",  label: "Lab Certified"   },
                { val: "∞",    label: "Insured Delivery"},
              ].map(c => (
                <div key={c.val}>
                  <p className="font-serif" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "rgba(237,232,224,0.58)", lineHeight: 1, fontWeight: 300 }}>{c.val}</p>
                  <p style={{ fontSize: 7.5, letterSpacing: "0.33em", textTransform: "uppercase", color: "rgba(237,232,224,0.20)", marginTop: 6 }}>{c.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            EDITORIAL PANELS — 3 full-bleed landscape photos
        ══════════════════════════════════════════════════════════════ */}
        <section>
          {PANELS.map((panel, i) => (
            <div key={panel.overline} className="relative overflow-hidden group" style={{ height: "70vh", minHeight: 460 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={panel.img}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1600ms] group-hover:scale-[1.04]"
                style={{ objectPosition: panel.pos }}
              />
              <div className="absolute inset-0" style={{
                background: panel.alignRight
                  ? "linear-gradient(265deg, rgba(8,7,6,0.94) 0%, rgba(8,7,6,0.60) 48%, rgba(8,7,6,0.12) 100%)"
                  : "linear-gradient(95deg, rgba(8,7,6,0.94) 0%, rgba(8,7,6,0.60) 48%, rgba(8,7,6,0.12) 100%)"
              }} />
              <div className="absolute inset-0" style={{ background: "rgba(8,7,6,0.18)" }} />
              {/* gold rule */}
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "rgba(184,150,90,0.10)" }} />

              <div className="relative z-10 h-full flex items-center max-w-7xl mx-auto px-8 lg:px-16">
                <div style={{ maxWidth: 540 }} className={panel.alignRight ? "ml-auto text-right" : ""}>
                  <p style={{ fontSize: 8, letterSpacing: "0.46em", textTransform: "uppercase", color: "rgba(184,150,90,0.70)", marginBottom: 18 }}>
                    {panel.overline}
                  </p>
                  <h2 className="font-serif font-light" style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(2.8rem, 7vw, 6rem)",
                    color: "#EDE8E0",
                    letterSpacing: "-0.01em",
                    lineHeight: 0.93,
                    marginBottom: 20,
                    whiteSpace: "pre-line",
                  }}>
                    {panel.headline}
                  </h2>
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 15,
                    lineHeight: 1.80,
                    color: "rgba(237,232,224,0.40)",
                    fontWeight: 300,
                    marginBottom: 26,
                    maxWidth: 380,
                  }}>
                    {panel.sub}
                  </p>
                  <Link href={panel.href}
                    className="inline-flex items-center gap-2 group/btn transition-opacity duration-200 hover:opacity-55"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 10.5,
                      letterSpacing: "0.34em",
                      textTransform: "uppercase",
                      color: "#B8965A",
                      borderBottom: "1px solid rgba(184,150,90,0.32)",
                      paddingBottom: 3,
                    }}>
                    {panel.cta}
                    <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Ghost number */}
              <span className="absolute font-serif select-none pointer-events-none" style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(7rem, 16vw, 16rem)",
                fontWeight: 300, fontStyle: "italic",
                color: "rgba(237,232,224,0.022)",
                lineHeight: 1, bottom: -10,
                right: panel.alignRight ? "auto" : 32,
                left: panel.alignRight ? 32 : "auto",
              }}>
                {`0${i + 1}`}
              </span>
            </div>
          ))}
        </section>

        {/* ══════════════════════════════════════════════════════════════
            SHOP BY CATEGORY — structured grid with category descriptions
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-20 lg:py-28" style={{ background: "#F4F2EF" }}>
          <div className="max-w-7xl mx-auto px-8 lg:px-16">

            {/* Header */}
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-5 h-px" style={{ background: "#B8965A" }} />
                <p style={{ fontSize: 7.5, letterSpacing: "0.50em", textTransform: "uppercase", color: "rgba(184,150,90,0.65)" }}>
                  Browse
                </p>
              </div>
              <div className="flex items-end justify-between">
                <h2 className="font-serif font-light" style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                  color: "#0E0D0B",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.0,
                }}>
                  Shop by Category
                </h2>
                <Link href="/shop?gender=men"
                  className="hidden lg:inline-flex items-center gap-2 transition-opacity duration-200 hover:opacity-40"
                  style={{ fontSize: 9, letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(14,13,11,0.38)" }}>
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* 2-row layout: 3 large + 3 compact */}
            <div className="grid grid-cols-3 gap-3 lg:gap-4 mb-4">
              {menCategories.slice(0, 3).map((cat) => (
                <Link key={cat.slug} href={`/shop?gender=men&category=${cat.slug}`}
                  className="relative overflow-hidden group block"
                  style={{ aspectRatio: "3/4", background: "#E8E4DF" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={CAT_IMAGES[cat.slug] || cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.05]"
                    style={{ objectPosition: "center center" }}
                  />
                  <div className="absolute inset-0" style={{
                    background: "linear-gradient(180deg, rgba(8,7,6,0.0) 35%, rgba(8,7,6,0.72) 100%)"
                  }} />
                  <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                    <p style={{ fontSize: 7, letterSpacing: "0.40em", textTransform: "uppercase", color: "rgba(184,150,90,0.80)", marginBottom: 5 }}>
                      {cat.pahadi_name} · {cat.count}
                    </p>
                    <p className="font-serif font-light" style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(0.95rem, 1.6vw, 1.2rem)",
                      color: "#EDE8E0", lineHeight: 1.1,
                    }}>
                      {cat.name}
                    </p>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{
                    boxShadow: "inset 0 0 0 1px rgba(184,150,90,0.40)"
                  }} />
                </Link>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 lg:gap-4">
              {menCategories.slice(3).map((cat) => (
                <Link key={cat.slug} href={`/shop?gender=men&category=${cat.slug}`}
                  className="relative overflow-hidden group flex items-center gap-4 p-5"
                  style={{ background: "#EAE7E2", border: "1px solid rgba(14,13,11,0.06)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={CAT_IMAGES[cat.slug] || cat.image}
                    alt={cat.name}
                    className="w-16 h-16 object-cover flex-shrink-0 transition-transform duration-700 group-hover:scale-[1.06]"
                    style={{ objectPosition: "center" }}
                  />
                  <div>
                    <p style={{ fontSize: 6.5, letterSpacing: "0.38em", textTransform: "uppercase", color: "rgba(184,150,90,0.72)", marginBottom: 4 }}>
                      {cat.count}
                    </p>
                    <p className="font-serif font-light" style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
                      color: "#0E0D0B", lineHeight: 1.2,
                    }}>
                      {cat.name}
                    </p>
                    <p style={{ fontSize: 10, color: "rgba(14,13,11,0.38)", marginTop: 3 }}>
                      {cat.pahadi_name}
                    </p>
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-3.5 h-3.5" style={{ color: "#B8965A" }} />
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            MEN'S JEWELLERY CATALOGUE — whitish silver bg
        ══════════════════════════════════════════════════════════════ */}
        <section className="py-16 lg:py-24" style={{ background: "#EEECEA" }}>
          <div className="max-w-screen-xl mx-auto px-6 lg:px-12">

            {/* Small premium header */}
            <div className="flex items-baseline justify-between mb-10"
              style={{ borderBottom: "1px solid rgba(14,13,11,0.08)", paddingBottom: 16 }}>
              <div className="flex items-baseline gap-6">
                <h2 className="font-serif font-light" style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.1rem, 1.6vw, 1.5rem)",
                  color: "#0E0D0B",
                  letterSpacing: "0.04em",
                  lineHeight: 1.0,
                }}>
                  Men's Jewellery
                </h2>
                <span style={{ fontSize: 7.5, letterSpacing: "0.44em", textTransform: "uppercase", color: "rgba(184,150,90,0.60)" }}>
                  The Collection
                </span>
              </div>
              <div className="flex items-center gap-6">
                <p style={{ fontSize: 8.5, letterSpacing: "0.22em", color: "rgba(14,13,11,0.30)", textTransform: "uppercase" }}>
                  {menProducts.length} pieces
                </p>
                <Link href="/shop?gender=men"
                  className="hidden lg:inline-flex items-center gap-1.5 transition-opacity duration-200 hover:opacity-40"
                  style={{ fontSize: 8.5, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(14,13,11,0.40)" }}>
                  View all <ArrowRight className="w-2.5 h-2.5" />
                </Link>
              </div>
            </div>

            {/* Compact 5-column catalogue grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 lg:gap-4">
              {menProducts.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            TRUST STRIP
        ══════════════════════════════════════════════════════════════ */}
        <section style={{ borderTop: "1px solid rgba(14,13,11,0.07)", background: "#F4F2EF" }}>
          <div className="max-w-7xl mx-auto px-8 lg:px-16 py-14 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "BIS Hallmark Gold",     desc: "Every gold piece certified by Bureau of Indian Standards." },
              { title: "925 Sterling Silver",   desc: "Solid silver. Never plated. Built to last generations." },
              { title: "IGI Lab Diamonds",       desc: "Real certified diamonds, ethically sourced." },
              { title: "Free Insured Shipping", desc: "Pan-India, fully insured on every single order." },
            ].map(f => (
              <div key={f.title}>
                <p className="font-serif font-light mb-2.5"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "rgba(14,13,11,0.72)", lineHeight: 1.2 }}>
                  {f.title}
                </p>
                <p style={{ fontSize: 11, lineHeight: 1.78, color: "rgba(14,13,11,0.38)", fontWeight: 300 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
