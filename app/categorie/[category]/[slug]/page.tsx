import { query } from "@/lib/db"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetail } from "@/components/product-detail"
import { notFound } from "next/navigation"
import type { Product } from "@/lib/types"

interface PageProps {
  params: Promise<{ category: string; slug: string }>
}

async function getProduct(category: string, slug: string): Promise<Product | null> {
  try {
    const products = await query(
      "SELECT * FROM products WHERE slug = ? AND category = ? LIMIT 1",
      [slug, category]
    ) as Product[]
    return products[0] || null
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { category, slug } = await params
  const product = await getProduct(category, slug)
  if (!product) return { title: "Produit non trouvé" }
  return {
    title: `${product.name} - Revotex`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { category, slug } = await params
  const product = await getProduct(category, slug)

  if (!product) notFound()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProductDetail product={product} />
      <Footer />
    </div>
  )
}
