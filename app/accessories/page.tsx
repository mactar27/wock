import { query } from "@/lib/db"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { Footer } from "@/components/footer"
import type { Product } from "@/lib/types"

async function getAccessories(): Promise<Product[]> {
  try {
    const products = await query(
      "SELECT * FROM products WHERE category IN ('accessory', 'audio') ORDER BY created_at DESC"
    ) as Product[];
    
    return products || [];
  } catch (error) {
    console.error("Error fetching accessories from MySQL:", error);
    return [];
  }
}

export const metadata = {
  title: "Accessoires - Revotex Store",
  description: "Complétez votre écosystème avec nos accessoires premium.",
}

export default async function AccessoriesPage() {
  const products = await getAccessories()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-40 pb-16 bg-background">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-wider uppercase">
            L'Essentiel du Quotidien
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
            <span className="text-primary">Accessoires</span> <span className="text-muted-foreground/30">&</span> <span className="text-accent">Plus</span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
            Des détails qui font toute la différence pour vos appareils préférés.
          </p>
        </div>
      </section>

      <section className="pb-20 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          {products.length === 0 ? (
            <div className="text-center py-20 bg-card/50 border border-white/10 rounded-3xl">
              <p className="text-muted-foreground">Aucun accessoire disponible pour le moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} variant="featured" />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
