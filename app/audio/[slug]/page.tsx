import { query } from "@/lib/db"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetail } from "@/components/product-detail"
import { notFound } from "next/navigation"
import type { Product } from "@/lib/types"

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const products = await query(
      "SELECT * FROM products WHERE slug = ? AND category = 'audio' LIMIT 1",
      [slug]
    ) as Product[];
    
    return products[0] || null;
  } catch (error) {
    console.error("Error fetching audio product:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)
  if (!product) return { title: "Produit non trouvé" }
  
  return {
    title: `${product.name} - Audio - Revotex`,
    description: product.description,
  }
}

export default async function AudioProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)
  
  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <ProductDetail product={product} />
      </main>
      <Footer />
    </div>
  )
}
