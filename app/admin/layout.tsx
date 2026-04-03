"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard, ShoppingBag, Package, Users, Star, LogOut, Menu, X
} from "lucide-react"

const API = process.env.NEXT_PUBLIC_API_URL || "http://https://house-of-nanda.onrender.com/api/api"

const NAV = [
  { label: "Dashboard",  href: "/admin",          icon: LayoutDashboard },
  { label: "Orders",     href: "/admin/orders",    icon: ShoppingBag },
  { label: "Products",   href: "/admin/products",  icon: Package },
  { label: "Users",      href: "/admin/users",     icon: Users },
  { label: "Reviews",    href: "/admin/reviews",   icon: Star },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [checking, setChecking] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) { router.replace("/"); return }

    fetch(`${API}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((user) => {
        if (user?.role !== "admin") router.replace("/")
        else setChecking(false)
      })
      .catch(() => router.replace("/"))
  }, [])

  if (checking) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <p className="text-muted-foreground text-sm">Verifying access...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-60 bg-[#111] flex flex-col
        transform transition-transform duration-200
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0
      `}>
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/10">
          <p className="text-[#c9a96e] font-serif text-lg tracking-widest">HOUSE OF NANDA</p>
          <p className="text-white/40 text-[10px] tracking-wider mt-0.5">ADMIN PANEL</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map(({ label, href, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link key={href} href={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-colors
                  ${active
                    ? "bg-[#c9a96e]/20 text-[#c9a96e]"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}>
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={() => { localStorage.removeItem("token"); router.push("/") }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-colors w-full">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-card border-b border-border px-4 lg:px-8 py-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-muted-foreground hover:text-foreground">
            <Menu className="w-5 h-5" />
          </button>
          <p className="text-[13px] font-semibold text-foreground">
            {NAV.find(n => n.href === pathname)?.label || "Admin"}
          </p>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}