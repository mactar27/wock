"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, ChevronRight } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { Button } from "./ui/button"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
  variant?: "default" | "featured"
}

export function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const { addItem } = useCart()
  const categoryPath = 
    product.category === "laptop" ? "laptops" : 
    product.category === "smartphone" ? "smartphones" : 
    "accessories"
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-SN", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price) + " FCFA"
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  if (variant === "featured") {
    return (
      <Link
        href={`/${categoryPath}/${product.slug}`}
        className="group relative block bg-card/40 border border-white/5 rounded-[2rem] p-8 transition-all duration-500 hover:bg-card/60 hover:border-primary/50 overflow-hidden"
      >
        {/* Glow effect on hover */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{product.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2 max-w-[200px]">
                {product.description}
              </p>
            </div>
            <div className="text-right">
              <span className="block text-xl font-bold text-primary">{formatPrice(product.price)}</span>
              {product.original_price && (
                <span className="text-xs text-muted-foreground line-through opacity-60">
                  {formatPrice(product.original_price)}
                </span>
              )}
            </div>
          </div>
          
          <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-2xl">
            <Image
              src={product.image_url || "/placeholder.svg?height=400&width=600"}
              alt={product.name}
              fill
              className="object-contain transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
            />
          </div>
          
          <div className="mt-8 flex items-center justify-between">
            <Button 
              onClick={handleAddToCart}
              className="relative z-20 h-12 px-6 rounded-2xl bg-primary text-primary-foreground font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <ShoppingBag className="h-5 w-5" />
              Ajouter au panier
            </Button>
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <ChevronRight className="h-5 w-5" />
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/${categoryPath}/${product.slug}`}
      className="group block relative"
    >
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-card border border-white/5 p-6 transition-all duration-500 group-hover:border-primary/30 group-hover:-translate-y-2">
        <Image
          src={product.image_url || "/placeholder.svg?height=400&width=400"}
          alt={product.name}
          fill
          className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-between p-4">
          <Button 
            onClick={handleAddToCart}
            size="icon"
            className="h-10 w-10 rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-110 active:scale-90"
          >
            <ShoppingBag className="h-5 w-5" />
          </Button>
          <span className="text-xs font-bold text-primary uppercase tracking-wider">Détails</span>
        </div>
      </div>
      <div className="mt-4 px-2 flex justify-between items-start">
        <div>
          <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="mt-1 flex items-center gap-3">
            <span className="text-sm font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.original_price && (
              <span className="text-xs text-muted-foreground line-through opacity-50">
                {formatPrice(product.original_price)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
