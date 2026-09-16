import React, { useState } from 'react';
import { X, Star, ShoppingBag, MessageCircle, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { Product, ProductVariant } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatINR, formatWhatsAppLink } from '../../utils/formatters';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  navigate: (path: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  navigate,
}) => {
  const { settings, addToCart } = useApp();

  if (!product) return null;

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants?.[0]
  );
  const [selectedImage, setSelectedImage] = useState<string>(
    product.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&auto=format&fit=crop&q=80'
  );
  const [quantity, setQuantity] = useState(1);

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;

  const whatsappMsg = `Hello ${settings.business_name},\n\nI am interested in:\nProduct: ${product.name}\n${
    selectedVariant ? `Variant: ${selectedVariant.colour || ''} ${selectedVariant.storage || ''}\n` : ''
  }Price: ${formatINR(currentPrice)}\n\nPlease confirm availability and ordering details.`;

  const whatsappUrl = formatWhatsAppLink(settings.whatsapp_number, whatsappMsg);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-4 sm:p-6 md:p-12 flex justify-center items-center select-none">
      <div className="relative w-full max-w-3xl bg-[#0F0F0F] border border-[#2A2A2A] rounded-2xl overflow-hidden shadow-2xl text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-[#E10600] text-gray-300 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          {/* LEFT: Image preview */}
          <div className="space-y-4">
            <div className="aspect-square w-full bg-[#050505] rounded-xl border border-[#1F1F1F] p-6 flex items-center justify-center">
              <img
                src={selectedImage}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Thumbnail selector */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(img.image_url)}
                    className={`w-14 h-14 rounded-lg bg-[#050505] border p-1 overflow-hidden transition-all ${
                      selectedImage === img.image_url
                        ? 'border-[#E10600] ring-1 ring-[#E10600]'
                        : 'border-[#2A2A2A] opacity-70 hover:opacity-100'
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
          </div>

          {/* RIGHT: Details & Buy Actions */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1 text-xs">
                <span className="font-black text-[#E10600] uppercase tracking-wider">
                  {product.brand_name}
                </span>
                <span className="text-gray-500">•</span>
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold">{product.rating.toFixed(1)}</span>
                  <span className="text-gray-400">({product.review_count} reviews)</span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white leading-snug mb-2">
                {product.name}
              </h2>

              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                {product.short_description}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl sm:text-3xl font-black text-white">
                  {formatINR(currentPrice)}
                </span>
                {product.mrp > currentPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatINR(product.mrp)}
                  </span>
                )}
                {product.discount_percentage > 0 && (
                  <span className="px-2 py-0.5 rounded bg-[#E10600] text-white text-xs font-black uppercase">
                    {product.discount_percentage}% OFF
                  </span>
                )}
              </div>

              {/* Variants (if available) */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-2 mb-5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Select Variant / Colour:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          selectedVariant?.id === v.id
                            ? 'bg-[#E10600] text-white border-[#E10600]'
                            : 'bg-[#161616] text-gray-300 border-[#2A2A2A] hover:border-gray-500'
                        }`}
                      >
                        {v.colour} {v.storage ? `(${v.storage})` : ''}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="space-y-2.5 pt-4 border-t border-[#1F1F1F]">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    addToCart(product, selectedVariant, quantity);
                    onClose();
                  }}
                  className="w-full py-3 rounded-lg bg-[#E10600] hover:bg-[#FF1E16] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-950/40"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add To Cart
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-lg bg-[#161616] hover:bg-[#25D366] text-white border border-[#2A2A2A] hover:border-[#25D366] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  WhatsApp
                </a>
              </div>

              <button
                onClick={() => {
                  onClose();
                  navigate(`/product/${product.slug}`);
                }}
                className="w-full py-2 text-center text-xs font-bold text-gray-400 hover:text-white flex items-center justify-center gap-1 transition-colors"
              >
                View Full Specifications &amp; Reviews
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
