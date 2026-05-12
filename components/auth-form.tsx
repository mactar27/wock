"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { userLogin, userRegister } from "@/lib/actions/user-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingBag, ArrowRight, Loader2, Mail, Lock, User } from "lucide-react"
import Link from "next/link"

interface AuthFormProps {
  mode: "login" | "register"
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      const result = mode === "login" 
        ? await userLogin(data)
        : await userRegister(data)

      if (result.success) {
        if (result.user?.role === 'admin') {
          router.push("/admin")
        } else {
          router.push("/")
        }
        router.refresh()
      } else {
        setError(result.error || "Une erreur est survenue")
      }
    } catch (err) {
      setError("Erreur de connexion au serveur")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-4">
          <ShoppingBag className="h-8 w-8" />
        </div>
        <h1 className="text-4xl font-black tracking-tight text-foreground">
          {mode === "login" ? "Bon retour !" : "Créez votre compte"}
        </h1>
        <p className="text-muted-foreground">
          {mode === "login" 
            ? "Connectez-vous pour gérer vos commandes et vos favoris." 
            : "Rejoignez la communauté WockyTech pour une expérience premium."}
        </p>
      </div>

      <Card className="border-white/5 bg-card/50 backdrop-blur-xl shadow-2xl rounded-[2rem]">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-xl">{mode === "login" ? "Connexion" : "Inscription"}</CardTitle>
            <CardDescription>
              {mode === "login" 
                ? "Entrez vos identifiants pour accéder à votre espace." 
                : "Remplissez le formulaire ci-dessous pour commencer."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mode === "register" && (
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="John Doe" 
                    className="pl-10 h-12 rounded-xl bg-white/5 border-white/10"
                    required 
                  />
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  className="pl-10 h-12 rounded-xl bg-white/5 border-white/10"
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-10 h-12 rounded-xl bg-white/5 border-white/10"
                  required 
                />
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm font-bold animate-in shake duration-300">
                ⚠️ {error}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full h-14 rounded-2xl text-lg font-bold bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <>
                  {mode === "login" ? "Se connecter" : "S'inscrire"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
            
            <div className="text-sm text-center text-muted-foreground">
              {mode === "login" ? (
                <>
                  Pas encore de compte ?{" "}
                  <Link href="/register" className="text-primary font-bold hover:underline">
                    S'inscrire
                  </Link>
                </>
              ) : (
                <>
                  Déjà un compte ?{" "}
                  <Link href="/login" className="text-primary font-bold hover:underline">
                    Se connecter
                  </Link>
                </>
              )}
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
