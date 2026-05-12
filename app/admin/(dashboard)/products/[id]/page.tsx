import { query } from "@/lib/db"
import { ProductForm } from "@/components/admin/product-form"
import type { Product } from "@/lib/types"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ id: string }>
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const products = await query(
      "SELECT * FROM products WHERE id = ?",
      [id]
    ) as Product[];
    
    return products[0] || null;
  } catch (error) {
    console.error("Error fetching product from MySQL:", error);
    return null;
  }
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground mb-8">Edit Product</h1>
      <ProductForm product={product} />
    </div>
  )
}
