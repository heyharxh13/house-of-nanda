import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { collectionsData } from "@/lib/data"

export default function Collections() {
  return (
    <section id="collections" className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <div className="label-rule mb-3">
            <span className="text-[11px] tracking-[0.22em] uppercase text-accent font-medium px-4">Curated For You</span>
          </div>
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground mb-3">
            All Collections
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-[15px] leading-relaxed">
            Six worlds of jewellery — find yours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {collectionsData.map((col) => (
            <Link key={col.id} href={`/collections/${col.id}`}
              className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-accent/8 hover:border-accent/20 transition-all duration-300">
              <div className="p-6 lg:p-7">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-accent font-semibold">{col.badge}</span>
                    <h3 className="font-serif text-xl font-semibold text-foreground mt-1">{col.title}</h3>
                    <p className="text-[12px] text-muted-foreground mt-0.5">{col.subtitle}</p>
                  </div>
                  <span className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground group-hover:bg-accent/10 group-hover:border-accent/30 group-hover:text-accent transition-all">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
                <div className="accent-divider my-4" />
                <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">{col.desc}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-medium text-accent tracking-wide">{col.accent}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
