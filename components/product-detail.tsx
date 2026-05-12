"use client"

import Image from "next/image"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Check, Truck, Shield } from "lucide-react"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
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
          <div className="relative aspect-square rounded-3xl bg-secondary overflow-hidden">
            <Image
              src={product.image_url || "/placeholder.svg?height=800&width=800"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <div>
              <p className="text-sm font-medium text-blue-600 mb-2">
                {product.category === "laptop" ? "Ordinateur" : product.category === "smartphone" ? "Smartphone" : "Accessoire"}
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground text-balance">
                {product.name}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="mt-8">
              <div className="flex items-baseline gap-3">
                {product.original_price && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.original_price)}
                  </span>
                )}
                <span className="text-3xl font-semibold text-foreground">
                  {formatPrice(product.price)}
                </span>
              </div>
              {product.original_price && (
                <p className="mt-1 text-sm text-green-600">
                  Save {formatPrice(product.original_price - product.price)}
                </p>
              )}
            </div>

            {/* Availability */}
            <div className="mt-6 flex items-center gap-2">
              {product.in_stock ? (
                <>
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-green-600">In Stock</span>
                </>
              ) : (
                <span className="text-sm text-muted-foreground">Out of Stock</span>
              )}
            </div>

            {/* Actions */}
            <div className="mt-8 space-y-4">
              <Button size="lg" className="w-full rounded-full text-base" disabled={!product.in_stock}>
                Add to Bag
              </Button>
              <Button size="lg" variant="outline" className="w-full rounded-full text-base">
                Add to Favorites
              </Button>
            </div>

            {/* Benefits */}
            <div className="mt-10 space-y-4 border-t border-border pt-8">
              <div className="flex items-start gap-4">
                <Truck className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Free Delivery</p>
                  <p className="text-sm text-muted-foreground">Get free delivery on all orders</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">AppleCare+</p>
                  <p className="text-sm text-muted-foreground">Get accidental damage protection</p>
                </div>
              </div>
            </div>

            {/* Specs */}
            {Object.keys(product.specs).length > 0 && (
              <div className="mt-10 border-t border-border pt-8">
                <h2 className="text-lg font-semibold text-foreground mb-4">Specifications</h2>
                <dl className="space-y-3">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between gap-4">
                      <dt className="text-sm text-muted-foreground capitalize">{key.replace(/_/g, " ")}</dt>
                      <dd className="text-sm text-foreground text-right">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
