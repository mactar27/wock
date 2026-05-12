"use client"

import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Check, Truck, Shield, ShoppingBag, Heart } from "lucide-react"
import type { Product } from "@/lib/types"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-SN", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price) + " FCFA"
  }

  return (
    <main className="pt-20 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div className="relative aspect-square rounded-[3rem] bg-secondary/50 overflow-hidden border border-white/5 p-8 flex items-center justify-center">
            <img
              src={product.image_url || "/placeholder.svg?height=800&width=800"}
              alt={product.name}
              className="max-h-full max-w-full object-contain transition-transform duration-700 hover:scale-110"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-primary mb-3">
                {product.category === "laptop" ? "Ordinateur" : product.category === "smartphone" ? "Smartphone" : "Accessoire"}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground text-balance">
                {product.name}
              </h1>
              <p className="mt-6 text-xl text-muted-foreground leading-relaxed text-pretty">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="mt-10 p-6 rounded-3xl bg-primary/5 border border-primary/10">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-black text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.original_price && (
                  <span className="text-xl text-muted-foreground line-through opacity-50">
                    {formatPrice(product.original_price)}
                  </span>
                )}
              </div>
              {product.original_price && (
                <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-bold">
                  Économisez {formatPrice(product.original_price - product.price)}
                </div>
              )}
            </div>

            {/* Availability */}
            <div className="mt-8 flex items-center gap-3">
              {product.in_stock ? (
                <div className="flex items-center gap-2 text-emerald-500 bg-emerald-500/5 px-4 py-2 rounded-full border border-emerald-500/10">
                  <Check className="h-5 w-5" />
                  <span className="text-sm font-bold">En Stock - Disponible immédiatement</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-muted-foreground bg-white/5 px-4 py-2 rounded-full border border-white/10">
                  <span className="text-sm font-bold">Rupture de stock</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                onClick={() => addItem(product)}
                className="flex-1 h-16 rounded-2xl text-lg font-bold bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all" 
                disabled={!product.in_stock}
              >
                <ShoppingBag className="h-5 w-5 mr-3" />
                Ajouter au panier
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-16 px-8 rounded-2xl border-white/10 hover:bg-white/5"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Benefits */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-white/5 pt-10">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
                  <Truck className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Livraison Gratuite</p>
                  <p className="text-sm text-muted-foreground">Partout à Dakar et ses environs</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Garantie WockyTech</p>
                  <p className="text-sm text-muted-foreground">Support technique et SAV premium</p>
                </div>
              </div>
            </div>

            {/* Specs */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="mt-12 border-t border-white/5 pt-10">
                <h2 className="text-xl font-bold text-foreground mb-6">Fiche Technique</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex flex-col p-4 rounded-2xl bg-white/5 border border-white/5">
                      <dt className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{key.replace(/_/g, " ")}</dt>
                      <dd className="text-base font-bold text-foreground">{String(value)}</dd>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
