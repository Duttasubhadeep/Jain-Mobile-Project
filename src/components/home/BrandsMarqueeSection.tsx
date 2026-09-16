import React from 'react';
import { useApp } from '../../context/AppContext';

interface BrandsMarqueeSectionProps {
  navigate: (path: string) => void;
}

export const BrandsMarqueeSection: React.FC<BrandsMarqueeSectionProps> = ({ navigate }) => {
  const { brands } = useApp();

  const activeBrands = brands.filter((b) => b.is_active);

  return (
    <section className="bg-[#050505] py-16 border-b border-[#1A1A1A] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <div className="text-xs font-black tracking-widest text-[#E10600] uppercase mb-1">
          OFFICIAL PARTNERS
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          ALL MAJOR BRANDS
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Authorized multi-brand showcase with 100% manufacturer warranty.
        </p>
      </div>

      {/* Marquee Track (Repeated twice for continuous infinite scroll) */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex gap-4 animate-marquee py-2 hover:[animation-play-state:paused]">
          {[...activeBrands, ...activeBrands].map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              onClick={() => navigate(`/shop?brand=${brand.slug}`)}
              className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#111111] hover:bg-[#1A1A1A] border border-[#222222] hover:border-[#E10600]/60 cursor-pointer transition-all shrink-0 group"
            >
              <span className="text-sm font-extrabold tracking-wider uppercase text-gray-300 group-hover:text-white transition-colors">
                {brand.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E10600] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
