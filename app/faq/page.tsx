"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CartDrawer from "@/components/cart-drawer"
import { faqData } from "@/lib/data"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border last:border-0">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full py-4 text-left gap-4">
        <span className="text-[14px] font-medium text-foreground">{q}</span>
        <ChevronDown className={cn("w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform", open && "rotate-180")} />
      </button>
      {open && <p className="pb-4 text-[14px] text-muted-foreground leading-relaxed">{a}</p>}
    </div>
  )
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(0)
  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <div className="bg-secondary border-b border-border">
          <div className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
            <div className="label-rule mb-3">
              <span className="text-[11px] tracking-[0.22em] uppercase text-accent font-medium px-4">Help Centre</span>
            </div>
            <h1 className="font-serif text-4xl font-semibold text-foreground mt-1 mb-2">Frequently Asked Questions</h1>
            <p className="text-muted-foreground text-[15px]">Everything you need to know about House of Nanda.</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {faqData.map((cat, i) => (
              <button key={i} onClick={() => setActiveCategory(i)}
                className={cn("px-4 py-2 rounded-full text-[12px] font-medium border transition-all", activeCategory === i ? "bg-foreground text-background border-foreground" : "border-border text-foreground/60 hover:text-foreground")}>
                {cat.category}
              </button>
            ))}
          </div>

          {/* Questions */}
          <div className="bg-card border border-border rounded-xl px-6">
            {faqData[activeCategory].questions.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} />
            ))}
          </div>

          {/* Still need help */}
          <div className="mt-10 bg-secondary border border-border rounded-xl p-8 text-center">
            <h3 className="font-serif text-xl font-semibold text-foreground mb-2">Still need help?</h3>
            <p className="text-muted-foreground text-[14px] mb-5">Our team typically responds within 2 hours on business days.</p>
            <a href="/contact" className="inline-flex items-center px-6 py-3 bg-foreground text-background text-[13px] font-medium rounded-lg hover:opacity-85 transition-opacity">
              Contact Us
            </a>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
