import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function BrandStory() {
  return (
    <section className="py-20 lg:py-28 bg-stone-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — Editorial photo */}
          <div className="relative aspect-[4/5] overflow-hidden order-2 lg:order-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/collection-silver.jpg"
              alt="House of Nanda silver jewellery — handcrafted in Uttarakhand"
              className="w-full h-full object-cover"
            />
            {/* Overlay label */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-stone-900 to-transparent px-6 pb-6 pt-16">
              <p className="text-[9px] tracking-[0.4em] uppercase text-stone-400 font-medium">Est. 2025</p>
              <p className="font-serif text-lg text-white mt-1">House of Nanda</p>
            </div>
          </div>

          {/* Right — Story */}
          <div className="order-1 lg:order-2 space-y-8">
            <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400 font-medium">Our Story</p>
            
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.8rem)] font-semibold leading-[1.05] text-white">
              Made in the<br/>mountains. Built<br/>to&nbsp;last&nbsp;forever.
            </h2>

            <div className="space-y-5 text-[15px] text-stone-300 leading-relaxed font-light max-w-md">
              <p>
                We started House of Nanda because beautiful jewellery shouldn't cost a fortune or feel fake. We work with silversmiths and goldsmiths in Uttarakhand who've been practicing their craft for generations.
              </p>
              <p>
                Every piece is certified — 925 sterling silver or 22KT BIS hallmarked gold. No silver-plating. No hidden markups. Just honest jewellery at honest prices.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-stone-700">
              {[
                { n: "925", l: "Silver standard" },
                { n: "100%", l: "Certified materials" },
                { n: "3–5", l: "Day delivery" },
              ].map(s => (
                <div key={s.n}>
                  <p className="font-serif text-2xl font-semibold text-white">{s.n}</p>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-stone-500 mt-1">{s.l}</p>
                </div>
              ))}
            </div>

            <Link href="/about"
              className="group inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-white border-b border-stone-600 hover:border-white pb-0.5 transition-colors">
              About the studio
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
