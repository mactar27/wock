'use server'

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { success: false, error: "Aucun fichier fourni" };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Nettoyer le nom du fichier : garder uniquement lettres et chiffres
    const extension = path.extname(file.name);
    const baseName = path.basename(file.name, extension)
      .replace(/[^a-zA-Z0-9]/g, "") // Supprime tout ce qui n'est pas lettre ou chiffre
      .toLowerCase();
    
    const filename = `${Date.now()}${baseName}${extension}`;
    const uploadPath = path.join(process.cwd(), "public", "uploads", filename);

    await fs.writeFile(uploadPath, buffer);
    
    return { 
      success: true, 
      url: `/uploads/${filename}` 
    };
  } catch (error) {
    console.error("Upload error:", error);
    return { success: false, error: "Erreur lors du téléchargement de l'image" };
  }
}

export async function createProduct(data: any) {
  try {
    const { name, slug, description, category, price, original_price, image_url, in_stock, featured, specs } = data;
    
    await query(
      `INSERT INTO products (name, slug, description, category, price, original_price, image_url, in_stock, featured, specs) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, slug, description, category, price, original_price, image_url, in_stock ? 1 : 0, featured ? 1 : 0, JSON.stringify(specs)]
    );
    
    revalidatePath("/admin/products");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to create product:", error);
    return { success: false, error: "Erreur lors de la création du produit" };
  }
}

export async function updateProduct(id: string, data: any) {
  try {
    const { name, slug, description, category, price, original_price, image_url, in_stock, featured, specs } = data;
    
    await query(
      `UPDATE products SET name=?, slug=?, description=?, category=?, price=?, original_price=?, image_url=?, in_stock=?, featured=?, specs=?
       WHERE id = ?`,
      [name, slug, description, category, price, original_price, image_url, in_stock ? 1 : 0, featured ? 1 : 0, JSON.stringify(specs), id]
    );
    
    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${id}`);
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to update product:", error);
    return { success: false, error: "Erreur lors de la mise à jour du produit" };
  }
}

export async function deleteProduct(id: string) {
  try {
    await query("DELETE FROM products WHERE id = ?", [id]);
    revalidatePath("/admin/products");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { success: false, error: "Erreur lors de la suppression du produit" };
  }
}
