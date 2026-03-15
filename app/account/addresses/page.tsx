"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CartDrawer from "@/components/cart-drawer"
import Link from "next/link"
import { ArrowLeft, MapPin, Plus, Home, Briefcase, Trash2, Edit2, Check } from "lucide-react"

type Address = {
  id: string; label: string; name: string; phone: string
  line1: string; line2?: string; city: string; state: string; pincode: string; isDefault: boolean
}

const STATES = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh"]

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([
    { id: "1", label: "Home", name: "Harsh Vardhan Pandey", phone: "+91 98765 43210", line1: "42 Rajpur Road", city: "Dehradun", state: "Uttarakhand", pincode: "248001", isDefault: true },
  ])
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ label: "Home", name: "", phone: "", line1: "", line2: "", city: "", state: "", pincode: "" })

  const handleAdd = () => {
    if (!form.name || !form.line1 || !form.city || !form.pincode) return
    setAddresses(prev => [...prev, { ...form, id: Date.now().toString(), isDefault: prev.length === 0 }])
    setAdding(false)
    setForm({ label: "Home", name: "", phone: "", line1: "", line2: "", city: "", state: "", pincode: "" })
  }

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <div className="bg-secondary border-b border-border">
          <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
            <Link href="/account" className="inline-flex items-center gap-2 text-[12px] text-muted-foreground hover:text-foreground mb-4 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Account
            </Link>
            <h1 className="font-serif text-3xl font-semibold text-foreground">Saved Addresses</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-10">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {addresses.map((addr) => (
              <div key={addr.id} className={`relative bg-card border rounded-2xl p-5 ${addr.isDefault ? "border-accent/40" : "border-border"}`}>
                {addr.isDefault && (
                  <span className="absolute top-4 right-4 flex items-center gap-1 text-[10px] font-semibold text-accent bg-accent/10 px-2 py-1 rounded-full">
                    <Check className="w-3 h-3" /> Default
                  </span>
                )}
                <div className="flex items-center gap-2 mb-3">
                  {addr.label === "Home" ? <Home className="w-4 h-4 text-accent" /> : <Briefcase className="w-4 h-4 text-accent" />}
                  <span className="text-[12px] font-semibold text-foreground uppercase tracking-wider">{addr.label}</span>
                </div>
                <p className="text-[14px] font-medium text-foreground">{addr.name}</p>
                <p className="text-[13px] text-muted-foreground mt-1">{addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}</p>
                <p className="text-[13px] text-muted-foreground">{addr.city}, {addr.state} — {addr.pincode}</p>
                <p className="text-[12px] text-muted-foreground mt-1">{addr.phone}</p>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                  <button className="flex items-center gap-1.5 text-[12px] text-foreground/60 hover:text-foreground transition-colors">
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  {!addr.isDefault && (
                    <button onClick={() => setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === addr.id })))}
                      className="flex items-center gap-1.5 text-[12px] text-foreground/60 hover:text-accent transition-colors">
                      <Check className="w-3.5 h-3.5" /> Set Default
                    </button>
                  )}
                  <button onClick={() => setAddresses(prev => prev.filter(a => a.id !== addr.id))}
                    className="flex items-center gap-1.5 text-[12px] text-foreground/60 hover:text-red-500 transition-colors ml-auto">
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Add button */}
            {!adding && (
              <button onClick={() => setAdding(true)}
                className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border rounded-2xl p-8 hover:border-accent/40 hover:text-accent text-muted-foreground transition-all min-h-[180px]">
                <Plus className="w-6 h-6" />
                <span className="text-[13px] font-medium">Add New Address</span>
              </button>
            )}
          </div>

          {/* Add address form */}
          {adding && (
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-serif text-lg font-semibold text-foreground mb-5">New Address</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-medium text-foreground mb-1.5">Label</label>
                  <div className="flex gap-2">
                    {["Home", "Work", "Other"].map((l) => (
                      <button key={l} onClick={() => setForm({ ...form, label: l })}
                        className={`px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-colors ${form.label === l ? "bg-foreground text-background border-foreground" : "border-border text-foreground/60 hover:text-foreground"}`}>
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                {[
                  { key: "name", label: "Full Name", placeholder: "Harsh Vardhan Pandey" },
                  { key: "phone", label: "Phone Number", placeholder: "+91 98765 43210" },
                  { key: "line1", label: "Address Line 1", placeholder: "House no., Street, Area" },
                  { key: "line2", label: "Address Line 2 (optional)", placeholder: "Landmark, Colony" },
                  { key: "city", label: "City", placeholder: "Dehradun" },
                  { key: "pincode", label: "PIN Code", placeholder: "248001" },
                ].map(({ key, label, placeholder }) => (
                  <div key={key}>
                    <label className="block text-[12px] font-medium text-foreground mb-1.5">{label}</label>
                    <input type="text" value={(form as any)[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      placeholder={placeholder}
                      className="w-full px-4 py-2.5 border border-border rounded-xl text-[13px] bg-background focus:outline-none focus:border-accent/50 transition-colors" />
                  </div>
                ))}
                <div>
                  <label className="block text-[12px] font-medium text-foreground mb-1.5">State</label>
                  <select value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })}
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-[13px] bg-background focus:outline-none focus:border-accent/50 transition-colors">
                    <option value="">Select State</option>
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={handleAdd}
                  className="px-6 py-3 bg-foreground text-background text-[13px] font-medium rounded-xl hover:opacity-85 transition-opacity">
                  Save Address
                </button>
                <button onClick={() => setAdding(false)}
                  className="px-6 py-3 border border-border text-foreground/60 text-[13px] font-medium rounded-xl hover:text-foreground transition-colors">
                  Cancel
                </button>
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
