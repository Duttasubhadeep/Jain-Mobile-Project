import {
  Product,
  Category,
  Brand,
  Order,
  Review,
  Coupon,
  Banner,
  SocialMediaContent,
  ExchangeRequest,
  FinanceRequest,
  Enquiry,
  BusinessSettings,
  User,
  GalleryItem,
} from '../types';

const STORAGE_KEYS = {
  SETTINGS: 'jm_business_settings',
  PRODUCTS: 'jm_products',
  CATEGORIES: 'jm_categories',
  BRANDS: 'jm_brands',
  ORDERS: 'jm_orders',
  REVIEWS: 'jm_reviews',
  COUPONS: 'jm_coupons',
  BANNERS: 'jm_banners',
  SOCIAL: 'jm_social_media',
  EXCHANGE: 'jm_exchange_requests',
  FINANCE: 'jm_finance_requests',
  ENQUIRIES: 'jm_enquiries',
  USERS: 'jm_users',
  CURRENT_USER: 'jm_current_user',
  WISHLIST: 'jm_wishlist',
  CART: 'jm_cart',
  GALLERY: 'jm_photo_gallery',
};

export const INITIAL_SETTINGS: BusinessSettings = {
  id: 'default_settings',
  business_name: "JAIN'S Mobiles & Laptops",
  tagline: "TRUST • QUALITY • SERVICE",
  established_year: 2005,
  logo_url: "/assets/images/jains_brand_logo_1789505559002.jpg",
  phone: "+91 86419 54500",
  whatsapp_number: "+918641954500",
  email: "contact@jainsmobiles.com",
  address: "S-82, Gole Bazar, S24 Shimla Center",
  city: "Kharagpur",
  state: "West Bengal",
  pincode: "721301",
  google_maps_url: "https://maps.google.com/?q=Jain's+Mobiles+and+Laptops+Gole+Bazar+Kharagpur+721301",
  google_maps_embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.6015579979313!2d87.31976!3d22.33878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1d4410a5146c87%3A0x6b2b7b05f2479e57!2sGole%20Bazar%2C%20Kharagpur%2C%20West%20Bengal%20721301!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  facebook_url: "https://facebook.com/jainsmobiles",
  instagram_url: "https://instagram.com/jains.akashjain",
  youtube_url: "https://youtube.com/@jainsmobiles",
  opening_hours: "Mon – Sat: 10:00 AM – 9:30 PM | Sunday: 11:00 AM – 8:30 PM",
  announcement_text: "FESTIVE LOOT LO SALE • EXTRA ₹5,000 EXCHANGE BONUS • 0% EMI • LIFETIME FREE TEMPERED GLASS • CALL 086419 54500",
  hero_title: "21 YEARS OF TRUST • QUALITY • SERVICE",
  hero_subtitle: "Kharagpur's #1 Destination for Smartphones, Laptops & Genuine Accessories Since 2005.",
  hero_supporting: "3 SHOWROOM LOCATIONS IN KHARAGPUR • AUTHORIZED APPLE, SAMSUNG, ONEPLUS, HP & DELL RETAILER",
  currency_symbol: "₹",
};

export const SHOWROOM_BRANCHES = [
  {
    id: 'branch-1',
    name: "Shop-1 (Flagship Store)",
    address: "S-82, Gole Bazar, Kharagpur, West Bengal - 721301",
    landmark: "Main Gole Bazar Market",
    phone: "+91 86419 54500",
    timing: "10:00 AM – 9:30 PM",
    specialty: "Flagship Smartphones, Laptops & Live Experience Counters",
    is_main: true,
  },
  {
    id: 'branch-2',
    name: "Shop-2 (Shimla Center)",
    address: "S-24, Shimla Center, Gole Bazar, Kharagpur, West Bengal - 721301",
    landmark: "Shimla Center, Gole Bazar",
    phone: "+91 86419 54500",
    timing: "10:00 AM – 9:30 PM",
    specialty: "Mobiles, Tablets, Smartwatches & Genuine Accessories",
    is_main: false,
  },
  {
    id: 'branch-3',
    name: "Shop-3 (Prem Bazar)",
    address: "Prem Bazar, Hijli Society, Kharagpur, West Bengal - 721306",
    landmark: "Near IIT Kharagpur / Hijli Society",
    phone: "+91 86419 54500",
    timing: "10:30 AM – 9:00 PM",
    specialty: "Student Tech Deals, Laptops, Audio Gear & Fast Service Desk",
    is_main: false,
  },
];

export const INITIAL_BRANDS: Brand[] = [
  { id: 'b-apple', name: 'Apple', slug: 'apple', logo_url: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=200&auto=format&fit=crop&q=80', description: 'iPhones, MacBooks, iPads and official accessories.', is_active: true },
  { id: 'b-samsung', name: 'Samsung', slug: 'samsung', logo_url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=200&auto=format&fit=crop&q=80', description: 'Galaxy S-Series, Foldables, A-Series and Galaxy Book laptops.', is_active: true },
  { id: 'b-oneplus', name: 'OnePlus', slug: 'oneplus', logo_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=200&auto=format&fit=crop&q=80', description: 'Never Settle flagship speed and OxygenOS performance.', is_active: true },
  { id: 'b-motorola', name: 'Motorola', slug: 'motorola', logo_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=200&auto=format&fit=crop&q=80', description: 'Edge series and Razr foldables with clean Android.', is_active: true },
  { id: 'b-nothing', name: 'Nothing', slug: 'nothing', logo_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&auto=format&fit=crop&q=80', description: 'Iconic transparent Glyph interface smartphones and audio.', is_active: true },
  { id: 'b-google', name: 'Google', slug: 'google', logo_url: 'https://images.unsplash.com/photo-1573883431240-b6f707f16805?w=200&auto=format&fit=crop&q=80', description: 'Pixel smartphones powered by Google Tensor and pro cameras.', is_active: true },
  { id: 'b-xiaomi', name: 'Xiaomi', slug: 'xiaomi', logo_url: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=200&auto=format&fit=crop&q=80', description: 'Redmi and Xiaomi flagship camera innovations.', is_active: true },
  { id: 'b-vivo', name: 'Vivo', slug: 'vivo', logo_url: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=200&auto=format&fit=crop&q=80', description: 'ZEISS portrait imaging and slim design flagships.', is_active: true },
  { id: 'b-oppo', name: 'Oppo', slug: 'oppo', logo_url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&auto=format&fit=crop&q=80', description: 'Find and Reno series with fast SuperVOOC charging.', is_active: true },
  { id: 'b-realme', name: 'Realme', slug: 'realme', logo_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=200&auto=format&fit=crop&q=80', description: 'Trendsetting design and performance smartphones.', is_active: true },
  { id: 'b-tecno', name: 'Tecno', slug: 'tecno', logo_url: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=200&auto=format&fit=crop&q=80', description: 'Camon and Phantom series cutting-edge devices.', is_active: true },
  { id: 'b-hp', name: 'HP', slug: 'hp', logo_url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200&auto=format&fit=crop&q=80', description: 'Pavilion, Envy, Omen and Spectre laptops.', is_active: true },
  { id: 'b-dell', name: 'Dell', slug: 'dell', logo_url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=200&auto=format&fit=crop&q=80', description: 'Inspiron, XPS and Alienware laptops for professionals.', is_active: true },
  { id: 'b-asus', name: 'ASUS', slug: 'asus', logo_url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=200&auto=format&fit=crop&q=80', description: 'ZenBook, Vivobook and ROG gaming powerhouses.', is_active: true },
];

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-mobiles',
    name: 'Mobiles',
    slug: 'mobiles',
    description: 'Latest 5G smartphones and feature phones from top global brands.',
    image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&auto=format&fit=crop&q=80',
    is_active: true,
    sort_order: 1,
  },
  {
    id: 'cat-laptops',
    name: 'Laptops',
    slug: 'laptops',
    description: 'High-performance laptops for gaming, business, coding, and studies.',
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    is_active: true,
    sort_order: 2,
  },
  {
    id: 'cat-accessories',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Original chargers, premium TWS earbuds, tough cases, cables & protectors.',
    image_url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    is_active: true,
    sort_order: 3,
  },
  {
    id: 'cat-exchange',
    name: 'Exchange',
    slug: 'exchange',
    description: 'Trade in your existing mobile or laptop for maximum upgrade value.',
    image_url: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=800&auto=format&fit=crop&q=80',
    is_active: true,
    sort_order: 4,
  },
  {
    id: 'cat-finance',
    name: 'Finance',
    slug: 'finance',
    description: 'Zero/low down payment flexible EMI options through trusted finance partners.',
    image_url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80',
    is_active: true,
    sort_order: 5,
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-iphone-16-pro',
    sku: 'JM-AP-IP16P-256',
    name: 'Apple iPhone 16 Pro (256GB)',
    slug: 'apple-iphone-16-pro-256gb',
    brand_id: 'b-apple',
    brand_name: 'Apple',
    category_id: 'cat-mobiles',
    category_name: 'Mobiles',
    description: 'Forged in titanium with industry-leading A18 Pro chip, 48MP fusion camera, Camera Control button, and up to 27 hours video playback. Supported by Apple India warranty.',
    short_description: 'Grade 5 Titanium, A18 Pro Chip, 48MP Pro Camera, USB-C 3.0.',
    price: 129900,
    mrp: 134900,
    discount_percentage: 4,
    stock_quantity: 8,
    low_stock_threshold: 3,
    rating: 4.9,
    review_count: 64,
    is_featured: true,
    is_best_seller: true,
    is_offer: false,
    is_active: true,
    images: [
      { id: 'img-ip16p-1', product_id: 'prod-iphone-16-pro', image_url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=900&auto=format&fit=crop&q=80', alt_text: 'iPhone 16 Pro Natural Titanium', sort_order: 1 },
      { id: 'img-ip16p-2', product_id: 'prod-iphone-16-pro', image_url: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=900&auto=format&fit=crop&q=80', alt_text: 'iPhone 16 Pro Display', sort_order: 2 }
    ],
    variants: [
      { id: 'var-ip16p-nt-256', product_id: 'prod-iphone-16-pro', sku: 'JM-AP-IP16P-NT-256', colour: 'Natural Titanium', storage: '256GB', price: 129900, stock_quantity: 4 },
      { id: 'var-ip16p-dt-256', product_id: 'prod-iphone-16-pro', sku: 'JM-AP-IP16P-DT-256', colour: 'Desert Titanium', storage: '256GB', price: 129900, stock_quantity: 2 },
      { id: 'var-ip16p-bt-512', product_id: 'prod-iphone-16-pro', sku: 'JM-AP-IP16P-BT-512', colour: 'Black Titanium', storage: '512GB', price: 149900, stock_quantity: 2 }
    ],
    specifications: [
      { id: 'sp-1', product_id: 'prod-iphone-16-pro', specification_group: 'Display', specification_name: 'Screen', specification_value: '6.3-inch Super Retina XDR OLED ProMotion 120Hz', sort_order: 1 },
      { id: 'sp-2', product_id: 'prod-iphone-16-pro', specification_group: 'Performance', specification_name: 'Processor', specification_value: 'Apple A18 Pro 3nm Bionic', sort_order: 2 },
      { id: 'sp-3', product_id: 'prod-iphone-16-pro', specification_group: 'Camera', specification_name: 'Rear Camera', specification_value: '48MP Main + 48MP Ultra-wide + 12MP 5x Telephoto', sort_order: 3 },
      { id: 'sp-4', product_id: 'prod-iphone-16-pro', specification_group: 'Battery', specification_name: 'Charging', specification_value: 'Fast USB-C 25W MagSafe Wireless', sort_order: 4 },
      { id: 'sp-5', product_id: 'prod-iphone-16-pro', specification_group: 'Network', specification_name: 'Connectivity', specification_value: '5G Dual SIM (eSIM + nano-SIM), Wi-Fi 7', sort_order: 5 }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'prod-samsung-s25-ultra',
    sku: 'JM-SM-S25U-512',
    name: 'Samsung Galaxy S25 Ultra 5G',
    slug: 'samsung-galaxy-s25-ultra-5g',
    brand_id: 'b-samsung',
    brand_name: 'Samsung',
    category_id: 'cat-mobiles',
    category_name: 'Mobiles',
    description: 'Galaxy AI powerhouse equipped with Snapdragon 8 Elite, built-in S-Pen, titanium frame, 200MP Quad Telephoto optical zoom, and Corning Gorilla Armor 2 anti-reflective display.',
    short_description: 'Snapdragon 8 Elite, 200MP Quad Zoom, Built-in S-Pen, Titanium Body.',
    price: 134999,
    mrp: 144999,
    discount_percentage: 7,
    stock_quantity: 6,
    low_stock_threshold: 2,
    rating: 4.8,
    review_count: 52,
    is_featured: true,
    is_best_seller: true,
    is_offer: true,
    is_active: true,
    images: [
      { id: 'img-s25u-1', product_id: 'prod-samsung-s25-ultra', image_url: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=900&auto=format&fit=crop&q=80', alt_text: 'Samsung S25 Ultra Titanium', sort_order: 1 },
      { id: 'img-s25u-2', product_id: 'prod-samsung-s25-ultra', image_url: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=900&auto=format&fit=crop&q=80', alt_text: 'Samsung S25 Ultra Display', sort_order: 2 }
    ],
    variants: [
      { id: 'var-s25u-tb-256', product_id: 'prod-samsung-s25-ultra', sku: 'JM-SM-S25U-TB-256', colour: 'Titanium Black', ram: '12GB', storage: '256GB', price: 134999, stock_quantity: 4 },
      { id: 'var-s25u-ts-512', product_id: 'prod-samsung-s25-ultra', sku: 'JM-SM-S25U-TS-512', colour: 'Titanium Silver', ram: '16GB', storage: '512GB', price: 144999, stock_quantity: 2 }
    ],
    specifications: [
      { id: 'sp-s1', product_id: 'prod-samsung-s25-ultra', specification_group: 'Display', specification_name: 'Display', specification_value: '6.9" Dynamic AMOLED 2X 120Hz 2600 nits', sort_order: 1 },
      { id: 'sp-s2', product_id: 'prod-samsung-s25-ultra', specification_group: 'Performance', specification_name: 'Chipset', specification_value: 'Snapdragon 8 Elite for Galaxy', sort_order: 2 },
      { id: 'sp-s3', product_id: 'prod-samsung-s25-ultra', specification_group: 'Camera', specification_name: 'Cameras', specification_value: '200MP + 50MP 5x + 50MP 3x + 50MP Ultra-wide', sort_order: 3 },
      { id: 'sp-s4', product_id: 'prod-samsung-s25-ultra', specification_group: 'Battery', specification_name: 'Battery', specification_value: '5000 mAh, 45W Fast Charging', sort_order: 4 }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'prod-oneplus-13',
    sku: 'JM-OP-13-256',
    name: 'OnePlus 13 5G (Hasselblad Camera)',
    slug: 'oneplus-13-5g-hasselblad',
    brand_id: 'b-oneplus',
    brand_name: 'OnePlus',
    category_id: 'cat-mobiles',
    category_name: 'Mobiles',
    description: 'Experience ultra-flagship speed with 6000mAh Glacier Battery, 100W SUPERVOOC, 2K 120Hz Oriental Screen and 4th Gen Hasselblad Camera system.',
    short_description: '6000mAh Battery, 100W SUPERVOOC, Snapdragon 8 Elite, 50MP Hasselblad.',
    price: 69999,
    mrp: 74999,
    discount_percentage: 7,
    stock_quantity: 11,
    low_stock_threshold: 4,
    rating: 4.7,
    review_count: 38,
    is_featured: true,
    is_best_seller: false,
    is_offer: true,
    is_active: true,
    images: [
      { id: 'img-op13-1', product_id: 'prod-oneplus-13', image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=900&auto=format&fit=crop&q=80', alt_text: 'OnePlus 13 Black', sort_order: 1 }
    ],
    variants: [
      { id: 'var-op13-12-256', product_id: 'prod-oneplus-13', sku: 'JM-OP-13-12-256', colour: 'Midnight Black', ram: '12GB', storage: '256GB', price: 69999, stock_quantity: 6 },
      { id: 'var-op13-16-512', product_id: 'prod-oneplus-13', sku: 'JM-OP-13-16-512', colour: 'Arctic Dawn', ram: '16GB', storage: '512GB', price: 76999, stock_quantity: 5 }
    ],
    specifications: [
      { id: 'sp-op1', product_id: 'prod-oneplus-13', specification_group: 'Display', specification_name: 'Screen', specification_value: '6.82" 2K 120Hz LTPO AMOLED 4500 nits', sort_order: 1 },
      { id: 'sp-op2', product_id: 'prod-oneplus-13', specification_group: 'Processor', specification_name: 'Processor', specification_value: 'Snapdragon 8 Elite (3nm)', sort_order: 2 }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'prod-nothing-phone-2',
    sku: 'JM-NP-P2-256',
    name: 'Nothing Phone (2) 5G (Glyph Interface)',
    slug: 'nothing-phone-2-5g',
    brand_id: 'b-nothing',
    brand_name: 'Nothing',
    category_id: 'cat-mobiles',
    category_name: 'Mobiles',
    description: 'Unique transparent design with interactive Glyph interface lights, Nothing OS 2.5, Sony 50MP dual cameras, and Snapdragon 8+ Gen 1 flagship efficiency.',
    short_description: 'Iconic Glyph Interface, 50MP Sony Dual Cameras, Clean Nothing OS.',
    price: 36999,
    mrp: 44999,
    discount_percentage: 18,
    stock_quantity: 5,
    low_stock_threshold: 3,
    rating: 4.6,
    review_count: 42,
    is_featured: false,
    is_best_seller: true,
    is_offer: true,
    is_active: true,
    images: [
      { id: 'img-np2-1', product_id: 'prod-nothing-phone-2', image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900&auto=format&fit=crop&q=80', alt_text: 'Nothing Phone 2 White', sort_order: 1 }
    ],
    variants: [
      { id: 'var-np2-w', product_id: 'prod-nothing-phone-2', sku: 'JM-NP-P2-W-256', colour: 'White', ram: '12GB', storage: '256GB', price: 36999, stock_quantity: 3 },
      { id: 'var-np2-d', product_id: 'prod-nothing-phone-2', sku: 'JM-NP-P2-D-256', colour: 'Dark Grey', ram: '12GB', storage: '256GB', price: 36999, stock_quantity: 2 }
    ],
    specifications: [
      { id: 'sp-np1', product_id: 'prod-nothing-phone-2', specification_group: 'Display', specification_name: 'Screen', specification_value: '6.7" OLED LTPO 120Hz HDR10+', sort_order: 1 }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'prod-macbook-pro-m4',
    sku: 'JM-AP-MBP-M4',
    name: 'Apple MacBook Pro 14" (Apple M4 Chip)',
    slug: 'apple-macbook-pro-14-m4-chip',
    brand_id: 'b-apple',
    brand_name: 'Apple',
    category_id: 'cat-laptops',
    category_name: 'Laptops',
    description: 'Supercharged by Apple M4 chip with 10-core CPU and 10-core GPU, Liquid Retina XDR display with nano-texture option, up to 24 hours battery life, Thunderbolt 4 and MagSafe 3 charging.',
    short_description: 'Apple M4 chip, Liquid Retina XDR, 24-hr Battery, 16GB Unified Memory.',
    price: 169900,
    mrp: 174900,
    discount_percentage: 3,
    stock_quantity: 4,
    low_stock_threshold: 2,
    rating: 4.9,
    review_count: 27,
    is_featured: true,
    is_best_seller: true,
    is_offer: false,
    is_active: true,
    images: [
      { id: 'img-mbp-1', product_id: 'prod-macbook-pro-m4', image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&auto=format&fit=crop&q=80', alt_text: 'MacBook Pro Space Black', sort_order: 1 }
    ],
    variants: [
      { id: 'var-mbp-sb-512', product_id: 'prod-macbook-pro-m4', sku: 'JM-AP-MBP-SB-512', colour: 'Space Black', ram: '16GB Unified', storage: '512GB SSD', price: 169900, stock_quantity: 2 },
      { id: 'var-mbp-sv-1tb', product_id: 'prod-macbook-pro-m4', sku: 'JM-AP-MBP-SV-1TB', colour: 'Silver', ram: '24GB Unified', storage: '1TB SSD', price: 209900, stock_quantity: 2 }
    ],
    specifications: [
      { id: 'sp-mbp1', product_id: 'prod-macbook-pro-m4', specification_group: 'Processor', specification_name: 'CPU/GPU', specification_value: 'Apple M4 10-core CPU, 10-core GPU, 16-core Neural Engine', sort_order: 1 },
      { id: 'sp-mbp2', product_id: 'prod-macbook-pro-m4', specification_group: 'Display', specification_name: 'Display', specification_value: '14.2" Liquid Retina XDR 3024x1964 120Hz ProMotion 1600 nits', sort_order: 2 }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'prod-asus-rog-strix-g16',
    sku: 'JM-AS-ROG-G16',
    name: 'ASUS ROG Strix G16 Gaming Laptop',
    slug: 'asus-rog-strix-g16-gaming-laptop',
    brand_id: 'b-asus',
    brand_name: 'ASUS',
    category_id: 'cat-laptops',
    category_name: 'Laptops',
    description: 'Dominate esports and heavy rendering with Intel Core i9-14900HX, NVIDIA GeForce RTX 4070 8GB GDDR6, ROG Nebula 240Hz 2.5K QHD+ 16:10 display, and liquid metal cooling.',
    short_description: 'Intel i9 14th Gen, RTX 4070 8GB, 240Hz ROG Nebula Display, 32GB RAM.',
    price: 174990,
    mrp: 199990,
    discount_percentage: 13,
    stock_quantity: 5,
    low_stock_threshold: 2,
    rating: 4.8,
    review_count: 19,
    is_featured: true,
    is_best_seller: false,
    is_offer: true,
    is_active: true,
    images: [
      { id: 'img-rog-1', product_id: 'prod-asus-rog-strix-g16', image_url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=900&auto=format&fit=crop&q=80', alt_text: 'ASUS ROG Strix G16', sort_order: 1 }
    ],
    variants: [
      { id: 'var-rog-32-1tb', product_id: 'prod-asus-rog-strix-g16', sku: 'JM-AS-ROG-32-1TB', colour: 'Eclipse Gray', ram: '32GB DDR5', storage: '1TB PCIe 4.0 NVMe', price: 174990, stock_quantity: 5 }
    ],
    specifications: [
      { id: 'sp-rog1', product_id: 'prod-asus-rog-strix-g16', specification_group: 'Performance', specification_name: 'Processor', specification_value: 'Intel Core i9-14900HX 24 cores (8P + 16E) up to 5.8 GHz', sort_order: 1 },
      { id: 'sp-rog2', product_id: 'prod-asus-rog-strix-g16', specification_group: 'Graphics', specification_name: 'GPU', specification_value: 'NVIDIA GeForce RTX 4070 8GB TGP 140W with MUX Switch', sort_order: 2 }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'prod-hp-pavilion-plus',
    sku: 'JM-HP-PAV-14',
    name: 'HP Pavilion Plus 14 OLED Laptop',
    slug: 'hp-pavilion-plus-14-oled',
    brand_id: 'b-hp',
    brand_name: 'HP',
    category_id: 'cat-laptops',
    category_name: 'Laptops',
    description: 'Sleek aluminum body with 2.8K 120Hz IMAX Enhanced OLED screen, AMD Ryzen 7 7840H processor, 16GB LPDDR5x RAM and 1TB SSD. Ideal for professionals and students.',
    short_description: '2.8K OLED 120Hz, AMD Ryzen 7 7840H, 16GB RAM, 1TB SSD.',
    price: 79990,
    mrp: 92990,
    discount_percentage: 14,
    stock_quantity: 7,
    low_stock_threshold: 2,
    rating: 4.6,
    review_count: 22,
    is_featured: false,
    is_best_seller: true,
    is_offer: false,
    is_active: true,
    images: [
      { id: 'img-hp-1', product_id: 'prod-hp-pavilion-plus', image_url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=900&auto=format&fit=crop&q=80', alt_text: 'HP Pavilion Plus', sort_order: 1 }
    ],
    variants: [
      { id: 'var-hp-silver', product_id: 'prod-hp-pavilion-plus', sku: 'JM-HP-PAV-SLV', colour: 'Natural Silver', ram: '16GB', storage: '1TB SSD', price: 79990, stock_quantity: 7 }
    ],
    specifications: [
      { id: 'sp-hp1', product_id: 'prod-hp-pavilion-plus', specification_group: 'Display', specification_name: 'Screen', specification_value: '14" 2.8K OLED (2880 x 1800), 120Hz, HDR 500 nits', sort_order: 1 }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'prod-apple-airpods-pro-2',
    sku: 'JM-AP-APP2-USBC',
    name: 'Apple AirPods Pro 2nd Gen (Type-C MagSafe)',
    slug: 'apple-airpods-pro-2-type-c',
    brand_id: 'b-apple',
    brand_name: 'Apple',
    category_id: 'cat-accessories',
    category_name: 'Accessories',
    description: 'Up to 2x more active noise cancellation, Adaptive Audio, Transparency mode, Personalized Spatial Audio with dynamic head tracking and USB-C MagSafe charging case.',
    short_description: 'Active Noise Cancellation, H2 Chip, Spatial Audio, USB-C Case.',
    price: 21900,
    mrp: 24900,
    discount_percentage: 12,
    stock_quantity: 14,
    low_stock_threshold: 5,
    rating: 4.9,
    review_count: 85,
    is_featured: true,
    is_best_seller: true,
    is_offer: true,
    is_active: true,
    images: [
      { id: 'img-app2-1', product_id: 'prod-apple-airpods-pro-2', image_url: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=900&auto=format&fit=crop&q=80', alt_text: 'AirPods Pro 2', sort_order: 1 }
    ],
    variants: [
      { id: 'var-app2-white', product_id: 'prod-apple-airpods-pro-2', sku: 'JM-AP-APP2-W', colour: 'White', price: 21900, stock_quantity: 14 }
    ],
    specifications: [
      { id: 'sp-app1', product_id: 'prod-apple-airpods-pro-2', specification_group: 'Audio', specification_name: 'Noise Cancellation', specification_value: 'Active Noise Cancellation with Transparency Mode', sort_order: 1 }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'prod-samsung-45w-charger',
    sku: 'JM-SM-45W-CHG',
    name: 'Samsung Original 45W Power Adapter (Type-C)',
    slug: 'samsung-original-45w-power-adapter-type-c',
    brand_id: 'b-samsung',
    brand_name: 'Samsung',
    category_id: 'cat-accessories',
    category_name: 'Accessories',
    description: 'Super Fast Charging 2.0 (45W) original adapter for Galaxy S25/S24/Fold/Flip devices and laptops. Includes 5A Type-C to Type-C cable.',
    short_description: 'Super Fast Charging 2.0 45W with 5A braided cable.',
    price: 2499,
    mrp: 3499,
    discount_percentage: 29,
    stock_quantity: 25,
    low_stock_threshold: 8,
    rating: 4.8,
    review_count: 47,
    is_featured: false,
    is_best_seller: true,
    is_offer: false,
    is_active: true,
    images: [
      { id: 'img-smchg-1', product_id: 'prod-samsung-45w-charger', image_url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=900&auto=format&fit=crop&q=80', alt_text: 'Samsung 45W Charger', sort_order: 1 }
    ],
    variants: [
      { id: 'var-smchg-black', product_id: 'prod-samsung-45w-charger', sku: 'JM-SM-45W-BLK', colour: 'Black', price: 2499, stock_quantity: 25 }
    ],
    specifications: [
      { id: 'sp-smc1', product_id: 'prod-samsung-45w-charger', specification_group: 'Power', specification_name: 'Output', specification_value: 'PDO: 45W Max, PPS: 45W Max', sort_order: 1 }
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    product_id: 'prod-iphone-16-pro',
    product_name: 'Apple iPhone 16 Pro',
    customer_name: 'Rajesh Sharma',
    rating: 5,
    review_text: 'Purchased my iPhone with instant exchange at Jain’s. The team transferred all data and gave me the best exchange price in the market. Truly trusted store since college days!',
    is_approved: true,
    is_demo: true,
    created_at: '2026-02-14',
  },
  {
    id: 'rev-2',
    product_id: 'prod-samsung-s25-ultra',
    product_name: 'Samsung Galaxy S25 Ultra 5G',
    customer_name: 'Vikram Mehta',
    rating: 5,
    review_text: 'Super quick Bajaj Finserv zero-down finance approval inside the showroom. Walked out with the S25 Ultra within 20 minutes with genuine bill and manufacturer warranty.',
    is_approved: true,
    is_demo: true,
    created_at: '2026-02-28',
  },
  {
    id: 'rev-3',
    product_id: 'prod-macbook-pro-m4',
    product_name: 'Apple MacBook Pro 14" M4',
    customer_name: 'Pooja Agarwal',
    rating: 5,
    review_text: 'Jain’s Mobiles & Laptops is our family’s go-to store for all technology needs. Genuine sealed products, honest advice, and phenomenal after-sales care.',
    is_approved: true,
    is_demo: true,
    created_at: '2026-03-02',
  },
];

export const INITIAL_BANNERS: Banner[] = [
  {
    id: 'ban-lootlo',
    title: 'FESTIVE LOOT LO SALE LIVE',
    subtitle: 'Extra ₹5,000 Exchange Bonus • Free Lifetime Tempered Glass on Mobiles Above ₹10,001 • Chance to Win Electric Scooter & Swiss Military Gifts!',
    image_url: '/assets/images/festive_lootlo_sale_1789505594932.jpg',
    button_text: 'EXPLORE LOOT LO OFFERS →',
    button_url: '/offers',
    start_date: '2026-01-01',
    end_date: '2026-12-31',
    is_active: true,
    sort_order: 1,
  },
  {
    id: 'ban-prebook',
    title: 'PRE-BOOK NEW IPHONE & FLAGSHIPS',
    subtitle: 'Starting from ₹21,650/month with Bajaj Finserv & HDFC zero-down financing. Guaranteed instant showroom allocation.',
    image_url: '/assets/images/iphone_prebook_showcase_1789505648113.jpg',
    button_text: 'PRE-BOOK ON WHATSAPP →',
    button_url: '/mobiles',
    start_date: '2026-01-01',
    end_date: '2026-12-31',
    is_active: true,
    sort_order: 2,
  },
  {
    id: 'ban-heritage',
    title: '21 YEARS OF UNMATCHED TRUST',
    subtitle: "Established in 2005. 3 Showrooms across Kharagpur with 9,800+ community followers and authorized genuine warranty.",
    image_url: '/assets/images/multi_brand_heritage_1789505663574.jpg',
    button_text: 'DISCOVER OUR HERITAGE →',
    button_url: '/about',
    start_date: '2026-01-01',
    end_date: '2026-12-31',
    is_active: true,
    sort_order: 3,
  },
];

export const INITIAL_SOCIAL: SocialMediaContent[] = [
  {
    id: 'soc-1',
    platform: 'Instagram',
    content_type: 'image',
    media_url: '/assets/images/jains_store_team_1789505580520.jpg',
    thumbnail_url: '/assets/images/jains_store_team_1789505580520.jpg',
    title: 'Jain\'s Showroom Team @ Gole Bazar',
    caption: 'Celebrating our team strength at Gole Bazar showroom! Over 21 years of service with 18+ retail specialists ready to assist you. Follow @jains.akashjain',
    target_url: 'https://instagram.com/jains.akashjain',
    is_featured: true,
    is_active: true,
    sort_order: 1,
    created_at: '2026-03-01',
  },
  {
    id: 'soc-2',
    platform: 'Facebook',
    content_type: 'image',
    media_url: '/assets/images/festive_lootlo_sale_1789505594932.jpg',
    thumbnail_url: '/assets/images/festive_lootlo_sale_1789505594932.jpg',
    title: 'Loot Lo Sale Campaign — 9.8K Followers',
    caption: 'Join our Facebook community of 9,800+ tech lovers. Real showroom deals, live prize distributions, and exclusive festive perks.',
    target_url: 'https://facebook.com/jainsmobiles',
    is_featured: true,
    is_active: true,
    sort_order: 2,
    created_at: '2026-03-04',
  },
  {
    id: 'soc-3',
    platform: 'YouTube',
    content_type: 'video',
    media_url: '/assets/images/iphone_prebook_showcase_1789505648113.jpg',
    thumbnail_url: '/assets/images/iphone_prebook_showcase_1789505648113.jpg',
    title: 'Flagship Showcase & EMI Walkthrough',
    caption: 'Comparing top flagships and instant EMI calculations live from our Gole Bazar & Shimla Center showrooms.',
    target_url: 'https://facebook.com/jainsmobiles',
    is_featured: true,
    is_active: true,
    sort_order: 3,
    created_at: '2026-03-08',
  }
];

export const INITIAL_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: "Jain's Flagship Storefront & 18-Member Retail Team",
    category_tag: 'Gole Bazar Flagship',
    description: "Our dedicated retail team and flagship showroom at S-82 Gole Bazar, Kharagpur. Over 21 years of trusted electronics service.",
    image_url: '/assets/images/no1.png',
    target_url: '/contact',
    sort_order: 1,
    is_active: true,
    created_at: '2026-03-01',
  },
  {
    id: 'gal-2',
    title: 'Festive Loot Lo Mega Sale Exhibition',
    category_tag: 'Durga Puja Loot Lo',
    description: 'Festive Loot Lo Sale live in Kharagpur — Bumper electric scooter prize, extra ₹5,000 exchange bonus, and lifetime free tempered glass.',
    image_url: '/assets/images/festive_lootlo_sale_1789505594932.jpg',
    target_url: '/offers',
    sort_order: 2,
    is_active: true,
    created_at: '2026-03-02',
  },
  {
    id: 'gal-3',
    title: 'Flagship Pre-Book & Live Experience Desk',
    category_tag: 'Titanium Flagships',
    description: 'Guaranteed showroom allocation on new flagship smartphones with 0% paperless financing from Bajaj Finserv & HDFC.',
    image_url: '/assets/images/iphone_prebook_showcase_1789505648113.jpg',
    target_url: '/mobiles',
    sort_order: 3,
    is_active: true,
    created_at: '2026-03-03',
  },
  {
    id: 'gal-4',
    title: '21 Years of Trust • All Major Brands Authorized Retailing',
    category_tag: '21 Years Authorized',
    description: 'Apple, Samsung, OnePlus, Oppo, Vivo, Realme, Motorola, Dell, HP, Asus authorized multi-brand retailer since 2005.',
    image_url: '/assets/images/multi_brand_heritage_1789505663574.jpg',
    target_url: '/about',
    sort_order: 4,
    is_active: true,
    created_at: '2026-03-04',
  },
  {
    id: 'gal-5',
    title: 'Official Brand Heritage & Trust Seal',
    category_tag: 'Trust • Quality • Service',
    description: 'Serving Kharagpur with 100% genuine products, official brand warranty, instant paperless finance, and guaranteed after-sales support.',
    image_url: '/assets/images/jains_brand_logo_1789505559002.jpg',
    target_url: '/about',
    sort_order: 5,
    is_active: true,
    created_at: '2026-03-05',
  },
];

export const FINANCE_PARTNERS = [
  { name: 'Bajaj Finserv', badge: '0% Interest EMI', desc: 'Instant paperless approval in 15 mins' },
  { name: 'IDFC FIRST Bank', badge: 'Low Down Payment', desc: 'Flexible 6, 9, 12 & 30 months tenure' },
  { name: 'HDFC Bank', badge: 'Instant Cashbacks', desc: 'Pre-approved debit & credit card EMI' },
  { name: 'HDB Financial Services', badge: 'Fast Sanction', desc: 'Quick processing for smartphones & laptops' },
  { name: 'TVS Credit', badge: 'Minimal Paperwork', desc: 'Easy EMI schemes for consumer electronics' },
  { name: 'Cholamandalam (Chola)', badge: 'Trusted Partner', desc: 'Flexible consumer durable financing' },
  { name: 'Home Credit', badge: 'Spot Approval', desc: 'Instant on-spot eligibility clearance' },
  { name: 'Samsung Finance+', badge: 'Galaxy Exclusive', desc: 'Instant finance on Samsung smartphones & tablets' },
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'c-welcome',
    code: 'WELCOME2026',
    description: 'Flat ₹500 off on first purchase above ₹10,000',
    discount_type: 'flat',
    discount_value: 500,
    minimum_order: 10000,
    maximum_discount: 500,
    start_date: '2026-01-01',
    end_date: '2026-12-31',
    usage_limit: 500,
    used_count: 34,
    is_active: true,
  },
  {
    id: 'c-festive',
    code: 'JAINS5',
    description: '5% instant discount on accessories',
    discount_type: 'percentage',
    discount_value: 5,
    minimum_order: 2000,
    maximum_discount: 1000,
    start_date: '2026-01-01',
    end_date: '2026-12-31',
    usage_limit: 1000,
    used_count: 88,
    is_active: true,
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    order_number: 'JM-2026-849201',
    customer_name: 'Arun Kumar',
    customer_phone: '+91 98200 11223',
    customer_email: 'arun.kumar@gmail.com',
    status: 'Delivered',
    payment_status: 'Paid',
    payment_method: 'Cash on Delivery',
    subtotal: 129900,
    discount: 500,
    delivery_fee: 0,
    total: 129400,
    shipping_address: {
      address: 'Flat 402, Green Valley Towers, Sector 14',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400078',
      landmark: 'Near Central Bank',
    },
    notes: 'Please call before arrival.',
    whatsapp_order: false,
    created_at: '2026-03-10T11:20:00Z',
    updated_at: '2026-03-12T15:30:00Z',
    items: [
      {
        id: 'oi-1',
        order_id: 'ord-101',
        product_id: 'prod-iphone-16-pro',
        variant_id: 'var-ip16p-nt-256',
        product_name: 'Apple iPhone 16 Pro (256GB)',
        variant_description: 'Natural Titanium / 256GB',
        quantity: 1,
        unit_price: 129900,
        total_price: 129900,
        image_url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&auto=format&fit=crop&q=80',
      }
    ]
  },
  {
    id: 'ord-102',
    order_number: 'JM-2026-443192',
    customer_name: 'Sneha Patel',
    customer_phone: '+91 97123 45678',
    customer_email: 'sneha.patel@yahoo.com',
    status: 'Ready for Pickup',
    payment_status: 'Pending',
    payment_method: 'WhatsApp Order',
    subtotal: 21900,
    discount: 0,
    delivery_fee: 0,
    total: 21900,
    shipping_address: {
      address: 'Store Pickup Reservation',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
    },
    notes: 'Will pick up from showroom this evening.',
    whatsapp_order: true,
    created_at: '2026-03-14T14:15:00Z',
    updated_at: '2026-03-14T14:30:00Z',
    items: [
      {
        id: 'oi-2',
        order_id: 'ord-102',
        product_id: 'prod-apple-airpods-pro-2',
        variant_id: 'var-app2-white',
        product_name: 'Apple AirPods Pro 2nd Gen',
        variant_description: 'White',
        quantity: 1,
        unit_price: 21900,
        total_price: 21900,
        image_url: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&auto=format&fit=crop&q=80',
      }
    ]
  }
];

export const INITIAL_EXCHANGE_REQUESTS: ExchangeRequest[] = [
  {
    id: 'ex-1',
    name: 'Sameer Joshi',
    phone: '+91 98450 67890',
    device_brand: 'OnePlus',
    device_model: 'OnePlus 9 Pro (12GB/256GB)',
    device_condition: 'Good (minor scratches, no cracks, working display)',
    preferred_device: 'Samsung Galaxy S25 Ultra 5G',
    message: 'Looking to upgrade this weekend. Has original bill and box.',
    status: 'Contacted',
    created_at: '2026-03-12T10:00:00Z',
  }
];

export const INITIAL_FINANCE_REQUESTS: FinanceRequest[] = [
  {
    id: 'fin-1',
    name: 'Karan Shah',
    phone: '+91 99887 76655',
    product_interest: 'Apple MacBook Pro 14" M4',
    message: 'Interested in Bajaj Finserv 12 months zero interest EMI option.',
    status: 'Processing',
    created_at: '2026-03-13T16:45:00Z',
  }
];

export const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-1',
    name: 'Priyanka Sen',
    phone: '+91 91234 56789',
    email: 'priyanka.s@gmail.com',
    message: 'Do you currently have the Nothing Phone (2) Dark Grey 256GB in showroom stock for live demo?',
    enquiry_type: 'Product',
    status: 'New',
    created_at: '2026-03-15T09:30:00Z',
  }
];

// Service functions to read/write persistent data
export const DataService = {
  getSettings(): BusinessSettings {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
      return INITIAL_SETTINGS;
    }
    try {
      const parsed = JSON.parse(data);
      if (!parsed.city || parsed.city === 'Mumbai' || parsed.whatsapp_number === '+919876543210' || !parsed.logo_url) {
        const merged = { ...parsed, ...INITIAL_SETTINGS };
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(merged));
        return merged;
      }
      const result = { ...INITIAL_SETTINGS, ...parsed };
      if (result.logo_url && result.logo_url.startsWith('/src/assets/images')) {
        result.logo_url = result.logo_url.replace('/src/assets/images', '/assets/images');
      }
      return result;
    } catch {
      return INITIAL_SETTINGS;
    }
  },

  getBranches() {
    return SHOWROOM_BRANCHES;
  },

  updateSettings(settings: BusinessSettings): BusinessSettings {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    window.dispatchEvent(new CustomEvent('jm_data_updated', { detail: { key: 'settings' } }));
    return settings;
  },

  getProducts(): Product[] {
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_PRODUCTS;
    }
  },

  saveProducts(products: Product[]): void {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    window.dispatchEvent(new CustomEvent('jm_data_updated', { detail: { key: 'products' } }));
  },

  saveProduct(product: Product): void {
    const list = this.getProducts();
    const index = list.findIndex(p => p.id === product.id);
    if (index >= 0) {
      list[index] = product;
    } else {
      list.unshift(product);
    }
    this.saveProducts(list);
  },

  deleteProduct(id: string): void {
    const list = this.getProducts().filter(p => p.id !== id);
    this.saveProducts(list);
  },

  getCategories(): Category[] {
    const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
      return INITIAL_CATEGORIES;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_CATEGORIES;
    }
  },

  saveCategories(categories: Category[]): void {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    window.dispatchEvent(new CustomEvent('jm_data_updated', { detail: { key: 'categories' } }));
  },

  getBrands(): Brand[] {
    const data = localStorage.getItem(STORAGE_KEYS.BRANDS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.BRANDS, JSON.stringify(INITIAL_BRANDS));
      return INITIAL_BRANDS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_BRANDS;
    }
  },

  saveBrands(brands: Brand[]): void {
    localStorage.setItem(STORAGE_KEYS.BRANDS, JSON.stringify(brands));
    window.dispatchEvent(new CustomEvent('jm_data_updated', { detail: { key: 'brands' } }));
  },

  getOrders(): Order[] {
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_ORDERS;
    }
  },

  createOrder(order: Order): void {
    const orders = this.getOrders();
    orders.unshift(order);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    window.dispatchEvent(new CustomEvent('jm_data_updated', { detail: { key: 'orders' } }));
  },

  updateOrder(order: Order): void {
    const orders = this.getOrders().map(o => o.id === order.id ? order : o);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    window.dispatchEvent(new CustomEvent('jm_data_updated', { detail: { key: 'orders' } }));
  },

  updateOrderStatus(orderId: string, status: any): void {
    const orders = this.getOrders().map(o => o.id === orderId ? { ...o, status, updated_at: new Date().toISOString() } : o);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    window.dispatchEvent(new CustomEvent('jm_data_updated', { detail: { key: 'orders' } }));
  },

  getReviews(): Review[] {
    const data = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS));
      return INITIAL_REVIEWS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_REVIEWS;
    }
  },

  saveReviews(reviews: Review[]): void {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    window.dispatchEvent(new CustomEvent('jm_data_updated', { detail: { key: 'reviews' } }));
  },

  updateReviewApproval(reviewId: string, isApproved: boolean): void {
    const reviews = this.getReviews().map(r => r.id === reviewId ? { ...r, is_approved: isApproved } : r);
    this.saveReviews(reviews);
  },

  deleteReview(reviewId: string): void {
    const reviews = this.getReviews().filter(r => r.id !== reviewId);
    this.saveReviews(reviews);
  },

  addReview(review: Review): void {
    const reviews = this.getReviews();
    reviews.unshift(review);
    this.saveReviews(reviews);
  },

  resetToDefaults(): void {
    this.resetAllData();
  },

  getCoupons(): Coupon[] {
    const data = localStorage.getItem(STORAGE_KEYS.COUPONS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(INITIAL_COUPONS));
      return INITIAL_COUPONS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_COUPONS;
    }
  },

  saveCoupons(coupons: Coupon[]): void {
    localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
    window.dispatchEvent(new CustomEvent('jm_data_updated', { detail: { key: 'coupons' } }));
  },

  getBanners(): Banner[] {
    const data = localStorage.getItem(STORAGE_KEYS.BANNERS);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(INITIAL_BANNERS));
      return INITIAL_BANNERS;
    }
    try {
      const parsed = JSON.parse(data);
      if (!parsed || parsed.length <= 1 || !parsed[0]?.image_url?.includes('festive_lootlo_sale')) {
        localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(INITIAL_BANNERS));
        return INITIAL_BANNERS;
      }
      return parsed.map((b: Banner) => ({
        ...b,
        image_url: b.image_url?.replace('/src/assets/images', '/assets/images'),
      }));
    } catch {
      return INITIAL_BANNERS;
    }
  },

  saveBanners(banners: Banner[]): void {
    localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(banners));
    window.dispatchEvent(new CustomEvent('jm_data_updated', { detail: { key: 'banners' } }));
  },

  getSocialMedia(): SocialMediaContent[] {
    const data = localStorage.getItem(STORAGE_KEYS.SOCIAL);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.SOCIAL, JSON.stringify(INITIAL_SOCIAL));
      return INITIAL_SOCIAL;
    }
    try {
      const parsed = JSON.parse(data);
      if (!parsed || !parsed[0]?.media_url?.includes('jains_store_team')) {
        localStorage.setItem(STORAGE_KEYS.SOCIAL, JSON.stringify(INITIAL_SOCIAL));
        return INITIAL_SOCIAL;
      }
      return parsed.map((s: SocialMediaContent) => ({
        ...s,
        media_url: s.media_url?.replace('/src/assets/images', '/assets/images'),
        thumbnail_url: s.thumbnail_url?.replace('/src/assets/images', '/assets/images'),
      }));
    } catch {
      return INITIAL_SOCIAL;
    }
  },

  saveSocialMedia(items: SocialMediaContent[]): void {
    localStorage.setItem(STORAGE_KEYS.SOCIAL, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('jm_data_updated', { detail: { key: 'social' } }));
  },

  getExchangeRequests(): ExchangeRequest[] {
    const data = localStorage.getItem(STORAGE_KEYS.EXCHANGE);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.EXCHANGE, JSON.stringify(INITIAL_EXCHANGE_REQUESTS));
      return INITIAL_EXCHANGE_REQUESTS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_EXCHANGE_REQUESTS;
    }
  },

  addExchangeRequest(req: ExchangeRequest): void {
    const list = this.getExchangeRequests();
    list.unshift(req);
    localStorage.setItem(STORAGE_KEYS.EXCHANGE, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('jm_data_updated', { detail: { key: 'exchange' } }));
  },

  updateExchangeRequest(req: ExchangeRequest): void {
    const list = this.getExchangeRequests().map(i => i.id === req.id ? req : i);
    localStorage.setItem(STORAGE_KEYS.EXCHANGE, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('jm_data_updated', { detail: { key: 'exchange' } }));
  },

  getFinanceRequests(): FinanceRequest[] {
    const data = localStorage.getItem(STORAGE_KEYS.FINANCE);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.FINANCE, JSON.stringify(INITIAL_FINANCE_REQUESTS));
      return INITIAL_FINANCE_REQUESTS;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_FINANCE_REQUESTS;
    }
  },

  addFinanceRequest(req: FinanceRequest): void {
    const list = this.getFinanceRequests();
    list.unshift(req);
    localStorage.setItem(STORAGE_KEYS.FINANCE, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('jm_data_updated', { detail: { key: 'finance' } }));
  },

  updateFinanceRequest(req: FinanceRequest): void {
    const list = this.getFinanceRequests().map(i => i.id === req.id ? req : i);
    localStorage.setItem(STORAGE_KEYS.FINANCE, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('jm_data_updated', { detail: { key: 'finance' } }));
  },

  getEnquiries(): Enquiry[] {
    const data = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(INITIAL_ENQUIRIES));
      return INITIAL_ENQUIRIES;
    }
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_ENQUIRIES;
    }
  },

  addEnquiry(req: Enquiry): void {
    const list = this.getEnquiries();
    list.unshift(req);
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('jm_data_updated', { detail: { key: 'enquiries' } }));
  },

  updateEnquiry(req: Enquiry): void {
    const list = this.getEnquiries().map(i => i.id === req.id ? req : i);
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('jm_data_updated', { detail: { key: 'enquiries' } }));
  },

  // Gallery Management
  getGalleryItems(): GalleryItem[] {
    const data = localStorage.getItem(STORAGE_KEYS.GALLERY);
    if (data === null) {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(INITIAL_GALLERY_ITEMS));
      return INITIAL_GALLERY_ITEMS;
    }
    try {
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) {
        localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(INITIAL_GALLERY_ITEMS));
        return INITIAL_GALLERY_ITEMS;
      }
      return parsed.map((item: GalleryItem) => {
        let url = item.image_url?.replace('/src/assets/images', '/assets/images');
        if (url?.includes('jains_store_team_1789505580520.jpg')) {
          url = '/assets/images/no1.png';
        }
        return {
          ...item,
          image_url: url,
        };
      }).sort((a: GalleryItem, b: GalleryItem) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
    } catch {
      return INITIAL_GALLERY_ITEMS;
    }
  },

  saveGalleryItem(itemData: Partial<GalleryItem>): GalleryItem {
    const list = this.getGalleryItems();
    let savedItem: GalleryItem;

    if (itemData.id) {
      // Edit existing
      const index = list.findIndex(i => String(i.id).trim() === String(itemData.id).trim());
      if (index >= 0) {
        savedItem = {
          ...list[index],
          ...itemData,
          image_url: itemData.image_url?.replace('/src/assets/images', '/assets/images') || list[index].image_url,
        } as GalleryItem;
        list[index] = savedItem;
      } else {
        savedItem = {
          id: String(itemData.id),
          title: itemData.title || 'Showroom Photo',
          category_tag: itemData.category_tag || 'Showroom',
          description: itemData.description || '',
          image_url: itemData.image_url?.replace('/src/assets/images', '/assets/images') || '',
          target_url: itemData.target_url || '',
          sort_order: itemData.sort_order ?? (list.length + 1),
          is_active: itemData.is_active ?? true,
          created_at: new Date().toISOString(),
        };
        list.push(savedItem);
      }
    } else {
      // New item with guaranteed unique id
      savedItem = {
        id: `gal_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        title: itemData.title || 'Showroom Photo',
        category_tag: itemData.category_tag || 'Showroom',
        description: itemData.description || '',
        image_url: itemData.image_url?.replace('/src/assets/images', '/assets/images') || '',
        target_url: itemData.target_url || '',
        sort_order: itemData.sort_order ?? (list.length + 1),
        is_active: itemData.is_active ?? true,
        created_at: new Date().toISOString(),
      };
      list.push(savedItem);
    }

    list.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
    try {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(list));
    } catch (e) {
      console.warn('LocalStorage quota issue saving gallery item:', e);
    }
    window.dispatchEvent(new CustomEvent('jm_data_updated', { detail: { key: 'gallery' } }));
    return savedItem;
  },

  deleteGalleryItem(id: string): void {
    try {
      const targetId = String(id).trim();
      const currentList = this.getGalleryItems();
      const filtered = currentList.filter(i => String(i.id).trim() !== targetId);
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(filtered));
      window.dispatchEvent(new CustomEvent('jm_data_updated', { detail: { key: 'gallery' } }));
    } catch (err) {
      console.error('Error deleting gallery item:', err);
    }
  },

  reorderGalleryItems(items: GalleryItem[]): void {
    const reordered = items.map((item, idx) => ({ ...item, sort_order: idx + 1 }));
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(reordered));
    window.dispatchEvent(new CustomEvent('jm_data_updated', { detail: { key: 'gallery' } }));
  },

  resetGalleryItems(): GalleryItem[] {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(INITIAL_GALLERY_ITEMS));
    window.dispatchEvent(new CustomEvent('jm_data_updated', { detail: { key: 'gallery' } }));
    return INITIAL_GALLERY_ITEMS;
  },

  // Reset to initial brand defaults if user wants to restore
  resetAllData(): void {
    localStorage.clear();
    window.dispatchEvent(new CustomEvent('jm_data_updated', { detail: { key: 'all' } }));
  }
};
