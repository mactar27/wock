'use server'

import { query } from "@/lib/db";
import { cookies } from "next/headers";

export async function userRegister(data: any) {
  const { name, email, password } = data;

  try {
    // Vérifier si l'email existe déjà
    const existing = await query("SELECT id FROM User WHERE email = ?", [email]) as any[];
    if (existing.length > 0) {
      return { success: false, error: "Cet email est déjà utilisé" };
    }

    // Insérer le nouvel utilisateur
    const result = await query(
      "INSERT INTO User (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    ) as any;

    const userId = result.insertId;

    // Création de la session
    (await cookies()).set("user_session", userId.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: "/",
    });

    return { success: true };
  } catch (error: any) {
    console.error("Register error:", error);
    return { success: false, error: "Erreur lors de l'inscription" };
  }
}

export async function userLogin(data: any) {
  const { email, password } = data;

  try {
    // 1. Chercher dans la table des utilisateurs standards
    let users = await query(
      "SELECT * FROM User WHERE email = ? AND password = ?",
      [email, password]
    ) as any[];

    if (users.length > 0) {
      const user = users[0];
      
      (await cookies()).set("user_session", user.id.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      return { success: true, user: { id: user.id, name: user.name, email: user.email, role: 'user' } };
    }

    // 2. Si non trouvé, chercher dans la table des administrateurs
    let admins = await query(
      "SELECT * FROM admin_users WHERE email = ? AND password = ?",
      [email, password]
    ) as any[];

    if (admins.length > 0) {
      const admin = admins[0];
      
      (await cookies()).set("user_session", `admin_${admin.id}`, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      return { success: true, user: { id: admin.id, name: "Admin WockyTech", email: admin.email, role: 'admin' } };
    }

    return { success: false, error: "Email ou mot de passe incorrect" };
  } catch (error: any) {
    console.error("Login error:", error);
    return { success: false, error: "Erreur lors de la connexion" };
  }
}

export async function userLogout() {
  (await cookies()).delete("user_session");
  return { success: true };
}

export async function getCurrentUser() {
  try {
    const sessionId = (await cookies()).get("user_session")?.value;
    if (!sessionId) return null;

    if (sessionId.startsWith("admin_")) {
      const adminId = sessionId.replace("admin_", "");
      const admins = await query("SELECT id, email FROM admin_users WHERE id = ?", [adminId]) as any[];
      if (admins.length > 0) {
        return { ...admins[0], name: "Admin WockyTech", role: 'admin' };
      }
    } else {
      const users = await query("SELECT id, name, email FROM User WHERE id = ?", [sessionId]) as any[];
      if (users.length > 0) {
        return { ...users[0], role: 'user' };
      }
    }
    return null;
  } catch (error) {
    return null;
  }
}
