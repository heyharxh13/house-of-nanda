"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CartDrawer from "@/components/cart-drawer"
import { ArrowLeft, Package, Truck, CheckCircle, XCircle, Clock, ChevronDown, ChevronUp } from "lucide-react"

const API = process.env.NEXT_PUBLIC_API_URL || "http://https://house-of-nanda.onrender.com/api/api"

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
  pending:    { label: "Pending",    color: "bg-amber-100 text-amber-700",   icon: Clock },
  confirmed:  { label: "Confirmed",  color: "bg-blue-100 text-blue-700",     icon: CheckCircle },
  processing: { label: "Processing", color: "bg-purple-100 text-purple-700", icon: Package },
  shipped:    { label: "Shipped",    color: "bg-indigo-100 text-indigo-700", icon: Truck },
  delivered:  { label: "Delivered",  color: "bg-green-100 text-green-700",   icon: CheckCircle },
  cancelled:  { label: "Cancelled",  color: "bg-red-100 text-red-700",       icon: XCircle },
  refunded:   { label: "Refunded",   color: "bg-gray-100 text-gray-600",     icon: XCircle },
}

function estimatedDelivery(createdAt: string) {
  const d = new Date(createdAt)
  d.setDate(d.getDate() + 7)
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<number | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) { setLoading(false); return }

    fetch(`${API}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => { setOrders(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Loading orders...</p>
      </div>
      <Footer />
    </>
  )

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        {/* Header */}
        <div className="bg-secondary border-b border-border">
          <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
            <Link href="/account" className="inline-flex items-center gap-2 text-[12px] text-muted-foreground hover:text-foreground mb-4 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Account
            </Link>
            <div className="flex items-center justify-between">
              <h1 className="font-serif text-3xl font-semibold text-foreground">My Orders</h1>
              <Link href="/track" className="text-[12px] text-accent hover:underline">
                Track without login →
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-10">
          {orders.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-secondary border border-border flex items-center justify-center mb-5">
                <Package className="w-7 h-7 text-muted-foreground" />
              </div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">No orders yet</h2>
              <p className="text-muted-foreground text-[14px] mb-6">Your orders will appear here once you place them.</p>
              <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background text-[13px] font-medium rounded-lg hover:opacity-85 transition-opacity">
                Shop Now
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending
                const StatusIcon = status.icon
                const isExpanded = expanded === order.id
                const isDelivered = order.status === "delivered" || order.status === "cancelled"

                return (
                  <div key={order.id} className="bg-card border border-border rounded-2xl overflow-hidden">
                    {/* Order Header */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[13px] font-semibold text-foreground tracking-wide">
                            ORDER #{String(order.id).padStart(4, "0")}
                          </p>
                          <p className="text-[12px] text-muted-foreground mt-0.5">
                            {new Date(order.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric", month: "long", year: "numeric",
                            })}
                          </p>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full font-semibold uppercase tracking-wide ${status.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                      </div>

                      {/* Estimated delivery */}
                      {!isDelivered && (
                        <div className="mt-3 flex items-center gap-2 text-[12px] text-muted-foreground">
                          <Truck className="w-3.5 h-3.5 text-accent" />
                          <span>Estimated delivery: <strong className="text-accent">{estimatedDelivery(order.createdAt)}</strong></span>
                        </div>
                      )}

                      {/* Tracking number */}
                      {order.trackingNumber && (
                        <div className="mt-2 flex items-center gap-2 text-[12px] text-muted-foreground">
                          <Package className="w-3.5 h-3.5" />
                          <span>Tracking: <strong className="text-foreground">{order.trackingNumber}</strong></span>
                        </div>
                      )}
                    </div>

                    {/* Items — collapsed/expanded */}
                    <div className="border-t border-border">
                      <button
                        onClick={() => setExpanded(isExpanded ? null : order.id)}
                        className="w-full flex items-center justify-between px-5 py-3 text-[12px] text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <span>{order.items?.length} item{order.items?.length > 1 ? "s" : ""} · ₹{Number(order.total).toLocaleString("en-IN")}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {isExpanded && (
                        <div className="px-5 pb-5 space-y-3">
                          {order.items?.map((item: any) => (
                            <div key={item.id} className="flex items-center gap-4">
                              {item.image && (
                                <img src={item.image} alt={item.name}
                                  className="w-14 h-14 object-cover rounded-xl border border-border flex-shrink-0" />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-medium text-foreground truncate">{item.name}</p>
                                {item.size && <p className="text-[11px] text-muted-foreground">Size: {item.size}</p>}
                                <p className="text-[12px] text-muted-foreground">Qty: {item.qty}</p>
                              </div>
                              <p className="text-[13px] font-medium text-foreground">
                                ₹{Number(item.price * item.qty).toLocaleString("en-IN")}
                              </p>
                            </div>
                          ))}

                          {/* Totals */}
                          <div className="border-t border-border pt-3 space-y-1">
                            <div className="flex justify-between text-[12px] text-muted-foreground">
                              <span>Subtotal</span>
                              <span>₹{Number(order.subtotal).toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex justify-between text-[12px] text-muted-foreground">
                              <span>Shipping</span>
                              <span>{Number(order.shipping) === 0 ? "Free" : `₹${Number(order.shipping).toLocaleString("en-IN")}`}</span>
                            </div>
                            <div className="flex justify-between text-[14px] font-semibold text-foreground pt-1 border-t border-border">
                              <span>Total</span>
                              <span className="text-accent">₹{Number(order.total).toLocaleString("en-IN")}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}