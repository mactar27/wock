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
    const labels: Record<string, string> = {
      telephone: "Téléphone",
      ordinateur: "Ordinateur",
      tablette: "Tablette",
      drone: "Drone",
      camera: "Appareil Photo",
      "accessoire-telephone": "Acc. Téléphone",
      "accessoire-tablette": "Acc. Tablette",
      "accessoire-ordinateur": "Acc. Ordinateur",
      // Fallback pour anciens produits
      smartphone: "Smartphone",
      laptop: "Ordinateur Portable",
      audio: "Audio",
      accessory: "Accessoire"
    };
    return labels[category] || category;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-24 bg-card/50 border border-primary/10 rounded-3xl">
        <p className="text-muted-foreground text-lg font-medium">Aucun produit trouvé dans votre catalogue.</p>
        <Link href="/admin/products/new" className="mt-6 inline-block">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl px-8">
            Ajouter votre premier produit
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-background overflow-hidden">
      <Table>
        <TableHeader className="bg-primary/5">
          <TableRow className="border-primary/10">
            <TableHead className="w-20 font-bold text-primary">Image</TableHead>
            <TableHead className="font-bold text-primary">Produit</TableHead>
            <TableHead className="font-bold text-primary">Catégorie</TableHead>
            <TableHead className="font-bold text-primary">Prix</TableHead>
            <TableHead className="font-bold text-primary">Statut</TableHead>
            <TableHead className="text-right font-bold text-primary px-6">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="hover:bg-primary/[0.02] transition-colors border-primary/5">
              <TableCell>
                <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-primary/10 bg-muted/30">
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
                  <p className="font-bold text-foreground text-base tracking-tight">{product.name}</p>
                  <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                    {product.description}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="border-primary/20 text-primary font-bold bg-primary/5">
                  {getCategoryLabel(product.category)}
                </Badge>
              </TableCell>
              <TableCell className="font-black text-primary">{formatPrice(product.price)}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1.5">
                  {product.in_stock ? (
                    <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-accent/20 w-fit font-bold">
                      En Stock
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="w-fit font-bold">
                      Rupture
                    </Badge>
                  )}
                  {product.featured && (
                    <Badge className="bg-primary/10 text-primary border-primary/20 w-fit font-bold">
                      Premium
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right px-6">
                <div className="flex items-center justify-end gap-2">
                  <Link href={`/admin/products/${product.id}`}>
                    <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary rounded-lg transition-all">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(product.id)}
                    disabled={deleting === product.id}
                    className="hover:bg-destructive/10 hover:text-destructive rounded-lg transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
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
