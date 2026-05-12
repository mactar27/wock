import { query } from "@/lib/db"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { Footer } from "@/components/footer"
import type { Product } from "@/lib/types"

async function getAccessories(): Promise<Product[]> {
  try {
    const products = await query(
      "SELECT * FROM products WHERE category = 'accessory' ORDER BY created_at DESC"
    ) as Product[];
    
    return products || [];
  } catch (error) {
    console.error("Error fetching accessories from MySQL:", error);
    return [];
  }
}

export const metadata = {
  title: "Accessories - Apple Store",
  description: "Shop Apple accessories including AirPods, Apple Watch, and more.",
}

export default async function AccessoriesPage() {
  const products = await getAccessories()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="pt-24 pb-16 bg-background">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground">
            Accessories
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Explore Icons that Icons perfectly with your Apple devices.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-20 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No accessories available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
