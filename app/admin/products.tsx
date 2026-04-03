"use client"

import { useEffect, useState } from "react"
import { Search, Plus, Pencil, Trash2, ToggleLeft, ToggleRight, X, Check } from "lucide-react"

const API = process.env.NEXT_PUBLIC_API_URL || "http://https://house-of-nanda.onrender.com/api/api"
function authHeaders() { return { Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" } }

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [deleting, setDeleting] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<any>({})

  useEffect(() => {
    fetch(`${API}/products`)
      .then(r => r.json())
      .then(data => { setProducts(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const toggleStock = async (id: string) => {
    await fetch(`${API}/products/${id}/toggle-stock`, { method: "PATCH", headers: authHeaders() })
    setProducts(prev => prev.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p))
  }

  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return
    setDeleting(id)
    await fetch(`${API}/products/${id}`, { method: "DELETE", headers: authHeaders() })
    setProducts(prev => prev.filter(p => p.id !== id))
    setDeleting(null)
  }

  const startEdit = (product: any) => {
    setEditingId(product.id)
    setEditForm({ name: product.name, price: product.price, badge: product.badge || "" })
  }

  const saveEdit = async () => {
    await fetch(`${API}/products/${editingId}`, {
      method: "PATCH", headers: authHeaders(),
      body: JSON.stringify(editForm),
    })
    setProducts(prev => prev.map(p => p.id === editingId ? { ...p, ...editForm } : p))
    setEditingId(null)
  }

  const filtered = products.filter(p =>
    !search || p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <div className="flex items-center justify-center h-64"><p className="text-muted-foreground text-sm">Loading products...</p></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-serif text-2xl font-semibold text-foreground">Products</h1>
        <p className="text-[13px] text-muted-foreground">{products.length} total</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-[13px] bg-background focus:outline-none focus:border-accent/50" />
      </div>

      {/* Products table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Product</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Category</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Price</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Stock</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Badge</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(product => (
                <tr key={product.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {product.images?.[0] && (
                        <img src={product.images[0]} alt={product.name}
                          className="w-10 h-10 object-cover rounded-lg border border-border flex-shrink-0" />
                      )}
                      <div>
                        {editingId === product.id ? (
                          <input value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                            className="text-[13px] font-medium border border-border rounded-lg px-2 py-1 bg-background focus:outline-none w-48" />
                        ) : (
                          <p className="text-[13px] font-medium text-foreground line-clamp-1">{product.name}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[12px] text-muted-foreground capitalize">{product.category}</td>
                  <td className="px-5 py-4">
                    {editingId === product.id ? (
                      <input type="number" value={editForm.price} onChange={e => setEditForm({ ...editForm, price: e.target.value })}
                        className="text-[13px] border border-border rounded-lg px-2 py-1 bg-background focus:outline-none w-24" />
                    ) : (
                      <p className="text-[13px] font-semibold text-foreground">₹{Number(product.price).toLocaleString("en-IN")}</p>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={() => toggleStock(product.id)}
                      className={`flex items-center gap-1.5 text-[11px] font-medium ${product.inStock ? "text-green-600" : "text-red-500"}`}>
                      {product.inStock
                        ? <ToggleRight className="w-4 h-4" />
                        : <ToggleLeft className="w-4 h-4" />}
                      {product.inStock ? "In Stock" : "Out"}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    {editingId === product.id ? (
                      <input value={editForm.badge} onChange={e => setEditForm({ ...editForm, badge: e.target.value })}
                        placeholder="Badge..."
                        className="text-[12px] border border-border rounded-lg px-2 py-1 bg-background focus:outline-none w-28" />
                    ) : (
                      product.badge && (
                        <span className="text-[11px] px-2 py-0.5 bg-accent/10 text-accent rounded-full">{product.badge}</span>
                      )
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      {editingId === product.id ? (
                        <>
                          <button onClick={saveEdit} className="p-1.5 text-green-600 hover:bg-green-100 rounded-lg transition-colors"><Check className="w-4 h-4" /></button>
                          <button onClick={() => setEditingId(null)} className="p-1.5 text-muted-foreground hover:bg-secondary rounded-lg transition-colors"><X className="w-4 h-4" /></button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEdit(product)} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"><Pencil className="w-4 h-4" /></button>
                          <button onClick={() => deleteProduct(product.id)} disabled={deleting === product.id}
                            className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-40">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-12">No products found</p>
          )}
        </div>
      </div>
    </div>
  )
}