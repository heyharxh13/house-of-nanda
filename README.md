# 🪬 House of Nanda

A full-stack e-commerce platform for a premium jewellery brand, built with **Next.js 16** on the frontend and **NestJS + MySQL** on the backend. The project features a rich storefront, cart & wishlist management, Razorpay payment integration, an admin dashboard, and email/newsletter support.

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.1.6 | React framework (App Router) |
| React | 19 | UI library |
| TypeScript | 5.7 | Type safety |
| Tailwind CSS | 4 | Styling |
| shadcn/ui + Radix UI | — | Component library |
| React Hook Form + Zod | — | Form validation |
| Lucide React | — | Icons |
| next-themes | — | Dark/light mode |
| Vercel Analytics | — | Usage analytics |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| NestJS | 10 | Node.js framework |
| TypeORM | 0.3 | ORM |
| MySQL | — | Database |
| JWT + Passport | — | Authentication |
| Razorpay | — | Payment gateway |
| Nodemailer | — | Transactional emails |
| Mailchimp | — | Newsletter subscriptions |
| bcryptjs | — | Password hashing |

---

## Project Structure

```
house-of-nanda-main/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Home page
│   ├── layout.tsx              # Root layout
│   ├── about/                  # About page
│   ├── shop/                   # Shop listing
│   ├── products/[slug]/        # Product detail
│   ├── category/[slug]/        # Category browse
│   ├── collections/[id]/       # Collection browse
│   ├── gold-jewellery/         # Gold jewellery page
│   ├── silver-jewellery/       # Silver jewellery page
│   ├── men/                    # Men's jewellery
│   ├── wishlist/               # Wishlist page
│   ├── account/                # User account & orders
│   ├── admin/                  # Admin dashboard
│   ├── track/                  # Order tracking
│   ├── contact/                # Contact page
│   ├── faq/                    # FAQ page
│   ├── care/                   # Jewellery care guide
│   └── api/products/           # Next.js API routes
│
├── components/                 # Reusable React components
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── hero.tsx
│   ├── cart-drawer.tsx
│   ├── product-card.tsx
│   ├── product-reviews.tsx
│   ├── bestseller-grid.tsx
│   ├── category-section.tsx
│   ├── collections.tsx
│   ├── testimonials.tsx
│   ├── newsletter.tsx
│   └── ui/                     # shadcn/ui primitives
│
├── context/                    # React context providers
│   ├── auth-context.tsx
│   ├── cart-context.tsx
│   └── wishlist-context.tsx
│
├── lib/                        # Utilities & API client
│   ├── api.ts
│   ├── cart-service.ts
│   ├── data.ts
│   └── utils.ts
│
├── hooks/                      # Custom React hooks
│   ├── use-mobile.ts
│   └── use-toast.ts
│
├── public/images/              # Static product & category images
│
└── hon-backend/hon-backend/    # NestJS backend
    └── src/
        ├── auth/               # JWT auth, admin guard
        ├── users/              # User CRUD
        ├── products/           # Product management
        ├── categories/         # Category management
        ├── collections/        # Collection management
        ├── cart/               # Cart & cart items
        ├── wishlist/           # Wishlist
        ├── orders/             # Orders & order items
        ├── addresses/          # User addresses
        ├── payments/           # Razorpay integration
        ├── reviews/            # Product reviews
        ├── testimonials/       # Testimonials
        ├── newsletter/         # Newsletter subscriptions
        ├── faq/                # FAQ entries
        ├── mail/               # Email service
        └── database/           # DB module & seed script
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MySQL 8+
- npm or yarn

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/house-of-nanda.git
cd house-of-nanda
```

---

### 2. Backend Setup

```bash
cd hon-backend/hon-backend
```

**Install dependencies:**
```bash
npm install
```

**Create your `.env` file:**
```bash
cp .env.example .env
```

**Fill in the environment variables:**
```env
# App
PORT=3001
NODE_ENV=development

# MySQL Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=house_of_nanda

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Frontend URL (CORS)
FRONTEND_URL=http://localhost:3000
```

**Create the MySQL database:**
```sql
CREATE DATABASE house_of_nanda;
```

**Seed the database (optional):**
```bash
npm run seed
```

**Start the backend:**
```bash
# Development (with watch mode)
npm run start:dev

# Production
npm run build
npm run start
```

The API will be available at `http://localhost:3001/api`.

---

### 3. Frontend Setup

From the project root:

```bash
npm install
```

Create a `.env.local` file and point it at your backend:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

**Start the frontend:**
```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## API Overview

All backend routes are prefixed with `/api`.

| Module | Base Route | Description |
|---|---|---|
| Auth | `/api/auth` | Register, login, JWT |
| Users | `/api/users` | User profile management |
| Products | `/api/products` | Product CRUD |
| Categories | `/api/categories` | Category management |
| Collections | `/api/collections` | Collection management |
| Cart | `/api/cart` | Cart & cart items |
| Wishlist | `/api/wishlist` | Wishlist management |
| Orders | `/api/orders` | Order placement & tracking |
| Addresses | `/api/addresses` | Saved addresses |
| Payments | `/api/payments` | Razorpay order creation & verification |
| Reviews | `/api/reviews` | Product reviews |
| Testimonials | `/api/testimonials` | Storefront testimonials |
| Newsletter | `/api/newsletter` | Email subscriptions |
| FAQ | `/api/faq` | FAQ entries |

---

## Key Features

- **Product Catalogue** — Browse by category (rings, earrings, necklaces, bracelets, anklets), collection (gold, silver, diamond), or gender (women / men)
- **Product Detail** — Rich product pages with image gallery, size/variant selection, and customer reviews
- **Cart & Wishlist** — Persistent cart and wishlist backed by the API, with a slide-out cart drawer
- **Authentication** — JWT-based auth with protected routes via Next.js middleware
- **Checkout & Payments** — Razorpay integration for Indian payments (UPI, cards, net banking)
- **Order Tracking** — Post-purchase order status tracking
- **User Account** — Saved addresses, order history, and profile management
- **Admin Dashboard** — Manage products, orders, users, and reviews
- **Newsletter** — Mailchimp-powered newsletter subscription
- **Email Notifications** — Transactional emails via Nodemailer
- **Dark Mode** — Full light/dark theme support via `next-themes`

---

## Available Scripts

### Frontend

| Script | Description |
|---|---|
| `npm run dev` | Start Next.js in development mode |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

### Backend

| Script | Description |
|---|---|
| `npm run start:dev` | Start NestJS with file watching |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run start` | Start compiled production server |
| `npm run seed` | Seed the database with initial data |
| `npm run lint` | Run ESLint on `src/` |

---

## Deployment

### Frontend — Vercel (recommended)

1. Push the repo to GitHub.
2. Import the project on [vercel.com](https://vercel.com).
3. Set `NEXT_PUBLIC_API_URL` in Vercel environment variables.
4. Deploy.

### Backend — Any Node.js host (Railway, Render, EC2, etc.)

1. Set all environment variables on your host.
2. Run `npm run build` then `npm run start`.
3. Make sure MySQL is accessible from the host.
4. Update `FRONTEND_URL` in the backend `.env` to match your deployed frontend URL.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

This project is private and proprietary to House of Nanda. All rights reserved.****
