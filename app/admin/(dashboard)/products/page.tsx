import { query } from "@/lib/db"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { ProductsTable } from "@/components/admin/products-table"
import type { Product } from "@/lib/types"

async function getProducts(): Promise<Product[]> {
  try {
    const products = await query(
      "SELECT * FROM products ORDER BY created_at DESC"
    ) as Product[];
    return products || [];
  } catch (error) {
    console.error("Error fetching products from MySQL:", error);
    return [];
  }
}

export default async function AdminProductsPage() {
  const products = await getProducts()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Products</h1>
        <Link href="/admin/products/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      <ProductsTable products={products} />
    </div>
  )
}
