import { AuthForm } from "@/components/auth-form"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center p-6 pt-32">
        <AuthForm mode="register" />
      </main>
      <Footer />
    </div>
  )
}
