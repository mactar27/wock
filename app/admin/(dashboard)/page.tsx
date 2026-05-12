import { query } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, DollarSign, TrendingUp, Box } from "lucide-react"

async function getStats() {
  try {
    const totalResult = await query("SELECT COUNT(*) as count FROM products") as any[];
    const stockResult = await query("SELECT COUNT(*) as count FROM products WHERE in_stock = 1") as any[];
    const featuredResult = await query("SELECT COUNT(*) as count FROM products WHERE featured = 1") as any[];
    const valueResult = await query("SELECT SUM(price) as total FROM products") as any[];

    return {
      totalProducts: totalResult[0]?.count || 0,
      inStockProducts: stockResult[0]?.count || 0,
      featuredProducts: featuredResult[0]?.count || 0,
      totalValue: valueResult[0]?.total || 0,
    }
  } catch (error) {
    console.error("Error fetching stats from MySQL:", error);
    return {
      totalProducts: 0,
      inStockProducts: 0,
      featuredProducts: 0,
      totalValue: 0,
    }
  }
}

export default async function AdminDashboardPage() {
  const stats = await getStats()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      minimumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Bienvenue dans votre centre de commande WockyTech.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-primary/10 bg-primary/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-primary">
              Total Produits
            </CardTitle>
            <Package className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-foreground">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground mt-2">Catalogue complet</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/10 bg-emerald-500/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-emerald-500">
              En Stock
            </CardTitle>
            <Box className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-foreground">{stats.inStockProducts}</div>
            <p className="text-xs text-muted-foreground mt-2">Prêt à la vente</p>
          </CardContent>
        </Card>

        <Card className="border-blue-500/10 bg-blue-500/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-blue-500">
              Mis en avant
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-foreground">{stats.featuredProducts}</div>
            <p className="text-xs text-muted-foreground mt-2">Visibilité maximale</p>
          </CardContent>
        </Card>

        <Card className="border-amber-500/10 bg-amber-500/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-amber-500">
              Valeur Stock
            </CardTitle>
            <DollarSign className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-foreground">{formatCurrency(stats.totalValue)}</div>
            <p className="text-xs text-muted-foreground mt-2">Estimation totale</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
