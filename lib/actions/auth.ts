'use server'

import { query } from "@/lib/db";
import { cookies } from "next/headers";

export async function login(formData: any) {
  const { email, password } = formData;

  try {
    // Dans un vrai système, on utiliserait bcrypt.compare()
    // Pour cet exemple, on vérifie si l'utilisateur existe dans la table admin_users
    const users = await query(
      "SELECT * FROM admin_users WHERE email = ? AND password = ?",
      [email, password]
    ) as any[];

    if (users.length > 0) {
      const user = users[0];
      
      // Création d'une session simple via cookie
      (await cookies()).set("admin_session", user.id.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 1 jour
        path: "/",
      });

      return { success: true };
    } else {
      return { success: false, error: "Email ou mot de passe incorrect" };
    }
  } catch (error: any) {
    console.error("DEBUG LOGIN ERROR:", error.message || error);
    return { success: false, error: `Erreur DB: ${error.message || "Inconnue"}` };
  }
}

export async function logout() {
  (await cookies()).delete("admin_session");
  return { success: true };
}
