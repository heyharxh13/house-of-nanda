import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CartDrawer from "@/components/cart-drawer"
import ProductCard from "@/components/product-card"
import { collectionsData, getProductsByCollection, products } from "@/lib/data"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

export async function generateStaticParams() {
  return collectionsData.filter(c => c.id !== 'diamonds').map((c) => ({ id: c.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const col = collectionsData.find((c) => c.id === id)
  if (!col) return { title: "Collection Not Found" }
  return { title: `${col.title} | House of Nanda`, description: col.desc }
}

export default async function CollectionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const col = collectionsData.find((c) => c.id === id)
  if (!col) notFound()

  const collectionProducts = id === "heritage"
    ? products.filter((p) => p.collection === "heritage")
    : id === "men"
    ? products.filter((p) => p.gender === "men")
    : id === "gifting"
    ? products.filter((p) => p.badge === "Bestseller" || p.badge === "Limited")
    : products.filter((p) => p.category === id)

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        {/* Hero banner */}
        <section className="bg-secondary border-b border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14">
            <span className="text-[10px] tracking-[0.25em] uppercase text-accent font-medium">{col.badge}</span>
            <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground mt-2 mb-3">{col.title}</h1>
            <p className="text-[13px] tracking-wider text-accent mb-4">{col.subtitle}</p>
            <p className="text-muted-foreground text-[15px] max-w-xl leading-relaxed">{col.desc}</p>
            <div className="flex items-center gap-3 mt-5">
              <span className="px-3 py-1.5 bg-card border border-border rounded-full text-[11px] font-medium text-foreground">{col.accent}</span>
              <span className="text-[13px] text-muted-foreground">{collectionProducts.length} pieces</span>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
          {collectionProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {collectionProducts.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground">New pieces arriving soon.</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
