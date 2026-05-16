"use client"

import Link from "next/link"
import { Menu, X, ShoppingBag, Search } from "lucide-react"
import { useState } from "react"
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
import { User, LogOut, Settings, UserCircle, LayoutDashboard } from "lucide-react"

const navigation = [
  { name: "Smartphones", href: "/smartphones" },
  { name: "Ordinateurs", href: "/laptops" },
  { name: "Audio", href: "/audio" },
  { name: "Accessoires", href: "/accessories" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { totalItems, setIsOpen } = useCart()
  const { user, logout } = useAuth()

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <nav className="flex items-center justify-between px-8 py-4 bg-card/60 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
            <img src="/apple-icon.png" alt="Logo" className="w-7 h-7 object-contain" />
          </div>
          <span className="hidden sm:block text-lg font-black tracking-tight">
            <span className="text-primary">Revo</span><span className="text-accent">tex</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-x-10">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-bold text-primary/80 transition-all hover:text-accent hover:scale-105"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Navigation (Scrollable) */}
        <div className="flex md:hidden items-center gap-4 overflow-x-auto no-scrollbar max-w-[50%] px-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-[10px] font-black uppercase tracking-tighter text-primary/90 whitespace-nowrap"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-6">
          <button
            type="button"
            className="p-1.5 md:p-2 text-foreground/70 hover:text-primary transition-colors bg-white/5 rounded-full"
            aria-label="Search"
          >
            <Search className="h-4 w-4 md:h-5 w-5" />
          </button>
          
          <div className="flex items-center gap-2 md:gap-4">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="group relative flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-primary text-primary-foreground rounded-full font-bold text-[10px] md:text-sm hover:opacity-90 transition-all active:scale-95"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="h-3.5 w-3.5 md:h-4 w-4" />
              <span className="hidden sm:inline">Panier</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[8px] font-bold text-destructive-foreground ring-1 ring-background">
                  {totalItems}
                </span>
              )}
            </button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 p-1 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <User className="h-3.5 w-3.5 md:h-4 w-4" />
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
                className="text-[10px] md:text-sm font-bold text-foreground/70 hover:text-primary transition-colors"
              >
                Connexion
              </Link>
            )}
          </div>
        </div>
      </nav>v>

      <CartSheet />
    </header>
  )
}
