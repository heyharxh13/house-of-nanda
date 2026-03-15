"use client"

import { useEffect, useRef, useState } from "react"

const heritageCards = [
  {
    number: "01",
    title: "Galobandh — The Bridal Necklace",
    region: "Garhwal, Uttarakhand",
    desc: "The Galobandh is the most sacred ornament a Pahadi bride wears — a layered gold necklace placed around her neck by her father during the wedding ritual. Families in Garhwal save for years to gift this piece, which is passed down across generations.",
  },
  {
    number: "02",
    title: "Aipan — Art Made Wearable",
    region: "Kumaon, Uttarakhand",
    desc: "Aipan is Kumaon's sacred folk art — geometric patterns drawn with rice paste on doorways during festivals. Only women make Aipan. Each symbol carries meaning: lotus for purity, chakra for energy. We translate these patterns onto sterling silver.",
  },
  {
    number: "03",
    title: "Nanda Devi — The Patron Goddess",
    region: "Across Uttarakhand",
    desc: "Nanda Devi is Uttarakhand's presiding deity and highest peak at 7,816 metres. Her name means 'Bliss-Giver'. Every 12 years, thousands walk the Nanda Devi Raj Jat pilgrimage. Our most precious pieces bear her blessing.",
  },
  {
    number: "04",
    title: "Pahadi Karigars — The Makers",
    region: "Srinagar Garhwal · Pithoragarh",
    desc: "Uttarakhand's goldsmiths and silversmiths — the Sonar and Tamta communities — have practiced their craft for centuries. House of Nanda works directly with these artisans, ensuring fair wages and full cultural credit.",
  },
]

function HeritageCard({ card, index }: { card: typeof heritageCards[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8 hover:border-accent/25 hover:shadow-md transition-all duration-300 h-full">
        <div className="flex items-center justify-between mb-5">
          <span className="text-[11px] tracking-[0.2em] text-muted-foreground">{card.number}</span>
          {/* Subtle saffron accent dot */}
          <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
        </div>
        <h3 className="font-serif text-xl font-semibold text-foreground mb-1">{card.title}</h3>
        <p className="text-[11px] tracking-wide text-accent uppercase font-medium mb-4">{card.region}</p>
        {/* Thin gold rule — the only Uttarakhand visual accent */}
        <div className="accent-divider mb-4" />
        <p className="text-[14px] text-muted-foreground leading-relaxed">{card.desc}</p>
      </div>
    </div>
  )
}

export default function HeritageStory() {
  return (
    <section id="heritage" className="py-16 lg:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <div className="label-rule mb-4">
            <span className="text-[11px] tracking-[0.22em] uppercase text-accent font-medium px-4">
              Heritage
            </span>
          </div>
          <h2 className="font-serif text-3xl lg:text-5xl font-semibold text-foreground mb-5">
            The stories behind the jewellery
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed text-[15px]">
            House of Nanda draws from the living jewellery traditions of Uttarakhand — 
            documented, researched, and crafted with the respect each tradition deserves.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {heritageCards.map((card, i) => (
            <HeritageCard key={card.number} card={card} index={i} />
          ))}
        </div>

        {/* Pull quote — clean and premium */}
        <div className="mt-14 flex justify-center">
          <div className="max-w-2xl text-center px-8 py-8 border-t border-b border-border relative">
            {/* Accent corners — subtle geometric nod */}
            <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent/40" />
            <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent/40" />
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent/40" />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent/40" />
            <p className="font-serif text-lg lg:text-xl text-foreground leading-relaxed italic">
              &ldquo;We are not making ethnic-inspired jewellery. We are preserving 
              the real thing — authentic, documented, alive.&rdquo;
            </p>
            <p className="text-[12px] text-muted-foreground tracking-wider mt-4 uppercase">
              — House of Nanda
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
