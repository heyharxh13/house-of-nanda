"use client"

import { useEffect, useState } from "react"
import { Search, Star, Trash2 } from "lucide-react"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"
function authHeaders() { return { Authorization: `Bearer ${localStorage.getItem("token")}` } }

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [deleting, setDeleting] = useState<number | null>(null)

  useEffect(() => {
    fetch(`${API}/reviews/admin/all`, { headers: authHeaders() })
      .then(r => r.json())
      .then(data => { setReviews(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const deleteReview = async (id: number) => {
    if (!confirm("Delete this review?")) return
    setDeleting(id)
    await fetch(`${API}/reviews/${id}`, { method: "DELETE", headers: authHeaders() })
    setReviews(prev => prev.filter(r => r.id !== id))
    setDeleting(null)
  }

  const filtered = reviews.filter(r =>
    !search ||
    r.comment?.toLowerCase().includes(search.toLowerCase()) ||
    r.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
    r.product?.name?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <div className="flex items-center justify-center h-64"><p className="text-muted-foreground text-sm">Loading reviews...</p></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-semibold text-foreground">Reviews</h1>
        <p className="text-[13px] text-muted-foreground">{reviews.length} total</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search reviews..."
          className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-[13px] bg-background focus:outline-none focus:border-accent/50" />
      </div>

      <div className="space-y-3">
        {filtered.map(review => (
          <div key={review.id} className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <p className="text-[13px] font-medium text-foreground">{review.user?.name || "Anonymous"}</p>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-[#c9a96e] text-[#c9a96e]" : "text-border"}`} />
                    ))}
                  </div>
                  <span className="text-[11px] text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>
                {review.product?.name && (
                  <p className="text-[11px] text-accent mb-1.5">on: {review.product.name}</p>
                )}
                <p className="text-[13px] text-muted-foreground leading-relaxed">{review.comment}</p>
              </div>
              <button onClick={() => deleteReview(review.id)} disabled={deleting === review.id}
                className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors flex-shrink-0 disabled:opacity-40">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground text-sm py-12">No reviews found</p>
        )}
      </div>
    </div>
  )
}