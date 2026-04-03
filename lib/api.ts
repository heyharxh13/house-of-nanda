const API = process.env.NEXT_PUBLIC_API_URL || 'http://https://house-of-nanda.onrender.com/api/api'

// ── Products ──────────────────────────────────────────────────────────────────
export async function fetchProducts(filters?: {
  category?: string
  gender?: string
  collection?: string
  search?: string
}) {
  const params = new URLSearchParams()
  if (filters?.category) params.set('category', filters.category)
  if (filters?.gender) params.set('gender', filters.gender)
  if (filters?.collection) params.set('collection', filters.collection)
  if (filters?.search) params.set('search', filters.search)
  const res = await fetch(`${API}/products?${params}`)
  return res.json()
}

export async function fetchProductBySlug(slug: string) {
  const res = await fetch(`${API}/products/slug/${slug}`)
  return res.json()
}

export async function fetchBestsellers() {
  const res = await fetch(`${API}/products/bestsellers`)
  return res.json()
}

export async function fetchRelatedProducts(id: string) {
  const res = await fetch(`${API}/products/${id}/related`)
  return res.json()
}

// ── Categories ────────────────────────────────────────────────────────────────
export async function fetchCategories(gender?: string) {
  const url = gender ? `${API}/categories?gender=${gender}` : `${API}/categories`
  const res = await fetch(url)
  return res.json()
}

// ── Collections ───────────────────────────────────────────────────────────────
export async function fetchCollections(gender?: string) {
  const url = gender ? `${API}/collections?gender=${gender}` : `${API}/collections`
  const res = await fetch(url)
  return res.json()
}

// ── Testimonials ──────────────────────────────────────────────────────────────
export async function fetchTestimonials() {
  const res = await fetch(`${API}/testimonials`)
  return res.json()
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
export async function fetchFAQ() {
  const res = await fetch(`${API}/faq`)
  return res.json()
}

// ── Auth ──────────────────────────────────────────────────────────────────────
export async function login(email: string, password: string) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  return res.json()
}

export async function register(name: string, email: string, password: string) {
  const res = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })
  return res.json()
}

// ── Cart ──────────────────────────────────────────────────────────────────────
export async function fetchCart(token: string) {
  const res = await fetch(`${API}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json()
}

export async function addToCart(token: string, productId: string, quantity: number, size?: string) {
  const res = await fetch(`${API}/cart/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity, size }),
  })
  return res.json()
}

// ── Wishlist ──────────────────────────────────────────────────────────────────
export async function fetchWishlist(token: string) {
  const res = await fetch(`${API}/wishlist`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json()
}

export async function toggleWishlist(token: string, productId: string) {
  const res = await fetch(`${API}/wishlist/${productId}/toggle`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json()
}

// ── Orders ────────────────────────────────────────────────────────────────────
export async function fetchOrders(token: string) {
  const res = await fetch(`${API}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.json()
}

export async function placeOrder(token: string, orderData: object) {
  const res = await fetch(`${API}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  })
  return res.json()
}