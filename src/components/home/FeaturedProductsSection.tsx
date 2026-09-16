import React, { useState } from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../common/ProductCard';
import { QuickViewModal } from '../common/QuickViewModal';
import { ArrowRight } from 'lucide-react';

interface FeaturedProductsSectionProps {
  navigate: (path: string) => void;
}

export const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({
  navigate,
}) => {
  const { products } = useApp();
  const [activeTab, setActiveTab] = useState<'ALL' | 'MOBILES' | 'LAPTOPS' | 'ACCESSORIES'>('ALL');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const tabs: Array<'ALL' | 'MOBILES' | 'LAPTOPS' | 'ACCESSORIES'> = [
    'ALL',
    'MOBILES',
    'LAPTOPS',
    'ACCESSORIES',
  ];

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'MOBILES') return p.category_id === 'cat-mobiles';
    if (activeTab === 'LAPTOPS') return p.category_id === 'cat-laptops';
    if (activeTab === 'ACCESSORIES') return p.category_id === 'cat-accessories';
    return true;
  });

  return (
    <section className="bg-[#0A0A0A] py-20 border-b border-[#1A1A1A] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-black tracking-widest text-[#E10600] uppercase mb-1">
              CURATED SELECTION
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
              LATEST ARRIVALS
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-[#E10600] text-white shadow-lg shadow-red-950/40'
                      : 'bg-[#141414] hover:bg-[#1F1F1F] text-gray-400 hover:text-white border border-[#222222]'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid: 4 cols desktop, 3 cols tablet, 2 cols mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
              navigate={navigate}
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/shop')}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[#141414] hover:bg-[#E10600] text-white border border-[#2A2A2A] hover:border-[#E10600] text-xs font-extrabold uppercase tracking-wider transition-all duration-300"
          >
            VIEW FULL STORE CATALOGUE
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        navigate={navigate}
      />
    </section>
  );
};
