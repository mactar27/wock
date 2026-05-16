import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { cookies } from "next/headers"

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const session = (await cookieStore).get("admin_session")

  // Pour le moment, si pas de session, on redirige (sauf en dev si vous voulez tester)
  if (!session) {
    // redirect("/admin/login")
    console.log("No admin session found, but allowing for dev.")
  }

  // Simulation d'un utilisateur admin pour le sidebar
  const user = { email: "admin@revotex.com" }

  return (
    <div className="flex min-h-screen bg-secondary/30">
      <AdminSidebar user={user as any} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
