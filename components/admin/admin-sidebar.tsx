"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package, LayoutDashboard, Settings, LogOut, Home, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { logout } from "@/lib/actions/auth"
import { useRouter } from "next/navigation"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Produits", href: "/admin/products", icon: Package },
  { name: "Paramètres", href: "/admin/settings", icon: Settings },
]

interface AdminSidebarProps {
  user: { email: string }
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    await logout()
    router.push("/admin/login")
  }

  return (
    <aside className="flex w-72 flex-col border-r border-primary/10 bg-card">
      {/* Logo */}
      <div className="flex h-20 items-center gap-3 border-b border-primary/10 px-6">
        <Link href="/admin" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-primary/5">
            <img src="/apple-icon.png" alt="Logo" className="w-7 h-7 object-contain" />
          </div>
          <span className="font-black text-xl tracking-tighter">
            <span className="text-primary">Revo</span><span className="text-accent">tex</span> <span className="text-foreground/40 font-bold">Admin</span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1.5 px-4 py-8">
        {/* Retour au site public */}
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-accent hover:bg-accent/10 transition-all mb-6 border border-accent/20 bg-accent/5"
        >
          <Home className="h-5 w-5" />
          Accueil Site
          <ExternalLink className="h-3 w-3 ml-auto opacity-50" />
        </Link>

        <div className="h-px bg-primary/5 mx-4 mb-6" />

        {navigation.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/admin" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive ? "text-primary-foreground" : "text-primary")} />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div className="border-t border-primary/10 p-6 bg-primary/5">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground text-lg font-black shadow-inner">
            {user.email?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 truncate">
            <p className="text-sm font-bold text-foreground truncate">{user.email}</p>
            <p className="text-xs font-medium text-primary">Administrateur</p>
          </div>
          <button
            onClick={handleSignOut}
            className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all"
            title="Se déconnecter"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </aside>
  )
}
