import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Zap, ShoppingBag, MessageCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatINR, formatWhatsAppLink } from '../../utils/formatters';

interface DealsOfDaySectionProps {
  navigate: (path: string) => void;
}

export const DealsOfDaySection: React.FC<DealsOfDaySectionProps> = ({ navigate }) => {
  const { products, settings, addToCart } = useApp();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="bg-[#050505] py-20 border-b border-[#1A1A1A] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Scroll Controls */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1A1A1A]">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black tracking-widest text-[#E10600] uppercase mb-1">
              <Zap className="w-4 h-4 fill-current text-[#E10600]" />
              INSTANT SAVINGS
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              DEALS OF THE DAY
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2.5 rounded-lg bg-[#111111] hover:bg-[#1A1A1A] border border-[#2A2A2A] text-gray-300 hover:text-white transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2.5 rounded-lg bg-[#111111] hover:bg-[#1A1A1A] border border-[#2A2A2A] text-gray-300 hover:text-white transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => {
            const isLowStock = product.stock_quantity > 0 && product.stock_quantity <= product.low_stock_threshold;
            const isOutOfStock = product.stock_quantity === 0;

            const whatsappMsg = `Hello ${settings.business_name},\n\nI want to order Deal of the Day: ${product.name} at ${formatINR(product.price)}. Please confirm availability.`;
            const whatsappUrl = formatWhatsAppLink(settings.whatsapp_number, whatsappMsg);

            return (
              <div
                key={product.id}
                className="w-72 shrink-0 snap-start flex flex-col justify-between p-4 rounded-xl bg-[#111111] border border-[#2A2A2A] hover:border-[#E10600]/50 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    {product.discount_percentage > 0 ? (
                      <span className="px-2 py-0.5 rounded bg-[#E10600] text-white text-[10px] font-black uppercase">
                        {product.discount_percentage}% OFF
                      </span>
                    ) : <span />}

                    {isLowStock ? (
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[10px] font-bold uppercase">
                        ONLY {product.stock_quantity} LEFT
                      </span>
                    ) : isOutOfStock ? (
                      <span className="px-2 py-0.5 rounded bg-red-900 text-white text-[10px] font-bold uppercase">
                        OUT OF STOCK
                      </span>
                    ) : (
                      <span className="text-[10px] text-emerald-400 font-bold uppercase">
                        IN STOCK
                      </span>
                    )}
                  </div>

                  <div
                    onClick={() => navigate(`/product/${product.slug}`)}
                    className="w-full aspect-square bg-[#070707] rounded-lg p-4 flex items-center justify-center cursor-pointer mb-3"
                  >
                    <img
                      src={product.images?.[0]?.image_url || ''}
                      alt={product.name}
                      className="max-h-full object-contain hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  <span className="text-[10px] font-bold text-[#E10600] uppercase tracking-wider">
                    {product.brand_name}
                  </span>
                  <h4
                    onClick={() => navigate(`/product/${product.slug}`)}
                    className="text-xs font-bold text-white truncate cursor-pointer hover:text-red-400 transition-colors mb-1"
                  >
                    {product.name}
                  </h4>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-sm font-extrabold text-white">
                      {formatINR(product.price)}
                    </span>
                    {product.mrp > product.price && (
                      <span className="text-[11px] text-gray-500 line-through">
                        {formatINR(product.mrp)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1A1A1A]">
                  <button
                    onClick={() => addToCart(product, product.variants?.[0], 1)}
                    disabled={isOutOfStock}
                    className={`py-2 rounded-md text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-1 transition-all ${
                      isOutOfStock
                        ? 'bg-[#1A1A1A] text-gray-500 cursor-not-allowed'
                        : 'bg-[#E10600] hover:bg-[#FF1E16] text-white active:scale-95'
                    }`}
                  >
                    <ShoppingBag className="w-3 h-3" />
                    Cart
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 rounded-md bg-[#161616] hover:bg-[#25D366] text-gray-200 hover:text-white border border-[#2A2A2A] hover:border-[#25D366] text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all"
                  >
                    <MessageCircle className="w-3 h-3 fill-current" />
                    WhatsApp
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
