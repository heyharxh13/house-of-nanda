'use client'

import { useState } from 'react'

interface CheckoutButtonProps {
  amount: number
  token: string
  onSuccess: (paymentId: string) => void
}

export default function CheckoutButton({ amount, token, onSuccess }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)
    try {
      // Step 1 — Backend se Razorpay order banao
      const res = await fetch('http://localhost:3001/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount }),
      })
      const order = await res.json()

      // Step 2 — Razorpay checkout open karo
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'House of Nanda',
        description: 'Fine Jewellery',
        order_id: order.id,
        handler: async (response: any) => {
          // Step 3 — Payment verify karo
          const verifyRes = await fetch('http://localhost:3001/api/payments/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(response),
          })
          const verify = await verifyRes.json()
          if (verify.verified) {
            onSuccess(verify.paymentId)
          }
        },
        prefill: {
          name: 'Customer',
          email: 'customer@example.com',
        },
        theme: {
          color: '#000000',
        },
      }

      const rzp = new (window as any).Razorpay(options)
      rzp.open()
    } catch (err) {
      console.error('Payment error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full bg-black text-white py-4 text-sm tracking-widest hover:bg-stone-800 transition-colors"
    >
      {loading ? 'PROCESSING...' : `PROCEED TO CHECKOUT — ₹${amount.toLocaleString('en-IN')}`}
    </button>
  )
}