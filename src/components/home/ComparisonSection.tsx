import React, { useState } from 'react';
import { Columns, Plus, X, Star, ShoppingBag } from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/formatters';

interface ComparisonSectionProps {
  navigate: (path: string) => void;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ navigate }) => {
  const { products, addToCart } = useApp();

  // Pick default comparison smartphones if available
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'prod-iphone-16-pro',
    'prod-samsung-s25-ultra',
    'prod-oneplus-13',
  ]);

  const selectedProducts = selectedIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  const handleSelectProduct = (index: number, newId: string) => {
    const updated = [...selectedIds];
    updated[index] = newId;
    setSelectedIds(updated);
  };

  const removeSlot = (index: number) => {
    setSelectedIds(selectedIds.filter((_, i) => i !== index));
  };

  const addSlot = () => {
    if (selectedIds.length >= 3) return;
    const available = products.find((p) => !selectedIds.includes(p.id));
    if (available) {
      setSelectedIds([...selectedIds, available.id]);
    }
  };

  return (
    <section className="bg-[#0A0A0A] py-20 border-b border-[#1A1A1A] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#1F1F1F]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-[#E10600] uppercase mb-1">
              <Columns className="w-4 h-4" />
              SIDE-BY-SIDE SPECIFICATIONS
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              COMPARE BEFORE YOU BUY.
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Select up to 3 devices to evaluate specifications, pricing and features side by side.
            </p>
          </div>

          {selectedIds.length < 3 && (
            <button
              onClick={addSlot}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#161616] hover:bg-[#E10600] text-white border border-[#2A2A2A] text-xs font-bold uppercase transition-all"
            >
              <Plus className="w-4 h-4" />
              Add Device to Compare
            </button>
          )}
        </div>

        {/* Comparison Table / Grid (Scrollable on mobile) */}
        <div className="overflow-x-auto pb-4">
          <div className="min-w-[720px] bg-[#111111] rounded-2xl border border-[#222222] overflow-hidden">
            {/* Headers / Product Selector Row */}
            <div className="grid grid-cols-4 p-4 border-b border-[#1F1F1F] bg-[#0E0E0E] items-center">
              <div className="text-xs font-black text-gray-400 uppercase tracking-wider pl-2">
                DEVICE
              </div>
              {selectedProducts.map((p, idx) => (
                <div key={p.id} className="px-3 relative space-y-2">
                  {selectedProducts.length > 2 && (
                    <button
                      onClick={() => removeSlot(idx)}
                      className="absolute top-0 right-2 p-1 text-gray-400 hover:text-red-400"
                      title="Remove column"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <select
                    value={p.id}
                    onChange={(e) => handleSelectProduct(idx, e.target.value)}
                    className="w-full text-xs font-bold bg-[#1A1A1A] border border-[#2A2A2A] rounded p-1.5 text-white truncate focus:outline-none"
                  >
                    {products.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.name}
                      </option>
                    ))}
                  </select>

                  <div className="w-20 h-20 mx-auto bg-[#050505] p-2 rounded-lg">
                    <img
                      src={p.images?.[0]?.image_url || ''}
                      alt={p.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-extrabold text-white truncate">
                      {p.name}
                    </div>
                    <div className="text-xs font-black text-[#FF1E16]">
                      {formatINR(p.price)}
                    </div>
                  </div>
                </div>
              ))}
              {/* If fewer than 3 products */}
              {Array.from({ length: 3 - selectedProducts.length }).map((_, i) => (
                <div key={i} className="p-6 text-center">
                  <button
                    onClick={addSlot}
                    className="w-full h-28 border border-dashed border-[#2A2A2A] rounded-xl flex flex-col items-center justify-center gap-1.5 text-gray-500 hover:text-white hover:border-[#E10600] transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    <span className="text-[11px] font-bold uppercase">Add Product</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Spec Comparison Rows */}
            <div className="divide-y divide-[#1A1A1A] text-xs">
              {/* Rating */}
              <div className="grid grid-cols-4 p-3.5 items-center hover:bg-[#141414]">
                <div className="font-bold text-gray-400 pl-2">Customer Rating</div>
                {selectedProducts.map((p) => (
                  <div key={p.id} className="px-3 flex items-center gap-1 text-[#D4AF37]">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold text-white">{p.rating.toFixed(1)}</span>
                    <span className="text-gray-500">({p.review_count})</span>
                  </div>
                ))}
              </div>

              {/* Display */}
              <div className="grid grid-cols-4 p-3.5 items-center hover:bg-[#141414]">
                <div className="font-bold text-gray-400 pl-2">Display</div>
                {selectedProducts.map((p) => {
                  const spec = p.specifications.find((s) => s.specification_group.toLowerCase().includes('display'))?.specification_value || 'Retina / Dynamic AMOLED 120Hz';
                  return <div key={p.id} className="px-3 text-gray-300 font-medium">{spec}</div>;
                })}
              </div>

              {/* Processor */}
              <div className="grid grid-cols-4 p-3.5 items-center hover:bg-[#141414]">
                <div className="font-bold text-gray-400 pl-2">Processor</div>
                {selectedProducts.map((p) => {
                  const spec = p.specifications.find((s) => s.specification_group.toLowerCase().includes('performance') || s.specification_group.toLowerCase().includes('processor'))?.specification_value || 'Flagship Next-Gen Chip';
                  return <div key={p.id} className="px-3 text-gray-300 font-medium">{spec}</div>;
                })}
              </div>

              {/* RAM & Storage */}
              <div className="grid grid-cols-4 p-3.5 items-center hover:bg-[#141414]">
                <div className="font-bold text-gray-400 pl-2">Variants (RAM / Storage)</div>
                {selectedProducts.map((p) => (
                  <div key={p.id} className="px-3 text-gray-300">
                    {p.variants && p.variants.length > 0
                      ? p.variants.map((v) => `${v.ram ? `${v.ram}/` : ''}${v.storage || ''}`).join(', ')
                      : 'Standard High-Speed Edition'}
                  </div>
                ))}
              </div>

              {/* 5G Support */}
              <div className="grid grid-cols-4 p-3.5 items-center hover:bg-[#141414]">
                <div className="font-bold text-gray-400 pl-2">5G Connectivity</div>
                {selectedProducts.map((p) => (
                  <div key={p.id} className="px-3 text-emerald-400 font-bold">
                    ✓ Dual 5G SIM Supported
                  </div>
                ))}
              </div>

              {/* Warranty */}
              <div className="grid grid-cols-4 p-3.5 items-center hover:bg-[#141414]">
                <div className="font-bold text-gray-400 pl-2">Warranty</div>
                {selectedProducts.map((p) => (
                  <div key={p.id} className="px-3 text-gray-300">
                    1 Year Official Brand Warranty with GST Invoice
                  </div>
                ))}
              </div>

              {/* Action Buttons Row */}
              <div className="grid grid-cols-4 p-4 items-center bg-[#0E0E0E]">
                <div className="font-bold text-gray-400 pl-2">Action</div>
                {selectedProducts.map((p) => (
                  <div key={p.id} className="px-3">
                    <button
                      onClick={() => addToCart(p, p.variants?.[0], 1)}
                      className="w-full py-2 rounded-lg bg-[#E10600] hover:bg-[#FF1E16] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Buy Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
