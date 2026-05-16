"use client"

import { useState, useEffect, useTransition } from "react"
import { Search, Loader2, X, ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { searchProducts } from "@/lib/actions/products"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface SearchModalProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function SearchModal({ isOpen, setIsOpen }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const timer = setTimeout(() => {
      startTransition(async () => {
        const data = await searchProducts(query)
        setResults(data)
      })
    }, 300) // Debounce de 300ms

    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    if (!isOpen) {
      setQuery("")
      setResults([])
    }
  }, [isOpen])

  const handleSelect = (category: string, slug: string) => {
    setIsOpen(false)
    router.push(`/categorie/${category}/${slug}`)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-SN", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(price) + " FCFA"
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-card/95 backdrop-blur-xl border-white/10 rounded-[2rem]">
        <DialogTitle className="sr-only">Rechercher un produit</DialogTitle>
        <div className="flex items-center border-b border-white/10 px-4 py-4">
          <Search className="h-5 w-5 text-muted-foreground shrink-0 mr-3" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un produit (ex: iPhone, MacBook...)"
            className="flex-1 border-0 bg-transparent text-lg shadow-none focus-visible:ring-0 px-0 h-auto"
            autoFocus
          />
          {isPending && <Loader2 className="h-5 w-5 animate-spin text-primary ml-2 shrink-0" />}
          {query && !isPending && (
            <button onClick={() => setQuery("")} className="ml-2 p-1 rounded-full hover:bg-white/10 text-muted-foreground transition-colors shrink-0">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim() === "" ? (
            <div className="p-8 text-center text-muted-foreground">
              <Search className="h-10 w-10 mx-auto mb-4 opacity-20" />
              <p>Commencez à taper pour rechercher des produits.</p>
            </div>
          ) : results.length === 0 && !isPending ? (
            <div className="p-8 text-center text-muted-foreground">
              <p>Aucun résultat trouvé pour "{query}".</p>
            </div>
          ) : (
            <div className="p-2 space-y-1">
              {results.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleSelect(product.category, product.slug)}
                  className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 transition-colors group text-left"
                >
                  <div className="flex items-center gap-4">
                    {product.image_url ? (
                      <div className="w-12 h-12 rounded-xl bg-white/5 overflow-hidden flex items-center justify-center shrink-0 p-1">
                        <img 
                          src={product.image_url} 
                          alt={product.name} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                        <Search className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-foreground group-hover:text-primary transition-colors">{product.name}</p>
                      <p className="text-sm font-medium text-primary/80">{formatPrice(product.price)}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
