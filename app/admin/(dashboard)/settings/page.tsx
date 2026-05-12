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
    <div>
      <h1 className="text-2xl font-semibold text-foreground mb-8">Settings</h1>

      <div className="max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Your admin account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-foreground">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">ID Administrateur</p>
              <p className="text-foreground font-mono text-sm">{user?.id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date de création</p>
              <p className="text-foreground">
                {user?.created_at
                  ? new Date(user.created_at).toLocaleString()
                  : "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informations de la Boutique</CardTitle>
            <CardDescription>Paramètres généraux</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Nom de la Boutique</p>
              <p className="text-foreground font-bold">WockyTech Store</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Devise</p>
              <p className="text-foreground font-bold">FCFA (XOF)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
