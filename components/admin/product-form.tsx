"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createProduct, updateProduct, uploadImage } from "@/lib/actions/products"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { Upload, X, ImageIcon, Plus, Trash2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProductFormProps {
  product?: Product
}


export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file, file.name)

      const result = await uploadImage(formData)
      if (result.success && result.url) {
        setFormData((prev) => ({ ...prev, image_url: result.url as string }))
      } else {
        throw new Error(result.error)
      }
    } catch (err) {
      console.error(err)
      setError("Erreur lors de l'envoi de l'image")
    } finally {
      setUploading(false)
    }
  }


  const defaultSpecs = [
    { key: "Processeur", value: "" },
    { key: "RAM", value: "" },
    { key: "Stockage", value: "" },
    { key: "Carte Graphique", value: "" },
    { key: "Écran", value: "" },
  ]

  const [specs, setSpecs] = useState<{ key: string; value: string }[]>(
    product?.specs && Object.keys(product.specs).length > 0
      ? Object.entries(product.specs).map(([key, value]) => ({ key, value: String(value) }))
      : defaultSpecs
  )

  const addSpec = () => setSpecs([...specs, { key: "", value: "" }])
  const removeSpec = (index: number) => setSpecs(specs.filter((_, i) => i !== index))
  const updateSpec = (index: number, field: "key" | "value", value: string) => {
    const newSpecs = [...specs]
    newSpecs[index][field] = value
    setSpecs(newSpecs)
  }

  const [formData, setFormData] = useState({
    name: product?.name || "",
    slug: product?.slug || "",
    description: product?.description || "",
    category: product?.category === "smartphone" ? "telephone" : (product?.category || "telephone"),
    price: product?.price?.toString() || "",
    original_price: product?.original_price?.toString() || "",
    image_url: product?.image_url || "",
    in_stock: product?.in_stock ?? true,
    featured: product?.featured ?? false,
  })

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: prev.slug || generateSlug(name),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      let specsObject = {}
      specs.forEach(s => {
        if (s.key && s.value) {
          specsObject[s.key] = s.value
        }
      })

      const productData = {
        name: formData.name,
        slug: formData.slug,
        description: formData.description || null,
        category: formData.category,
        price: parseFloat(formData.price),
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
        image_url: formData.image_url || null,
        in_stock: formData.in_stock,
        featured: formData.featured,
        specs: specsObject,
      }

      let result;
      if (product) {
        result = await updateProduct(product.id, productData);
      } else {
        result = await createProduct(productData);
      }

      if (result.success) {
        router.push("/admin/products")
        router.refresh()
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Basic Info */}
        <Card className="border-primary/10 shadow-sm">
          <CardHeader>
            <CardTitle className="text-primary">Informations de Base</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du Produit</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
                className="border-primary/20 focus:ring-primary h-12 text-lg"
                placeholder="ex: iPhone 17 Air"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description Longue</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="border-primary/20 focus:ring-primary"
                placeholder="Décrivez les points forts du produit..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger className="border-primary/20 focus:ring-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="telephone">Téléphone</SelectItem>
                  <SelectItem value="ordinateur">Ordinateur</SelectItem>
                  <SelectItem value="tablette">Tablette</SelectItem>
                  <SelectItem value="drone">Drone</SelectItem>
                  <SelectItem value="camera">Appareil Photo</SelectItem>
                  <SelectItem value="accessoire-telephone">Accessoires Téléphone</SelectItem>
                  <SelectItem value="accessoire-tablette">Accessoires Tablette</SelectItem>
                  <SelectItem value="accessoire-ordinateur">Accessoires Ordinateur</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card className="border-primary/10 shadow-sm">
          <CardHeader>
            <CardTitle className="text-primary">Prix & Stock</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="price">Prix (FCFA)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                required
                className="border-primary/20 focus:ring-primary font-bold"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="original_price">Prix Original (FCFA) - Optionnel</Label>
              <Input
                id="original_price"
                type="number"
                min="0"
                value={formData.original_price}
                onChange={(e) => setFormData((prev) => ({ ...prev, original_price: e.target.value }))}
                className="border-primary/20 focus:ring-primary"
              />
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-primary/5">
              <Label htmlFor="in_stock" className="font-semibold">En Stock</Label>
              <Switch
                id="in_stock"
                checked={formData.in_stock}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, in_stock: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-primary/5">
              <Label htmlFor="featured" className="font-semibold">Mettre en avant</Label>
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, featured: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Media */}
        <Card className="border-primary/10 shadow-sm">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Médias (Image)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div 
                onClick={() => !uploading && fileInputRef.current?.click()}
                className={cn(
                  "relative group aspect-video rounded-xl border-2 border-dashed border-primary/20 bg-primary/5 flex items-center justify-center overflow-hidden transition-all cursor-pointer",
                  uploading && "opacity-50 cursor-not-allowed",
                  !formData.image_url && "hover:border-primary/40 hover:bg-primary/10"
                )}
              >
                {formData.image_url ? (
                  <>
                    <img 
                      key={formData.image_url}
                      src={formData.image_url} 
                      alt="Aperçu du produit" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData(prev => ({ ...prev, image_url: "" }));
                      }}
                      className="absolute top-4 right-4 p-3 bg-destructive text-destructive-foreground rounded-full shadow-2xl hover:scale-110 transition-transform z-10"
                      title="Supprimer l'image"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </>
                ) : (
                  <div className="text-center p-6">
                    <Upload className="h-12 w-12 text-primary/40 mx-auto mb-3" />
                    <p className="text-base text-muted-foreground font-bold">
                      {uploading ? "Téléchargement..." : "Cliquez ici pour choisir une photo"}
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image_url">Ou entrez une URL manuellement</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData((prev) => ({ ...prev, image_url: e.target.value }))}
                  placeholder="/uploads/nom-image.jpeg ou https://..."
                  className="border-primary/20 focus:ring-primary text-xs"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Specs */}
        <Card className="border-primary/10 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-primary">Caractéristiques Techniques</CardTitle>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={addSpec}
              className="border-primary/20 text-primary hover:bg-primary/5"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {specs.length === 0 ? (
                <div className="text-center py-6 border-2 border-dashed border-muted rounded-xl">
                  <p className="text-sm text-muted-foreground">Aucune caractéristique définie</p>
                </div>
              ) : (
                specs.map((spec, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      placeholder="ex: RAM"
                      value={spec.key}
                      onChange={(e) => updateSpec(index, "key", e.target.value)}
                      className="border-primary/20 focus:ring-primary h-9"
                    />
                    <Input
                      placeholder="ex: 16 Go"
                      value={spec.value}
                      onChange={(e) => updateSpec(index, "value", e.target.value)}
                      className="border-primary/20 focus:ring-primary h-9"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSpec(index)}
                      className="text-destructive hover:bg-destructive/10 shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm font-bold">
          ⚠️ {error}
        </div>
      )}

      <div className="mt-10 flex items-center gap-4">
        <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-bold">
          {loading ? "Enregistrement..." : product ? "Mettre à jour le produit" : "Créer le produit"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()} className="px-8 py-6 text-lg">
          Annuler
        </Button>
      </div>
    </form>
  )
}
