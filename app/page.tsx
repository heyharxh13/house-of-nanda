import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Marquee from "@/components/marquee"
import BestsellerGrid from "@/components/bestseller-grid"
import Lookbook from "@/components/lookbook"
import CraftSection from "@/components/craft-section"
import CategoryShowcase from "@/components/category-showcase"
import StartupStory from "@/components/startup-story"
import Testimonials from "@/components/testimonials"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"
import CartDrawer from "@/components/cart-drawer"

export const metadata = {
  title: "House of Nanda — Fine Jewellery from Kumaon | Silver, Gold & Lab Diamonds",
  description: "Fine jewellery rooted in the craft traditions of Kumaon, Uttarakhand. 925 sterling silver, 22KT hallmarked gold, IGI certified lab diamonds. Handcrafted. Certified. Built to endure.",
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* 1 — Full-screen cinematic hero */}
        <Hero />

        {/* 2 — Credential ticker */}
        <Marquee />

        {/* 3 — Product grid — silver / men / gold tabs */}
        <BestsellerGrid />

        {/* 4 — Editorial three-panel lookbook */}
        <Lookbook />

        {/* 5 — Dark category tiles */}
        <CategoryShowcase />

        {/* 6 — Craft / process + image */}
        <CraftSection />

        {/* 7 — Brand story + founder + pillars */}
        <StartupStory />

        {/* 8 — Testimonials rotating */}
        <Testimonials />

        {/* 9 — Split newsletter */}
        <Newsletter />
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
