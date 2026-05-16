"use client"

import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Simulation d'un utilisateur admin pour le sidebar
  const user = { email: "admin@revotex.com" }

  return (
    <div className="flex min-h-screen bg-secondary/30 relative">
      {/* Mobile Menu Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Wrapper */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <AdminSidebar user={user as any} onAction={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between h-16 px-6 bg-card border-b border-primary/10">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-primary bg-primary/5 rounded-xl"
          >
            <Menu className="h-6 w-6" />
          </button>
          <span className="font-black text-lg tracking-tighter">
            <span className="text-primary">Revo</span><span className="text-accent">tex</span> <span className="text-foreground/40 font-bold text-sm">Admin</span>
          </span>
          <div className="w-8" /> {/* Spacer */}
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
