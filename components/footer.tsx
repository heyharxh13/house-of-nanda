import Link from "next/link"

const links = {
  Collections: [
    { label: "Silver Jewellery",  href: "/silver-jewellery" },
    { label: "Men's Collection",  href: "/men" },
    { label: "Gold — To Order",   href: "/gold-jewellery" },
    { label: "New Arrivals",      href: "/collections" },
  ],
  Information: [
    { label: "Our Story",        href: "/about" },
    { label: "Contact Us",       href: "/contact" },
    { label: "Jewellery Care",   href: "/care" },
    { label: "FAQ",              href: "/faq" },
  ],
  Account: [
    { label: "My Account",  href: "/account" },
    { label: "Wishlist",    href: "/wishlist" },
    { label: "Track Order", href: "/account" },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-500">
      <div className="max-w-7xl mx-auto px-5 lg:px-10 pt-16 pb-12">
        <div className="grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 lg:gap-12">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-6">
              <Link href="/" className="inline-block group">
                <div className="flex items-center gap-1.5 mb-1">
                  <div style={{ width: 14, height: 1, background: "#B8965A", opacity: 0.6 }} />
                  <span style={{ fontSize: 7, letterSpacing: "0.50em", textTransform: "uppercase", color: "#B8965A", opacity: 0.75, fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>Fine Jewellery</span>
                  <div style={{ width: 14, height: 1, background: "#B8965A", opacity: 0.6 }} />
                </div>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, letterSpacing: "0.20em", color: "white", textTransform: "uppercase", lineHeight: 1 }}>
                  House of Nanda
                </p>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, fontStyle: "italic", letterSpacing: "0.30em", color: "#B8965A", fontWeight: 500, marginTop: 4 }}>
                  Wear the Legacy
                </p>
              </Link>
            </div>

            <p className="text-[12px] leading-relaxed text-stone-500 max-w-xs mb-6">
              Fine jewellery rooted in the craft traditions of Kumaon, Uttarakhand. 925 sterling silver, 18KT hallmarked gold, IGI certified diamonds — certified, handcrafted, built to endure.
            </p>

            <div className="flex items-center gap-4 mb-6">
              {["925 Silver", "18KT Gold", "IGI"].map(c => (
                <span key={c} className="text-[9px] tracking-[0.28em] uppercase text-stone-600 border border-stone-800 px-2 py-1">
                  {c}
                </span>
              ))}
            </div>

            <div className="space-y-1.5">
              <p className="text-[10px] tracking-[0.3em] uppercase text-stone-700">Nainital · Kumaon · India</p>
              <a href="mailto:hp2527710@gmail.com"
                 className="text-[11px] text-stone-500 hover:text-stone-300 transition-colors block">
                hp2527710@gmail.com
              </a>
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <p className="text-[9px] tracking-[0.45em] uppercase font-bold text-stone-600 mb-5">{title}</p>
              <ul className="space-y-3">
                {items.map((l,index)=> (
                  <li key={`${l.href}-${index}`}>
                    <Link href={l.href} className="text-[12px] text-stone-500 hover:text-stone-300 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(184,150,90,0.25) 30%, rgba(184,150,90,0.45) 50%, rgba(184,150,90,0.25) 70%, transparent 100%)" }} />

      <div className="max-w-7xl mx-auto px-5 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[10px] text-stone-700">© 2025 House of Nanda. All rights reserved.</p>
        <div className="flex gap-5">
          {["Privacy Policy", "Terms", "Shipping Policy"].map(l => (
            <Link key={l} href="/" className="text-[10px] text-stone-700 hover:text-stone-500 transition-colors">{l}</Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
