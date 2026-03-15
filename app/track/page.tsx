"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CartDrawer from "@/components/cart-drawer"
import { Search, Package, Truck, CheckCircle, XCircle, Clock } from "lucide-react"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any; step: number }> = {
  pending:    { label: "Order Placed",  color: "text-amber-600",  icon: Clock,        step: 1 },
  confirmed:  { label: "Confirmed",     color: "text-blue-600",   icon: CheckCircle,  step: 2 },
  processing: { label: "Processing",    color: "text-purple-600", icon: Package,      step: 3 },
  shipped:    { label: "Shipped",       color: "text-indigo-600", icon: Truck,        step: 4 },
  delivered:  { label: "Delivered",     color: "text-green-600",  icon: CheckCircle,  step: 5 },
  cancelled:  { label: "Cancelled",     color: "text-red-600",    icon: XCircle,      step: 0 },
}

const STEPS = ["Order Placed", "Confirmed", "Processing", "Shipped", "Delivered"]

function estimatedDelivery(createdAt: string) {
  const d = new Date(createdAt)
  d.setDate(d.getDate() + 7)
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
}

export default function TrackPage() {
  const [orderId, setOrderId] = useState("")
  const [email, setEmail] = useState("")
  const [order, setOrder] = useState<any>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleTrack = async () => {
    if (!orderId || !email) return
    setLoading(true)
    setError("")
    setOrder(null)

    try {
      const res = await fetch(`${API}/orders/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: Number(orderId), email }),
      })
      if (!res.ok) { setError("Order not found. Please check your Order ID and email."); return }
      const data = await res.json()
      setOrder(data)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const status = order ? (STATUS_CONFIG[order.status] || STATUS_CONFIG.pending) : null

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <div className="bg-secondary border-b border-border">
          <div className="max-w-2xl mx-auto px-4 lg:px-8 py-10">
            <h1 className="font-serif text-3xl font-semibold text-foreground">Track Your Order</h1>
            <p className="text-muted-foreground text-[13px] mt-1">Enter your Order ID and email to track your order</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 lg:px-8 py-10">
          {/* Search Form */}
          <div className="bg-card border border-border rounded-2xl p-6 mb-8">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-[12px] font-medium text-foreground mb-1.5">Order ID</label>
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g. 1042"
                  className="w-full px-4 py-2.5 border border-border rounded-xl text-[13px] bg-background focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-[12px] font-medium text-foreground mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 border border-border rounded-xl text-[13px] bg-background focus:outline-none focus:border-accent/50 transition-colors"
                />
              </div>
            </div>
            <button
              onClick={handleTrack}
              disabled={loading || !orderId || !email}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-foreground text-background text-[13px] font-medium rounded-xl hover:opacity-85 transition-opacity disabled:opacity-40"
            >
              <Search className="w-4 h-4" />
              {loading ? "Tracking..." : "Track Order"}
            </button>
            {error && <p className="text-red-500 text-[12px] mt-3 text-center">{error}</p>}
          </div>

          {/* Result */}
          {order && status && (
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              {/* Order Info */}
              <div className="p-6 border-b border-border">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[13px] font-semibold text-foreground">
                      ORDER #{String(order.id).padStart(4, "0")}
                    </p>
                    <p className="text-[12px] text-muted-foreground mt-0.5">
                      Placed on {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "long", year: "numeric"
                      })}
                    </p>
                  </div>
                  <span className={`text-[12px] font-semibold ${status.color}`}>
                    {status.label}
                  </span>
                </div>

                {order.status !== "cancelled" && (
                  <div className="mt-3 text-[12px] text-muted-foreground flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-accent" />
                    Estimated delivery: <strong className="text-accent">{estimatedDelivery(order.createdAt)}</strong>
                  </div>
                )}
                {order.trackingNumber && (
                  <div className="mt-2 text-[12px] text-muted-foreground">
                    🚚 Tracking No: <strong className="text-foreground">{order.trackingNumber}</strong>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              {order.status !== "cancelled" && (
                <div className="p-6 border-b border-border">
                  <div className="flex items-center justify-between">
                    {STEPS.map((step, i) => {
                      const stepNum = i + 1
                      const isDone = status.step >= stepNum
                      return (
                        <div key={step} className="flex flex-col items-center flex-1">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold mb-1.5 transition-colors
                            ${isDone ? "bg-accent text-background" : "bg-secondary border border-border text-muted-foreground"}`}>
                            {stepNum}
                          </div>
                          <p className={`text-[10px] text-center leading-tight ${isDone ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                            {step}
                          </p>
                          {i < STEPS.length - 1 && (
                            <div className={`absolute h-0.5 w-full max-w-[60px] mt-3.5 ${isDone && status.step > stepNum ? "bg-accent" : "bg-border"}`} />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Items */}
              <div className="p-6 space-y-3">
                <p className="text-[12px] font-semibold text-foreground uppercase tracking-wider mb-3">Your Items</p>
                {order.items?.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-4">
                    {item.image && (
                      <img src={item.image} alt={item.name}
                        className="w-14 h-14 object-cover rounded-xl border border-border flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-[13px] font-medium text-foreground">{item.name}</p>
                      {item.size && <p className="text-[11px] text-muted-foreground">Size: {item.size}</p>}
                      <p className="text-[12px] text-muted-foreground">Qty: {item.qty}</p>
                    </div>
                    <p className="text-[13px] font-medium text-foreground">
                      ₹{Number(item.price * item.qty).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
                <div className="border-t border-border pt-3 flex justify-between text-[14px] font-semibold text-foreground">
                  <span>Total</span>
                  <span className="text-accent">₹{Number(order.total).toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}