"use client"

import { useState } from "react"
import Image from "next/image"
import { ShoppingCart, Check, Truck, Shield, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"
import type { Product } from "@/lib/types"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [isAdding, setIsAdding] = useState(false)
  const { addItem } = useCart()
  const router = useRouter()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleAddToCart = () => {
    setIsAdding(true)
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
    })
    
    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  return (
    <div className="mx-auto max-w-7xl px-6">
      <button 
        onClick={() => router.back()}
        className="mb-8 flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Retour
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Product Image */}
        <div className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/5 shadow-2xl group">
          <Image
            src={product.image_url || "/placeholder.svg?height=600&width=600"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority
          />
          {product.featured && (
            <div className="absolute top-6 left-6 px-4 py-1.5 bg-primary text-primary-foreground text-xs font-black uppercase tracking-widest rounded-full shadow-lg">
              Premium Selection
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-accent mb-4">
                {product.category}
              </p>
              <h1 className="text-5xl font-black tracking-tight text-foreground leading-tight">
                {product.name}
              </h1>
            </div>

            <div className="text-4xl font-black text-primary">
              {formatPrice(product.price)}
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <div className="pt-6">
              <Button
                onClick={handleAddToCart}
                disabled={!product.in_stock || isAdding}
                className="w-full h-16 text-lg font-black bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl shadow-2xl shadow-primary/20 transition-all active:scale-[0.98]"
              >
                {isAdding ? (
                  <span className="flex items-center gap-2">
                    <Check className="h-5 w-5" />
                    Ajouté au panier
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    {product.in_stock ? "Ajouter au panier" : "Rupture de stock"}
                  </span>
                )}
              </Button>
            </div>

            {/* Specs */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="mt-10 border-t border-white/5 pt-10">
                <h2 className="text-xl font-bold text-foreground mb-6 underline decoration-accent decoration-2 underline-offset-8">Fiche Technique</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex flex-col p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                      <dt className="text-xs font-black uppercase tracking-widest text-accent mb-1 group-hover:scale-105 transition-transform origin-left">{key.replace(/_/g, " ")}</dt>
                      <dd className="text-base font-bold text-foreground">{String(value)}</dd>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
