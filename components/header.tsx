"use client"

import Link from "next/link"
import { Menu, X, ShoppingBag, Search } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Smartphones", href: "/smartphones" },
  { name: "Ordinateurs", href: "/laptops" },
  { name: "Audio", href: "/audio" },
  { name: "Accessoires", href: "/accessories" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <nav className="flex items-center justify-between px-8 py-4 bg-card/60 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        {/* Espace vide à la place du logo pour l'équilibre */}
        <div className="flex-1 md:flex-none" />

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-x-10">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-foreground/70 transition-all hover:text-primary hover:scale-105"
            >
              {item.name}
            </Link>
          ))}
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
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-full font-semibold text-sm hover:opacity-90 transition-opacity"
            aria-label="Shopping bag"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Panier</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="p-2 text-foreground bg-white/5 rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden absolute top-20 left-0 right-0 transition-all duration-500 ease-in-out overflow-hidden bg-card/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl",
          mobileMenuOpen ? "max-h-[80vh] opacity-100 py-8" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col items-center space-y-6 px-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-xl font-semibold text-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <button className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold">
            Mon Panier
          </button>
        </div>
      </div>
    </header>
  )
}
