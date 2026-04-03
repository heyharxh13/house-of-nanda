"use client"

import { useEffect, useState } from "react"
import { Search, Truck, ChevronDown } from "lucide-react"

const API = process.env.NEXT_PUBLIC_API_URL || "http://https://house-of-nanda.onrender.com/api/api"
function authHeaders() { return { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" } }

const STATUSES = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "refunded"]
const STATUS_COLOR: Record<string, string> = {
  pending:    "bg-amber-100 text-amber-700",
  confirmed:  "bg-blue-100 text-blue-700",
  processing: "bg-purple-100 text-purple-700",
  shipped:    "bg-indigo-100 text-indigo-700",
  delivered:  "bg-green-100 text-green-700",
  cancelled:  "bg-red-100 text-red-700",
  refunded:   "bg-gray-100 text-gray-600",
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [expanded, setExpanded] = useState<number | null>(null)
  const [tracking, setTracking] = useState<Record<number, string>>({})
  const [saving, setSaving] = useState<number | null>(null)

  useEffect(() => {
    fetch(`${API}/orders/admin`, { headers: authHeaders() })
      .then(r => r.json())
      .then(data => { setOrders(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const updateStatus = async (orderId: number, status: string) => {
    setSaving(orderId)
    await fetch(`${API}/orders/${orderId}/status`, {
      method: "PATCH", headers: authHeaders(),
      body: JSON.stringify({ status }),
    })
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o))
    setSaving(null)
  }

  const addTracking = async (orderId: number) => {
    const tn = tracking[orderId]?.trim()
    if (!tn) return
    setSaving(orderId)
    await fetch(`${API}/orders/${orderId}/tracking`, {
      method: "PATCH", headers: authHeaders(),
      body: JSON.stringify({ trackingNumber: tn }),
    })
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, trackingNumber: tn, status: "shipped" } : o))
    setTracking(prev => ({ ...prev, [orderId]: "" }))
    setSaving(null)
  }

  const filtered = orders.filter(o => {
    const matchFilter = filter === "all" || o.status === filter
    const matchSearch = !search ||
      String(o.id).includes(search) ||
      o.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      o.user?.email?.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  if (loading) return <div className="flex items-center justify-center h-64"><p className="text-muted-foreground text-sm">Loading orders...</p></div>

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-2xl font-semibold text-foreground">Orders</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by ID, name, email..."
            className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-[13px] bg-background focus:outline-none focus:border-accent/50" />
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)}
          className="px-4 py-2.5 border border-border rounded-xl text-[13px] bg-background focus:outline-none">
          <option value="all">All Status</option>
          {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      {/* Orders list */}
      <div className="space-y-3">
        {filtered.map(order => (
          <div key={order.id} className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-5 flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-foreground">
                  #{String(order.id).padStart(4, "0")} — {order.user?.name || "Guest"}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {order.user?.email} · {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>

              {/* Status dropdown */}
              <select
                value={order.status}
                onChange={e => updateStatus(order.id, e.target.value)}
                disabled={saving === order.id}
                className={`text-[11px] px-3 py-1.5 rounded-full font-semibold border-0 cursor-pointer focus:outline-none ${STATUS_COLOR[order.status]}`}>
                {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
              </select>

              <p className="text-[14px] font-bold text-foreground">
                ₹{Number(order.total).toLocaleString("en-IN")}
              </p>

              <button onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                className="text-muted-foreground hover:text-foreground transition-colors">
                <ChevronDown className={`w-4 h-4 transition-transform ${expanded === order.id ? "rotate-180" : ""}`} />
              </button>
            </div>

            {expanded === order.id && (
              <div className="border-t border-border p-5 space-y-4">
                {/* Items */}
                <div className="space-y-2">
                  {order.items?.map((item: any) => (
                    <div key={item.id} className="flex items-center gap-3">
                      {item.image && <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg border border-border" />}
                      <div className="flex-1 text-[12px]">
                        <p className="font-medium text-foreground">{item.name}</p>
                        {item.size && <p className="text-muted-foreground">Size: {item.size}</p>}
                      </div>
                      <p className="text-[12px] text-foreground">x{item.qty} · ₹{Number(item.price * item.qty).toLocaleString("en-IN")}</p>
                    </div>
                  ))}
                </div>

                {/* Shipping address */}
                {order.shippingAddress && (
                  <div className="bg-secondary rounded-xl p-3 text-[12px] text-muted-foreground">
                    <p className="font-medium text-foreground mb-1">Shipping Address</p>
                    {(order.shippingAddress as any).fullName}<br />
                    {(order.shippingAddress as any).line1}, {(order.shippingAddress as any).city}<br />
                    {(order.shippingAddress as any).state} — {(order.shippingAddress as any).pincode}
                  </div>
                )}

                {/* Tracking */}
                <div className="flex gap-2">
                  <input
                    value={tracking[order.id] || ""}
                    onChange={e => setTracking(prev => ({ ...prev, [order.id]: e.target.value }))}
                    placeholder={order.trackingNumber || "Add tracking number..."}
                    className="flex-1 px-4 py-2 border border-border rounded-xl text-[13px] bg-background focus:outline-none focus:border-accent/50"
                  />
                  <button
                    onClick={() => addTracking(order.id)}
                    disabled={saving === order.id || !tracking[order.id]?.trim()}
                    className="flex items-center gap-2 px-4 py-2 bg-foreground text-background text-[12px] font-medium rounded-xl hover:opacity-85 disabled:opacity-40 transition-opacity">
                    <Truck className="w-3.5 h-3.5" />
                    {saving === order.id ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground text-sm py-12">No orders found</p>
        )}
      </div>
    </div>
  )
}