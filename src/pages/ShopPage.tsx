import React, { useState, useMemo } from 'react';
import {
  Filter,
  SlidersHorizontal,
  Search,
  X,
  Grid,
  List,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { Product } from '../types';
import { formatINR } from '../utils/formatters';

interface ShopPageProps {
  navigate: (path: string) => void;
  initialCategory?: string;
  initialBrand?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  navigate,
  initialCategory,
  initialBrand,
}) => {
  const { products, brands, categories } = useApp();

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || 'all'
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    initialBrand ? [initialBrand] : []
  );
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(200000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [offersOnly, setOffersOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Toggle brand selection
  const handleToggleBrand = (brandSlug: string) => {
    if (selectedBrands.includes(brandSlug)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brandSlug));
    } else {
      setSelectedBrands([...selectedBrands, brandSlug]);
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrands([]);
    setMinPrice(0);
    setMaxPrice(200000);
    setInStockOnly(false);
    setOffersOnly(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category
        if (selectedCategory !== 'all') {
          if (p.category_id !== selectedCategory && p.category_name?.toLowerCase() !== selectedCategory.toLowerCase()) {
            return false;
          }
        }
        // Brand
        if (selectedBrands.length > 0) {
          const productBrandSlug = p.brand_name.toLowerCase().replace(/\s+/g, '-');
          const matches = selectedBrands.some(
            (b) => b.toLowerCase() === productBrandSlug || b.toLowerCase() === p.brand_name.toLowerCase()
          );
          if (!matches) return false;
        }
        // Price
        if (p.price < minPrice || p.price > maxPrice) return false;
        // In Stock
        if (inStockOnly && p.stock_quantity <= 0) return false;
        // Offers Only
        if (offersOnly && !p.is_offer) return false;
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchBrand = p.brand_name.toLowerCase().includes(q);
          const matchSku = p.sku.toLowerCase().includes(q);
          if (!matchName && !matchBrand && !matchSku) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'discount') return b.discount_percentage - a.discount_percentage;
        if (sortBy === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        return 0; // featured
      });
  }, [
    products,
    selectedCategory,
    selectedBrands,
    minPrice,
    maxPrice,
    inStockOnly,
    offersOnly,
    searchQuery,
    sortBy,
  ]);

  return (
    <div className="bg-transparent min-h-screen py-10 select-none text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wider mb-2">
            <span
              onClick={() => navigate('/')}
              className="cursor-pointer hover:text-white transition-colors"
            >
              Home
            </span>
            <span>/</span>
            <span className="text-[var(--theme-primary)] font-black">Showroom Catalogue</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            {selectedCategory === 'cat-mobiles'
              ? 'SMARTPHONES COLLECTION'
              : selectedCategory === 'cat-laptops'
              ? 'LAPTOPS & WORKSTATIONS'
              : selectedCategory === 'cat-accessories'
              ? 'ORIGINAL ACCESSORIES'
              : 'ALL ELECTRONICS & DEVICES'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            Browse genuine sealed devices with Indian GST invoice &amp; official brand warranty.
          </p>
        </div>

        {/* Top Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl glass-card border border-[var(--theme-border)] mb-8 shadow-xl">
          {/* Search Field */}
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by model, brand, or SKU..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[var(--theme-primary)] transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase"
            >
              <Filter className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
              Filters
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-300 hidden sm:inline font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-black/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[var(--theme-primary)]"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
                <option value="discount">Biggest Discount</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'grid' ? 'bg-[var(--theme-primary)] text-white shadow-sm' : 'text-gray-400 hover:text-white'
                }`}
                title="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'list' ? 'bg-[var(--theme-primary)] text-white shadow-sm' : 'text-gray-400 hover:text-white'
                }`}
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* SIDEBAR FILTERS (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3 p-6 rounded-2xl glass-card border border-[var(--theme-border)] space-y-6 shadow-xl sticky top-24">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white">
                <SlidersHorizontal className="w-4 h-4 text-[var(--theme-primary)]" />
                Refine Selection
              </div>
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-[11px] font-bold text-gray-400 hover:text-[var(--theme-primary)] transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-gray-300">
                Department
              </label>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-black uppercase transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-[var(--theme-primary)] text-white shadow-md shadow-[var(--theme-glow)]'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  All Categories ({products.length})
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedCategory === c.id
                        ? 'bg-[var(--theme-primary)] text-white shadow-md shadow-[var(--theme-glow)]'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between text-xs font-bold uppercase text-gray-300">
                <span>Max Price:</span>
                <span className="text-[var(--theme-primary)] font-black">{formatINR(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="200000"
                step="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[var(--theme-primary)] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>₹0</span>
                <span>₹2,00,000</span>
              </div>
            </div>

            {/* Brands Checkboxes */}
            <div className="space-y-2 pt-4 border-t border-white/10">
              <label className="text-xs font-black uppercase tracking-wider text-gray-300">
                Brand
              </label>
              <div className="max-h-52 overflow-y-auto space-y-1.5 pr-2">
                {brands.map((b) => {
                  const isChecked = selectedBrands.includes(b.slug);
                  return (
                    <label
                      key={b.id}
                      className="flex items-center justify-between text-xs text-gray-300 hover:text-white cursor-pointer py-1"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleBrand(b.slug)}
                          className="rounded border-white/20 bg-black accent-[var(--theme-primary)] w-3.5 h-3.5"
                        />
                        <span>{b.name}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <label className="flex items-center justify-between text-xs text-gray-300 cursor-pointer">
                <span>In-Stock Only</span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-white/20 bg-black accent-[var(--theme-primary)] w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between text-xs text-gray-300 cursor-pointer">
                <span>Special Deals &amp; Offers</span>
                <input
                  type="checkbox"
                  checked={offersOnly}
                  onChange={(e) => setOffersOnly(e.target.checked)}
                  className="rounded border-white/20 bg-black accent-[var(--theme-primary)] w-4 h-4"
                />
              </label>
            </div>
          </aside>

          {/* PRODUCTS LISTING (9 cols on lg) */}
          <main className="lg:col-span-9 space-y-6">
            {/* Active filter pills */}
            {(selectedCategory !== 'all' ||
              selectedBrands.length > 0 ||
              inStockOnly ||
              offersOnly ||
              maxPrice < 200000 ||
              searchQuery) && (
              <div className="flex flex-wrap items-center gap-2 pb-2">
                <span className="text-xs font-bold text-gray-400">Active Filters:</span>
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full glass-pill border border-white/15 text-xs text-white">
                    Category: {selectedCategory}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-400"
                      onClick={() => setSelectedCategory('all')}
                    />
                  </span>
                )}
                {selectedBrands.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full glass-pill border border-white/15 text-xs text-white"
                  >
                    Brand: {b}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-400"
                      onClick={() => handleToggleBrand(b)}
                    />
                  </span>
                ))}
                {maxPrice < 200000 && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full glass-pill border border-white/15 text-xs text-white">
                    Up to {formatINR(maxPrice)}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-400"
                      onClick={() => setMaxPrice(200000)}
                    />
                  </span>
                )}
                {inStockOnly && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full glass-pill border border-white/15 text-xs text-white">
                    In-Stock
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-400"
                      onClick={() => setInStockOnly(false)}
                    />
                  </span>
                )}
                {offersOnly && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full glass-pill border border-white/15 text-xs text-white">
                    Offers
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-400"
                      onClick={() => setOffersOnly(false)}
                    />
                  </span>
                )}
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-[var(--theme-primary)] hover:underline font-bold"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Results count */}
            <div className="text-xs text-gray-400 font-semibold">
              Showing {filteredProducts.length} verified products
            </div>

            {/* Products grid */}
            {filteredProducts.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6'
                    : 'space-y-4'
                }
              >
                {filteredProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onQuickView={(prod) => setQuickViewProduct(prod)}
                    navigate={navigate}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 p-8 rounded-3xl glass-card border border-[var(--theme-border)] space-y-4">
                <div className="w-16 h-16 rounded-full bg-white/5 mx-auto flex items-center justify-center text-gray-400">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-black text-white uppercase">NO MATCHING PRODUCTS FOUND</h3>
                <p className="text-xs text-gray-400 max-w-md mx-auto font-normal">
                  We couldn&apos;t find any products matching your current combination of filters. Try broadening your price or selecting all brands.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-xl bg-[var(--theme-primary)] hover:brightness-110 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-[var(--theme-glow)]"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/80 backdrop-blur-sm">
          <div className="w-4/5 max-w-sm bg-[#111111] h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-4">
              <h3 className="text-sm font-bold uppercase">Filter Products</h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category selection */}
            <div>
              <label className="text-xs font-bold uppercase text-gray-400 mb-2 block">
                Category
              </label>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left p-2 rounded text-xs font-semibold ${
                    selectedCategory === 'all' ? 'bg-[#E10600] text-white' : 'text-gray-300'
                  }`}
                >
                  All
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`w-full text-left p-2 rounded text-xs font-semibold ${
                      selectedCategory === c.id ? 'bg-[#E10600] text-white' : 'text-gray-300'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand checkboxes */}
            <div>
              <label className="text-xs font-bold uppercase text-gray-400 mb-2 block">
                Brands
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {brands.map((b) => (
                  <label key={b.id} className="flex items-center gap-2 text-xs text-gray-300">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(b.slug)}
                      onChange={() => handleToggleBrand(b.slug)}
                      className="accent-[#E10600]"
                    />
                    <span>{b.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full py-3 rounded-lg bg-[#E10600] text-white text-xs font-bold uppercase"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        navigate={navigate}
      />
    </div>
  );
};
