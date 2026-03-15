// ─── Cart Service — House of Nanda ───────────────────────────────────────────
// A thin service layer wrapping cart operations with business logic,
// validation, and analytics hooks.

import type { Product } from "@/lib/data"
import type { CartItem } from "@/context/cart-context"

export interface CartSummary {
  items: CartItem[]
  subtotal: number
  shippingFree: boolean
  shippingThreshold: number
  amountToFreeShipping: number
  totalItems: number
  estimatedDelivery: string
}

export interface CheckoutPayload {
  items: { productId: string; slug: string; name: string; qty: number; price: number }[]
  subtotal: number
  currency: "INR"
  orderNote?: string
}

// Free shipping threshold
const FREE_SHIPPING_THRESHOLD = 999

export function getCartSummary(items: CartItem[]): CartSummary {
  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0)
  const totalItems = items.reduce((s, i) => s + i.quantity, 0)
  const shippingFree = subtotal >= FREE_SHIPPING_THRESHOLD || totalItems === 0
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)

  return {
    items,
    subtotal,
    shippingFree,
    shippingThreshold: FREE_SHIPPING_THRESHOLD,
    amountToFreeShipping,
    totalItems,
    estimatedDelivery: getEstimatedDelivery(items),
  }
}

function getEstimatedDelivery(items: CartItem[]): string {
  // Gold MTO orders take 3–4 weeks; all others 5–7 business days
  const hasMTO = items.some(i => i.product.category === "gold" && i.product.price === 0)
  if (hasMTO) return "3–4 weeks (bespoke)"
  return "5–7 business days"
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function buildCheckoutPayload(items: CartItem[], orderNote?: string): CheckoutPayload {
  return {
    items: items.map(i => ({
      productId: i.product.id,
      slug: i.product.slug,
      name: i.product.name,
      qty: i.quantity,
      price: i.product.price,
    })),
    subtotal: items.reduce((s, i) => s + i.product.price * i.quantity, 0),
    currency: "INR",
    orderNote,
  }
}

export function canAddToCart(product: Product): { allowed: boolean; reason?: string } {
  if (!product.inStock) return { allowed: false, reason: "Out of stock" }
  if (product.category === "gold" && product.price === 0)
    return { allowed: false, reason: "Enquire for bespoke order" }
  return { allowed: true }
}

// WhatsApp enquiry for bespoke / gold / out-of-stock items
export function buildWhatsAppUrl(product: Product, note?: string): string {
  const msg = encodeURIComponent(
    `Hi House of Nanda! I'm interested in: *${product.name}*` +
    (product.pahadi_name ? ` (${product.pahadi_name})` : "") +
    `\n\nMaterial: ${product.material}` +
    (note ? `\n\n${note}` : "") +
    `\n\nProduct page: https://houseofnanda.com/products/${product.slug}`
  )
  return `https://wa.me/919XXXXXXXXX?text=${msg}`
}
