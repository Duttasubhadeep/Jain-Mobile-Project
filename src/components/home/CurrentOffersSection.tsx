import React, { useState, useEffect } from 'react';
import { Clock, Flame, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/formatters';

interface CurrentOffersSectionProps {
  navigate: (path: string) => void;
}

export const CurrentOffersSection: React.FC<CurrentOffersSectionProps> = ({ navigate }) => {
  const { products, addToCart } = useApp();

  // Filter products marked as offers and calculate remaining time
  const offerProducts = products.filter((p) => p.is_offer && p.is_active && p.stock_quantity > 0);

  // Simulated countdown to end of today / next 24 hours
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (offerProducts.length === 0) return null;

  return (
    <section className="bg-transparent py-20 border-b border-white/10 select-none relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Countdown */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[var(--theme-primary)] uppercase mb-2">
              <Flame className="w-4 h-4 fill-current animate-bounce" />
              LIMITED TIME FLASH DEALS
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              TODAY&apos;S OFFERS
            </h2>
          </div>

          {/* Countdown timer pill */}
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl glass-pill border border-[var(--theme-primary)]/40 shadow-lg shadow-[var(--theme-glow)]/20">
            <Clock className="w-4 h-4 text-[var(--theme-primary)] animate-spin-slow" />
            <span className="text-xs font-black text-gray-300 uppercase tracking-wider">
              EXPIRES IN:
            </span>
            <div className="flex items-center gap-1.5 font-mono font-black text-white text-sm">
              <span className="px-2 py-1 rounded-lg bg-black/80 text-[var(--theme-primary)] border border-[var(--theme-primary)]/30 shadow-[0_0_8px_var(--theme-glow)]">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[var(--theme-primary)] animate-pulse">:</span>
              <span className="px-2 py-1 rounded-lg bg-black/80 text-[var(--theme-primary)] border border-[var(--theme-primary)]/30 shadow-[0_0_8px_var(--theme-glow)]">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[var(--theme-primary)] animate-pulse">:</span>
              <span className="px-2 py-1 rounded-lg bg-black/80 text-[var(--theme-primary)] border border-[var(--theme-primary)]/30 shadow-[0_0_8px_var(--theme-glow)]">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerProducts.slice(0, 3).map((product) => {
            const img =
              product.images?.[0]?.image_url ||
              'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&auto=format&fit=crop&q=80';

            return (
              <div
                key={product.id}
                className="group flex flex-col justify-between p-5 rounded-2xl glass-card border border-[var(--theme-border)] hover:border-[var(--theme-primary)]/80 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[var(--theme-glow)]"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-[var(--theme-primary)] text-white font-black text-[10px] tracking-wider uppercase shadow-md shadow-black/40">
                      SAVE {product.discount_percentage}%
                    </span>
                    <span className="text-gray-400 font-semibold text-[11px]">
                      Stock: {product.stock_quantity} left
                    </span>
                  </div>

                  <div
                    onClick={() => navigate(`/product/${product.slug}`)}
                    className="w-full aspect-video bg-black/40 rounded-xl p-4 flex items-center justify-center cursor-pointer overflow-hidden mb-4 border border-white/5"
                  >
                    <img
                      src={img}
                      alt={product.name}
                      className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500 filter group-hover:drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
                    />
                  </div>

                  <span className="text-[10px] font-black text-[var(--theme-primary)] uppercase tracking-wider">
                    {product.brand_name}
                  </span>
                  <h3
                    onClick={() => navigate(`/product/${product.slug}`)}
                    className="text-base font-bold text-white group-hover:text-[var(--theme-primary)] transition-colors line-clamp-1 cursor-pointer mb-2"
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-gray-400 line-clamp-2 mb-4">
                    {product.short_description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-base sm:text-lg font-black text-white">
                      {formatINR(product.price)}
                    </div>
                    {product.mrp > product.price && (
                      <div className="text-xs text-gray-400 line-through">
                        {formatINR(product.mrp)}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(product, product.variants?.[0], 1)}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[var(--theme-primary)] to-rose-600 hover:brightness-110 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg shadow-[var(--theme-glow)]/40 active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    CLAIM OFFER
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Offers button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate('/offers')}
            className="inline-flex items-center gap-2 text-xs font-black text-[var(--theme-primary)] hover:text-white tracking-widest uppercase transition-colors"
          >
            VIEW ALL SPECIAL PROMOTIONS
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
