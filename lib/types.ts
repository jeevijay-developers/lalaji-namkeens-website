export type Language = "en" | "hi"

export interface Category {
  id: string
  name_en: string
  name_hi: string
  slug: string
  image_url?: string
  display_order: number
  is_active: boolean
  created_at: string
}

export interface Product {
  id: string
  category_id?: string
  name_en: string
  name_hi: string
  slug: string
  description_en?: string
  description_hi?: string
  image_url?: string
  is_featured: boolean
  is_active: boolean
  display_order: number
  created_at: string
  updated_at: string
  category?: Category
  variants?: ProductVariant[]
}

export interface ProductVariant {
  id: string
  product_id: string
  weight_grams: number
  weight_label_en: string
  weight_label_hi: string
  price?: number
  is_active: boolean
  display_order: number
  created_at: string
}

export interface QuotationItem {
  id?: string
  quotation_id?: string
  product_id: string
  variant_id: string
  product_name_en: string
  product_name_hi: string
  variant_label_en: string
  variant_label_hi: string
  quantity: number
  unit_price?: number
  total_price?: number
}

export interface Quotation {
  id: string
  quotation_number: string
  customer_name: string
  customer_email?: string
  customer_mobile: string
  customer_address?: string
  total_items: number
  estimated_total?: number
  approved_total?: number
  status: "requested" | "approved" | "rejected" | "converted_to_order"
  notes?: string
  admin_notes?: string
  created_at: string
  updated_at: string
  quotation_items?: QuotationItem[]
}

export interface Order {
  id: string
  order_number: string
  quotation_id?: string
  customer_name: string
  customer_email?: string
  customer_mobile: string
  customer_address: string
  total_amount: number
  gst_amount: number
  final_amount: number
  status: "processing" | "dispatched" | "delivered" | "cancelled"
  tracking_number?: string
  payment_status: "pending" | "paid" | "refunded"
  notes?: string
  admin_notes?: string
  created_at: string
  updated_at: string
  order_items?: QuotationItem[]
}

export interface CartItem extends QuotationItem {
  product?: Product
  variant?: ProductVariant
}
