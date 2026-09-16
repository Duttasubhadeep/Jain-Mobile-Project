import React, { useState, useEffect } from 'react';
import {
  Star,
  ShoppingBag,
  Zap,
  MessageCircle,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Share2,
  ChevronRight,
  Info,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { useApp } from '../context/AppContext';
import { formatINR, formatWhatsAppLink, formatDate } from '../utils/formatters';
import { ProductCard } from '../components/common/ProductCard';

interface ProductDetailPageProps {
  slug: string;
  navigate: (path: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug, navigate }) => {
  const { products, settings, addToCart, toggleWishlist, isInWishlist, showToast } = useApp();

  const product = products.find((p) => p.slug === slug) || products[0];

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product?.variants?.[0]
  );
  const [selectedImage, setSelectedImage] = useState<string>(
    product?.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=900&auto=format&fit=crop&q=80'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [pincode, setPincode] = useState<string>('302001');
  const [pincodeChecked, setPincodeChecked] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews' | 'warranty'>('specs');

  // Reset variant and image when slug changes
  useEffect(() => {
    if (product) {
      setSelectedVariant(product.variants?.[0]);
      setSelectedImage(
        product.images?.[0]?.image_url ||
          'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=900&auto=format&fit=crop&q=80'
      );
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [slug, product]);

  if (!product) {
    return (
      <div className="bg-[#050505] min-h-[60vh] flex flex-col items-center justify-center text-white select-none">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <button
          onClick={() => navigate('/shop')}
          className="px-6 py-2.5 rounded-lg bg-[#E10600] text-white text-xs font-bold uppercase"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const inWishlist = isInWishlist(product.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} at Jain's Mobiles & Laptops!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'info');
    }
  };

  const whatsappMsg = `Hello ${settings.business_name},\n\nI want to enquire/order:\nProduct: ${product.name}\n${
    selectedVariant ? `Variant: ${selectedVariant.colour || ''} ${selectedVariant.storage || ''}\n` : ''
  }Price: ${formatINR(currentPrice)}\nSKU: ${selectedVariant?.sku || product.sku}\n\nPlease confirm showroom availability and best deal.`;

  const whatsappUrl = formatWhatsAppLink(settings.whatsapp_number, whatsappMsg);

  // Related products
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category_id === product.category_id)
    .slice(0, 4);

  return (
    <div className="bg-transparent min-h-screen py-10 select-none text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wider mb-8 overflow-x-auto whitespace-nowrap">
          <span
            onClick={() => navigate('/')}
            className="cursor-pointer hover:text-white transition-colors"
          >
            Home
          </span>
          <ChevronRight className="w-3 h-3 text-gray-600" />
          <span
            onClick={() => navigate('/shop')}
            className="cursor-pointer hover:text-white transition-colors"
          >
            Shop
          </span>
          <ChevronRight className="w-3 h-3 text-gray-600" />
          <span
            onClick={() => navigate(`/${product.category_name.toLowerCase()}`)}
            className="cursor-pointer hover:text-white transition-colors"
          >
            {product.category_name}
          </span>
          <ChevronRight className="w-3 h-3 text-gray-600" />
          <span className="text-[var(--theme-primary)] font-black truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Hero: Left Images, Right Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-16">
          {/* LEFT: Image Gallery (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-square w-full rounded-3xl glass-card border border-[var(--theme-border)] p-8 flex items-center justify-center relative overflow-hidden group shadow-2xl">
              <img
                src={selectedImage}
                alt={product.name}
                className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105 filter drop-shadow-2xl"
              />

              {product.discount_percentage > 0 && (
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[var(--theme-primary)] text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-[var(--theme-glow)]">
                  {product.discount_percentage}% OFF
                </div>
              )}

              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 p-3 rounded-full bg-black/60 hover:bg-[var(--theme-primary)] text-gray-300 hover:text-white transition-all backdrop-blur-md shadow-lg"
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current text-white' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Strip */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(img.image_url)}
                    className={`w-20 h-20 rounded-2xl bg-white/5 border p-2 shrink-0 transition-all ${
                      selectedImage === img.image_url
                        ? 'border-[var(--theme-primary)] ring-2 ring-[var(--theme-primary)]/50 scale-105'
                        : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.image_url}
                      alt={img.alt_text}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Guarantees Strip */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl glass-card border border-[var(--theme-border)] text-center shadow-lg">
              <div className="space-y-1">
                <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto" />
                <div className="text-[11px] font-black uppercase text-white">100% Genuine</div>
                <div className="text-[10px] text-gray-400">Brand Sealed Box</div>
              </div>
              <div className="space-y-1 border-x border-white/10">
                <RotateCcw className="w-5 h-5 text-[var(--theme-accent)] mx-auto" />
                <div className="text-[11px] font-black uppercase text-white">Easy Exchange</div>
                <div className="text-[10px] text-gray-400">Best Upgrade Value</div>
              </div>
              <div className="space-y-1">
                <Truck className="w-5 h-5 text-cyan-400 mx-auto" />
                <div className="text-[11px] font-black uppercase text-white">Store Pickup</div>
                <div className="text-[10px] text-gray-400">Express Delivery</div>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Buy Information (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-[var(--theme-primary)] uppercase tracking-widest">
                  {product.brand_name}
                </span>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Share
                </button>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight leading-tight mb-3">
                {product.name}
              </h1>

              {/* Rating & SKU */}
              <div className="flex flex-wrap items-center gap-4 text-xs mb-4">
                <div className="flex items-center gap-1 text-[var(--theme-accent)] bg-white/5 px-3 py-1 rounded-full border border-[var(--theme-border)]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold">{product.rating.toFixed(1)}</span>
                  <span className="text-gray-400">({product.review_count} reviews)</span>
                </div>
                <div className="text-gray-400">
                  SKU: <span className="font-mono text-gray-300">{selectedVariant?.sku || product.sku}</span>
                </div>
                <div className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {product.stock_quantity > 0 ? 'In Stock (Kharagpur Showrooms)' : 'Out of Stock'}
                </div>
              </div>

              {/* Pricing */}
              <div className="p-4 rounded-2xl glass-card border border-[var(--theme-border)] flex items-baseline gap-4 mb-6 shadow-xl">
                <span className="text-3xl sm:text-4xl font-black text-white">
                  {formatINR(currentPrice)}
                </span>
                {product.mrp > currentPrice && (
                  <span className="text-base text-gray-500 line-through">
                    {formatINR(product.mrp)}
                  </span>
                )}
                {product.discount_percentage > 0 && (
                  <span className="px-3 py-1 rounded-full bg-[var(--theme-primary)] text-white text-xs font-black uppercase shadow-md shadow-[var(--theme-glow)]">
                    SAVE {formatINR(product.mrp - currentPrice)} ({product.discount_percentage}%)
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6 font-normal">
                {product.short_description}
              </p>

              {/* Variants Selector (Color & Storage) */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-4 mb-6 p-5 rounded-2xl glass-card border border-[var(--theme-border)] shadow-xl">
                  <div>
                    <label className="block text-xs font-black text-gray-300 uppercase tracking-wider mb-2">
                      Available Colours &amp; Configurations:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((v) => {
                        const isSelected = selectedVariant?.id === v.id;
                        return (
                          <button
                            key={v.id}
                            onClick={() => setSelectedVariant(v)}
                            className={`px-4 py-2 rounded-xl text-xs font-black uppercase border transition-all ${
                              isSelected
                                ? 'bg-[var(--theme-primary)] text-white border-[var(--theme-primary)] shadow-md shadow-[var(--theme-glow)]'
                                : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/30'
                            }`}
                          >
                            <span>{v.colour}</span>
                            {v.storage && <span className="ml-1 text-[11px] opacity-80">({v.storage})</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Quantity Selector & Main Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-sm font-black text-gray-300 hover:text-white"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 text-xs font-mono font-black text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 text-sm font-black text-gray-300 hover:text-white"
                    >
                      +
                    </button>
                  </div>

                  {/* Add To Cart */}
                  <button
                    onClick={() => addToCart(product, selectedVariant, quantity)}
                    className="flex-1 py-3.5 rounded-xl bg-[var(--theme-primary)] hover:brightness-110 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl shadow-[var(--theme-glow)] hover:scale-105 active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    ADD TO CART
                  </button>

                  {/* Buy Now (Direct to checkout) */}
                  <button
                    onClick={() => {
                      addToCart(product, selectedVariant, quantity);
                      navigate('/checkout');
                    }}
                    className="flex-1 py-3.5 rounded-xl bg-white hover:bg-gray-100 text-black text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl hover:scale-105 active:scale-95"
                  >
                    <Zap className="w-4 h-4 fill-current text-[var(--theme-primary)]" />
                    BUY NOW
                  </button>
                </div>

                {/* WhatsApp Order Button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/40 hover:border-emerald-500 text-emerald-300 hover:text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  ORDER ON WHATSAPP / ENQUIRE STOCK
                </a>
              </div>

              {/* Delivery / Pincode Estimator */}
              <div className="mt-6 p-4 rounded-2xl glass-card border border-[var(--theme-border)] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-black uppercase text-gray-300 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
                    Delivery &amp; Showroom Pickup Checker:
                  </span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter 6-digit pincode"
                    className="flex-1 px-3 py-2 rounded-xl bg-black/70 border border-white/10 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[var(--theme-primary)]"
                  />
                  <button
                    onClick={() => {
                      setPincodeChecked(true);
                      showToast('Delivery available for ' + pincode, 'success');
                    }}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold uppercase text-white transition-colors"
                  >
                    Check
                  </button>
                </div>
                {pincodeChecked && (
                  <div className="text-[11px] text-gray-300 space-y-1">
                    <div className="text-emerald-400 font-semibold">
                      ✓ Instant Showroom Pickup available today at {settings.address} (Gole Bazar, Shimla Center, Prem Bazar)
                    </div>
                    <div>✓ Express doorstep delivery within 24-48 hours.</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs (Specifications, Reviews, Warranty) */}
        <div className="mb-20">
          <div className="flex border-b border-white/10 gap-4 sm:gap-8 mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-4 text-xs sm:text-sm font-black uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === 'specs'
                  ? 'border-[var(--theme-primary)] text-[var(--theme-primary)]'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              TECHNICAL SPECIFICATIONS
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 text-xs sm:text-sm font-black uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === 'reviews'
                  ? 'border-[var(--theme-primary)] text-[var(--theme-primary)]'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              CUSTOMER REVIEWS ({product.review_count})
            </button>
            <button
              onClick={() => setActiveTab('warranty')}
              className={`pb-4 text-xs sm:text-sm font-black uppercase tracking-wider transition-colors border-b-2 ${
                activeTab === 'warranty'
                  ? 'border-[var(--theme-primary)] text-[var(--theme-primary)]'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              WARRANTY &amp; GENUINE ASSURANCE
            </button>
          </div>

          {/* TAB 1: SPECIFICATIONS TABLE */}
          {activeTab === 'specs' && (
            <div className="rounded-3xl glass-card border border-[var(--theme-border)] overflow-hidden shadow-2xl">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-base font-black text-white uppercase">
                  Full Hardware &amp; Performance Specifications
                </h3>
              </div>
              <div className="divide-y divide-white/5 text-xs">
                {product.specifications && product.specifications.length > 0 ? (
                  product.specifications.map((spec) => (
                    <div
                      key={spec.id}
                      className="grid grid-cols-1 sm:grid-cols-3 p-4 hover:bg-white/5 transition-colors"
                    >
                      <div className="font-bold text-gray-400 uppercase">
                        {spec.specification_group}
                      </div>
                      <div className="sm:col-span-2 text-white font-medium mt-1 sm:mt-0">
                        {spec.specification_value}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-gray-400">
                    Detailed brand specifications available on request or in official product booklet.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="rounded-3xl glass-card border border-[var(--theme-border)] p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-black text-white">{product.rating.toFixed(1)}</div>
                  <div>
                    <div className="flex items-center gap-1 text-[var(--theme-accent)]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      Based on {product.review_count} verified showroom purchases
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/#reviews')}
                  className="px-5 py-2.5 rounded-xl bg-[var(--theme-primary)] hover:brightness-110 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-[var(--theme-glow)]"
                >
                  Write Review
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-black text-white">Rohit Malviya</span>
                    <span className="text-gray-400">3 days ago</span>
                  </div>
                  <div className="flex items-center gap-1 text-[var(--theme-accent)]">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <p className="text-xs text-gray-300">
                    100% genuine sealed Indian pack. Got free data transfer done in 15 mins at Jain&apos;s showroom desk in Kharagpur. Highly recommended!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WARRANTY & ASSURANCE */}
          {activeTab === 'warranty' && (
            <div className="rounded-3xl glass-card border border-[var(--theme-border)] p-6 sm:p-8 space-y-4 text-xs text-gray-300 leading-relaxed shadow-2xl">
              <h3 className="text-base font-black text-white uppercase mb-2">
                Official Manufacturer Warranty &amp; In-Store Support
              </h3>
              <p>
                All devices purchased through {settings.business_name} are backed by the official manufacturer warranty across India:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>1 Year comprehensive manufacturer warranty on smartphones &amp; laptops.</li>
                <li>6 to 12 months warranty on accessories and power adapters.</li>
                <li>GST Tax invoice provided with registered IMEI/serial number for instant warranty claim at any authorized service center.</li>
                <li>Complimentary phone-to-phone data migration and device activation assistance at our showroom.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="mb-6">
              <div className="text-xs font-black tracking-widest text-[var(--theme-primary)] uppercase mb-1">
                COMPATIBLE &amp; SIMILAR CHOICES
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                YOU MAY ALSO LIKE
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rp) => (
                <ProductCard key={rp.id} product={rp} navigate={navigate} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
