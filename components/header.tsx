"use client"

import Link from "next/link"
import { ShoppingBag, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { CartSheet } from "./cart-sheet"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { User, LogOut, LayoutDashboard } from "lucide-react"

const navigation = [
  { name: "Smartphones", href: "/smartphones" },
  { name: "Ordinateurs", href: "/laptops" },
  { name: "Audio", href: "/audio" },
  { name: "Accessoires", href: "/accessories" },
]

export function Header() {
  const { totalItems, setIsOpen } = useCart()
  const { user, logout } = useAuth()

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <nav className="flex flex-col md:flex-row md:items-center md:justify-between px-6 md:px-8 py-4 bg-card/60 backdrop-blur-xl border border-white/10 rounded-[2rem] md:rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] gap-4 md:gap-0">
        {/* Top Row: Logo & Actions */}
        <div className="flex items-center justify-between w-full md:w-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
              <img src="/apple-icon.png" alt="Logo" className="w-7 h-7 object-contain" />
            </div>
            <span className="hidden sm:block text-lg font-black tracking-tight">
              <span className="text-primary">Revo</span><span className="text-accent">tex</span>
            </span>
          </Link>

          {/* Mobile Actions (Visible only on mobile top row) */}
          <div className="flex md:hidden items-center gap-3">
            <button className="p-2 text-foreground/70 bg-white/5 rounded-full">
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 bg-primary text-primary-foreground rounded-full shadow-lg"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[8px] font-bold text-destructive-foreground ring-1 ring-background">
                  {totalItems}
                </span>
              )}
            </button>
            {user ? (
              <button className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-white/10">
                <User className="h-5 w-5" />
              </button>
            ) : (
              <Link href="/login" className="p-2 bg-white/5 rounded-full">
                <User className="h-5 w-5 text-foreground/70" />
              </Link>
            )}
          </div>
        </div>

        {/* Categories (Desktop: Row / Mobile: Scrollable Bottom Bar) */}
        <div className={cn(
          "flex items-center gap-6 md:gap-x-10",
          "w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-white/5",
          "overflow-x-auto no-scrollbar pb-1 md:pb-0 justify-center md:justify-start"
        )}>
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-[11px] md:text-sm font-black md:font-bold uppercase md:capitalize tracking-widest md:tracking-normal",
                "text-primary/90 md:text-primary/80 transition-all hover:text-accent whitespace-nowrap"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions (Hidden on mobile) */}
        <div className="hidden md:flex md:items-center md:gap-x-6">
          <button
            type="button"
            className="p-2 text-foreground/70 hover:text-primary transition-colors bg-white/5 rounded-full"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          
          <div className="flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 p-1 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <User className="h-4 w-4" />
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mt-4 rounded-2xl bg-card/95 backdrop-blur-xl border-white/10" align="end">
                  <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/5" />
                  {user.role === 'admin' && (
                    <DropdownMenuItem asChild className="focus:bg-primary/10 text-primary cursor-pointer rounded-xl font-bold">
                      <Link href="/admin">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard Admin
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem 
                    onClick={() => logout()}
                    className="focus:bg-destructive/10 text-destructive cursor-pointer rounded-xl"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/login"
                className="text-sm font-bold text-foreground/70 hover:text-primary transition-colors"
              >
                Connexion
              </Link>
            )}

            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="group relative flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full font-semibold text-sm hover:opacity-90 transition-all active:scale-95"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Panier</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground ring-2 ring-background group-hover:scale-110 transition-transform">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <CartSheet />
    </header>
  )
}
