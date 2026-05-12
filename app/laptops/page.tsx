import { query } from "@/lib/db"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { Footer } from "@/components/footer"
import type { Product } from "@/lib/types"

async function getLaptops(): Promise<Product[]> {
  try {
    const products = await query(
      "SELECT * FROM products WHERE category = 'laptop' ORDER BY created_at DESC"
    ) as Product[];
    
    return products || [];
  } catch (error) {
    console.error("Error fetching laptops from MySQL:", error);
    return [];
  }
}

export const metadata = {
  title: "Ordinateurs - WockyTech Store",
  description: "Découvrez notre sélection de laptops Windows et Mac.",
}

export default async function LaptopsPage() {
  const products = await getLaptops()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-40 pb-16 bg-background">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-wider uppercase">
            Performance sans limite
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
            Ordinateurs <span className="text-primary">&</span> Laptops
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
            De la productivité pure au gaming extrême, trouvez la machine qui vous correspond.
          </p>
        </div>
      </section>

      <section className="pb-20 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} variant="featured" />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
