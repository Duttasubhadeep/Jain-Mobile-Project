import React from 'react';
import {
  Heart,
  ShoppingBag,
  MessageCircle,
  Eye,
  Star,
  Zap,
} from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatINR, formatWhatsAppLink } from '../../utils/formatters';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  navigate: (path: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  navigate,
}) => {
  const { settings, addToCart, toggleWishlist, isInWishlist } = useApp();
  const isWishlisted = isInWishlist(product.id);

  const mainImage =
    product.images && product.images.length > 0
      ? product.images[0].image_url
      : 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&auto=format&fit=crop&q=80';

  const isLowStock = product.stock_quantity > 0 && product.stock_quantity <= product.low_stock_threshold;
  const isOutOfStock = product.stock_quantity === 0;

  // WhatsApp Order message
  const whatsappMsg = `Hello ${settings.business_name},\n\nI am interested in:\nProduct: ${product.name}\nPrice: ${formatINR(product.price)}\nSKU: ${product.sku}\n\nPlease confirm availability and ordering details.`;
  const whatsappUrl = formatWhatsAppLink(settings.whatsapp_number, whatsappMsg);

  return (
    <div className="group relative flex flex-col glass-card border border-[var(--theme-border)] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--theme-primary)]/80 hover:shadow-2xl hover:shadow-[var(--theme-glow)] select-none">
      {/* BADGES (Discount, Low stock, Best seller, Offer) */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 items-start">
        {product.discount_percentage > 0 && (
          <span className="px-2.5 py-1 rounded-full bg-[var(--theme-primary)] text-white text-[10px] font-black tracking-wider uppercase shadow-md shadow-black/40">
            {product.discount_percentage}% OFF
          </span>
        )}
        {product.is_best_seller && (
          <span className="px-2.5 py-1 rounded-full bg-[var(--theme-accent)] text-black text-[9px] font-black tracking-wider uppercase shadow-md shadow-black/40">
            ★ BEST SELLER
          </span>
        )}
        {isLowStock && (
          <span className="px-2.5 py-1 rounded-full bg-amber-500 text-black text-[9px] font-black tracking-wider uppercase shadow-md animate-pulse">
            ONLY {product.stock_quantity} LEFT
          </span>
        )}
        {isOutOfStock && (
          <span className="px-2.5 py-1 rounded-full bg-rose-900 text-white text-[9px] font-bold tracking-wider uppercase">
            OUT OF STOCK
          </span>
        )}
      </div>

      {/* WISHLIST BUTTON */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md ${
          isWishlisted
            ? 'bg-[var(--theme-primary)] text-white scale-110 shadow-[0_0_12px_var(--theme-glow)]'
            : 'bg-black/60 backdrop-blur-md text-gray-300 hover:text-white hover:bg-white/20'
        }`}
        title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        aria-label="Wishlist toggle"
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
      </button>

      {/* PRODUCT IMAGE CONTAINER */}
      <div
        onClick={() => navigate(`/product/${product.slug}`)}
        className="relative aspect-square w-full bg-black/40 overflow-hidden cursor-pointer flex items-center justify-center p-6 border-b border-white/5"
      >
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 filter group-hover:drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
          loading="lazy"
        />

        {/* QUICK VIEW BUTTON OVERLAY */}
        {onQuickView && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute bottom-3 inset-x-4 py-2 rounded-xl bg-black/85 backdrop-blur-md border border-white/20 text-white text-xs font-bold flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-[var(--theme-primary)] hover:border-[var(--theme-primary)] shadow-lg"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
        )}
      </div>

      {/* PRODUCT INFO */}
      <div className="flex flex-col flex-1 p-4 justify-between bg-gradient-to-b from-transparent to-black/30">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1.5">
            <span className="font-extrabold text-[var(--theme-primary)] tracking-widest uppercase">
              {product.brand_name || 'GENUINE BRAND'}
            </span>
            <div className="flex items-center gap-1 text-[var(--theme-accent)]">
              <Star className="w-3 h-3 fill-current" />
              <span className="font-bold">{product.rating.toFixed(1)}</span>
              <span className="text-gray-500">({product.review_count})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => navigate(`/product/${product.slug}`)}
            className="text-sm font-bold text-white group-hover:text-[var(--theme-primary)] transition-colors line-clamp-2 cursor-pointer mb-2"
          >
            {product.name}
          </h3>

          {/* Short Specs / Subtitle */}
          <p className="text-[11px] text-gray-400 line-clamp-1 mb-3">
            {product.short_description}
          </p>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-3 border-t border-white/10">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base sm:text-lg font-black text-white">
              {formatINR(product.price)}
            </span>
            {product.mrp > product.price && (
              <span className="text-xs text-gray-400 line-through">
                {formatINR(product.mrp)}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* ADD TO CART */}
            <button
              onClick={() => addToCart(product, product.variants?.[0], 1)}
              disabled={isOutOfStock}
              className={`w-full py-2.5 px-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                isOutOfStock
                  ? 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'
                  : 'bg-gradient-to-r from-[var(--theme-primary)] to-rose-600 hover:brightness-110 text-white active:scale-95 shadow-lg shadow-[var(--theme-glow)]/40'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Cart
            </button>

            {/* WHATSAPP ORDER */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 bg-white/5 hover:bg-[#25D366] text-gray-200 hover:text-white border border-white/10 hover:border-[#25D366] transition-all active:scale-95 shadow-md"
              title="Order directly on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
