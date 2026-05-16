"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

import { login } from "@/lib/actions/auth"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const result = await login({ email, password });

      if (result.success) {
        router.push("/admin")
        router.refresh()
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 relative overflow-hidden">
      {/* Effet de lumière en arrière-plan */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      <Card className="w-full max-w-md border-primary/10 bg-card/50 backdrop-blur-xl shadow-2xl relative z-10">
        <CardHeader className="text-center space-y-1">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 rotate-3">
              <img src="/apple-icon.png" alt="Logo" className="w-10 h-10 object-contain -rotate-3" />
            </div>
          </div>
          <CardTitle className="text-3xl font-black tracking-tight text-foreground">Revotex Admin</CardTitle>
          <CardDescription className="text-muted-foreground text-base">
            Connectez-vous pour gérer votre Boutique.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@revotex.com"
                className="bg-background/50 border-primary/20 focus:ring-primary h-12"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Mot de passe</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="bg-background/50 border-primary/20 focus:ring-primary h-12"
              />
            </div>

            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm font-bold animate-shake">
                ⚠️ {error}
              </div>
            )}

            <Button type="submit" className="w-full h-12 text-lg font-black bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all active:scale-[0.98]" disabled={loading}>
              {loading ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2">
              ← Retour à la boutique
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
