import { cookies } from "next/headers"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { query } from "@/lib/db"

export default async function AdminSettingsPage() {
  const cookieStore = cookies()
  const sessionId = (await cookieStore).get("admin_session")?.value
  
  let user = null
  if (sessionId) {
    const users = await query("SELECT * FROM admin_users WHERE id = ?", [sessionId]) as any[]
    user = users[0] || null
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tight text-primary">Paramètres</h1>
        <p className="text-muted-foreground font-medium">Gérez votre compte et les informations de la boutique Revotex.</p>
      </div>

      <div className="max-w-3xl space-y-8">
        {/* Account Section */}
        <Card className="border-primary/10 bg-card/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl">
          <CardHeader className="bg-primary/5 border-b border-primary/5 pb-6">
            <CardTitle className="text-xl font-black text-primary">Compte</CardTitle>
            <CardDescription className="font-medium">Vos informations d'administrateur</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1.5">
                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">Email</p>
                <p className="text-foreground font-bold text-lg">{user?.email}</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">ID Administrateur</p>
                <p className="text-accent font-mono font-bold">{user?.id}</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">Date de création</p>
                <p className="text-foreground font-medium">
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                    : "N/A"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shop Info Section */}
        <Card className="border-accent/20 bg-card/50 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl">
          <CardHeader className="bg-accent/5 border-b border-accent/5 pb-6">
            <CardTitle className="text-xl font-black text-accent">Informations de la Boutique</CardTitle>
            <CardDescription className="font-medium">Paramètres généraux de Revotex Store</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1.5">
                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">Nom de la Boutique</p>
                <p className="text-primary font-black text-2xl tracking-tighter">Revotex Store</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">Devise</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <p className="text-foreground font-black text-lg">FCFA (XOF)</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground/60">Localisation principale</p>
                <p className="text-foreground font-bold">Thiès, Sénégal</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
