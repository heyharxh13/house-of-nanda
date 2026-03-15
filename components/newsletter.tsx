"use client"
import { useState } from "react"
import { ArrowRight } from "lucide-react"

const NL_IMG = "/images/product-aurora-necklace.jpg"

export default function Newsletter() {
  const [email, setEmail] = useState("")
const [status, setStatus] = useState("idle")

const submit = async () => {
  if (!email.includes("@")) return
  setStatus('loading')
  try {
    const res = await fetch('http://localhost:3001/api/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    const data = await res.json()
    if (data.success) {
      setStatus('success')
      setEmail('')
    } else {
      setStatus('error')
    }
  } catch {
    setStatus('error')
  }
}

  return (
    <section className="bg-[#F8F5F0] border-t border-[#E0DAD0]">
      <div className="grid lg:grid-cols-2">

        {/* Left — image */}
        <div className="relative overflow-hidden hidden lg:block" style={{ minHeight: 440 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={NL_IMG} alt="House of Nanda jewellery"
            className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0D0C0A]/30" />
          <div className="absolute bottom-8 left-8">
            <p className="font-serif text-white text-[28px] font-light leading-tight">
              New craft.<br />First to know.
            </p>
          </div>
        </div>

        {/* Right — form */}
        <div className="flex flex-col justify-center px-8 sm:px-14 py-16 lg:py-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-5 h-px bg-[#B8965A]" />
            <p className="text-[9px] tracking-[0.55em] uppercase text-[#B0AAA0] font-medium">The Journal</p>
          </div>

          <h2 className="font-serif text-[#0D0C0A] leading-[0.9] mb-4"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", fontWeight: 300 }}>
            Stories from<br /><em className="italic text-[#7A756C]">the hills.</em>
          </h2>

          <p className="text-[#7A756C] text-[13px] leading-relaxed mb-8 max-w-xs">
            Craft dispatches, new collections, and behind-the-scenes from our Nainital studio. Sent thoughtfully — never more than twice a month.
          </p>

          {status === 'success' ? (
            <div className="border border-[#E0DAD0] bg-white px-6 py-6">
              <p className="font-serif text-[18px] text-[#0D0C0A] font-light">You're in the circle.</p>
              <p className="text-[12px] text-[#7A756C] mt-1">We'll be in touch when something worth sharing drops.</p>
            </div>
          ) : (
            <div>
              <div className="flex border border-[#C0B9AE] hover:border-[#0D0C0A] transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && submit()}
                  placeholder="Your email address"
                  className="flex-1 px-5 py-4 bg-transparent text-[13px] text-[#0D0C0A] placeholder-[#B0AAA0] outline-none"
                />
                <button onClick={submit}
                  className="px-7 bg-[#0D0C0A] text-white text-[9px] font-bold tracking-[0.3em] uppercase flex items-center gap-2 hover:bg-[#2A2820] transition-colors">
                  Join <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              {status === 'success' && (
  <p style={{ fontSize: 11, color: '#10b981', marginTop: 8 }}>
    ✅ Welcome to House of Nanda!
  </p>
)}
{status === 'error' && (
  <p style={{ fontSize: 11, color: '#ef4444', marginTop: 8 }}>
    Already subscribed or invalid email!
  </p>
)}
              <p className="text-[9px] text-[#C0B9AE] mt-3 tracking-wide">
                Unsubscribe any time. Your details are never shared.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
