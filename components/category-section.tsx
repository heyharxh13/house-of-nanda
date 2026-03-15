"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { categories, menCategories } from "@/lib/data"
import { useEffect, useRef, useState } from "react"

function CategoryCard({ cat, index }: { cat: typeof categories[0]; index: number }) {
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
    <div ref={ref}
      className={`group transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${index * 80}ms` }}>
      <Link href={`/category/${cat.slug}`} className="block">
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
          <Image src={cat.image} alt={cat.name} fill
            unoptimized className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 20vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-[9px] tracking-[0.25em] uppercase text-white/60 mb-1">{cat.pahadi_name}</p>
            <h3 className="font-serif text-base font-semibold text-white mb-1">{cat.name}</h3>
            <p className="text-[11px] text-white/60 mb-2.5">{cat.count}</p>
            <span className="inline-flex items-center gap-1 text-[11px] text-white/80 font-medium group-hover:gap-2 transition-all">
              Shop <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default function CategorySection() {
  return (
    <section id="categories" className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Women's */}
        <div className="mb-14">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="label-rule mb-2">
                <span className="text-[11px] tracking-[0.22em] uppercase text-accent font-medium pr-4">Women's</span>
              </div>
              <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground">Shop by Category</h2>
            </div>
            <Link href="/shop?gender=women" className="hidden md:flex items-center gap-1.5 text-[12px] text-accent font-medium hover:gap-2.5 transition-all">
              View all women's <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat, i) => <CategoryCard key={cat.slug} cat={cat} index={i} />)}
          </div>
        </div>

        {/* Men's */}
        <div>
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="label-rule mb-2">
                <span className="text-[11px] tracking-[0.22em] uppercase text-accent font-medium pr-4">Men's</span>
              </div>
              <h2 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground">Men's Categories</h2>
            </div>
            <Link href="/men" className="hidden md:flex items-center gap-1.5 text-[12px] text-accent font-medium hover:gap-2.5 transition-all">
              View all men's <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {menCategories.map((cat, i) => <CategoryCard key={cat.slug} cat={cat} index={i} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
