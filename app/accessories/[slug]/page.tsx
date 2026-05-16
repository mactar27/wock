import { query } from "@/lib/db"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetail } from "@/components/product-detail"
import type { Product } from "@/lib/types"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const products = await query(
      "SELECT * FROM products WHERE slug = ? AND category IN ('accessory', 'audio') LIMIT 1",
      [slug]
    ) as Product[];
    
    return products[0] || null;
  } catch (error) {
    console.error("Error fetching product from MySQL:", error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const product = await getProduct(slug)
  
  if (!product) {
    return { title: "Product Not Found" }
  }
  
  return {
    title: `${product.name} - Apple Store`,
    description: product.description,
  }
}

export default async function AccessoryProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProductDetail product={product} />
      <Footer />
    </div>
  )
}
