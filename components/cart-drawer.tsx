"use client"

import Image from "next/image"
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { getCartSummary, formatINR } from "@/lib/cart-service"
import { cn } from "@/lib/utils"
import Link from "next/link"
import CheckoutButton from './checkout-button'

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
  } = useCart()

  const summary = getCartSummary(items)

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[70] transition-all duration-400",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        style={{ background: "rgba(13,12,10,0.55)", backdropFilter: "blur(2px)" }}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-sm z-[80] flex flex-col transition-transform duration-350",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{ background: "#FAFAF7" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: "1px solid #E8E4DE" }}>
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-4 h-4" style={{ color: "#0D0C0A" }} />
            <h2 className="font-serif font-light" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "#0D0C0A", letterSpacing: "0.05em" }}>
              Your Bag
            </h2>
            {totalItems > 0 && (
              <span className="text-[9px] tracking-[0.25em] uppercase px-2 py-0.5 font-bold"
                style={{ background: "#B8965A", color: "white" }}>
                {totalItems}
              </span>
            )}
          </div>
          <button onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center transition-opacity hover:opacity-50">
            <X className="w-4 h-4" style={{ color: "#0D0C0A" }} />
          </button>
        </div>

        {/* Free shipping progress */}
        {items.length > 0 && !summary.shippingFree && (
          <div className="px-6 py-3" style={{ background: "#F4F2EF", borderBottom: "1px solid #E8E4DE" }}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[9px] tracking-[0.28em] uppercase font-bold" style={{ color: "#7A756C" }}>
                Free Shipping
              </p>
              <p className="text-[10px] font-semibold" style={{ color: "#B8965A" }}>
                {formatINR(summary.amountToFreeShipping)} away
              </p>
            </div>
            <div className="w-full h-0.5 rounded-full" style={{ background: "#E0DAD0" }}>
              <div className="h-0.5 rounded-full transition-all duration-500"
                style={{
                  background: "#B8965A",
                  width: `${Math.min(100, (totalPrice / summary.shippingThreshold) * 100)}%`
                }} />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 py-16">
              <div className="w-16 h-16 flex items-center justify-center mb-5"
                style={{ background: "#F0ECE5", border: "1px solid #E0DAD0" }}>
                <ShoppingBag className="w-6 h-6" style={{ color: "#C0B9AE" }} />
              </div>
              <p className="font-serif font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "#0D0C0A" }}>
                Your bag is empty
              </p>
              <p className="text-[12px] text-center mb-7" style={{ color: "#B0AAA0" }}>
                Discover our handcrafted jewellery collections
              </p>
              <button onClick={closeCart}
                className="group inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.22em] uppercase pb-px"
                style={{ color: "#B8965A", borderBottom: "1px solid rgba(184,150,90,0.35)" }}>
                Browse Collections <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="px-6 py-4 space-y-0">
              {items.map((item, i) => (
                <div key={item.product.id}
                  className="py-5 flex gap-4"
                  style={{ borderBottom: i < items.length - 1 ? "1px solid #F0ECE5" : "none" }}>

                  {/* Image */}
                  <Link href={`/products/${item.product.slug}`} onClick={closeCart}
                    className="relative flex-shrink-0 overflow-hidden"
                    style={{ width: 72, height: 96, background: "#F0ECE5" }}>
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="72px"
                      unoptimized
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[7.5px] tracking-[0.30em] uppercase font-semibold mb-1"
                      style={{ color: "#B8965A", opacity: 0.80 }}>
                      {item.product.material}
                    </p>
                    <h4 className="font-serif leading-tight mb-0.5" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#0D0C0A", fontWeight: 400 }}>
                      {item.product.name}
                    </h4>
                    <p className="text-[13px] font-semibold mt-1.5" style={{ color: "#0D0C0A" }}>
                      {formatINR(item.product.price)}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity */}
                      <div className="flex items-center" style={{ border: "1px solid #E0DAD0" }}>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center transition-colors hover:opacity-50">
                          <Minus className="w-3 h-3" style={{ color: "#7A756C" }} />
                        </button>
                        <span className="w-7 text-center text-[12px] font-medium" style={{ color: "#0D0C0A" }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center transition-colors hover:opacity-50">
                          <Plus className="w-3 h-3" style={{ color: "#7A756C" }} />
                        </button>
                      </div>

                      {/* Remove */}
                      <button onClick={() => removeFromCart(item.product.id)}
                        className="transition-opacity hover:opacity-50">
                        <Trash2 className="w-3.5 h-3.5" style={{ color: "#C0B9AE" }} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5" style={{ borderTop: "1px solid #E8E4DE", background: "#F8F5F0" }}>
            {/* Delivery estimate */}
            <p className="text-[9px] tracking-[0.28em] uppercase text-center mb-4" style={{ color: "#B0AAA0" }}>
              Estimated delivery: {summary.estimatedDelivery}
            </p>

            {/* Subtotal */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] tracking-[0.18em] uppercase font-bold" style={{ color: "#7A756C" }}>Subtotal</span>
              <span className="font-serif text-[20px] font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#0D0C0A" }}>
                {formatINR(totalPrice)}
              </span>
            </div>

            {summary.shippingFree ? (
              <p className="text-[9px] tracking-[0.25em] uppercase text-center mb-4" style={{ color: "#B8965A" }}>
                ✦ Free insured shipping included
              </p>
            ) : (
              <p className="text-[9px] text-center mb-4" style={{ color: "#B0AAA0" }}>
                Shipping calculated at checkout
              </p>
            )}

            <CheckoutButton
            amount={totalPrice}
            token={localStorage.getItem('token') || ''}
            onSuccess={(paymentId) => {
            alert(`Payment Successful! ID: ${paymentId}`)
            clearCart()
                    }}
                          />

            <Link href="/silver-jewellery" onClick={closeCart}
              className="block text-center mt-3 text-[10px] tracking-[0.18em] uppercase transition-opacity hover:opacity-60"
              style={{ color: "#B0AAA0" }}>
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
