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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-primary">Produits</h1>
          <p className="text-muted-foreground font-medium mt-1">Gérez votre catalogue d'articles Revotex.</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Produit
          </Button>
        </Link>
      </div>

      <div className="bg-card/50 backdrop-blur-xl border border-primary/10 rounded-3xl overflow-hidden shadow-xl">
        <ProductsTable products={products} />
      </div>
    </div>
  )
}
