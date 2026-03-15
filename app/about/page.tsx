import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CartDrawer from "@/components/cart-drawer"
import { Mountain, Leaf, ShieldCheck, Users, Award, Heart } from "lucide-react"

export const metadata = { title: "Our Story | House of Nanda", description: "The story behind House of Nanda — Pahadi jewellery born in Uttarakhand." }

const timeline = [
  {  year: "2025", title: "Brand Foundation", desc: " House of Nanda founded in Kumaon, Uttarakhand.Mission: revive traditional Pahadi jewellery craftsmanship.First partnerships with local karigars (Sonar & Tamta families)." },
  {  year: "2026", title: "Design Research Phase", desc: "Documentation of traditional jewellery like Hansuli, Nathuli, Galobandh, Pahunchi.Study of historical temple jewellery and Kumaoni wedding ornaments.First prototypes designed combining tradition + modern wearability." },
  {  year: "2026", title: "First artisan Network", desc: "Onboarding 5–10 local craftsmen.Establishing ethical production with fair wages.Creation of first handcrafted sample pieces." },
  {  year: "2027", title: "Official Brand Launch", desc: "Launch of House of Nanda website.First Heritage Collection released online.Orders begin from customers across India." },
]

const values = [
  { icon: Mountain, title: "Born in Dev Bhoomi", desc: "We are not inspired by Uttarakhand. We are from Uttarakhand. Our studio, our karigars, our designs — all rooted in the mountains." },
  { icon: ShieldCheck, title: "Uncompromising Certification", desc: "Every piece is BIS hallmarked or IGI certified. We believe customers deserve proof, not promises." },
  { icon: Users, title: "Pahadi Karigars", desc: "We work directly with Sonar and craftsmen from Garhwal and Pithoragarh — fair wages, full credit, long partnerships." },
  { icon: Leaf, title: "Ethical by Design", desc: "Lab grown diamonds, responsibly sourced silver, no conflict materials. Ethics is not our marketing — it's our non-negotiable." },
  { icon: Award, title: "Culture, Not Costume", desc: "We don't make 'ethnic-inspired' jewellery. We make authentic Pahadi pieces — documented, researched, and made with respect." },
  { icon: Heart, title: "15-Day Promise", desc: "We stand behind every piece. 15-day returns, free size exchanges, lifetime polishing service. Our relationship doesn't end at checkout." },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-background">
        {/* Hero */}
        <section className="bg-foreground text-background py-20 lg:py-28">
          <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
            <span className="text-[11px] tracking-[0.25em] uppercase text-accent font-medium">Our Story</span>
            <h1 className="font-serif text-4xl lg:text-6xl font-semibold mt-3 mb-6 leading-tight">
              A brand born from the mountains,<br />not the market.
            </h1>
            <p className="text-background/70 text-[16px] leading-relaxed max-w-2xl mx-auto">
              House of Nanda was founded in Dev Bhoomi — the sacred land of Uttarakhand — 
              with one belief: that Pahadi jewellery deserves to stand alongside the finest in the world.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div>
                <div className="label-rule mb-4">
                  <span className="text-[11px] tracking-[0.22em] uppercase text-accent font-medium pr-4">The Story</span>
                </div>
                <h2 className="font-serif text-3xl font-semibold text-foreground mb-5">
                  The Galobandh, the Jhumka, the Hansuli — these are not folk pieces.
                </h2>
                <div className="space-y-4 text-[15px] text-muted-foreground leading-relaxed">
                  <p>They are the high jewellery of an ancient Himalayan civilisation — worn by the women of Garhwal and Kumaon for centuries, passed from mother to daughter, blessed at temples, worn at births and weddings and festivals.</p>
                  <p>And yet, for decades, this craft was disappearing. The karigars — Sonar and Tamta families with centuries of knowledge — were being forced to copy mass-market designs from Jaipur and Mumbai because there was no market for their traditional work.</p>
                  <p>House of Nanda was founded to change that. We work exclusively with these craftsmen, document their techniques, preserve their designs, and bring their work to customers across India who are ready to wear something real.</p>
                  <p>Every piece we sell has a story. Every piece is made with hands that learned from hands that learned from hands. This is not just jewellery. This is living culture.</p>
                </div>
              </div>
              <div className="space-y-4">
                {timeline.map((t) => (
                  <div key={t.year} className="flex gap-5 p-5 bg-secondary rounded-xl border border-border">
                    <span className="font-serif text-2xl font-semibold text-accent flex-shrink-0 w-14">{t.year}</span>
                    <div>
                      <h4 className="text-[13px] font-semibold text-foreground mb-1">{t.title}</h4>
                      <p className="text-[13px] text-muted-foreground leading-relaxed">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-secondary border-t border-b border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <div className="label-rule mb-3">
                <span className="text-[11px] tracking-[0.22em] uppercase text-accent font-medium px-4">What We Stand For</span>
              </div>
              <h2 className="font-serif text-3xl font-semibold text-foreground">Our Values</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {values.map((v) => (
                <div key={v.title} className="bg-card border border-border rounded-xl p-6 hover:border-accent/25 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <v.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-[14px] font-semibold text-foreground mb-2">{v.title}</h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
