export type UserRole = 'customer' | 'admin' | 'manager' | 'staff';

export type VisualTheme = 'cyber-crimson' | 'festive-gold' | 'hyper-blue';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  is_active: boolean;
  sort_order: number;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url: string;
  description: string;
  is_active: boolean;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  sku: string;
  colour: string;
  ram?: string;
  storage?: string;
  price: number;
  stock_quantity: number;
  image_url?: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text: string;
  sort_order: number;
}

export interface Specification {
  id: string;
  product_id: string;
  specification_group: string;
  specification_name: string;
  specification_value: string;
  sort_order: number;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  brand_id: string;
  brand_name?: string;
  category_id: string;
  category_name?: string;
  description: string;
  short_description: string;
  price: number;
  mrp: number;
  discount_percentage: number;
  stock_quantity: number;
  low_stock_threshold: number;
  rating: number;
  review_count: number;
  is_featured: boolean;
  is_best_seller: boolean;
  is_offer: boolean;
  is_active: boolean;
  images: ProductImage[];
  variants: ProductVariant[];
  specifications: Specification[];
  created_at: string;
  updated_at: string;
}

export type OrderStatus = 
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Ready for Pickup'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled'
  | 'Returned';

export type PaymentMethod = 'Cash on Delivery' | 'Online Payment' | 'WhatsApp Order';

export type PaymentStatus = 'Pending' | 'Paid' | 'Failed' | 'Refunded';

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  variant_id?: string;
  product_name: string;
  variant_description?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  image_url?: string;
}

export interface Order {
  id: string;
  order_number: string;
  customer_id?: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod;
  subtotal: number;
  discount: number;
  delivery_fee: number;
  total: number;
  shipping_address: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
  };
  notes?: string;
  whatsapp_order: boolean;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

export interface Review {
  id: string;
  product_id: string;
  product_name?: string;
  customer_id?: string;
  customer_name: string;
  rating: number;
  review_text: string;
  is_approved: boolean;
  is_demo?: boolean;
  created_at: string;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discount_type: 'flat' | 'percentage';
  discount_value: number;
  minimum_order: number;
  maximum_discount: number;
  start_date: string;
  end_date: string;
  usage_limit: number;
  used_count: number;
  is_active: boolean;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  button_text: string;
  button_url: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  sort_order: number;
}

export interface SocialMediaContent {
  id: string;
  platform: 'Facebook' | 'Instagram' | 'YouTube';
  content_type: 'image' | 'video' | 'reel';
  media_url: string;
  thumbnail_url: string;
  title: string;
  caption: string;
  target_url: string;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface ExchangeRequest {
  id: string;
  name: string;
  phone: string;
  device_brand: string;
  device_model: string;
  device_condition: string;
  preferred_device: string;
  message?: string;
  status: 'New' | 'Contacted' | 'Evaluating' | 'Quoted' | 'Completed' | 'Rejected';
  created_at: string;
}

export interface FinanceRequest {
  id: string;
  name: string;
  phone: string;
  product_interest: string;
  message?: string;
  status: 'New' | 'Contacted' | 'Processing' | 'Approved' | 'Closed';
  created_at: string;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  enquiry_type: 'General' | 'Product' | 'Bulk' | 'Support';
  status: 'New' | 'Contacted' | 'Resolved';
  created_at: string;
}

export interface BusinessSettings {
  id: string;
  business_name: string;
  tagline: string;
  established_year: number;
  logo_url: string;
  phone: string;
  whatsapp_number: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  google_maps_url: string;
  google_maps_embed?: string;
  facebook_url: string;
  instagram_url: string;
  youtube_url: string;
  opening_hours: string;
  announcement_text: string;
  hero_title: string;
  hero_subtitle: string;
  hero_supporting: string;
  currency_symbol: string;
}

export interface CartItem {
  id: string; // unique item id = `${productId}_${variantId || 'default'}`
  product: Product;
  variant?: ProductVariant;
  quantity: number;
}
