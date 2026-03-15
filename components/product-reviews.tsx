'use client'

import { useState, useEffect } from 'react'

export default function ProductReviews({ productId }: { productId: string }) {
  const [data, setData] = useState<any>({ reviews: [], average: 0, total: 0 })
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ rating: 5, comment: '' })
  const [submitting, setSubmitting] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`http://localhost:3001/api/reviews/product/${productId}`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
  }, [productId, refresh])

  const handleSubmit = async () => {
    const token = localStorage.getItem('token')
    if (!token) { setError(''); return }
    if (!form.comment.trim()) { setError(''); return }

    setSubmitting(true)
    setError('')

    const res = await fetch(`http://localhost:3001/api/reviews/product/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    })

    const result = await res.json()

    if (res.ok) {
      setSuccess(true)
      setForm({ rating: 5, comment: '' })
      setRefresh(!refresh)
    } else {
      setError(result.message || '')
    }
    setSubmitting(false)
  }

  const StarDisplay = ({ rating, size = 16 }: { rating: number; size?: number }) => (
    <span style={{ color: '#c9a84c', fontSize: `${size}px`, letterSpacing: '2px' }}>
      {[1,2,3,4,5].map(s => s <= Math.round(rating) ? '★' : '☆').join('')}
    </span>
  )

  return (
    <div style={{ marginTop: '64px', paddingTop: '48px', borderTop: '1px solid #e8e0d0', fontFamily: 'inherit', maxWidth: '1200px', margin: '64px auto 0', padding: '48px 48px 0' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
        <div>
          <p style={{ fontSize: '9px', letterSpacing: '4px', color: '#c9a84c', textTransform: 'uppercase', marginBottom: '8px' }}>
            Customer Reviews
          </p>
          <h3 style={{ fontFamily: 'serif', fontSize: '28px', fontWeight: 400, color: '#1a1509' }}>
            
          </h3>
        </div>
        {data.total > 0 && (
          <div style={{ textAlign: 'right' }}>
            <StarDisplay rating={data.average} size={20} />
            <div style={{ fontSize: '28px', fontWeight: 300, color: '#1a1509', marginTop: '4px' }}>
              {data.average} <span style={{ fontSize: '13px', color: '#888' }}>/ 5</span>
            </div>
            <div style={{ fontSize: '11px', color: '#aaa', letterSpacing: '1px' }}>
              {data.total} review{data.total > 1 ? 's' : ''}
            </div>
          </div>
        )}
      </div>

      {/* Reviews */}
      {loading ? (
        <p style={{ color: '#aaa', fontSize: '12px', letterSpacing: '2px' }}>LOADING...</p>
      ) : !data.reviews || data.reviews.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', background: '#f9f6f1', marginBottom: '40px' }}>
          <p style={{ color: '#aaa', fontSize: '13px' }}>
            
          </p>
        </div>
      ) : (
        <div style={{ marginBottom: '48px' }}>
          {data.reviews.map((r: any, i: number) => (
            <div key={r.id} style={{
              padding: '28px 0',
              borderBottom: i < data.reviews.length - 1 ? '1px solid #f0ebe0' : 'none',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      width: '36px', height: '36px', background: '#1a1509', color: '#c9a84c',
                      borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '13px', fontWeight: 500, flexShrink: 0,
                    }}>
                      {r.userName?.charAt(0).toUpperCase()}
                    </span>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: 500, color: '#1a1509' }}>{r.userName}</p>
                      {r.verified && (
                        <p style={{ fontSize: '9px', color: '#10b981', letterSpacing: '2px', textTransform: 'uppercase' }}>
                          ✓ Verified Purchase
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <StarDisplay rating={r.rating} />
                  <p style={{ fontSize: '10px', color: '#bbb', marginTop: '4px' }}>
                    {new Date(r.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.8, paddingLeft: '46px' }}>
                {r.comment}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Write Review */}
      <div style={{ background: '#f9f6f1', border: '1px solid #e8e0d0', padding: '40px' }}>
        <p style={{ fontSize: '9px', letterSpacing: '4px', color: '#c9a84c', textTransform: 'uppercase', marginBottom: '8px' }}>
          Share Your Experience
        </p>
        <h4 style={{ fontFamily: 'serif', fontSize: '22px', fontWeight: 400, color: '#1a1509', marginBottom: '32px' }}>
          Write a Review
        </h4>

        {success && (
          <div style={{ background: '#f0fdf4', border: '1px solid #86efac', padding: '16px', marginBottom: '24px', fontSize: '13px', color: '#166534' }}>
            ✅ Review submitted successfully! Thank you!
          </div>
        )}

        {/* Star Selector */}
        <div style={{ marginBottom: '28px' }}>
          <label style={{ fontSize: '9px', letterSpacing: '3px', color: '#888', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
            Rating
          </label>
          <div style={{ display: 'flex', gap: '4px' }}>
            {[1,2,3,4,5].map(star => (
              <button key={star}
                onClick={() => setForm({...form, rating: star})}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '32px',
                  color: star <= form.rating ? '#c9a84c' : '#ddd',
                  transition: 'color 0.2s', padding: '0 2px' }}>
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div style={{ marginBottom: '28px' }}>
          <label style={{ fontSize: '9px', letterSpacing: '3px', color: '#888', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
            Your Review
          </label>
          <textarea
            value={form.comment}
            onChange={e => { setForm({...form, comment: e.target.value}); setError('') }}
            placeholder="Is product ke baare mein apna experience share karo..."
            rows={4}
            style={{ width: '100%', border: '1px solid #ddd8cc', background: 'white',
              padding: '16px', fontFamily: 'inherit', fontSize: '13px',
              outline: 'none', resize: 'vertical', color: '#1a1509',
              transition: 'border-color 0.3s', lineHeight: 1.7 }}
          />
        </div>

        {error && (
          <p style={{ fontSize: '12px', color: '#dc2626', marginBottom: '20px' }}>
            ⚠️ {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={submitting || !form.comment.trim()}
          style={{ background: '#1a1509', color: '#f9f6f1', border: 'none',
            padding: '18px 48px', fontSize: '10px', letterSpacing: '4px',
            textTransform: 'uppercase', cursor: 'pointer',
            opacity: submitting || !form.comment.trim() ? 0.5 : 1,
            transition: 'background 0.3s' }}>
          {submitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </div>

    </div>
  )
}