import React from 'react';
import { Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/common/ProductCard';

interface WishlistPageProps {
  navigate: (path: string) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({ navigate }) => {
  const { wishlist, products } = useApp();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="bg-transparent min-h-[70vh] flex flex-col items-center justify-center p-6 text-white select-none relative z-10">
        <div className="w-20 h-20 rounded-3xl glass-card border border-[var(--theme-border)] flex items-center justify-center text-gray-400 mb-4 shadow-xl">
          <Heart className="w-10 h-10 text-[var(--theme-primary)] animate-pulse" />
        </div>
        <h2 className="text-xl font-black uppercase mb-2">YOUR WISHLIST IS EMPTY</h2>
        <p className="text-xs text-gray-400 max-w-sm text-center mb-6">
          Save smartphones, laptops and accessories you love to review them later at Jain&apos;s Mobiles &amp; Laptops.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="px-6 py-3.5 rounded-xl bg-[var(--theme-primary)] hover:brightness-110 text-white text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-[var(--theme-glow)] hover:scale-105 active:scale-95"
        >
          EXPLORE CATALOGUE
        </button>
      </div>
    );
  }

  return (
    <div className="bg-transparent min-h-screen py-10 text-white select-none relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <div>
            <span className="text-xs font-black text-[var(--theme-primary)] uppercase tracking-widest">
              SAVED FOR LATER
            </span>
            <h1 className="text-3xl font-black uppercase text-white tracking-tight">
              MY WISHLIST ({wishlistProducts.length})
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} navigate={navigate} />
          ))}
        </div>
      </div>
    </div>
  );
};
