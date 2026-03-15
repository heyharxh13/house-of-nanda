import { Mountain, Leaf, ShieldCheck, Sparkles } from "lucide-react"
import Link from "next/link"

const values = [
  {
    icon: Mountain,
    title: "Himalayan Heritage",
    desc: "Every design traces its inspiration to Uttarakhand's living craft traditions — Garhwali goldwork, Kumaoni silversmithing.",
  },
  {
    icon: Leaf,
    title: "Artisan Craftsmanship",
    desc: "Made by skilled karigars using techniques passed down across generations — filigree, granulation, hand-engraving.",
  },
  {
    icon: ShieldCheck,
    title: "BIS & IGI Certified",
    desc: "Every gold piece carries BIS hallmark. Every lab diamond carries IGI certification. Non-negotiable.",
  },
  {
    icon: Sparkles,
    title: "Ethical Sourcing",
    desc: "Responsibly sourced materials. Zero-conflict lab grown diamonds. Transparent supply chain, always.",
  },
]

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-16 lg:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="label-rule mb-4">
              <span className="text-[11px] tracking-[0.22em] uppercase text-accent font-medium pr-4">
                Our Philosophy
              </span>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mb-5">
              Where tradition meets tomorrow
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 max-w-md text-[15px]">
              House of Nanda was born from a belief that jewellery should carry
              meaning — not just value. We honour the timeless craft of Indian
              goldsmithing while embracing modern sensibility and ethical sourcing.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-md text-[15px]">
              Inspired by the jewellery traditions of Uttarakhand — the land of
              temples, rivers, and master craftsmen — each piece is a quiet nod
              to a culture worth preserving.
            </p>
            <Link
              href="/#heritage"
              className="inline-flex items-center px-7 py-3 border border-border text-foreground text-[13px] font-medium tracking-wide rounded hover:border-accent/40 hover:text-accent transition-colors"
            >
              Discover Our Story
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-background rounded-xl p-6 border border-border hover:border-accent/25 hover:shadow-sm transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <value.icon className="w-4.5 h-4.5 text-accent" />
                </div>
                <h3 className="text-[13px] font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
