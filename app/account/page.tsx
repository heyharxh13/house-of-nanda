'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export default function AccountPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [focused, setFocused] = useState('')
  const [user, setUser] = useState<any>(null)
  const [orders, setOrders] = useState<any[]>([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => { setTimeout(() => setVisible(true), 50) }, [])

  useEffect(() => {
    const stored = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    if (stored && token) {
      setUser(JSON.parse(stored))
      loadOrders(token)
    }
  }, [])

  const loadOrders = async (token: string) => {
    setOrdersLoading(true)
    try {
      const res = await fetch(`${API}/orders`, { headers: { Authorization: `Bearer ${token}` } })
      const data = await res.json()
      setOrders(Array.isArray(data) ? data : [])
    } catch { setOrders([]) }
    finally { setOrdersLoading(false) }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async () => {
    setLoading(true); setError('')
    try {
      const url = isLogin ? `${API}/auth/login` : `${API}/auth/register`
      const body = isLogin
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password }
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const data = await res.json()
      if (data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
         document.cookie = `token=${data.token}; path=/; max-age=604800`
        setUser(data.user)
        loadOrders(data.token)
      } else { setError(data.message || 'Invalid credentials') }
    } catch { setError('Unable to connect to server') }
    finally { setLoading(false) }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    document.cookie = 'token=; path=/; max-age=0'
    setUser(null); setOrders([])
  }

  const STATUS_CONFIG: Record<string, { label: string; dot: string }> = {
    pending:    { label: 'Pending',    dot: '#f59e0b' },
    confirmed:  { label: 'Confirmed',  dot: '#3b82f6' },
    processing: { label: 'Processing', dot: '#8b5cf6' },
    shipped:    { label: 'Shipped',    dot: '#06b6d4' },
    delivered:  { label: 'Delivered',  dot: '#10b981' },
    cancelled:  { label: 'Cancelled',  dot: '#ef4444' },
  }

  const deliveredCount = orders.filter(o => o.status === 'delivered').length

  // ── DASHBOARD ─────────────────────────────────────────────────
  if (user) return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .acc { min-height: 100vh; background: #F5F0E8; font-family: 'Jost', sans-serif; }

        /* NAV */
        .acc-nav {
          background: #0E0C07;
          padding: 0 48px;
          height: 64px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 50;
        }
        @media(max-width:600px){ .acc-nav { padding: 0 20px; } }
        .acc-nav-brand {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          letter-spacing: 4px;
          color: #F5F0E8;
          text-decoration: none;
          text-transform: uppercase;
        }
        .acc-nav-right { display: flex; align-items: center; gap: 20px; }
        .acc-nav-shop {
          font-size: 9px; letter-spacing: 3px;
          color: #C9A84C; text-decoration: none; text-transform: uppercase;
          opacity: 0.8; transition: opacity 0.2s;
        }
        .acc-nav-shop:hover { opacity: 1; }
        .acc-nav-logout {
          background: transparent;
          border: 1px solid rgba(201,168,76,0.3);
          color: #C9A84C;
          font-family: 'Jost', sans-serif;
          font-size: 9px; letter-spacing: 3px;
          text-transform: uppercase;
          padding: 7px 18px; cursor: pointer;
          transition: all 0.3s;
        }
        .acc-nav-logout:hover { background: rgba(201,168,76,0.1); border-color: #C9A84C; }

        /* HERO */
        .acc-hero {
          background: linear-gradient(160deg, #0E0C07 0%, #1C1608 60%, #251D09 100%);
          padding: 64px 48px 72px;
          position: relative;
          overflow: hidden;
        }
        @media(max-width:600px){ .acc-hero { padding: 48px 20px 56px; } }
        .acc-hero::before {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .acc-hero::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent);
        }
        .acc-hero-eyebrow {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 20px;
        }
        .acc-hero-eyebrow-line { width: 28px; height: 1px; background: #C9A84C; opacity: 0.6; }
        .acc-hero-eyebrow span {
          font-size: 9px; letter-spacing: 4px;
          color: #C9A84C; text-transform: uppercase;
          font-weight: 300; opacity: 0.8;
        }
        .acc-hero-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(40px, 6vw, 64px);
          font-weight: 300;
          color: #F5F0E8;
          line-height: 1.05;
          margin-bottom: 8px;
        }
        .acc-hero-name em { font-style: italic; color: #C9A84C; }
        .acc-hero-email {
          font-size: 12px; font-weight: 300;
          color: rgba(245,240,232,0.35);
          letter-spacing: 0.5px;
          margin-bottom: 48px;
        }
        .acc-hero-stats {
          display: flex; gap: 48px;
        }
        .acc-hero-stat {}
        .acc-hero-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 40px; font-weight: 300;
          color: #C9A84C; line-height: 1;
          margin-bottom: 6px;
        }
        .acc-hero-stat-label {
          font-size: 9px; letter-spacing: 3px;
          color: rgba(245,240,232,0.4);
          text-transform: uppercase;
        }
        .acc-hero-divider { width: 1px; background: rgba(245,240,232,0.1); align-self: stretch; }

        /* LINKS GRID */
        .acc-links {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: #E0D8CA;
          border-bottom: 1px solid #E0D8CA;
        }
        @media(max-width:700px){ .acc-links { grid-template-columns: repeat(2,1fr); } }
        .acc-link {
          background: #F5F0E8;
          padding: 32px 28px;
          text-decoration: none;
          display: flex; flex-direction: column; gap: 16px;
          transition: background 0.25s;
          position: relative;
          overflow: hidden;
        }
        .acc-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 28px; right: 28px;
          height: 1px;
          background: #C9A84C;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }
        .acc-link:hover { background: #EDE6D8; }
        .acc-link:hover::after { transform: scaleX(1); }
        .acc-link-icon { font-size: 24px; }
        .acc-link-label {
          font-size: 10px; letter-spacing: 3px;
          color: #1A1509; text-transform: uppercase;
          font-weight: 500;
        }
        .acc-link-desc {
          font-size: 11px; font-weight: 300;
          color: #8C8270; line-height: 1.5;
        }
        .acc-link-arrow {
          font-size: 16px; color: #C9A84C;
          position: absolute; bottom: 28px; right: 28px;
          opacity: 0; transform: translateX(-6px);
          transition: all 0.3s;
        }
        .acc-link:hover .acc-link-arrow { opacity: 1; transform: translateX(0); }

        /* ORDERS SECTION */
        .acc-main { max-width: 860px; margin: 0 auto; padding: 56px 24px; }
        .acc-section-head {
          display: flex; align-items: baseline;
          justify-content: space-between;
          margin-bottom: 28px;
        }
        .acc-section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px; font-weight: 400;
          color: #1A1509;
        }
        .acc-view-all {
          font-size: 9px; letter-spacing: 3px;
          color: #C9A84C; text-decoration: none;
          text-transform: uppercase;
          transition: opacity 0.2s;
        }
        .acc-view-all:hover { opacity: 0.7; }

        /* ORDER CARD */
        .acc-order {
          background: #fff;
          border: 1px solid #E5DDD0;
          margin-bottom: 16px;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .acc-order:hover {
          border-color: rgba(201,168,76,0.4);
          box-shadow: 0 4px 24px rgba(201,168,76,0.08);
        }
        .acc-order-head {
          padding: 20px 24px;
          display: flex; align-items: center;
          justify-content: space-between; gap: 16px;
          border-bottom: 1px solid #F0E8DC;
          flex-wrap: wrap;
        }
        .acc-order-id {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px; font-weight: 400; color: #1A1509;
        }
        .acc-order-date {
          font-size: 11px; color: #A0957E; font-weight: 300;
          margin-top: 2px;
        }
        .acc-order-status {
          display: flex; align-items: center; gap: 7px;
          font-size: 10px; letter-spacing: 2px;
          text-transform: uppercase; font-weight: 500;
        }
        .acc-order-status-dot {
          width: 6px; height: 6px; border-radius: 50%;
        }
        .acc-order-body { padding: 20px 24px; }
        .acc-order-items { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
        .acc-order-item {
          display: flex; justify-content: space-between;
          font-size: 13px; color: #5C5142; font-weight: 300;
        }
        .acc-order-item-name { flex: 1; }
        .acc-order-item-price { color: #1A1509; font-weight: 400; }
        .acc-order-foot {
          display: flex; justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid #F0E8DC;
        }
        .acc-order-count { font-size: 11px; color: #A0957E; font-weight: 300; }
        .acc-order-total {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px; color: #1A1509; font-weight: 400;
        }
        .acc-order-total span { color: #C9A84C; margin-right: 6px; font-size: 14px; }

        /* EMPTY */
        .acc-empty {
          text-align: center; padding: 80px 24px;
          background: #fff; border: 1px solid #E5DDD0;
        }
        .acc-empty-icon { font-size: 40px; margin-bottom: 20px; opacity: 0.4; }
        .acc-empty-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px; font-weight: 400; color: #1A1509;
          margin-bottom: 10px;
        }
        .acc-empty-desc { font-size: 12px; color: #A0957E; font-weight: 300; margin-bottom: 28px; }
        .acc-empty-btn {
          display: inline-block;
          background: #1A1509; color: #F5F0E8;
          font-family: 'Jost', sans-serif;
          font-size: 9px; letter-spacing: 5px;
          text-transform: uppercase;
          padding: 16px 40px;
          text-decoration: none;
          transition: background 0.3s;
        }
        .acc-empty-btn:hover { background: #2A220D; }

        /* FADE IN */
        .acc-fade { opacity: 0; transform: translateY(16px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .acc-fade.in { opacity: 1; transform: translateY(0); }
        .acc-fade-1 { transition-delay: 0.1s; }
        .acc-fade-2 { transition-delay: 0.2s; }
        .acc-fade-3 { transition-delay: 0.3s; }
        .acc-fade-4 { transition-delay: 0.4s; }
      `}</style>

      <div className="acc">
        {/* Nav */}
        <nav className="acc-nav">
          <Link href="/" className="acc-nav-brand">House of Nanda</Link>
          <div className="acc-nav-right">
            <Link href="/" className="acc-nav-shop">← Shop</Link>
            <button className="acc-nav-logout" onClick={handleLogout}>Logout</button>
          </div>
        </nav>

        {/* Hero */}
        <div className={`acc-hero acc-fade acc-fade-1 ${visible ? 'in' : ''}`}>
          <div className="acc-hero-eyebrow">
            <div className="acc-hero-eyebrow-line" />
            <span>My Account</span>
          </div>
          <h1 className="acc-hero-name">
            Welcome, <em>{user.name?.split(' ')[0] || 'back'}</em>
          </h1>
          <p className="acc-hero-email">{user.email}</p>
          <div className="acc-hero-stats">
            <div className="acc-hero-stat">
              <div className="acc-hero-stat-num">{orders.length}</div>
              <div className="acc-hero-stat-label">Orders</div>
            </div>
            <div className="acc-hero-divider" />
            <div className="acc-hero-stat">
              <div className="acc-hero-stat-num">{deliveredCount}</div>
              <div className="acc-hero-stat-label">Delivered</div>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className={`acc-links acc-fade acc-fade-2 ${visible ? 'in' : ''}`}>
          {[
            { href: '/account/orders',    icon: '📦', label: 'My Orders',   desc: 'Track & manage your orders' },
            { href: '/wishlist',           icon: '🤍', label: 'Wishlist',    desc: 'Your saved pieces' },
            { href: '/account/addresses', icon: '📍', label: 'Addresses',   desc: 'Manage delivery addresses' },
            { href: '/',                   icon: '✦',  label: 'Shop Now',    desc: 'Explore new collections' },
          ].map(({ href, icon, label, desc }) => (
            <Link key={href} href={href} className="acc-link">
              <div className="acc-link-icon">{icon}</div>
              <div>
                <div className="acc-link-label">{label}</div>
                <div className="acc-link-desc">{desc}</div>
              </div>
              <span className="acc-link-arrow">→</span>
            </Link>
          ))}
        </div>

        {/* Orders */}
        <main className="acc-main">
          <div className={`acc-fade acc-fade-3 ${visible ? 'in' : ''}`}>
            <div className="acc-section-head">
              <h2 className="acc-section-title">Recent Orders</h2>
              {orders.length > 0 && (
                <Link href="/account/orders" className="acc-view-all">View All →</Link>
              )}
            </div>

            {ordersLoading ? (
              <div style={{ textAlign: 'center', padding: '60px', color: '#A0957E', fontSize: '12px', letterSpacing: '2px' }}>
                LOADING...
              </div>
            ) : orders.length === 0 ? (
              <div className="acc-empty">
                <div className="acc-empty-icon">🛍️</div>
                <h3 className="acc-empty-title">No orders yet</h3>
                <p className="acc-empty-desc">Your orders will appear here once you place them.</p>
                <Link href="/" className="acc-empty-btn">Explore Collection</Link>
              </div>
            ) : (
              orders.slice(0, 5).map((order, i) => {
                const st = STATUS_CONFIG[order.status] || { label: order.status, dot: '#888' }
                return (
                  <div key={order.id} className={`acc-order acc-fade acc-fade-${Math.min(i + 3, 4)} ${visible ? 'in' : ''}`}>
                    <div className="acc-order-head">
                      <div>
                        <div className="acc-order-id">Order #{String(order.id).padStart(4, '0')}</div>
                        <div className="acc-order-date">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                      </div>
                      <div className="acc-order-status" style={{ color: st.dot }}>
                        <div className="acc-order-status-dot" style={{ background: st.dot }} />
                        {st.label}
                      </div>
                    </div>
                    <div className="acc-order-body">
                      <div className="acc-order-items">
                        {order.items?.slice(0, 2).map((item: any) => (
                          <div key={item.id} className="acc-order-item">
                            <span className="acc-order-item-name">{item.name} × {item.qty}</span>
                            <span className="acc-order-item-price">₹{Number(item.price * item.qty).toLocaleString('en-IN')}</span>
                          </div>
                        ))}
                        {order.items?.length > 2 && (
                          <div className="acc-order-item" style={{ color: '#C9A84C' }}>
                            +{order.items.length - 2} more item{order.items.length - 2 > 1 ? 's' : ''}
                          </div>
                        )}
                      </div>
                      <div className="acc-order-foot">
                        <span className="acc-order-count">{order.items?.length} item{order.items?.length > 1 ? 's' : ''}</span>
                        <div className="acc-order-total">
                          <span>₹</span>{Number(order.total).toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </main>
      </div>
    </>
  )

  // ── LOGIN FORM ─────────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Raleway:wght@200;300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .hon-page { min-height: 100vh; font-family: 'Raleway', sans-serif; background: #f9f6f1; display: grid; grid-template-columns: 1fr 1fr; }
        @media (max-width: 900px) { .hon-page { grid-template-columns: 1fr; } .hon-left { display: none; } }
        .hon-left { position: relative; overflow: hidden; background: #111009; }
        .hon-left-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.35; }
        .hon-left-overlay { position: absolute; inset: 0; background: linear-gradient(to top, #111009 30%, transparent 70%), linear-gradient(to right, #111009 0%, transparent 40%); }
        .hon-left-content { position: absolute; bottom: 0; left: 0; right: 0; padding: 64px 56px; }
        .hon-tag { display: inline-flex; align-items: center; gap: 10px; margin-bottom: 28px; }
        .hon-tag-line { width: 32px; height: 1px; background: #c9a84c; }
        .hon-tag span { font-size: 9px; letter-spacing: 5px; color: #c9a84c; text-transform: uppercase; font-weight: 300; }
        .hon-left-title { font-family: 'Playfair Display', serif; font-size: clamp(38px, 4vw, 58px); font-weight: 400; color: #f5efe4; line-height: 1.15; margin-bottom: 24px; }
        .hon-left-title em { font-style: italic; color: #c9a84c; }
        .hon-left-desc { font-size: 12px; font-weight: 300; color: rgba(245,239,228,0.45); line-height: 2; max-width: 320px; letter-spacing: 0.4px; }
        .hon-left-badges { display: flex; gap: 16px; margin-top: 40px; }
        .hon-badge { border: 1px solid rgba(201,168,76,0.25); padding: 8px 16px; font-size: 8px; letter-spacing: 3px; color: rgba(201,168,76,0.7); text-transform: uppercase; }
        .hon-right { display: flex; align-items: center; justify-content: center; padding: 60px 48px; position: relative; background: #f9f6f1; }
        .hon-right::before { content: ''; position: absolute; top: 40px; bottom: 40px; left: 0; width: 1px; background: linear-gradient(to bottom, transparent, #c9a84c40, #c9a84c40, transparent); }
        .hon-form-wrap { width: 100%; max-width: 420px; }
        .hon-brand { text-align: center; margin-bottom: 52px; }
        .hon-brand-eyebrow { font-size: 8px; letter-spacing: 6px; color: #c9a84c; text-transform: uppercase; font-weight: 300; margin-bottom: 12px; display: flex; align-items: center; justify-content: center; gap: 12px; }
        .hon-brand-eyebrow::before, .hon-brand-eyebrow::after { content: ''; width: 20px; height: 1px; background: #c9a84c; opacity: 0.6; }
        .hon-brand-name { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 400; color: #1a1509; letter-spacing: 4px; text-transform: uppercase; }
        .hon-tabs { display: grid; grid-template-columns: 1fr 1fr; margin-bottom: 44px; border-bottom: 2px solid #e8e0d0; position: relative; }
        .hon-tab { background: none; border: none; padding: 16px; font-family: 'Raleway', sans-serif; font-size: 10px; letter-spacing: 4px; text-transform: uppercase; cursor: pointer; color: #b0a898; transition: color 0.3s; }
        .hon-tab.active { color: #1a1509; }
        .hon-tab-indicator { position: absolute; bottom: -2px; height: 2px; width: 50%; background: #c9a84c; transition: left 0.4s cubic-bezier(0.4,0,0.2,1); }
        .hon-field { margin-bottom: 32px; position: relative; }
        .hon-field label { display: block; font-size: 8px; letter-spacing: 4px; text-transform: uppercase; color: #b0a898; margin-bottom: 12px; }
        .hon-field.focused label { color: #c9a84c; }
        .hon-field input { width: 100%; background: transparent; border: none; border-bottom: 1px solid #d8d0c0; padding: 0 0 14px 0; font-family: 'Raleway', sans-serif; font-size: 15px; font-weight: 300; color: #1a1509; outline: none; transition: border-color 0.3s; }
        .hon-field input:focus { border-bottom-color: #c9a84c; }
        .hon-field input::placeholder { color: #cec8bc; }
        .hon-field-bar { position: absolute; bottom: 0; left: 0; height: 1px; width: 0; background: #c9a84c; transition: width 0.4s ease; }
        .hon-field.focused .hon-field-bar { width: 100%; }
        .hon-error { font-size: 11px; color: #c0392b; margin-bottom: 24px; display: flex; align-items: center; gap: 8px; }
        .hon-error::before { content: '—'; }
        .hon-btn { width: 100%; background: #1a1509; color: #f9f6f1; border: none; padding: 20px; font-family: 'Raleway', sans-serif; font-size: 10px; letter-spacing: 5px; text-transform: uppercase; cursor: pointer; position: relative; overflow: hidden; transition: background 0.3s; margin-bottom: 36px; }
        .hon-btn::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent); transform: translateX(-100%); transition: transform 0.6s ease; }
        .hon-btn:hover::after { transform: translateX(100%); }
        .hon-btn:hover { background: #2a2210; }
        .hon-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .hon-switch { font-size: 11px; color: #b0a898; font-weight: 300; margin-bottom: 28px; text-align: center; }
        .hon-switch button { background: none; border: none; font-family: 'Raleway', sans-serif; font-size: 11px; color: #1a1509; cursor: pointer; font-weight: 500; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: #c9a84c; }
        .hon-divider { display: flex; align-items: center; gap: 16px; margin-bottom: 28px; }
        .hon-divider-line { flex: 1; height: 1px; background: #e8e0d0; }
        .hon-divider span { font-size: 9px; letter-spacing: 2px; color: #c0b8a8; text-transform: uppercase; }
        .hon-back { font-size: 9px; letter-spacing: 4px; color: #b0a898; text-decoration: none; text-transform: uppercase; transition: color 0.3s; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .hon-back:hover { color: #1a1509; }
      `}</style>

      <div className="hon-page">
        <div className="hon-left">
          <img className="hon-left-img" src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80" alt="" />
          <div className="hon-left-overlay" />
          <div className="hon-left-content">
            <div className="hon-tag"><div className="hon-tag-line" /><span>Uttarakhand Heritage</span></div>
            <h2 className="hon-left-title">Crafted in the<br /><em>Hills of Pahad</em></h2>
            <p className="hon-left-desc">Every piece tells a story of ancient craftsmanship, sacred rivers, and the timeless beauty of the Himalayas.</p>
            <div className="hon-left-badges">
              <div className="hon-badge">22KT Gold</div>
              <div className="hon-badge">BIS Hallmark</div>
              <div className="hon-badge">925 Silver</div>
            </div>
          </div>
        </div>

        <div className="hon-right">
          <div className="hon-form-wrap">
            <div className="hon-brand">
              <div className="hon-brand-eyebrow">Fine Jewellery</div>
              <div className="hon-brand-name">House of Nanda</div>
            </div>
            <div className="hon-tabs">
              <button className={`hon-tab ${isLogin ? 'active' : ''}`} onClick={() => setIsLogin(true)}>Sign In</button>
              <button className={`hon-tab ${!isLogin ? 'active' : ''}`} onClick={() => setIsLogin(false)}>Register</button>
              <div className="hon-tab-indicator" style={{ left: isLogin ? '0%' : '50%' }} />
            </div>
            <div key={isLogin ? 'l' : 'r'}>
              {!isLogin && (
                <div className={`hon-field ${focused === 'name' ? 'focused' : ''}`}>
                  <label>Full Name</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} onFocus={() => setFocused('name')} onBlur={() => setFocused('')} placeholder="Priya Sharma" />
                  <div className="hon-field-bar" />
                </div>
              )}
              <div className={`hon-field ${focused === 'email' ? 'focused' : ''}`}>
                <label>Email Address</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} onFocus={() => setFocused('email')} onBlur={() => setFocused('')} placeholder="priya@example.com" />
                <div className="hon-field-bar" />
              </div>
              <div className={`hon-field ${focused === 'password' ? 'focused' : ''}`}>
                <label>Password</label>
                <input type="password" name="password" value={form.password} onChange={handleChange} onFocus={() => setFocused('password')} onBlur={() => setFocused('')} placeholder="••••••••" />
                <div className="hon-field-bar" />
              </div>
            </div>
            {error && <div className="hon-error">{error}</div>}
            <button className="hon-btn" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Please Wait...' : isLogin ? 'Sign In' : 'Create Account'}
            </button>
            <p className="hon-switch">
              {isLogin ? "New here? " : "Already registered? "}
              <button onClick={() => { setIsLogin(!isLogin); setError('') }}>
                {isLogin ? 'Create account' : 'Sign in'}
              </button>
            </p>
            <div className="hon-divider"><div className="hon-divider-line" /><span>or</span><div className="hon-divider-line" /></div>
            <Link href="/" className="hon-back">← Back to Shop</Link>
          </div>
        </div>
      </div>
    </>
  )
}