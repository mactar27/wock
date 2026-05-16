"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { createOrder } from "@/lib/actions/orders"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ShoppingBag, CreditCard, Truck, CheckCircle2, ArrowRight, Loader2 } from "lucide-react"

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?callback=/checkout")
    }
  }, [user, authLoading, router])

  if (authLoading || (!user && !submitted)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (items.length === 0) return

    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const orderData = {
      customer_name: formData.get("name"),
      customer_email: formData.get("email"),
      customer_phone: formData.get("phone"),
      shipping_address: formData.get("address"),
      total_amount: totalPrice,
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    }

    try {
      const result = await createOrder(orderData)
      if (result.success) {
        setSubmitted(true)
        clearCart()
      } else {
        setError(result.error || "Une erreur est survenue")
      }
    } catch (err) {
      setError("Erreur de connexion au serveur")
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-SN", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(price) + " FCFA"
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center p-6 pt-32">
          <div className="max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="mx-auto w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-8">
              <CheckCircle2 className="h-12 w-12" />
            </div>
            <h1 className="text-4xl font-black tracking-tight">Commande Confirmée !</h1>
            <p className="text-muted-foreground text-lg">
              Merci pour votre confiance. Nous avons bien reçu votre commande et nous vous contacterons très prochainement pour la livraison.
            </p>
            <Button 
              onClick={() => router.push("/")}
              className="h-14 px-8 rounded-2xl text-lg font-bold"
            >
              Retour à l'accueil
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulaire */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-black tracking-tight mb-4">Finaliser la commande</h1>
              <p className="text-muted-foreground">Remplissez vos informations de livraison pour confirmer votre achat.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Card className="border-white/5 bg-card/50 backdrop-blur-xl rounded-[2rem] overflow-hidden shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-primary" />
                    Informations de Livraison
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        defaultValue={user?.name || ""} 
                        required 
                        className="h-12 rounded-xl bg-white/5 border-white/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        placeholder="77 XXX XX XX" 
                        required 
                        className="h-12 rounded-xl bg-white/5 border-white/10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      defaultValue={user?.email || ""} 
                      required 
                      className="h-12 rounded-xl bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresse complète (Quartier, Immeuble, Appartement)</Label>
                    <Textarea 
                      id="address" 
                      name="address" 
                      required 
                      className="min-h-[100px] rounded-xl bg-white/5 border-white/10"
                      placeholder="Ex: Plateau, Rue Felix Faure, Immeuble X, Appt 4"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/5 bg-card/50 backdrop-blur-xl rounded-[2rem] overflow-hidden shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Mode de Paiement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-between">
                    <div>
                      <p className="font-bold">Paiement à la livraison</p>
                      <p className="text-sm text-muted-foreground">Payez en espèces ou via Wave/Orange Money lors de la réception.</p>
                    </div>
                    <div className="h-6 w-6 rounded-full border-2 border-primary flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {error && (
                <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-bold">
                  ⚠️ {error}
                </div>
              )}

              <Button 
                type="submit" 
                disabled={loading || items.length === 0}
                className="w-full h-16 rounded-2xl text-xl font-bold bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                {loading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <>
                    Confirmer la commande ({formatPrice(totalPrice)})
                    <ArrowRight className="ml-2 h-6 w-6" />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Résumé du Panier */}
          <div className="lg:sticky lg:top-32 h-fit">
            <Card className="border-white/5 bg-card/50 backdrop-blur-xl rounded-[3rem] overflow-hidden shadow-2xl">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-2xl font-black flex items-center gap-3">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                  Résumé du panier
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="h-20 w-20 rounded-2xl bg-white/5 border border-white/10 overflow-hidden shrink-0 flex items-center justify-center p-2">
                        <img src={item.image_url || "/placeholder.png"} alt={item.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold truncate">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.quantity} x {formatPrice(Number(item.price))}</p>
                      </div>
                      <p className="font-bold">{formatPrice(Number(item.price) * item.quantity)}</p>
                    </div>
                  ))}

                  <div className="space-y-3 pt-6 border-t border-white/5">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Sous-total</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-emerald-500 font-bold">
                      <span>Livraison</span>
                      <span>Gratuite</span>
                    </div>
                    <div className="flex justify-between text-2xl font-black text-foreground pt-4 border-t border-white/10">
                      <span>Total</span>
                      <span className="text-primary">{formatPrice(totalPrice)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
