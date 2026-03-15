"use client"

import { useState, useMemo } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CartDrawer from "@/components/cart-drawer"
import ProductCard from "@/components/product-card"
import { products } from "@/lib/data"
import { SlidersHorizontal, X } from "lucide-react"

const categoryOptions = ["all", "gold", "silver"]
const genderOptions = ["all", "women", "men"]
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹2,000", min: 0, max: 2000 },
  { label: "₹2,000 – ₹5,000", min: 2000, max: 5000 },
  { label: "₹5,000 – ₹10,000", min: 5000, max: 10000 },
  { label: "Above ₹10,000", min: 10000, max: Infinity },
]
const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Discount", value: "discount" },
]

export default function ShopPage() {
  const [category, setCategory] = useState("all")
  const [gender, setGender] = useState("all")
  const [priceRange, setPriceRange] = useState(0)
  const [sort, setSort] = useState("featured")
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = useMemo(() => {
    let result = [...products]
    if (category !== "all") result = result.filter((p) => p.category === category)
    if (gender !== "all") result = result.filter((p) => p.gender === gender || p.gender === "unisex")
    const range = priceRanges[priceRange]
    result = result.filter((p) => p.price >= range.min && p.price <= range.max)
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price)
    else if (sort === "price-desc") result.sort((a, b) => b.price - a.price)
    else if (sort === "discount") result.sort((a, b) => b.discount - a.discount)
    return result
  }, [category, gender, priceRange, sort])

  const activeFiltersCount = (category !== "all" ? 1 : 0) + (gender !== "all" ? 1 : 0) + (priceRange !== 0 ? 1 : 0)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-secondary border-b border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
            <p className="text-[11px] tracking-[0.2em] uppercase text-accent font-medium mb-1">All Jewellery</p>
            <h1 className="font-serif text-3xl lg:text-4xl font-semibold text-foreground">Shop All</h1>
            <p className="text-muted-foreground mt-2 text-[14px]">{filtered.length} pieces</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
          {/* Filter bar */}
          <div className="flex flex-wrap items-center gap-3 mb-8 pb-6 border-b border-border">
            {/* Category */}
            <div className="flex items-center gap-2">
              {categoryOptions.map((c) => (
                <button key={c} onClick={() => setCategory(c)}
                  className={`px-4 py-1.5 rounded-full text-[12px] font-medium border transition-all ${category === c ? "bg-foreground text-background border-foreground" : "border-border text-foreground/60 hover:text-foreground"}`}>
                  {c === "all" ? "All Types" : c.charAt(0).toUpperCase() + c.slice(1)}
                </button>
              ))}
            </div>
            <span className="w-px h-5 bg-border" />
            {/* Gender */}
            <div className="flex items-center gap-2">
              {genderOptions.map((g) => (
                <button key={g} onClick={() => setGender(g)}
                  className={`px-4 py-1.5 rounded-full text-[12px] font-medium border transition-all ${gender === g ? "bg-foreground text-background border-foreground" : "border-border text-foreground/60 hover:text-foreground"}`}>
                  {g === "all" ? "All" : g.charAt(0).toUpperCase() + g.slice(1)}
                </button>
              ))}
            </div>
            <span className="w-px h-5 bg-border hidden md:block" />
            {/* Price */}
            <select value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))}
              className="hidden md:block px-3 py-1.5 border border-border rounded-lg text-[12px] text-foreground bg-background focus:outline-none focus:border-accent/50">
              {priceRanges.map((r, i) => <option key={i} value={i}>{r.label}</option>)}
            </select>
            {/* Sort */}
            <div className="ml-auto flex items-center gap-2">
              {activeFiltersCount > 0 && (
                <button onClick={() => { setCategory("all"); setGender("all"); setPriceRange(0) }}
                  className="flex items-center gap-1 px-3 py-1.5 text-[12px] text-muted-foreground hover:text-foreground border border-border rounded-lg">
                  <X className="w-3 h-3" /> Clear ({activeFiltersCount})
                </button>
              )}
              <select value={sort} onChange={(e) => setSort(e.target.value)}
                className="px-3 py-1.5 border border-border rounded-lg text-[12px] text-foreground bg-background focus:outline-none focus:border-accent/50">
                {sortOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No products match your filters.</p>
              <button onClick={() => { setCategory("all"); setGender("all"); setPriceRange(0) }}
                className="mt-4 px-6 py-2.5 bg-foreground text-background rounded-lg text-[13px] font-medium">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
