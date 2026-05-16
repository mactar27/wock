import { query } from "@/lib/db"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { Footer } from "@/components/footer"
import type { Product } from "@/lib/types"
import { notFound } from "next/navigation"

const CATEGORY_CONFIG: Record<string, { label: string; badge: string; description: string }> = {
  "telephone": {
    label: "Téléphones",
    badge: "Smartphones & Plus",
    description: "Les derniers smartphones et téléphones premium disponibles au Sénégal.",
  },
  "ordinateur": {
    label: "Ordinateurs",
    badge: "Laptops & Desktops",
    description: "PC portables et fixes pour tous vos besoins professionnels et créatifs.",
  },
  "tablette": {
    label: "Tablettes",
    badge: "Tablettes & iPads",
    description: "Tablettes haut de gamme pour la productivité et le divertissement.",
  },
  "drone": {
    label: "Drones",
    badge: "Drones & Caméras Volantes",
    description: "Drones professionnels et de loisir avec les meilleures performances du marché.",
  },
  "camera": {
    label: "Appareils Photo",
    badge: "Photo & Vidéo",
    description: "Appareils photo et caméras pour capturer vos moments les plus précieux.",
  },
  "accessoire-telephone": {
    label: "Accessoires Téléphone",
    badge: "Coques, Chargeurs & Plus",
    description: "Tous les accessoires indispensables pour votre téléphone.",
  },
  "accessoire-tablette": {
    label: "Accessoires Tablette",
    badge: "Claviers, Stylets & Plus",
    description: "Améliorez votre expérience tablette avec nos accessoires premium.",
  },
  "accessoire-ordinateur": {
    label: "Accessoires Ordinateur",
    badge: "Souris, Claviers & Plus",
    description: "Périphériques et accessoires pour optimiser votre espace de travail.",
  },
}

interface PageProps {
  params: Promise<{ category: string }>
}

async function getProducts(category: string): Promise<Product[]> {
  try {
    const products = await query(
      "SELECT * FROM products WHERE category = ? ORDER BY created_at DESC",
      [category]
    ) as Product[]
    return products || []
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params
  const config = CATEGORY_CONFIG[category]
  if (!config) return { title: "Catégorie non trouvée" }
  return {
    title: `${config.label} - Revotex`,
    description: config.description,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params
  const config = CATEGORY_CONFIG[category]

  if (!config) notFound()

  const products = await getProducts(category)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-40 pb-16 bg-background">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-wider uppercase">
            {config.badge}
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
            <span className="text-primary">{config.label}</span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
            {config.description}
          </p>
        </div>
      </section>

      <section className="pb-20 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          {products.length === 0 ? (
            <div className="text-center py-20 bg-card/50 border border-white/10 rounded-3xl">
              <p className="text-muted-foreground text-lg">Aucun produit disponible dans cette catégorie pour le moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} variant="featured" />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
