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
import { User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react"

const navigation = [
  { name: "Drones", href: "/categorie/drone" },
  { name: "Appareils Photo", href: "/categorie/camera" },
]

const productsNav = [
  { name: "Téléphones", href: "/categorie/telephone" },
  { name: "Ordinateurs", href: "/categorie/ordinateur" },
  { name: "Tablettes", href: "/categorie/tablette" },
]

const accessoriesNav = [
  { name: "Accessoires Téléphone", href: "/categorie/accessoire-telephone" },
  { name: "Accessoires Tablette", href: "/categorie/accessoire-tablette" },
  { name: "Accessoires Ordinateur", href: "/categorie/accessoire-ordinateur" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { totalItems, setIsOpen } = useCart()
  const { user, logout } = useAuth()

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <nav className="flex items-center justify-between px-6 py-4 bg-card/60 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
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
        <div className="hidden md:flex md:items-center md:gap-x-8">
          {/* Products Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 text-sm font-bold text-primary/80 transition-all hover:text-accent">
                Produits <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-4 rounded-2xl bg-card/95 backdrop-blur-xl border-white/10 min-w-[200px]" align="start">
              {productsNav.map((item) => (
                <DropdownMenuItem key={item.name} asChild className="focus:bg-primary/10 cursor-pointer rounded-xl">
                  <Link href={item.href} className="font-bold">{item.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-bold text-primary/80 transition-all hover:text-accent hover:scale-105 whitespace-nowrap"
            >
              {item.name}
            </Link>
          ))}
          {/* Accessories Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 text-sm font-bold text-primary/80 transition-all hover:text-accent">
                Accessoires <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-4 rounded-2xl bg-card/95 backdrop-blur-xl border-white/10 min-w-[220px]" align="start">
              {accessoriesNav.map((item) => (
                <DropdownMenuItem key={item.name} asChild className="focus:bg-primary/10 cursor-pointer rounded-xl">
                  <Link href={item.href} className="font-bold">{item.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Desktop Actions */}
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
                  <button className="flex items-center gap-2 p-1 pl-3 pr-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
                    <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <User className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-bold text-foreground max-w-[100px] truncate">{user.name}</span>
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
              <Link href="/login" className="text-sm font-bold text-foreground/70 hover:text-primary transition-colors">
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

        {/* Mobile: Panier + Menu */}
        <div className="flex md:hidden items-center gap-3">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="relative p-2 bg-primary text-primary-foreground rounded-full"
            aria-label="Panier"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[8px] font-bold text-destructive-foreground ring-1 ring-background">
                {totalItems}
              </span>
            )}
          </button>
          <button
            type="button"
            className="p-2 text-foreground bg-white/5 rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <div
        className={cn(
          "md:hidden absolute top-20 left-0 right-0 transition-all duration-500 ease-in-out overflow-hidden bg-card/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl",
          mobileMenuOpen ? "max-h-[80vh] opacity-100 py-8" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col items-center space-y-6 px-6">
          {user && (
            <div className="flex items-center gap-3 w-full p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-sm">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
          )}

          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Nos Produits</p>
          {productsNav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-lg font-bold text-primary hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="w-full h-px bg-white/10" />
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-lg font-bold text-primary hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="w-full h-px bg-white/10" />
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Accessoires</p>
          {accessoriesNav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-base font-bold text-primary/70 hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {!user ? (
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-4 text-center border border-white/10 rounded-2xl font-bold hover:bg-white/5 transition-colors"
            >
              Se connecter
            </Link>
          ) : (
            <button
              onClick={() => { setMobileMenuOpen(false); logout() }}
              className="w-full py-4 text-destructive font-bold flex items-center justify-center gap-2"
            >
              <LogOut className="h-5 w-5" />
              Déconnexion
            </button>
          )}
        </div>
      </div>

      <CartSheet />
    </header>
  )
}
