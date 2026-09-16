import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, Clock, ChevronRight, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/formatters';

interface SearchModalProps {
  navigate: (path: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ navigate }) => {
  const { searchOpen, setSearchOpen, products, brands, categories } = useApp();
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('jm_recent_searches');
      return saved ? JSON.parse(saved) : ['iPhone 16 Pro', 'MacBook M4', 'Galaxy S25', 'AirPods'];
    } catch {
      return ['iPhone 16 Pro', 'MacBook M4', 'Galaxy S25', 'AirPods'];
    }
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [searchOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, setSearchOpen]);

  if (!searchOpen) return null;

  const handleSelectSearch = (term: string) => {
    setQuery(term);
    if (!recentSearches.includes(term)) {
      const updated = [term, ...recentSearches.slice(0, 4)];
      setRecentSearches(updated);
      localStorage.setItem('jm_recent_searches', JSON.stringify(updated));
    }
  };

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand_name?.toLowerCase().includes(query.toLowerCase()) ||
          p.category_name?.toLowerCase().includes(query.toLowerCase()) ||
          p.sku.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-4 sm:p-6 md:p-20 flex justify-center items-start select-none">
      <div className="w-full max-w-2xl bg-[#0A0A0A] border border-[#2A2A2A] rounded-2xl overflow-hidden shadow-2xl text-white">
        {/* Search Input Header */}
        <div className="p-4 border-b border-[#1A1A1A] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#E10600] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search phones, laptops, brands, or SKU..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-gray-400 hover:text-white px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setSearchOpen(false)}
            className="p-1 rounded-md text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results or Suggestions */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-6">
          {query.trim() === '' ? (
            <div className="space-y-6">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-gray-400 uppercase mb-3">
                    <Clock className="w-3.5 h-3.5 text-[#E10600]" />
                    RECENT SEARCHES
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => handleSelectSearch(term)}
                        className="px-3 py-1.5 rounded-full bg-[#111111] hover:bg-[#1A1A1A] border border-[#2A2A2A] text-xs text-gray-200 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Categories */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-gray-400 uppercase mb-3">
                  <TrendingUp className="w-3.5 h-3.5 text-[#E10600]" />
                  POPULAR CATEGORIES
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSearchOpen(false);
                        navigate(`/${cat.slug}`);
                      }}
                      className="p-3 rounded-lg bg-[#111111] hover:bg-[#1A1A1A] border border-[#2A2A2A] text-left text-xs font-semibold flex items-center justify-between group"
                    >
                      <span>{cat.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#E10600]" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Major Brands */}
              <div>
                <div className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-3">
                  FEATURED BRANDS
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {brands.slice(0, 8).map((b) => (
                    <button
                      key={b.id}
                      onClick={() => handleSelectSearch(b.name)}
                      className="px-2.5 py-1 rounded bg-[#161616] text-[11px] text-gray-300 hover:text-white hover:bg-[#E10600]/20 border border-[#2A2A2A]"
                    >
                      {b.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="space-y-3">
              <div className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                PRODUCTS ({filteredProducts.length})
              </div>
              <div className="space-y-2">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSearchOpen(false);
                      navigate(`/product/${p.slug}`);
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-lg bg-[#111111] hover:bg-[#161616] border border-[#2A2A2A] hover:border-[#E10600]/50 cursor-pointer transition-all"
                  >
                    <img
                      src={p.images?.[0]?.image_url || ''}
                      alt={p.name}
                      className="w-12 h-12 object-contain bg-[#050505] p-1 rounded-md shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-[#E10600] tracking-wider uppercase">
                        {p.brand_name}
                      </span>
                      <h4 className="text-xs sm:text-sm font-semibold text-white truncate">
                        {p.name}
                      </h4>
                      <p className="text-[11px] text-gray-400 truncate">
                        {p.short_description}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs sm:text-sm font-extrabold text-white">
                        {formatINR(p.price)}
                      </div>
                      {p.discount_percentage > 0 && (
                        <div className="text-[10px] text-[#E10600] font-bold">
                          {p.discount_percentage}% OFF
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-10 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#111111] border border-[#2A2A2A] mx-auto flex items-center justify-center text-gray-500">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white">NO PRODUCTS FOUND</h4>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                No products matching &quot;{query}&quot;. Try searching for &quot;iPhone&quot;, &quot;Samsung&quot;, or &quot;Laptops&quot;.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
