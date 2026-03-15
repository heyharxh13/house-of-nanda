"use client"

import { useEffect, useRef, useState } from "react"

const VALUES = [
  {
    icon: "✦",
    title: "BIS Hallmarked",
    desc: "Every gold piece carries the Bureau of Indian Standards hallmark — your guarantee of purity and authenticity.",
  },
  {
    icon: "◈",
    title: "925 Sterling Silver",
    desc: "All silver jewellery is crafted in 92.5% pure sterling silver, certified and stamped for lifetime trust.",
  },
  {
    icon: "❋",
    title: "Handcrafted in Kumaon",
    desc: "Each piece is made by hand by artisans in the hills of Uttarakhand — no mass production, ever.",
  },
  {
    icon: "◇",
    title: "Free Insured Shipping",
    desc: "Every order ships free across India, fully insured. Your jewellery arrives safely or we make it right.",
  },
  {
    icon: "⬡",
    title: "Easy 15-Day Returns",
    desc: "Not in love with your piece? Return it within 15 days, no questions asked. We want you to be sure.",
  },
  {
    icon: "❀",
    title: "Rooted in Heritage",
    desc: "Our designs draw from Pahadi temple motifs, Aipan folk art, and the sacred geometry of the Himalayas.",
  },
]

const STORY = [
  {
    step: "01",
    title: "The Sketch",
    desc: "Every piece begins as a hand-drawn sketch — inspired by temple carvings, mountain rivers, and folk traditions of Kumaon.",
  },
  {
    step: "02",
    title: "The Metal",
    desc: "We source only BIS hallmarked gold and 925 sterling silver. The metal is tested before any work begins.",
  },
  {
    step: "03",
    title: "The Craft",
    desc: "Master artisans in Nainital shape, solder, and finish each piece by hand. No two pieces are exactly alike.",
  },
  {
    step: "04",
    title: "The Legacy",
    desc: "Packed with care, certified with purpose — and delivered to you as a piece that carries the hills of Uttarakhand.",
  },
]

export default function Testimonials() {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} style={{ background: '#F8F5F0', overflow: 'hidden' }}>

      {/* ── BRAND VALUES ── */}
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '96px 48px',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: '0.5px', background: '#B8965A' }} />
            <span style={{
              fontSize: 9,
              letterSpacing: '0.5em',
              textTransform: 'uppercase',
              color: '#B8965A',
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
            }}>Our Promise</span>
            <div style={{ width: 40, height: '0.5px', background: '#B8965A' }} />
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 400,
            color: '#1a1509',
            lineHeight: 1.2,
            marginBottom: 16,
          }}>
            Crafted with Intention,<br />
            <em style={{ fontStyle: 'italic', color: '#B8965A' }}>Worn with Pride</em>
          </h2>
          <p style={{
            fontSize: 13,
            color: '#888',
            fontWeight: 300,
            letterSpacing: '0.3px',
            maxWidth: 480,
            margin: '0 auto',
            lineHeight: 1.8,
          }}>
            Every House of Nanda piece is a commitment — to craft, to heritage, and to you.
          </p>
        </div>

        {/* Values Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 2,
        }}>
          {VALUES.map((v, i) => (
            <div key={v.title} style={{
              padding: '40px 36px',
              background: i % 2 === 0 ? '#fff' : '#F8F5F0',
              borderTop: '1px solid #e8e0d0',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(24px)',
              transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
            }}>
              <div style={{
                fontSize: 22,
                color: '#B8965A',
                marginBottom: 20,
                fontFamily: "'Cormorant Garamond', serif",
              }}>{v.icon}</div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 20,
                fontWeight: 500,
                color: '#1a1509',
                marginBottom: 12,
                letterSpacing: '0.02em',
              }}>{v.title}</h3>
              <p style={{
                fontSize: 12,
                color: '#888',
                lineHeight: 1.8,
                fontWeight: 300,
                letterSpacing: '0.2px',
              }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div style={{
        width: '100%',
        height: 1,
        background: 'linear-gradient(to right, transparent, #B8965A40, #B8965A40, transparent)',
      }} />

      {/* ── CRAFTSMANSHIP STORY ── */}
      <div style={{
        background: '#1a1509',
        padding: '96px 48px',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: '0.5px', background: '#B8965A' }} />
              <span style={{
                fontSize: 9,
                letterSpacing: '0.5em',
                textTransform: 'uppercase',
                color: '#B8965A',
                fontFamily: "'Cormorant Garamond', serif",
              }}>The Process</span>
              <div style={{ width: 40, height: '0.5px', background: '#B8965A' }} />
            </div>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 400,
              color: '#f5efe4',
              lineHeight: 1.2,
            }}>
              From the Hills of Uttarakhand<br />
              <em style={{ fontStyle: 'italic', color: '#B8965A' }}>to Your Hands</em>
            </h2>
          </div>

          {/* Steps */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 0,
            position: 'relative',
          }}>
            {/* Connecting line */}
            <div style={{
              position: 'absolute',
              top: 28,
              left: '12.5%',
              right: '12.5%',
              height: '0.5px',
              background: 'rgba(184,150,90,0.3)',
              display: 'none',
            }} />

            {STORY.map((s, i) => (
              <div key={s.step} style={{
                padding: '40px 32px',
                borderLeft: i > 0 ? '1px solid rgba(184,150,90,0.15)' : 'none',
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(32px)',
                transition: `opacity 0.7s ease ${0.3 + i * 0.15}s, transform 0.7s ease ${0.3 + i * 0.15}s`,
              }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 11,
                  letterSpacing: '0.4em',
                  color: 'rgba(184,150,90,0.5)',
                  marginBottom: 20,
                  textTransform: 'uppercase',
                }}>{s.step}</div>

                <div style={{
                  width: 32,
                  height: 32,
                  border: '1px solid rgba(184,150,90,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 24,
                  transform: 'rotate(45deg)',
                }}>
                  <div style={{
                    width: 6,
                    height: 6,
                    background: '#B8965A',
                    opacity: 0.8,
                  }} />
                </div>

                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 22,
                  fontWeight: 400,
                  color: '#f5efe4',
                  marginBottom: 16,
                  letterSpacing: '0.02em',
                }}>{s.title}</h3>

                <p style={{
                  fontSize: 12,
                  color: 'rgba(245,239,228,0.45)',
                  lineHeight: 1.9,
                  fontWeight: 300,
                  letterSpacing: '0.2px',
                }}>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom quote */}
          <div style={{
            textAlign: 'center',
            marginTop: 72,
            paddingTop: 48,
            borderTop: '1px solid rgba(184,150,90,0.15)',
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(18px, 2vw, 24px)',
              fontStyle: 'italic',
              color: 'rgba(245,239,228,0.5)',
              fontWeight: 300,
              letterSpacing: '0.05em',
              lineHeight: 1.6,
              maxWidth: 600,
              margin: '0 auto 32px',
            }}>
              "We don't make jewellery. We make heirlooms."
            </p>
            <a href="/about" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 9,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: '#B8965A',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(184,150,90,0.4)',
              paddingBottom: 4,
              transition: 'opacity 0.3s',
            }}>
              Our Story →
            </a>
          </div>
        </div>
      </div>

    </section>
  )
}