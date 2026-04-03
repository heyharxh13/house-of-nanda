"use client"

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react"
import type { Product } from "@/lib/data"
import { useAuth } from "@/context/auth-context"

const API = process.env.NEXT_PUBLIC_API_URL || "http://https://house-of-nanda.onrender.com/api/api"

// Helper — JWT token localStorage se lega
function getToken() {
  if (typeof window === "undefined") return null
  return localStorage.getItem("token")
}

interface WishlistContextType {
  wishlist: Product[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  toggleWishlist: (product: Product) => void
  totalWishlistItems: number
  loading: boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { token } = useAuth()
  const [wishlist, setWishlist] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  // ─── Page load par backend se wishlist fetch karo ────────────────
  const fetchWishlist = useCallback(async () => {
    if (!token) return // Login nahi hai toh skip

    setLoading(true)
    try {
      const res = await fetch(`${API}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) return
      const data = await res.json()
      // Backend WishlistItem[] return karta hai, har item mein product relation hai
      setWishlist(data.map((item: any) => item.product))
    } catch (err) {
      console.error("Wishlist fetch error:", err)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    fetchWishlist()
  }, [fetchWishlist])

  // ─── Toggle (Add/Remove) — backend ka toggle API use karo ────────
  const toggleWishlist = useCallback(async (product: Product) => {
    const token = getToken()

    // Optimistic UI update — pehle frontend update karo
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === product.id)
      return exists ? prev.filter((p) => p.id !== product.id) : [...prev, product]
    })

    if (!token) return // Guest user — sirf local state

    try {
      await fetch(`${API}/wishlist/${product.id}/toggle`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })
    } catch (err) {
      console.error("Wishlist toggle error:", err)
      // Error aaye toh revert karo
      setWishlist((prev) => {
        const exists = prev.find((p) => p.id === product.id)
        return exists ? prev.filter((p) => p.id !== product.id) : [...prev, product]
      })
    }
  }, [])

  // ─── Add ──────────────────────────────────────────────────────────
  const addToWishlist = useCallback(
    (product: Product) => {
      if (!wishlist.find((p) => p.id === product.id)) {
        toggleWishlist(product)
      }
    },
    [wishlist, toggleWishlist]
  )

  // ─── Remove ───────────────────────────────────────────────────────
  const removeFromWishlist = useCallback(
    async (productId: string) => {
      const token = getToken()

      // Optimistic update
      setWishlist((prev) => prev.filter((p) => p.id !== productId))

      if (!token) return

      try {
        await fetch(`${API}/wishlist/${productId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        })
      } catch (err) {
        console.error("Wishlist remove error:", err)
        fetchWishlist() // Error aaye toh DB se fresh data lo
      }
    },
    [fetchWishlist]
  )

  // ─── Check ────────────────────────────────────────────────────────
  const isInWishlist = useCallback(
    (productId: string) => wishlist.some((p) => p.id === productId),
    [wishlist]
  )

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
        totalWishlistItems: wishlist.length,
        loading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider")
  return ctx
}