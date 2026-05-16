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

    // Convertir l'image en base64 pour la stocker directement dans la base de données
    // car Vercel a un système de fichiers en lecture seule en production
    const mimeType = file.type || "image/jpeg";
    const base64Image = `data:${mimeType};base64,${buffer.toString("base64")}`;

    return { 
      success: true, 
      url: base64Image 
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

export async function searchProducts(searchTerm: string) {
  try {
    if (!searchTerm || searchTerm.trim() === "") {
      return [];
    }
    const term = `%${searchTerm.toLowerCase()}%`;
    const products = await query(
      `SELECT id, name, slug, category, price, image_url 
       FROM products 
       WHERE LOWER(name) LIKE ? OR LOWER(description) LIKE ? 
       LIMIT 10`,
      [term, term]
    ) as any[];
    return products;
  } catch (error) {
    console.error("Search products error:", error);
    return [];
  }
}
