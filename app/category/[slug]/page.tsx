import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CartDrawer from "@/components/cart-drawer"
import ProductCard from "@/components/product-card"
import { categories, menCategories, products } from "@/lib/data"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

const allCategories = [...categories, ...menCategories]

const categoryProductMap: Record<string, (p: typeof products[0]) => boolean> = {
  necklaces: (p) => p.name.toLowerCase().includes("necklace") || p.name.toLowerCase().includes("pendant") || p.name.toLowerCase().includes("chain") || p.name.toLowerCase().includes("hansuli") || p.name.toLowerCase().includes("galobandh"),
  rings: (p) => p.name.toLowerCase().includes("ring"),
  earrings: (p) => p.name.toLowerCase().includes("earring") || p.name.toLowerCase().includes("stud") || p.name.toLowerCase().includes("jhumka"),
  bracelets: (p) => p.name.toLowerCase().includes("bracelet") || p.name.toLowerCase().includes("bangle") || p.name.toLowerCase().includes("kada") || p.name.toLowerCase().includes("pahunchi"),
  anklets: (p) => p.name.toLowerCase().includes("anklet"),
  "men-rings": (p) => p.gender === "men" && p.name.toLowerCase().includes("ring"),
  "men-chains": (p) => p.gender === "men" && (p.name.toLowerCase().includes("chain") || p.name.toLowerCase().includes("pendant")),
  "men-bracelets": (p) => p.gender === "men" && (p.name.toLowerCase().includes("bracelet") || p.name.toLowerCase().includes("kada")),
  "men-earrings": (p) => p.gender === "men" && p.name.toLowerCase().includes("stud"),
  "maangtika": (p) => p.name.toLowerCase().includes("maangtika"),
  "mangalsutra": (p) => p.name.toLowerCase().includes("mangalsutra"),
}

export async function generateStaticParams() {
  return allCategories.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const cat = allCategories.find((c) => c.slug === slug)
  if (!cat) return { title: "Category Not Found" }
  return { title: `${cat.name} | House of Nanda`, description: `Shop ${cat.name} in BIS Hallmark gold, 925 silver, and IGI lab diamonds.` }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cat = allCategories.find((c) => c.slug === slug)
  if (!cat) notFound()

  const filterFn = categoryProductMap[slug]
  const catProducts = filterFn ? products.filter(filterFn) : []

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <section className="bg-secondary border-b border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
            <p className="text-[10px] tracking-[0.25em] uppercase text-accent mb-1">{cat.pahadi_name}</p>
            <h1 className="font-serif text-4xl font-semibold text-foreground mb-2">{cat.name}</h1>
            <p className="text-[13px] text-muted-foreground">{cat.count} · {catProducts.length} showing</p>
          </div>
        </section>
        <section className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
          {catProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {catProducts.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-20">New pieces arriving soon.</p>
          )}
        </section>
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
