import { query } from "@/lib/db"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProductCard } from "@/components/product-card"
import { Footer } from "@/components/footer"
import type { Product } from "@/lib/types"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const products = await query(
      "SELECT * FROM products WHERE featured = 1 ORDER BY created_at DESC LIMIT 8"
    ) as Product[];
    
    return products || [];
  } catch (error) {
    console.error("Error fetching products from MySQL:", error);
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()
  
  const smartphones = featuredProducts.filter((p) => p.category === "smartphone")
  const laptops = featuredProducts.filter((p) => p.category === "laptop")
  const audio = featuredProducts.filter((p) => p.category === "audio")

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Hero Section - Featuring a top-tier Android phone for a change */}
      <HeroSection
        subtitle="Innovation 2024"
        title="Galaxy S24 Ultra"
        description="Entrez dans l'ère de la Galaxy AI. Un design en titane, un appareil photo révolutionnaire."
        image="/samsung s24.jpeg"
        primaryLink={{ text: "Acheter maintenant", href: "/smartphones/samsung-galaxy-s24-ultra" }}
        secondaryLink={{ text: "En savoir plus", href: "/smartphones" }}
      />

      {/* Categories Sections */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        {/* Smartphones Section */}
        {smartphones.length > 0 && (
          <div className="mb-24">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold mb-4">Smartphones</h2>
                <p className="text-muted-foreground">Le meilleur de l'innovation mobile, d'Android à iOS.</p>
              </div>
              <Link href="/smartphones" className="text-primary font-bold hover:underline flex items-center gap-2">
                Tout voir <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {smartphones.map((product) => (
                <ProductCard key={product.id} product={product} variant="featured" />
              ))}
            </div>
          </div>
        )}

        {/* Laptops Section */}
        {laptops.length > 0 && (
          <div className="mb-24">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold mb-4">Ordinateurs</h2>
                <p className="text-muted-foreground">Des performances extrêmes pour les pros et les créatifs.</p>
              </div>
              <Link href="/laptops" className="text-primary font-bold hover:underline flex items-center gap-2">
                Tout voir <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {laptops.map((product) => (
                <ProductCard key={product.id} product={product} variant="featured" />
              ))}
            </div>
          </div>
        )}

        {/* Audio Section */}
        {audio.length > 0 && (
          <div>
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold mb-4">Audio & Musique</h2>
                <p className="text-muted-foreground">Une qualité sonore sans compromis.</p>
              </div>
              <Link href="/audio" className="text-primary font-bold hover:underline flex items-center gap-2">
                Tout voir <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {audio.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
