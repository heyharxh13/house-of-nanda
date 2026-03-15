import {fetchProductBySlug, fetchRelatedProducts, fetchProducts } from "@/lib/api"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import ProductDetailClient from "./product-detail-client"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CartDrawer from "@/components/cart-drawer"
import ProductReviews from '@/components/product-reviews'

export async function generateStaticParams() {
  const products = await fetchProducts()
  return products.map((product: any) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = await fetchProductBySlug(slug) as any

  if (!product || product.error) return { title: 'Product Not Found | House of Nanda' }

  return {
    title: `${product.name} | House of Nanda`,
    description: product.description ?? '',
    openGraph: {
      title: `${product.name ?? 'Product'} | House of Nanda`,
      description: product.description ?? '',
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await fetchProductBySlug(slug)
  if (!product) notFound()

  const related =await fetchRelatedProducts(product.id)

  return (
    <>
      <Navbar />
      <ProductDetailClient product={product} related={related as any} />
      <ProductReviews productId={product.id} />
      <Footer />
      <CartDrawer />
    </>
  )
}
