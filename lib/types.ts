export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  category: 'smartphone' | 'laptop' | 'audio' | 'accessory' | string;
  price: number;
  original_price: number | null;
  image_url: string | null;
  specs: Record<string, any>;
  in_stock: boolean;
  featured: boolean;
  created_at: string;
}

export interface AdminUser {
  id: string
  email: string
  created_at: string
}
