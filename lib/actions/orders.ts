'use server'

import { query } from "@/lib/db";
import { cookies } from "next/headers";

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

    return { success: true, orderId: result.insertId };
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
