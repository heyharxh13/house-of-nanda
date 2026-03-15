import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CartDrawer from "@/components/cart-drawer"
import { Shield, Droplets, Package, RefreshCw } from "lucide-react"

export const metadata = { title: "Jewellery Care Guide | House of Nanda" }

const careGuides = [
  {
    icon: Shield,
    metal: "Gold Jewellery",
    subtitle: "22KT & 18KT BIS Hallmarked",
    color: "bg-amber-50 border-amber-100",
    accentColor: "text-amber-600",
    tips: [
      "Store in the soft pouch or box provided — separately from other jewellery to prevent scratches.",
      "Remove before swimming, bathing, exercising, or applying perfume, lotion, or hairspray.",
      "Clean with a soft, dry cloth after wearing. For deeper cleaning, use a few drops of mild soap in warm water and a soft toothbrush. Rinse and pat dry.",
      "Avoid chlorine, bleach, and household cleaning chemicals — they can permanently discolour gold.",
      "22KT gold is softer than 18KT — handle with extra care. Avoid bending or applying pressure.",
      "For hallmarked pieces, the BIS HUID number on your piece can be verified anytime on the BIS CARE app.",
    ],
  },
  {
    icon: Droplets,
    metal: "Silver Jewellery",
    subtitle: "925 Sterling Silver",
    color: "bg-gray-50 border-gray-100",
    accentColor: "text-gray-500",
    tips: [
      "Tarnishing is natural and normal for all 925 silver — it's a sign of genuine silver. It can easily be reversed.",
      "Store in an airtight zip-lock bag when not wearing — this is the single most effective way to slow tarnishing.",
      "Paradoxically, wearing silver daily slows tarnishing — skin oils provide a natural protective layer.",
      "Clean tarnish with a silver polishing cloth (included with your order). For heavier tarnish: warm water, mild dish soap, soft toothbrush, rinse, dry immediately.",
      "Avoid rubber bands, rubber gloves, and newspapers — they accelerate tarnishing.",
      "Oxidised silver pieces are intentionally darkened — do not attempt to remove the oxidation, it is part of the design.",
    ],
  },
  {
    icon: Shield,
    metal: "Lab Grown Diamond Jewellery",
    subtitle: "IGI Certified",
    color: "bg-blue-50 border-blue-100",
    accentColor: "text-blue-600",
    tips: [
      "Lab grown diamonds are identical to mined diamonds in hardness and composition — they are extremely durable.",
      "Soak in warm water with a few drops of mild dish soap. Gently scrub around the stone and setting with a soft toothbrush. Rinse thoroughly and pat dry.",
      "Store separately to prevent diamonds from scratching other jewellery or each other.",
      "Avoid ultrasonic cleaners for prong-set stones — the vibration can loosen prongs over time.",
      "Have prong-set diamond jewellery professionally inspected every 12-18 months to ensure settings remain secure.",
      "Your IGI certificate is your diamond's identity document — store it safely. We can help you get a replacement if lost.",
    ],
  },
  {
    icon: Package,
    metal: "Storage & Gifting",
    subtitle: "Keeping Your Jewellery Safe",
    color: "bg-green-50 border-green-100",
    accentColor: "text-green-600",
    tips: [
      "Each House of Nanda piece ships in a premium branded box with a soft inner pouch — use these for storage.",
      "Do not store jewellery in direct sunlight or near heat sources — this can fade certain finishes.",
      "A silica gel packet in your jewellery box helps absorb moisture and slows tarnishing on silver.",
      "For travel, use a fabric jewellery roll with separate compartments to prevent tangling and scratching.",
      "Necklaces and chains: clasp them before storing to prevent tangling. Lay flat or hang vertically.",
      "Long-term storage: wrap in acid-free tissue paper inside an airtight box in a cool, dry place.",
    ],
  },
]

export default function CarePage() {
  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <div className="bg-secondary border-b border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
            <div className="label-rule mb-3"><span className="text-[11px] tracking-[0.22em] uppercase text-accent font-medium px-4">Care Guide</span></div>
            <h1 className="font-serif text-4xl font-semibold text-foreground mt-1 mb-2">Jewellery Care & Maintenance</h1>
            <p className="text-muted-foreground text-[15px] max-w-xl">Properly cared for, your House of Nanda jewellery will last generations. Here's how.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-16 space-y-8">
          {careGuides.map((guide) => (
            <div key={guide.metal} className={`rounded-2xl border p-6 lg:p-8 ${guide.color}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center`}>
                  <guide.icon className={`w-5 h-5 ${guide.accentColor}`} />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-semibold text-foreground">{guide.metal}</h2>
                  <p className="text-[12px] text-muted-foreground">{guide.subtitle}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {guide.tips.map((tip, i) => (
                  <div key={i} className="flex gap-3 bg-white/60 rounded-lg p-4">
                    <span className={`text-[11px] font-bold mt-0.5 flex-shrink-0 ${guide.accentColor}`}>{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-[13px] text-foreground/80 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Polishing service CTA */}
          <div className="bg-foreground text-background rounded-2xl p-8 text-center">
            <RefreshCw className="w-8 h-8 text-accent mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-semibold mb-2">Free Lifetime Polishing</h3>
            <p className="text-background/70 text-[14px] mb-5 max-w-md mx-auto">All House of Nanda pieces qualify for a free professional polish and clean. Send it back to us anytime — we'll return it looking brand new.</p>
            <a href="/contact" className="inline-flex items-center px-6 py-3 bg-accent text-accent-foreground text-[13px] font-medium rounded-lg hover:opacity-90 transition-opacity">
              Contact Us to Book
            </a>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
