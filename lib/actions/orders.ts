'use server'

import { query } from "@/lib/db";
import { cookies } from "next/headers";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = "ndiayeamadoumactar3@gmail.com";

function formatPrice(amount: number) {
  return new Intl.NumberFormat("fr-SN", { style: "decimal", minimumFractionDigits: 0 }).format(amount) + " FCFA";
}

function buildOrderEmailHtml(data: any, orderId: number) {
  const { customer_name, customer_email, customer_phone, shipping_address, total_amount, items } = data;
  const itemsRows = items.map((item: any) => `
    <tr>
      <td style="padding:10px;border-bottom:1px solid #eee;">${item.name}</td>
      <td style="padding:10px;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
      <td style="padding:10px;border-bottom:1px solid #eee;text-align:right;">${formatPrice(item.price)}</td>
    </tr>
  `).join("");

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:24px;border-radius:16px;">
      <div style="background:#0f1e6e;padding:24px;border-radius:12px;text-align:center;margin-bottom:24px;">
        <h1 style="color:#fff;margin:0;font-size:28px;">🛍️ Revotex</h1>
        <p style="color:#a5b4fc;margin:8px 0 0;">Nouvelle commande reçue</p>
      </div>

      <div style="background:#fff;padding:20px;border-radius:12px;margin-bottom:16px;border:1px solid #e5e7eb;">
        <h2 style="color:#0f1e6e;margin:0 0 16px;font-size:18px;">📋 Commande #${orderId}</h2>
        <p style="margin:6px 0;"><strong>Client :</strong> ${customer_name}</p>
        <p style="margin:6px 0;"><strong>Email :</strong> ${customer_email}</p>
        <p style="margin:6px 0;"><strong>Téléphone :</strong> ${customer_phone}</p>
        <p style="margin:6px 0;"><strong>Adresse :</strong> ${shipping_address}</p>
      </div>

      <div style="background:#fff;padding:20px;border-radius:12px;margin-bottom:16px;border:1px solid #e5e7eb;">
        <h2 style="color:#0f1e6e;margin:0 0 16px;font-size:18px;">🛒 Articles commandés</h2>
        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr style="background:#f3f4f6;">
              <th style="padding:10px;text-align:left;">Produit</th>
              <th style="padding:10px;text-align:center;">Qté</th>
              <th style="padding:10px;text-align:right;">Prix</th>
            </tr>
          </thead>
          <tbody>${itemsRows}</tbody>
        </table>
        <div style="text-align:right;margin-top:16px;font-size:20px;font-weight:bold;color:#0f1e6e;">
          Total : ${formatPrice(total_amount)}
        </div>
      </div>

      <div style="background:#ecfdf5;padding:16px;border-radius:12px;border:1px solid #d1fae5;text-align:center;">
        <p style="margin:0;color:#065f46;font-weight:bold;">💳 Paiement à la livraison</p>
        <p style="margin:4px 0 0;color:#065f46;font-size:14px;">Contactez le client pour confirmer la commande.</p>
      </div>

      <p style="text-align:center;color:#9ca3af;font-size:12px;margin-top:24px;">
        © 2026 Revotex Technologie — revotextech.com
      </p>
    </div>
  `;
}

export async function createOrder(data: any) {
  const { 
    customer_name, 
    customer_email, 
    customer_phone, 
    shipping_address, 
    total_amount, 
    items 
  } = data;

  try {
    const sessionId = (await cookies()).get("user_session")?.value;
    let userId = null;

    if (sessionId && !sessionId.startsWith("admin_")) {
      userId = parseInt(sessionId);
    }

    const result = await query(
      `INSERT INTO orders (user_id, customer_name, customer_email, customer_phone, shipping_address, total_amount, items) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        userId, 
        customer_name, 
        customer_email, 
        customer_phone, 
        shipping_address, 
        total_amount, 
        JSON.stringify(items)
      ]
    ) as any;

    const orderId = result.insertId;

    // Envoi de la notification email à l'admin
    try {
      await resend.emails.send({
        from: "Revotex Store <onboarding@resend.dev>",
        to: ADMIN_EMAIL,
        subject: `🛍️ Nouvelle commande #${orderId} — ${customer_name} (${formatPrice(total_amount)})`,
        html: buildOrderEmailHtml(data, orderId),
      });
    } catch (emailError) {
      // L'email a échoué mais la commande est bien enregistrée
      console.error("Email notification error:", emailError);
    }

    return { success: true, orderId };
  } catch (error: any) {
    console.error("Create order error:", error);
    return { success: false, error: "Erreur lors de la création de la commande" };
  }
}

export async function getOrders() {
  try {
    const orders = await query("SELECT * FROM orders ORDER BY created_at DESC") as any[];
    return orders.map(order => ({
      ...order,
      items: typeof order.items === 'string' ? JSON.parse(order.items) : order.items
    }));
  } catch (error) {
    console.error("Get orders error:", error);
    return [];
  }
}

export async function getMyOrders() {
  try {
    const sessionId = (await cookies()).get("user_session")?.value;
    if (!sessionId || sessionId.startsWith("admin_")) return [];

    const orders = await query(
      "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
      [sessionId]
    ) as any[];

    return orders.map(order => ({
      ...order,
      items: typeof order.items === 'string' ? JSON.parse(order.items) : order.items
    }));
  } catch (error) {
    return [];
  }
}

export async function updateOrderStatus(orderId: number, status: string) {
  try {
    await query("UPDATE orders SET status = ? WHERE id = ?", [status, orderId]);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function getPendingOrdersCount() {
  try {
    const result = await query(
      "SELECT COUNT(*) as count FROM orders WHERE status = 'pending'"
    ) as any[];
    return result[0]?.count || 0;
  } catch (error) {
    return 0;
  }
}

export async function getLatestOrderId() {
  try {
    const result = await query(
      "SELECT id FROM orders ORDER BY created_at DESC LIMIT 1"
    ) as any[];
    return result[0]?.id || null;
  } catch (error) {
    return null;
  }
}
