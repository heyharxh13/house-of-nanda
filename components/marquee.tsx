export default function Marquee() {
  const items = [
    "925 Sterling Silver",
    "BIS Hallmarked Gold",
    "IGI Certified Diamonds",
    "Handcrafted in Kumaon",
    "Aipan Folk Art Heritage",
    "Free Insured Delivery",
    "Made to Order Gold",
    "Nainital · Est. 2025",
  ]
  const track = [...items, ...items, ...items]

  return (
    <div className="overflow-hidden bg-[#F0ECE5] border-y border-[#E0DAD0] py-3.5">
      <div className="animate-marquee flex whitespace-nowrap" style={{ width: "max-content" }}>
        {track.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 px-6">
            <span className="text-[8.5px] tracking-[0.55em] uppercase font-semibold text-[#7A756C]">{item}</span>
            <span className="text-[#B8965A] text-[10px]">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
