"use client"

import { useEffect, useState } from "react"
import { getOrders, updateOrderStatus } from "@/lib/actions/orders"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { ShoppingBag, MoreVertical, Eye, Truck, CheckCircle2, Clock, XCircle } from "lucide-react"

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    const data = await getOrders()
    setOrders(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleStatusUpdate = async (orderId: number, status: string) => {
    const result = await updateOrderStatus(orderId, status)
    if (result.success) {
      fetchOrders()
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending": return <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">En attente</Badge>
      case "processing": return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">En cours</Badge>
      case "shipped": return <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">Expédiée</Badge>
      case "delivered": return <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Livrée</Badge>
      case "cancelled": return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">Annulée</Badge>
      default: return <Badge>{status}</Badge>
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-SN", {
      style: "decimal",
      minimumFractionDigits: 0,
    }).format(price) + " FCFA"
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Commandes</h1>
          <p className="text-muted-foreground">Gérez les achats et les livraisons de vos clients.</p>
        </div>
      </div>

      <Card className="border-white/5 bg-card/50 backdrop-blur-xl rounded-[2rem] overflow-hidden shadow-2xl">
        <CardHeader>
          <CardTitle>Liste des commandes</CardTitle>
          <CardDescription>Visualisez et mettez à jour le statut des commandes récentes.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-white/5">
                <TableHead>Client</TableHead>
                <TableHead>Articles</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">Chargement...</TableCell>
                </TableRow>
              ) : orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">Aucune commande trouvée.</TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order.id} className="border-white/5 hover:bg-white/5 transition-colors">
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-foreground">{order.customer_name}</span>
                        <span className="text-xs text-muted-foreground">{order.customer_email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <ShoppingBag className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium">
                          {order.items.length} article{order.items.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-primary">
                      {formatPrice(order.total_amount)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(order.status)}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString("fr-FR")}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 rounded-2xl bg-card/95 backdrop-blur-xl border-white/10">
                          <DropdownMenuItem className="cursor-pointer rounded-xl">
                            <Eye className="mr-2 h-4 w-4" /> Voir détails
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "processing")} className="cursor-pointer rounded-xl">
                            <Clock className="mr-2 h-4 w-4 text-blue-500" /> Marquer "En cours"
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "shipped")} className="cursor-pointer rounded-xl">
                            <Truck className="mr-2 h-4 w-4 text-purple-500" /> Marquer "Expédiée"
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "delivered")} className="cursor-pointer rounded-xl">
                            <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" /> Marquer "Livrée"
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusUpdate(order.id, "cancelled")} className="cursor-pointer rounded-xl text-destructive focus:bg-destructive/10">
                            <XCircle className="mr-2 h-4 w-4" /> Annuler
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
