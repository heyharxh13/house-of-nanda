"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CartDrawer from "@/components/cart-drawer"
import ProductCard from "@/components/product-card"
import Link from "next/link"
import { ArrowRight, Mountain, Star, Shield, Sparkles, ChevronDown, ChevronUp } from "lucide-react"
import { womenProducts, menProducts } from "@/lib/data"

// ─── All gold products ────────────────────────────────────────────────────────
const goldProducts = [...womenProducts, ...menProducts].filter(p => p.category === "gold")

// ─── Tradition collections ────────────────────────────────────────────────────
const traditions = [
  {
    id: "nath",
    name: "Nath Collection",
    hindi: "नथ",
    desc: "The Nath — a nose ring of extraordinary significance in Pahadi culture. Worn by brides from Tehri to Pithoragarh, each Nath tells the story of a lineage, a mountain, a blessing.",
    story: "In the hills of Uttarakhand, a bride's Nath is gifted by her mother-in-law on the morning of her wedding. The larger the Nath, the greater the celebration. Ours are crafted in 22KT hallmarked gold — each one a heirloom waiting to happen.",
    pieces: "Bridal Nath · Everyday Nath · Floral Nath",
    icon: "🌸",
    accent: "bg-rose-50 border-rose-100",
    accentText: "text-rose-700",
    tag: "Bridal Heritage",
  },
  {
    id: "guloband",
    name: "Guloband Necklaces",
    hindi: "गुलोबंद",
    desc: "The Guloband — a layered choker necklace — is the most cherished ornament of a Kumaoni bride. Its multiple gold chains represent the bonds of family, faith, and the mountains.",
    story: "Inspired by the traditional Guloband worn by Kumaoni women, this necklace blends heritage with modern elegance. Each layer is hand-set by Sonar karigars in Almora who have practised this craft for four generations.",
    pieces: "Classic Guloband · Layered Guloband · Contemporary Guloband",
    icon: "✦",
    accent: "bg-amber-50 border-amber-100",
    accentText: "text-amber-700",
    tag: "Signature Collection",
  },
  {
    id: "pauchi",
    name: "Pauchi Bracelets",
    hindi: "पौची",
    desc: "The Pauchi is the wrist ornament of Garhwali and Kumaoni women — stacked, layered, and always gold. From festivals like Harela to everyday grace, Pauchi is the Pahadi woman's constant companion.",
    story: "In Garhwal, no celebration is complete without the sound of Pauchi bangles clinking together as women dance the Langvir Nritya. We preserve that sound in every bracelet — crafted in 22KT BIS hallmarked gold.",
    pieces: "Stack Pauchi · Twisted Pauchi · Engraved Pauchi",
    icon: "⟡",
    accent: "bg-yellow-50 border-yellow-100",
    accentText: "text-yellow-700",
    tag: "Festival Favourite",
  },
  {
    id: "hansuli",
    name: "Hansuli Neckpieces",
    hindi: "हंसुली",
    desc: "The Hansuli — a rigid crescent collar — is perhaps the most powerful statement in Pahadi fine jewellery. Hand-engraved with Mandana geometric motifs, it sits at the collarbone like a crown.",
    story: "The Hansuli was historically a mark of a married woman's status in the Himalayan foothills. Its rigid form means strength; its precious metal means endurance. A father gifted it to his daughter at her wedding — we carry that tradition forward.",
    pieces: "Classic Hansuli · Filigree Hansuli · Bridal Hansuli",
    icon: "◠",
    accent: "bg-orange-50 border-orange-100",
    accentText: "text-orange-700",
    tag: "Statement Piece",
  },
  {
    id: "maangtika",
    name: "Maangtika Collection",
    hindi: "माँग टीका",
    desc: "The Maangtika — the crown of a Pahadi bride. Placed at the centre parting, it marks the most sacred moment of a woman's wedding ceremony across Kumaon and Garhwal.",
    story: "In Uttarakhand, the Maangtika is the very first ornament worn by the bride in her solah shringar — the sixteen sacred adornments. Our Maangtika range honours this tradition in 22KT BIS hallmarked gold, with teardrop pendants inspired by the holy lakes of Kumaon — Sattal, Bhimtal, Naukuchiatal.",
    pieces: "Bridal Maangtika · Everyday Maangtika · Diamond Maangtika",
    icon: "✦",
    accent: "bg-rose-50 border-rose-100",
    accentText: "text-rose-700",
    tag: "Bridal Essential",
  },
  {
    id: "mangalsutra",
    name: "Mangalsutra Collection",
    hindi: "मंगलसूत्र",
    desc: "The Mangalsutra — the sacred bond worn around a bride's neck, tied by the groom himself. In the Himalayan tradition, it is a vow made visible in gold and black beads.",
    story: "In Pahadi culture, the Mangalsutra pendant is shaped after temple spires and sacred mountain peaks. Our collection offers both the traditional Kedarnath spire pendant in 22KT gold, and a modern solitaire lab-diamond pendant for the contemporary Indian woman — because tradition and modernity are not opposites.",
    pieces: "Traditional Mangalsutra · Diamond Mangalsutra · Minimal Mangalsutra",
    icon: "◈",
    accent: "bg-amber-50 border-amber-100",
    accentText: "text-amber-700",
    tag: "Sacred Bond",
  },
  {
    id: "jhumka",
    name: "Jhumka Catalogue",
    hindi: "झुमका",
    desc: "The Jhumka — the most beloved earring of the hills. Its dome silhouette echoes temple architecture; its cascading bells carry the music of Uttarakhand's festivals.",
    story: "In the Kumaon valleys, no festival is complete without the sound of Jhumka bells. From Nanda Devi Raj Jat to Harela, women have worn Jhumkas as a declaration of heritage and joy. Our collection ranges from bridal 22KT gold temple Jhumkas to lightweight everyday silver versions — every one handcrafted by Pahadi karigars.",
    pieces: "Temple Jhumka · Filigree Jhumka · Everyday Jhumka",
    icon: "🌸",
    accent: "bg-yellow-50 border-yellow-100",
    accentText: "text-yellow-700",
    tag: "Festival Signature",
  },
]

// ─── Product story accordion ──────────────────────────────────────────────────
function StoryAccordion({ story, title }: { story: string; title: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-t border-amber-100 mt-4 pt-3">
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-[12px] font-semibold text-amber-700 hover:text-amber-900 transition-colors w-full text-left">
        <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
        The story behind {title}
        {open ? <ChevronUp className="w-3.5 h-3.5 ml-auto" /> : <ChevronDown className="w-3.5 h-3.5 ml-auto" />}
      </button>
      {open && (
        <p className="text-[13px] text-amber-900/70 leading-relaxed mt-3 italic pl-5 border-l-2 border-amber-200">
          &ldquo;{story}&rdquo;
        </p>
      )}
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function GoldJewelleryPage() {
  const [activeTradition, setActiveTradition] = useState<string | null>(null)

  return (
    <>
      <Navbar />
      <main className="bg-background">

        {/* ══ HERITAGE HERO ══════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0d0a04] via-[#1a1206] to-[#0a0700] min-h-[92vh] flex items-center">
          {/* Animated mandala background */}
          <div className="absolute inset-0 pointer-events-none">
            <svg className="absolute right-0 top-0 w-[700px] h-[700px] opacity-[0.055]" viewBox="0 0 700 700">
              {[280, 220, 160, 110, 60].map((r, i) => (
                <circle key={i} cx="350" cy="350" r={r} stroke="#c9a84c" strokeWidth={i === 0 ? "1.5" : "0.8"} fill="none" />
              ))}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <line key={deg} x1="350" y1="70" x2="350" y2="630"
                  stroke="#c9a84c" strokeWidth="0.4"
                  transform={`rotate(${deg} 350 350)`} />
              ))}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                <ellipse key={i} cx="350" cy="140" rx="14" ry="38"
                  fill="#c9a84c" opacity="0.5"
                  transform={`rotate(${deg} 350 350)`} />
              ))}
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
            {/* Floating gold particles */}
            {[...Array(12)].map((_, i) => (
              <div key={i}
                className="absolute w-1 h-1 rounded-full bg-accent opacity-30"
                style={{
                  left: `${10 + i * 8}%`,
                  top: `${20 + (i % 5) * 15}%`,
                  animation: `pulse ${2 + i * 0.3}s ease-in-out infinite alternate`,
                }} />
            ))}
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left — Text */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-px bg-accent" />
                <span className="text-[10px] tracking-[0.35em] uppercase text-accent font-semibold">Gold Jewellery · 22KT & 18KT</span>
              </div>

              <h1 className="font-serif text-5xl lg:text-7xl font-semibold text-white leading-[1.05] mb-6">
                Jewellery Inspired<br />
                by the Soul of<br />
                <span className="text-accent italic">Uttarakhand</span>
              </h1>

              <p className="text-white/60 text-[16px] leading-relaxed mb-4 max-w-lg">
                From the mountains of Kumaon to the valleys of Garhwal,
                discover jewellery that carries Himalayan heritage —
                in BIS hallmarked gold, for every woman who knows where she comes from.
              </p>

              <div className="w-16 h-px bg-accent/40 mb-6" />

              <div className="flex flex-wrap gap-3 mb-10">
                <Link href="#traditions"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-black font-semibold text-[13px] rounded hover:opacity-90 transition-opacity">
                  Shop Heritage <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="#traditions"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white font-medium text-[13px] rounded hover:border-accent/50 transition-colors">
                  Explore Culture
                </Link>
              </div>

              {/* Certification pills */}
              <div className="flex flex-wrap gap-2">
                {["22KT BIS Hallmarked", "IGI Certified", "Handcrafted in Uttarakhand", "Free Insured Delivery"].map((tag) => (
                  <span key={tag} className="text-[11px] px-3 py-1.5 rounded-full border border-accent/30 text-accent/80 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Heritage stats card */}
            <div className="hidden lg:block">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded p-8">
                <p className="text-[10px] tracking-[0.25em] uppercase text-accent font-semibold mb-6">Heritage by Numbers</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { n: "22KT", l: "BIS Hallmark Gold", icon: "🥇" },
                    { n: "40+", l: "Pahadi Karigars", icon: "🏔️" },
                    { n: "5", l: "Cultural Traditions", icon: "✦" },
                    { n: "2026", l: "Est. in Uttarakhand", icon: "🌿" },
                  ].map((s) => (
                    <div key={s.l} className="bg-white/5 rounded-sm p-4 border border-white/8">
                      <span className="text-xl">{s.icon}</span>
                      <p className="font-serif text-2xl font-bold text-white mt-2">{s.n}</p>
                      <p className="text-[11px] text-white/50 mt-1">{s.l}</p>
                    </div>
                  ))}
                </div>
                {/* Mountain range illustration */}
                <div className="border-t border-white/10 pt-5">
                  <svg viewBox="0 0 400 80" className="w-full opacity-30">
                    <polyline points="0,80 60,20 120,50 180,5 240,35 300,15 360,45 400,25 400,80"
                      fill="#c9a84c" fillOpacity="0.15" stroke="#c9a84c" strokeWidth="1.5" />
                  </svg>
                  <p className="text-[11px] text-white/30 text-center -mt-2">Kumaon · Garhwal · Himalaya</p>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <span className="text-[10px] tracking-widest uppercase text-white/30">Scroll</span>
            <ChevronDown className="w-4 h-4 text-white/30" />
          </div>
        </section>

        {/* ══ WHY GOLD STRIP ══════════════════════════════════════════════════ */}
        <section className="bg-accent py-4">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-12">
              {[
                { icon: Shield, text: "BIS Hallmarked — Every Piece" },
                { icon: Star, text: "22KT & 18KT Pure Gold" },
                { icon: Mountain, text: "Pahadi Karigar Handcrafted" },
                { icon: Sparkles, text: "Certificate of Authenticity" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-black/70" />
                  <span className="text-[12px] font-semibold text-black/80 tracking-wide">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SHOP BY TRADITION ══════════════════════════════════════════════ */}
        <section id="traditions" className="py-16 lg:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            {/* Section header */}
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="w-12 h-px bg-accent/40" />
                <span className="text-[11px] tracking-[0.28em] uppercase text-accent font-semibold">Cultural Heritage</span>
                <span className="w-12 h-px bg-accent/40" />
              </div>
              <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground mb-4">
                Shop by Tradition
              </h2>
              <p className="text-muted-foreground text-[15px] max-w-2xl mx-auto leading-relaxed">
                Each tradition tells a story of the mountains — of the women who wore these ornaments to temples,
                weddings, and festivals across Uttarakhand for centuries.
              </p>
            </div>

            {/* Tradition cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
              {traditions.map((trad, i) => (
                <div key={trad.id}
                  onClick={() => setActiveTradition(activeTradition === trad.id ? null : trad.id)}
                  className={`cursor-pointer rounded-sm border p-6 transition-all duration-300 ${trad.accent} hover:shadow-md hover:-translate-y-0.5 ${activeTradition === trad.id ? "ring-2 ring-accent" : ""}`}>

                  {/* Top */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-sm bg-white/70 flex items-center justify-center text-2xl shadow-sm">
                      {trad.icon}
                    </div>
                    <span className={`text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/60 ${trad.accentText}`}>
                      {trad.tag}
                    </span>
                  </div>

                  {/* Name */}
                  <p className="text-[11px] tracking-widest text-muted-foreground mb-1">{trad.hindi}</p>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">{trad.name}</h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">{trad.desc}</p>

                  {/* Pieces */}
                  <div className="text-[11px] text-foreground/50 font-medium mb-3">{trad.pieces}</div>

                  {/* Story accordion */}
                  <StoryAccordion story={trad.story} title={trad.name} />

                  {/* CTA */}
                  <div className="mt-4 pt-4 border-t border-black/5">
                    <Link href="/shop?category=gold"
                      onClick={(e) => e.stopPropagation()}
                      className={`inline-flex items-center gap-1.5 text-[12px] font-semibold ${trad.accentText} hover:underline`}>
                      Browse {trad.name} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Full tradition explore banner */}
            <div className="mt-4 bg-gradient-to-r from-amber-900/8 via-accent/5 to-amber-900/8 border border-accent/20 rounded-sm p-8 text-center">
              <p className="font-serif text-2xl font-semibold text-foreground mb-2">
                Can't decide? Explore all six traditions together.
              </p>
              <p className="text-[14px] text-muted-foreground mb-5">
                Our Heritage edit brings together Nath, Guloband, Pauchi, Hansuli, Maangtika, Mangalsutra, and Jhumka — curated by our karigars.
              </p>
              <Link href="/collections/heritage"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-foreground text-background font-medium text-[13px] rounded hover:opacity-85 transition-opacity">
                Open Heritage Collection <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ══ GOLD PRODUCTS GRID ══════════════════════════════════════════════ */}
        <section className="py-16 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-3">
                <span className="w-10 h-px bg-accent/40" />
                <span className="text-[11px] tracking-[0.22em] uppercase text-accent font-semibold">BIS Hallmarked · 22KT & 18KT</span>
                <span className="w-10 h-px bg-accent/40" />
              </div>
              <h2 className="font-serif text-3xl font-semibold text-foreground mb-2">All Gold Jewellery</h2>
              <p className="text-muted-foreground text-[14px]">{goldProducts.length} pieces — every one certified</p>
            </div>

            {goldProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {goldProducts.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <span className="text-3xl">🥇</span>
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">Gold Collection Coming Soon</h3>
                <p className="text-muted-foreground text-[14px] mb-5">Our karigars are crafting your pieces. Sign up to be notified.</p>
                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-[13px] font-medium rounded">
                  Notify Me
                </Link>
              </div>
            )}

            <div className="text-center mt-10">
              <Link href="/shop?category=gold"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-border text-foreground text-[13px] font-medium rounded hover:border-accent/40 hover:text-accent transition-colors">
                View All Gold Jewellery <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ══ KARIGAR STORY ══════════════════════════════════════════════════ */}
        <section className="py-16 lg:py-20 bg-background border-t border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[10px] tracking-[0.28em] uppercase text-accent font-semibold">Pahadi Karigar</span>
                <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mt-2 mb-4 leading-snug">
                  Every piece is made by<br />hands that have made<br />gold speak for generations.
                </h2>
                <p className="text-[15px] text-muted-foreground leading-relaxed mb-5">
                  Our karigars are Sonar and Tamta families from the hills of Srinagar Garhwal and Pithoragarh —
                  masters of filigree, hand-engraving, and traditional Pahadi goldsmithing.
                  They learned from their fathers. Their fathers learned from theirs.
                </p>
                <p className="text-[15px] text-muted-foreground leading-relaxed mb-7">
                  When you wear a House of Nanda piece, you wear that lineage.
                </p>
                <Link href="/about" className="inline-flex items-center gap-2 text-[13px] font-semibold text-accent hover:underline">
                  Read the full story <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              {/* Visual quote block */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded p-8 lg:p-10">
                <div className="text-5xl font-serif text-accent/30 mb-2">&ldquo;</div>
                <p className="font-serif text-lg lg:text-xl text-foreground/80 leading-relaxed italic mb-6">
                  Inspired by the traditional Guloband worn by Kumaoni women,
                  this necklace blends heritage with modern elegance —
                  crafted for the woman who carries her roots wherever she goes.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center">
                    <span className="font-serif font-bold text-accent text-sm">AN</span>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-foreground">Harsh Vardhan Pandey</p>
                    <p className="text-[11px] text-muted-foreground">Founder, House of Nanda</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
