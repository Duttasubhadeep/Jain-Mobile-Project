import React from 'react';
import { ArrowRight, Smartphone, Laptop, Headphones, RefreshCw, CreditCard } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CategorySectionProps {
  navigate: (path: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ navigate }) => {
  const { categories } = useApp();

  const iconMap: Record<string, any> = {
    mobiles: Smartphone,
    laptops: Laptop,
    accessories: Headphones,
    exchange: RefreshCw,
    finance: CreditCard,
  };

  return (
    <section className="bg-transparent py-20 border-b border-white/10 select-none relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left mb-12">
          <div className="text-xs font-black tracking-widest text-[var(--theme-primary)] uppercase mb-2">
            DISCOVER COLLECTIONS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            FIND WHAT YOU NEED.
          </h2>
          <p className="text-sm text-gray-400 mt-2 font-medium">
            Explore our range of mobiles, laptops, smart audio and official accessories in Kharagpur.
          </p>
        </div>

        {/* 5 Large Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {categories.map((cat) => {
            const Icon = iconMap[cat.slug] || Smartphone;
            return (
              <div
                key={cat.id}
                onClick={() => navigate(`/${cat.slug}`)}
                className="group relative h-96 rounded-2xl overflow-hidden border border-[var(--theme-border)] hover:border-[var(--theme-primary)]/90 bg-[var(--theme-bg-card)] cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[var(--theme-glow)] flex flex-col justify-end p-6"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={cat.image_url}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700 filter group-hover:contrast-110"
                    loading="lazy"
                  />
                  {/* Subtle dynamic glow tint overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-transparent group-hover:via-black/50 transition-all duration-300" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 space-y-2">
                  <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-[var(--theme-primary)] flex items-center justify-center group-hover:bg-[var(--theme-primary)] group-hover:text-white transition-all duration-300 shadow-md group-hover:shadow-[0_0_15px_var(--theme-glow)]">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-xl font-black text-white tracking-tight uppercase group-hover:text-[var(--theme-primary)] transition-colors">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>

                  <div className="pt-2 flex items-center gap-1.5 text-xs font-black text-white group-hover:text-[var(--theme-primary)] uppercase tracking-wider">
                    <span>EXPLORE</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
