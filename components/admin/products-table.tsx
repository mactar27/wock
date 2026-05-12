"use client"

import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Edit, Trash2 } from "lucide-react"
import { deleteProduct } from "@/lib/actions/products"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface ProductsTableProps {
  products: Product[]
}

export function ProductsTable({ products }: ProductsTableProps) {
  const router = useRouter()
  const [deleting, setDeleting] = useState<string | null>(null)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) return

    setDeleting(id)
    const result = await deleteProduct(id)
    
    if (!result.success) {
      alert(result.error || "Erreur lors de la suppression")
    }
    
    setDeleting(null)
    router.refresh()
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "smartphone":
        return "Smartphone"
      case "laptop":
        return "Ordinateur"
      case "audio":
        return "Audio"
      case "accessory":
        return "Accessoire"
      default:
        return category
    }
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-background rounded-lg border border-primary/20 bg-primary/5">
        <p className="text-muted-foreground text-lg">Aucun produit trouvé dans votre catalogue.</p>
        <Link href="/admin/products/new" className="mt-4 inline-block">
          <Button className="bg-primary hover:bg-primary/90">Ajouter votre premier produit</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-background rounded-lg border border-border overflow-hidden shadow-xl">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-20">Image</TableHead>
            <TableHead>Produit</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="hover:bg-primary/5 transition-colors">
              <TableCell>
                <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-border bg-secondary">
                  <Image
                    src={product.image_url || "/placeholder.svg?height=48&width=48"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-bold text-foreground text-base">{product.name}</p>
                  <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                    {product.description}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="border-primary/20 text-primary">{getCategoryLabel(product.category)}</Badge>
              </TableCell>
              <TableCell className="font-black text-foreground">{formatPrice(product.price)}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {product.in_stock ? (
                    <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-500/20 w-fit">En Stock</Badge>
                  ) : (
                    <Badge variant="destructive" className="w-fit">Rupture</Badge>
                  )}
                  {product.featured && (
                    <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 border-blue-500/20 w-fit">En Vedette</Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link href={`/admin/products/${product.id}`}>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(product.id)}
                    disabled={deleting === product.id}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
