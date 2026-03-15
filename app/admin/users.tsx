"use client"

import { useEffect, useState } from "react"
import { Search, Shield, User } from "lucide-react"

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"
function authHeaders() { return { Authorization: `Bearer ${localStorage.getItem("token")}` } }

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch(`${API}/users/admin`, { headers: authHeaders() })
      .then(r => r.json())
      .then(data => { setUsers(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const filtered = users.filter(u =>
    !search ||
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <div className="flex items-center justify-center h-64"><p className="text-muted-foreground text-sm">Loading users...</p></div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-semibold text-foreground">Users</h1>
        <p className="text-[13px] text-muted-foreground">{users.length} total</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-[13px] bg-background focus:outline-none focus:border-accent/50" />
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="divide-y divide-border">
          {filtered.map(user => (
            <div key={user.id} className="px-5 py-4 flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-secondary border border-border flex items-center justify-center flex-shrink-0">
                {user.role === "admin"
                  ? <Shield className="w-4 h-4 text-accent" />
                  : <User className="w-4 h-4 text-muted-foreground" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-foreground">{user.name}</p>
                <p className="text-[11px] text-muted-foreground">{user.email}</p>
              </div>
              {user.phone && (
                <p className="text-[12px] text-muted-foreground hidden sm:block">{user.phone}</p>
              )}
              <div className="flex items-center gap-3">
                <span className={`text-[11px] px-2.5 py-1 rounded-full font-semibold
                  ${user.role === "admin" ? "bg-accent/10 text-accent" : "bg-secondary text-muted-foreground"}`}>
                  {user.role}
                </span>
                <p className="text-[11px] text-muted-foreground hidden sm:block">
                  {new Date(user.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-12">No users found</p>
          )}
        </div>
      </div>
    </div>
  )
}