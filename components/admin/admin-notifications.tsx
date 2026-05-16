"use client"

import { useEffect, useState, useRef } from "react"
import { getLatestOrderId, getPendingOrdersCount } from "@/lib/actions/orders"
import { toast } from "sonner"
import { Bell, ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"

export function AdminNotifications() {
  const [lastOrderId, setLastOrderId] = useState<number | null>(null)
  const [pendingCount, setPendingCount] = useState(0)
  const isFirstRun = useRef(true)
  const router = useRouter()

  const checkOrders = async () => {
    try {
      const [latestId, count] = await Promise.all([
        getLatestOrderId(),
        getPendingOrdersCount()
      ])

      setPendingCount(count)

      // Si c'est une nouvelle commande (ID plus grand que le dernier connu)
      if (!isFirstRun.current && latestId && lastOrderId && latestId > lastOrderId) {
        // Alerte sonore
        const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3")
        audio.play().catch(() => {})

        // Notification Toast
        toast.success("Nouvelle commande !", {
          description: "Une nouvelle commande vient d'être passée sur le site.",
          duration: 10000,
          action: {
            label: "Voir",
            onClick: () => router.push("/admin/orders")
          },
          icon: <ShoppingBag className="h-5 w-5 text-emerald-500" />
        })
      }

      if (latestId) setLastOrderId(latestId)
      isFirstRun.current = false
    } catch (error) {
      console.error("Notification poll error:", error)
    }
  }

  useEffect(() => {
    // Premier check immédiat
    checkOrders()

    // Puis toutes les 30 secondes
    const interval = setInterval(checkOrders, 30000)
    return () => clearInterval(interval)
  }, [lastOrderId])

  return (
    <div className="relative group">
      <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-primary hover:bg-white/10 transition-all cursor-pointer">
        <Bell className="h-5 w-5" />
        {pendingCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-black text-destructive-foreground ring-4 ring-card animate-pulse">
            {pendingCount}
          </span>
        )}
      </div>
      
      {/* Dropdown simple au survol */}
      <div className="absolute right-0 mt-2 w-64 bg-card/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all z-50 p-4">
        <h3 className="font-bold mb-2 flex items-center gap-2">
          <Bell className="h-4 w-4 text-primary" /> Notifications
        </h3>
        {pendingCount > 0 ? (
          <p className="text-sm text-muted-foreground">
            Vous avez <span className="text-primary font-bold">{pendingCount}</span> commande{pendingCount > 1 ? 's' : ''} en attente de traitement.
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">Aucune nouvelle notification.</p>
        )}
        <button 
          onClick={() => router.push("/admin/orders")}
          className="w-full mt-4 py-2 bg-primary/10 text-primary text-xs font-bold rounded-lg hover:bg-primary/20 transition-all"
        >
          Gérer les commandes
        </button>
      </div>
    </div>
  )
}
