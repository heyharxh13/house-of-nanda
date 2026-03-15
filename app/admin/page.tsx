"use client"

import { useEffect, useState } from "react"
import { ShoppingBag, Package, Users, Star, TrendingUp, Clock } from "lucide-react"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

function token() { return localStorage.getItem("token") }
function authHeaders() { return { Authorization: `Bearer ${token()}` } }

const STATUS_COLOR: Record<string, string> = {
  pending:    "bg-amber-100 text-amber-700",
  confirmed:  "bg-blue-100 text-blue-700",
  processing: "bg-purple-100 text-purple-700",
  shipped:    "bg-indigo-100 text-indigo-700",
  delivered:  "bg-green-100 text-green-700",
  cancelled:  "bg-red-100 text-red-700",
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch(`${API}/orders/admin`, { headers: authHeaders() }).then(r => r.json()),
      fetch(`${API}/users/admin`, { headers: authHeaders() }).then(r => r.json()),
      fetch(`${API}/products`, { headers: authHeaders() }).then(r => r.json()),
    ]).then(([o, u, p]) => {
      setOrders(Array.isArray(o) ? o : [])
      setUsers(Array.isArray(u) ? u : [])
      setProducts(Array.isArray(p) ? p : [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const totalRevenue = orders
    .filter(o => o.status !== "cancelled" && o.status !== "refunded")
    .reduce((sum, o) => sum + Number(o.total), 0)

  const pendingOrders = orders.filter(o => o.status === "pending").length
  const recentOrders = orders.slice(0, 5)

  const STATS = [
    { label: "Total Revenue",  value: `₹${totalRevenue.toLocaleString("en-IN")}`, icon: TrendingUp, color: "text-[#c9a96e]" },
    { label: "Total Orders",   value: orders.length,   icon: ShoppingBag, color: "text-blue-500" },
    { label: "Total Products", value: products.length, icon: Package,     color: "text-purple-500" },
    { label: "Total Users",    value: users.length,    icon: Users,       color: "text-green-500" },
  ]

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-muted-foreground text-sm">Loading dashboard...</p>
    </div>
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-[13px] mt-1">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[12px] text-muted-foreground font-medium">{label}</p>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Pending orders alert */}
      {pendingOrders > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3">
          <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <p className="text-[13px] text-amber-700">
            <strong>{pendingOrders} pending order{pendingOrders > 1 ? "s" : ""}</strong> need your attention.
          </p>
          <a href="/admin/orders" className="ml-auto text-[12px] text-amber-700 underline font-medium">View →</a>
        </div>
      )}

      {/* Recent orders */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="text-[14px] font-semibold text-foreground">Recent Orders</h2>
          <a href="/admin/orders" className="text-[12px] text-accent hover:underline">View all →</a>
        </div>
        <div className="divide-y divide-border">
          {recentOrders.map((order) => (
            <div key={order.id} className="px-6 py-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-[13px] font-medium text-foreground">
                  #{String(order.id).padStart(4, "0")} — {order.user?.name || "Guest"}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-[11px] px-2.5 py-1 rounded-full font-semibold uppercase ${STATUS_COLOR[order.status] || "bg-gray-100 text-gray-600"}`}>
                  {order.status}
                </span>
                <p className="text-[13px] font-semibold text-foreground">
                  ₹{Number(order.total).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          ))}
          {recentOrders.length === 0 && (
            <p className="px-6 py-8 text-center text-muted-foreground text-sm">No orders yet</p>
          )}
        </div>
      </div>
    </div>
  )
}