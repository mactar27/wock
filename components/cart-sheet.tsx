"use client"

import { useCart } from "@/lib/cart-context"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag, Trash2, Plus, Minus, X } from "lucide-react"

export function CartSheet() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems, isOpen, setIsOpen } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 bg-card/95 backdrop-blur-xl border-l border-white/10 shadow-2xl">
        <SheetHeader className="p-6 border-b border-white/5">
          <SheetTitle className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <ShoppingBag className="h-6 w-6 text-primary" />
            Votre Panier
            {totalItems > 0 && (
              <span className="ml-2 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {totalItems}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-hidden">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center space-y-4">
              <div className="p-6 rounded-full bg-primary/5">
                <ShoppingBag className="h-12 w-12 text-primary/20" />
              </div>
              <div className="space-y-1">
                <p className="text-xl font-semibold">Votre panier est vide</p>
                <p className="text-sm text-muted-foreground">
                  Découvrez nos produits et trouvez votre bonheur.
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setIsOpen(false)}
                className="mt-4 rounded-full px-8"
              >
                Continuer mes achats
              </Button>
            </div>
          ) : (
            <ScrollArea className="h-full px-6">
              <div className="py-6 space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="relative h-24 w-24 rounded-2xl bg-white/5 border border-white/10 overflow-hidden shrink-0">
                      <img
                        src={item.image_url || "/placeholder.png"}
                        alt={item.name}
                        className="h-full w-full object-contain p-2"
                      />
                    </div>
                    
                    <div className="flex flex-col flex-1 min-w-0 py-1">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-bold text-base truncate pr-2">{item.name}</h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{item.category}</p>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-full hover:bg-white/10"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-full hover:bg-white/10"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <span className="font-bold text-primary">{formatPrice(Number(item.price) * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="mt-auto p-6 border-t border-white/5 flex flex-col gap-4">
            <div className="space-y-1.5 w-full">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sous-total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Livraison</span>
                <span className="text-emerald-500 font-medium">Gratuite</span>
              </div>
              <Separator className="my-2 bg-white/5" />
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-primary">{formatPrice(totalPrice)}</span>
              </div>
            </div>
            <Button className="w-full py-6 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
              Passer la commande
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
