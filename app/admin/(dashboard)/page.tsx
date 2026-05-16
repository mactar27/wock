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
        <h1 className="text-4xl font-black tracking-tight text-primary">Dashboard</h1>
        <p className="text-muted-foreground font-medium">Bienvenue dans votre centre de commande Revotex.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Produits - Navy */}
        <Card className="border-primary/10 bg-primary/5 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-primary">
              Total Produits
            </CardTitle>
            <div className="p-2 bg-primary/10 rounded-lg">
              <Package className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-foreground">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground mt-2">Catalogue complet</p>
          </CardContent>
        </Card>

        {/* En Stock - Cyan */}
        <Card className="border-accent/20 bg-accent/5 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-accent">
              En Stock
            </CardTitle>
            <div className="p-2 bg-accent/10 rounded-lg">
              <Box className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-foreground">{stats.inStockProducts}</div>
            <p className="text-xs text-muted-foreground mt-2">Prêt à la vente</p>
          </CardContent>
        </Card>

        {/* Mis en avant - Navy */}
        <Card className="border-primary/10 bg-primary/5 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-primary">
              Mis en avant
            </CardTitle>
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-foreground">{stats.featuredProducts}</div>
            <p className="text-xs text-muted-foreground mt-2">Visibilité maximale</p>
          </CardContent>
        </Card>

        {/* Valeur Stock - Cyan */}
        <Card className="border-accent/20 bg-accent/5 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-accent">
              Valeur Stock
            </CardTitle>
            <div className="p-2 bg-accent/10 rounded-lg">
              <DollarSign className="h-4 w-4 text-accent" />
            </div>
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
