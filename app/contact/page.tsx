"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CartDrawer from "@/components/cart-drawer"
import { Mail, Phone, MapPin, Clock, CheckCircle } from "lucide-react"

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@houseofnanda.com", href: "mailto:hello@houseofnanda.com" },
  { icon: Phone, label: "WhatsApp", value: "+91 98765 43210", href: "https://wa.me/919876543210" },
  { icon: MapPin, label: "Studio", value: "Dehradun, Uttarakhand, India", href: "#" },
  { icon: Clock, label: "Hours", value: "Mon–Sat, 10am–7pm IST", href: "#" },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <div className="bg-secondary border-b border-border">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
            <div className="label-rule mb-3"><span className="text-[11px] tracking-[0.22em] uppercase text-accent font-medium px-4">Get In Touch</span></div>
            <h1 className="font-serif text-4xl font-semibold text-foreground mt-1 mb-2">Contact Us</h1>
            <p className="text-muted-foreground text-[15px]">We're here to help. Reach out any time.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-20">
            {/* Form */}
            <div>
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">Send us a message</h2>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle className="w-12 h-12 text-accent mb-4" />
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">Message received!</h3>
                  <p className="text-muted-foreground text-[14px]">We'll get back to you within 2 business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] font-medium text-foreground mb-1.5">Your Name</label>
                      <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 border border-border rounded-lg text-[14px] text-foreground bg-background focus:outline-none focus:border-accent/50 transition-colors" placeholder="Harsh Vardhan Pandey" />
                    </div>
                    <div>
                      <label className="block text-[12px] font-medium text-foreground mb-1.5">Email Address</label>
                      <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 border border-border rounded-lg text-[14px] text-foreground bg-background focus:outline-none focus:border-accent/50 transition-colors" placeholder="you@email.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-foreground mb-1.5">Subject</label>
                    <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg text-[14px] text-foreground bg-background focus:outline-none focus:border-accent/50 transition-colors">
                      <option value="">Select a subject</option>
                      <option>Order enquiry</option>
                      <option>Product question</option>
                      <option>Return or exchange</option>
                      <option>Custom order / bulk</option>
                      <option>Press / partnership</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-foreground mb-1.5">Message</label>
                    <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 border border-border rounded-lg text-[14px] text-foreground bg-background focus:outline-none focus:border-accent/50 transition-colors resize-none" placeholder="How can we help?" />
                  </div>
                  <button type="submit" className="w-full py-3.5 bg-foreground text-background font-medium text-[13px] rounded-lg hover:opacity-85 transition-opacity">
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="space-y-5">
              <h2 className="font-serif text-2xl font-semibold text-foreground">Contact details</h2>
              {contactInfo.map((info) => (
                <a key={info.label} href={info.href} className="flex items-start gap-4 p-5 bg-secondary border border-border rounded-xl hover:border-accent/30 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-4.5 h-4.5 text-accent" />
                  </div>
                  <div>
                    <p className="text-[11px] tracking-wider uppercase text-muted-foreground font-medium">{info.label}</p>
                    <p className="text-[14px] text-foreground font-medium mt-0.5">{info.value}</p>
                  </div>
                </a>
              ))}
              <div className="p-5 bg-foreground text-background rounded-xl">
                <p className="text-[13px] font-semibold mb-1">WhatsApp Support</p>
                <p className="text-[12px] opacity-70 mb-3">Fastest response. Available Mon–Sat 10am–7pm.</p>
                <a href="https://wa.me/919876543210" className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground text-[12px] font-medium rounded-lg">
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
