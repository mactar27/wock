import { ProductForm } from "@/components/admin/product-form"

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground mb-8">Add Product</h1>
      <ProductForm />
    </div>
  )
}
