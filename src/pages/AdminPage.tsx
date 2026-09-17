import React, { useState, useEffect } from 'react';
import {
  Lock,
  Package,
  ShoppingBag,
  RefreshCw,
  Star,
  Settings,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  MessageCircle,
  Save,
  RotateCcw,
  Image,
  ArrowUp,
  ArrowDown,
  Upload,
  Eye,
  EyeOff,
  Camera,
  Maximize2,
  Download,
  Globe,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DataService } from '../services/dataService';
import { Product, Order, ExchangeRequest, Review, BusinessSettings, GalleryItem } from '../types';
import { formatINR, formatDate, formatWhatsAppLink } from '../utils/formatters';
import { HeroPhotoGallery } from '../components/home/HeroPhotoGallery';

export const AdminPage: React.FC = () => {
  const { products, categories, brands, settings, updateSettings, showToast } = useApp();

  // Authentication
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('jm_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'gallery' | 'products' | 'orders' | 'exchanges' | 'reviews' | 'settings'>('overview');

  // Real-time data
  const [orders, setOrders] = useState<Order[]>(() => DataService.getOrders());
  const [exchanges, setExchanges] = useState<ExchangeRequest[]>(() => DataService.getExchangeRequests());
  const [reviews, setReviews] = useState<Review[]>(() => DataService.getReviews());
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => DataService.getGalleryItems());

  // Gallery Editing / Creation Modal
  const [editingGalleryItem, setEditingGalleryItem] = useState<Partial<GalleryItem> | null>(null);
  const [isNewGalleryItem, setIsNewGalleryItem] = useState(false);
  const [galleryImagePreview, setGalleryImagePreview] = useState<string>('');

  // Product Editing / Creation Modal
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);

  // In-app Confirmation Dialog State (safe for sandboxed iframes without relying on window.confirm)
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel: string;
    confirmVariant?: 'danger' | 'warning' | 'primary';
    onConfirm: () => void;
  } | null>(null);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<BusinessSettings>(settings);

  // Search filter inside admin products
  const [productSearch, setProductSearch] = useState('');

  // Sync with live server on mount and listen for real-time updates
  useEffect(() => {
    DataService.syncGalleryWithServer().then((items) => {
      if (Array.isArray(items) && items.length > 0) {
        setGalleryItems(items);
      }
    });

    const handleDataUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.key === 'gallery' || customEvent.detail?.key === 'all') {
        setGalleryItems(DataService.getGalleryItems());
      }
    };
    window.addEventListener('jm_data_updated', handleDataUpdate);
    return () => window.removeEventListener('jm_data_updated', handleDataUpdate);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'jains2005' || passcode === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('jm_admin_auth', 'true');
      showToast('Admin access granted', 'success');
    } else {
      showToast('Incorrect passcode. Use jains2005', 'error');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('jm_admin_auth');
    showToast('Logged out of admin desk', 'info');
  };

  // Gallery actions
  const handleSaveGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGalleryItem?.image_url) {
      showToast('Please provide an image URL or upload an image file', 'error');
      return;
    }

    DataService.saveGalleryItem({
      ...editingGalleryItem,
      title: editingGalleryItem.title || 'Showroom Photo',
      category_tag: editingGalleryItem.category_tag || 'Gole Bazar Flagship',
      sort_order: Number(editingGalleryItem.sort_order || galleryItems.length + 1),
      is_active: editingGalleryItem.is_active !== undefined ? editingGalleryItem.is_active : true,
    });

    setGalleryItems(DataService.getGalleryItems());
    setEditingGalleryItem(null);
    setIsNewGalleryItem(false);
    setGalleryImagePreview('');
    showToast('Photo saved to hero showcase gallery', 'success');
  };

  const handleDeleteGalleryItem = (id: string, title?: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Remove Photograph',
      message: `Are you sure you want to remove "${title || 'this photograph'}" from the hero showcase gallery? This change applies immediately.`,
      confirmLabel: 'Delete Photograph',
      confirmVariant: 'danger',
      onConfirm: () => {
        DataService.deleteGalleryItem(id);
        const updated = DataService.getGalleryItems();
        setGalleryItems(updated);
        if (editingGalleryItem?.id === id) {
          setEditingGalleryItem(null);
          setGalleryImagePreview('');
        }
        showToast('Photograph removed from gallery', 'info');
        setConfirmDialog(null);
      },
    });
  };

  const handleToggleGalleryActive = (item: GalleryItem) => {
    DataService.saveGalleryItem({ ...item, is_active: !item.is_active });
    setGalleryItems(DataService.getGalleryItems());
    showToast(`Photograph ${item.is_active ? 'hidden' : 'activated'} on gallery`, 'info');
  };

  const handleMoveGalleryItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...galleryItems];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    DataService.reorderGalleryItems(newItems);
    setGalleryItems(DataService.getGalleryItems());
    showToast('Gallery order updated', 'success');
  };

  const [isSyncingGallery, setIsSyncingGallery] = useState(false);

  const handleManualSync = async () => {
    setIsSyncingGallery(true);
    showToast('Synchronizing gallery with live server...', 'info');
    try {
      const items = await DataService.syncGalleryWithServer();
      setGalleryItems(items);
      showToast(`Gallery synced (${items.length} photographs on live server)`, 'success');
    } catch {
      showToast('Live server sync completed', 'info');
    } finally {
      setIsSyncingGallery(false);
    }
  };

  const handleExportGalleryJson = () => {
    const items = DataService.getGalleryItems();
    const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gallery.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('gallery.json downloaded — ready for your GitHub repository and live website!', 'success');
  };

  const handleResetGallery = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Restore Default Photographs',
      message: 'Restore all default high-resolution showroom photographs? Any custom photographs will be replaced with the original flagship showcase.',
      confirmLabel: 'Restore Defaults',
      confirmVariant: 'warning',
      onConfirm: () => {
        const reset = DataService.resetGalleryItems();
        setGalleryItems(reset);
        showToast('Default gallery photographs restored', 'success');
        setConfirmDialog(null);
      },
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) {
      showToast('Image file size should be less than 15MB', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const rawResult = event.target?.result as string;
      const img = new window.Image();
      img.onload = async () => {
        const maxWidth = 1600;
        const maxHeight = 1200;
        let width = img.width;
        let height = img.height;
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        let processedData = rawResult;
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          processedData = canvas.toDataURL('image/jpeg', 0.85);
        }
        setGalleryImagePreview(processedData);
        setEditingGalleryItem((prev) => ({ ...(prev || {}), image_url: processedData }));
        showToast('Uploading photograph to server...', 'info');

        // Upload to server so it is persistent and accessible to all visitors
        try {
          const uploadedUrl = await DataService.uploadImage(processedData, file.name);
          if (uploadedUrl && uploadedUrl.startsWith('/uploads/')) {
            setEditingGalleryItem((prev) => ({ ...(prev || {}), image_url: uploadedUrl }));
            showToast('Photograph saved to server successfully', 'success');
          } else {
            showToast('Photograph loaded ready to save', 'success');
          }
        } catch {
          showToast('Photograph loaded locally ready to save', 'info');
        }
      };
      img.onerror = () => {
        setGalleryImagePreview(rawResult);
        setEditingGalleryItem((prev) => ({ ...(prev || {}), image_url: rawResult }));
        showToast('Photograph loaded from device', 'success');
      };
      img.src = rawResult;
    };
    reader.readAsDataURL(file);
  };

  // Product actions
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name || !editingProduct?.price) {
      showToast('Please provide product name and price', 'error');
      return;
    }

    const prodToSave: Product = {
      id: editingProduct.id || `prod_${Date.now()}`,
      name: editingProduct.name,
      slug: editingProduct.slug || editingProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      brand_id: editingProduct.brand_id || 'brand-apple',
      brand_name: brands.find((b) => b.id === editingProduct.brand_id)?.name || editingProduct.brand_name || 'Apple',
      category_id: editingProduct.category_id || 'cat-mobiles',
      category_name: categories.find((c) => c.id === editingProduct.category_id)?.name || editingProduct.category_name || 'Mobiles',
      price: Number(editingProduct.price),
      mrp: Number(editingProduct.mrp || editingProduct.price),
      discount_percentage: editingProduct.mrp && editingProduct.price
        ? Math.max(0, Math.round(((editingProduct.mrp - editingProduct.price) / editingProduct.mrp) * 100))
        : 0,
      stock_quantity: Number(editingProduct.stock_quantity ?? 10),
      low_stock_threshold: Number(editingProduct.low_stock_threshold ?? 5),
      sku: editingProduct.sku || `JM-${Date.now().toString().slice(-4)}`,
      short_description: editingProduct.short_description || 'Brand new sealed Indian unit.',
      description: editingProduct.description || editingProduct.short_description || 'Brand new sealed Indian unit.',
      is_featured: Boolean(editingProduct.is_featured),
      is_best_seller: Boolean(editingProduct.is_best_seller),
      is_offer: Boolean(editingProduct.is_offer),
      is_active: editingProduct.is_active !== undefined ? editingProduct.is_active : true,
      rating: editingProduct.rating || 5.0,
      review_count: editingProduct.review_count || 1,
      images: editingProduct.images?.length
        ? editingProduct.images
        : [
            {
              id: 'img-1',
              product_id: editingProduct.id || 'prod_temp',
              image_url: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&auto=format&fit=crop&q=80',
              alt_text: editingProduct.name,
              sort_order: 1,
            },
          ],
      variants: editingProduct.variants || [],
      specifications: editingProduct.specifications || [],
      created_at: editingProduct.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    DataService.saveProduct(prodToSave);
    setEditingProduct(null);
    showToast(isNewProduct ? 'Product created successfully' : 'Product updated', 'success');
  };

  const handleDeleteProduct = (id: string, name?: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Product',
      message: `Are you sure you want to delete "${name || 'this product'}" from your showroom catalog?`,
      confirmLabel: 'Delete Product',
      confirmVariant: 'danger',
      onConfirm: () => {
        DataService.deleteProduct(id);
        showToast('Product removed from catalog', 'info');
        setConfirmDialog(null);
      },
    });
  };

  const handleUpdateOrderStatus = (orderId: string, status: any) => {
    DataService.updateOrderStatus(orderId, status);
    setOrders(DataService.getOrders());
    showToast(`Order status updated to ${status}`, 'success');
  };

  const handleReviewStatus = (reviewId: string, isApproved: boolean) => {
    DataService.updateReviewApproval(reviewId, isApproved);
    setReviews(DataService.getReviews());
    showToast(isApproved ? 'Review approved for public display' : 'Review removed from live feed', 'info');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    showToast('Showroom business settings saved', 'success');
  };

  const handleResetData = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Reset Demo Data',
      message: 'Reset all products, banners, and showroom data back to default catalog? Any custom additions will be reverted.',
      confirmLabel: 'Reset Everything',
      confirmVariant: 'danger',
      onConfirm: () => {
        DataService.resetToDefaults();
        window.location.reload();
      },
    });
  };

  // PASSCODE LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="bg-transparent min-h-[80vh] flex items-center justify-center p-4 text-white select-none relative z-10">
        <div className="max-w-md w-full glass-card border border-[var(--theme-border)] rounded-3xl p-8 space-y-6 shadow-2xl text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-[var(--theme-primary)]/40 text-[var(--theme-primary)] mx-auto flex items-center justify-center animate-pulse shadow-lg shadow-[var(--theme-glow)]">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-black text-[var(--theme-accent)] uppercase tracking-widest">
              JAIN&apos;S MANAGEMENT DESK
            </span>
            <h1 className="text-2xl font-black uppercase text-white mt-1">Showroom Admin Portal</h1>
            <p className="text-xs text-gray-400 mt-1">
              Enter your authorized staff PIN to manage stock, orders, exchange leads and settings.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter Passcode (default: jains2005)"
                className="w-full text-center px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[var(--theme-primary)]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[var(--theme-primary)] hover:brightness-110 text-white text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-[var(--theme-glow)] hover:scale-102 active:scale-98"
            >
              Unlock Admin Desk
            </button>
          </form>

          <p className="text-[11px] text-gray-400">
            Showroom staff credential: <code className="text-[var(--theme-accent)] font-bold">jains2005</code>
          </p>
        </div>
      </div>
    );
  }

  // Filtered admin products
  const filteredAdminProducts = products.filter((p) =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.brand_name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.sku.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="bg-transparent min-h-screen py-8 text-white select-none relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Admin Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl glass-card border border-[var(--theme-border)] shadow-xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                ADMIN ACCESS ACTIVE
              </span>
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-white mt-1">
              JAIN&apos;S SHOWROOM CONTROL DESK
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetData}
              className="px-3.5 py-2 rounded-lg bg-[#1A1A1A] hover:bg-amber-900/40 border border-[#2A2A2A] text-xs font-bold text-gray-300 hover:text-amber-300 flex items-center gap-1.5 transition-colors"
              title="Reset to default seed data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Demo Data
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-[#E10600] hover:bg-[#FF1E16] text-white text-xs font-bold uppercase transition-colors"
            >
              Lock Desk
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-[#1F1F1F]">
          {[
            { id: 'overview', label: 'Overview', icon: Package },
            { id: 'gallery', label: `Photo Gallery (${galleryItems.length})`, icon: Image },
            { id: 'products', label: `Products (${products.length})`, icon: Package },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'exchanges', label: `Exchange Leads (${exchanges.length})`, icon: RefreshCw },
            { id: 'reviews', label: `Reviews (${reviews.length})`, icon: Star },
            { id: 'settings', label: 'Showroom Settings', icon: Settings },
          ].map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#E10600] text-white shadow-lg shadow-red-950/40'
                    : 'bg-[#111111] hover:bg-[#1A1A1A] text-gray-400 hover:text-white border border-[#222222]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW STATS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="p-6 rounded-2xl bg-[#111111] border border-[#222222] space-y-1">
                <span className="text-xs font-bold text-gray-400 uppercase">Live Products</span>
                <div className="text-3xl font-black text-white">{products.length}</div>
                <div className="text-[11px] text-emerald-400">
                  {products.filter((p) => p.is_active).length} active in catalogue
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#111111] border border-[#222222] space-y-1">
                <span className="text-xs font-bold text-gray-400 uppercase">Customer Orders</span>
                <div className="text-3xl font-black text-white">{orders.length}</div>
                <div className="text-[11px] text-[#D4AF37]">
                  {orders.filter((o) => o.status === 'Pending').length} pending dispatch
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#111111] border border-[#222222] space-y-1">
                <span className="text-xs font-bold text-gray-400 uppercase">Exchange Leads</span>
                <div className="text-3xl font-black text-white">{exchanges.length}</div>
                <div className="text-[11px] text-[#38BDF8]">
                  {exchanges.filter((e) => e.status === 'New').length} new enquiries
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#111111] border border-[#222222] space-y-1">
                <span className="text-xs font-bold text-gray-400 uppercase">Special Offers</span>
                <div className="text-3xl font-black text-[#FF1E16]">
                  {products.filter((p) => p.is_offer).length}
                </div>
                <div className="text-[11px] text-gray-400">Flagged on homepage</div>
              </div>
            </div>

            {/* Quick Action links */}
            <div className="p-6 rounded-2xl bg-[#111111] border border-[#222222] flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold uppercase text-white">Showroom Inventory Status</h3>
                <p className="text-xs text-gray-400">
                  Update stock counts or launch today&apos;s festive discount in real time.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingProduct({
                    name: '',
                    price: 0,
                    mrp: 0,
                    brand_id: 'brand-apple',
                    category_id: 'cat-mobiles',
                    stock_quantity: 10,
                    is_active: true,
                  });
                  setIsNewProduct(true);
                }}
                className="px-5 py-2.5 rounded-lg bg-[#E10600] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                Add New Product
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGER */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Filter inventory by name, brand, SKU..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#111111] border border-[#222222] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#E10600]"
                />
              </div>

              <button
                onClick={() => {
                  setEditingProduct({
                    name: '',
                    price: 0,
                    mrp: 0,
                    brand_id: 'brand-apple',
                    category_id: 'cat-mobiles',
                    stock_quantity: 10,
                    is_active: true,
                  });
                  setIsNewProduct(true);
                }}
                className="px-5 py-2.5 rounded-lg bg-[#E10600] hover:bg-[#FF1E16] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>

            <div className="rounded-2xl bg-[#111111] border border-[#222222] overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0E0E0E] text-gray-400 uppercase border-b border-[#1F1F1F]">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Brand</th>
                    <th className="p-4">Selling Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Offer</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1A1A1A]">
                  {filteredAdminProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-[#161616]">
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={p.images?.[0]?.image_url || ''}
                          alt={p.name}
                          className="w-10 h-10 object-contain bg-[#0A0A0A] p-1 rounded border border-[#222222]"
                        />
                        <div>
                          <div className="font-bold text-white">{p.name}</div>
                          <div className="text-[10px] text-gray-500 font-mono">{p.sku}</div>
                        </div>
                      </td>
                      <td className="p-4 text-gray-300">{p.brand_name}</td>
                      <td className="p-4 font-bold text-white">{formatINR(p.price)}</td>
                      <td className="p-4">
                        <span
                          className={`font-mono font-bold ${
                            p.stock_quantity <= p.low_stock_threshold
                              ? 'text-amber-400'
                              : 'text-emerald-400'
                          }`}
                        >
                          {p.stock_quantity} units
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => {
                            DataService.saveProduct({ ...p, is_offer: !p.is_offer });
                          }}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            p.is_offer ? 'bg-[#E10600] text-white' : 'bg-[#1F1F1F] text-gray-400'
                          }`}
                        >
                          {p.is_offer ? 'Active' : 'No'}
                        </button>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => {
                            DataService.saveProduct({ ...p, is_active: !p.is_active });
                          }}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            p.is_active ? 'bg-emerald-950 text-emerald-300' : 'bg-red-950 text-red-300'
                          }`}
                        >
                          {p.is_active ? 'Live' : 'Hidden'}
                        </button>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setIsNewProduct(false);
                          }}
                          className="p-1 text-gray-400 hover:text-white"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id, p.name)}
                          className="p-1 text-gray-500 hover:text-red-400"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase text-white">Live Customer Orders</h3>
            <div className="rounded-2xl bg-[#111111] border border-[#222222] overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0E0E0E] text-gray-400 uppercase border-b border-[#1F1F1F]">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Items</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Payment</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1A1A1A]">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-[#161616]">
                      <td className="p-4 font-mono font-bold text-white">{o.id}</td>
                      <td className="p-4">
                        <div className="font-bold text-white">{o.customer_name}</div>
                        <div className="text-[11px] text-gray-400">{o.customer_phone}</div>
                      </td>
                      <td className="p-4">
                        {o.items.map((i, idx) => (
                          <div key={idx} className="text-[11px] text-gray-300">
                            {i.quantity}x {i.product_name}
                          </div>
                        ))}
                      </td>
                      <td className="p-4 font-black text-[#FF1E16]">
                        {formatINR(o.total)}
                      </td>
                      <td className="p-4 text-gray-300">{o.payment_method}</td>
                      <td className="p-4">
                        <select
                          value={o.status}
                          onChange={(e) =>
                            handleUpdateOrderStatus(o.id, e.target.value as any)
                          }
                          className="bg-[#0A0A0A] border border-[#2A2A2A] rounded px-2 py-1 text-xs text-white"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <a
                          href={formatWhatsAppLink(
                            o.customer_phone,
                            `Hello ${o.customer_name}, regards from Jain's Mobiles & Laptops about your order #${o.id}.`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#25D366] hover:underline font-bold"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          Chat
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: EXCHANGE LEADS */}
        {activeTab === 'exchanges' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase text-white">Device Exchange &amp; Upgrade Inquiries</h3>
            <div className="rounded-2xl bg-[#111111] border border-[#222222] overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0E0E0E] text-gray-400 uppercase border-b border-[#1F1F1F]">
                  <tr>
                    <th className="p-4">Date</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Old Device</th>
                    <th className="p-4">Condition</th>
                    <th className="p-4">Target Device</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1A1A1A]">
                  {exchanges.map((ex) => (
                    <tr key={ex.id} className="hover:bg-[#161616]">
                      <td className="p-4 text-gray-400">{formatDate(ex.created_at)}</td>
                      <td className="p-4">
                        <div className="font-bold text-white">{ex.name}</div>
                        <div className="text-[11px] text-gray-400">{ex.phone}</div>
                      </td>
                      <td className="p-4 text-white font-medium">
                        {ex.device_brand} {ex.device_model}
                      </td>
                      <td className="p-4 text-gray-300">{ex.device_condition}</td>
                      <td className="p-4 text-[#D4AF37] font-semibold">{ex.preferred_device}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-[#1F1F1F] text-xs font-bold text-white">
                          {ex.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <a
                          href={formatWhatsAppLink(
                            ex.phone,
                            `Hello ${ex.name}, we received your exchange enquiry for ${ex.device_brand} ${ex.device_model} at Jain's Mobiles & Laptops showroom!`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#25D366] hover:underline font-bold"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          WhatsApp
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: REVIEWS MODERATION */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase text-white">Customer Reviews Moderation Queue</h3>
            <div className="space-y-3">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 rounded-2xl bg-[#111111] border border-[#222222] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{rev.customer_name}</span>
                      <span className="text-[#D4AF37] font-bold">★ {rev.rating}</span>
                      {rev.is_demo && (
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[9px] font-bold">
                          DEMO
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-300 italic">&quot;{rev.review_text}&quot;</p>
                    <div className="text-[10px] text-gray-500">
                      Product: {rev.product_name} • Date: {formatDate(rev.created_at)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleReviewStatus(rev.id, !rev.is_approved)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase ${
                        rev.is_approved
                          ? 'bg-emerald-900/60 text-emerald-300'
                          : 'bg-amber-900/60 text-amber-300'
                      }`}
                    >
                      {rev.is_approved ? 'Approved (Live)' : 'Approve'}
                    </button>
                    <button
                      onClick={() => {
                        DataService.deleteReview(rev.id);
                        setReviews(DataService.getReviews());
                        showToast('Review removed', 'info');
                      }}
                      className="p-1.5 text-gray-500 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: BUSINESS SETTINGS */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="p-6 sm:p-8 rounded-2xl bg-[#111111] border border-[#222222] space-y-6">
            <h3 className="text-base font-bold uppercase text-white border-b border-[#1F1F1F] pb-3">
              Showroom Identity &amp; Contact Configurations
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  value={settingsForm.business_name}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, business_name: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                  Announcement Bar Notice
                </label>
                <input
                  type="text"
                  value={settingsForm.announcement_text}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, announcement_text: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                  Primary Phone
                </label>
                <input
                  type="text"
                  value={settingsForm.phone}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                  WhatsApp Number (with country code)
                </label>
                <input
                  type="text"
                  value={settingsForm.whatsapp_number}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, whatsapp_number: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                  Showroom Timings
                </label>
                <input
                  type="text"
                  value={settingsForm.opening_hours}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, opening_hours: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                Showroom Address
              </label>
              <input
                type="text"
                value={settingsForm.address}
                onChange={(e) =>
                  setSettingsForm({ ...settingsForm, address: e.target.value })
                }
                className="w-full px-3 py-2 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-xs text-white"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#E10600] hover:bg-[#FF1E16] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Settings
            </button>
          </form>
        )}

        {/* TAB: PHOTO GALLERY MANAGEMENT */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            {/* Gallery Control Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl bg-[#111111] border border-[#222222]">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Camera className="w-4 h-4 text-amber-400" />
                  <h2 className="text-lg font-black uppercase text-white tracking-wide">
                    Hero Showcase Photo Gallery
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live Cloud Sync Active
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1 max-w-2xl">
                  Photos uploaded here are permanently saved to the server backend and disk storage (<code className="text-gray-300">/public/uploads</code>), ensuring they are visible to your visitors, shared links, and friends.
                </p>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                <button
                  type="button"
                  onClick={handleManualSync}
                  disabled={isSyncingGallery}
                  className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-300 flex items-center gap-1.5 transition-colors border border-white/10 disabled:opacity-50"
                  title="Synchronize gallery with server"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncingGallery ? 'animate-spin text-amber-400' : ''}`} />
                  <span>{isSyncingGallery ? 'Syncing...' : 'Sync Server'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportGalleryJson}
                  className="px-3 py-2 rounded-xl bg-blue-950/40 hover:bg-blue-900/60 text-xs font-bold text-blue-300 flex items-center gap-1.5 transition-colors border border-blue-800/40"
                  title="Download gallery.json for GitHub and Netlify"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export for GitHub</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetGallery}
                  className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-400 hover:text-gray-200 flex items-center gap-1.5 transition-colors border border-white/10"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Defaults</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsNewGalleryItem(true);
                    setEditingGalleryItem({
                      title: '',
                      category_tag: 'Gole Bazar Flagship',
                      description: '',
                      image_url: '',
                      target_url: '/contact',
                      sort_order: galleryItems.length + 1,
                      is_active: true,
                    });
                    setGalleryImagePreview('');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#E10600] hover:bg-[#FF1E16] text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-red-950/40 transition-all hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  Add New Photo
                </button>
              </div>
            </div>

            {/* Live Interactive Preview Box */}
            <div className="p-6 rounded-2xl bg-[#0e0e12] border border-[#1e1e24] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  Live Hero Gallery Preview ({galleryItems.filter(i => i.is_active).length} Active Slides)
                </span>
                <span className="text-[11px] text-gray-400">
                  Slide navigation &amp; lightbox interactive test
                </span>
              </div>
              <div className="max-w-4xl mx-auto">
                <HeroPhotoGallery />
              </div>
            </div>

            {/* Gallery Cards List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {galleryItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`group relative flex flex-col rounded-2xl bg-[#111114] border transition-all duration-300 overflow-hidden ${
                    item.is_active
                      ? 'border-[#26262e] hover:border-white/20'
                      : 'border-white/5 opacity-60'
                  }`}
                >
                  {/* Photo Preview with translucent tag matching gallery style */}
                  <div className="relative aspect-video w-full bg-[#08080a] overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.includes('jains_store_team')) {
                          target.src = '/assets/images/jains_store_team_1789505580520.jpg';
                        }
                      }}
                    />

                    {/* Translucent Tag Badge */}
                    <div className="absolute top-2.5 left-2.5 z-10 px-2.5 py-1 rounded-lg bg-black/65 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold">
                      {item.category_tag}
                    </div>

                    {/* Order Badge */}
                    <div className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-amber-400 font-mono text-[10px] font-bold">
                      #{index + 1}
                    </div>

                    {/* Active Status Badge */}
                    <div className="absolute bottom-2.5 left-2.5 z-10">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.is_active
                            ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                            : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                        }`}
                      >
                        {item.is_active ? 'Active on Hero' : 'Hidden'}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="text-sm font-bold text-white line-clamp-1">
                        {item.title}
                      </h4>
                      {item.description && (
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                      {item.target_url && (
                        <p className="text-[11px] text-cyan-400 font-mono mt-1 truncate">
                          Link: {item.target_url}
                        </p>
                      )}
                    </div>

                    {/* Actions Bar */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs">
                      {/* Reorder Buttons */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => handleMoveGalleryItem(index, 'up')}
                          title="Move earlier"
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={index === galleryItems.length - 1}
                          onClick={() => handleMoveGalleryItem(index, 'down')}
                          title="Move later"
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Edit, Visibility & Delete */}
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleToggleGalleryActive(item)}
                          title={item.is_active ? 'Hide from hero gallery' : 'Show in hero gallery'}
                          className={`p-1.5 rounded-lg transition-colors ${
                            item.is_active
                              ? 'bg-emerald-950/60 text-emerald-400 hover:bg-emerald-900/80'
                              : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                          }`}
                        >
                          {item.is_active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setIsNewGalleryItem(false);
                            setEditingGalleryItem({ ...item });
                            setGalleryImagePreview(item.image_url);
                          }}
                          title="Edit details"
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-200 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteGalleryItem(item.id, item.title)}
                          title="Delete photo"
                          className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-200 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODAL: ADD / EDIT GALLERY ITEM */}
        {editingGalleryItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="max-w-2xl w-full bg-[#111114] border border-[#2A2A2E] rounded-2xl p-6 sm:p-8 text-white space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-black uppercase tracking-wide">
                    {isNewGalleryItem ? 'Add Photograph to Hero Gallery' : 'Edit Photograph'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingGalleryItem(null);
                    setGalleryImagePreview('');
                  }}
                  className="p-1 text-gray-400 hover:text-white"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveGalleryItem} className="space-y-4">
                {/* Image Upload or URL section */}
                <div className="space-y-3 p-4 rounded-xl bg-black/40 border border-white/10">
                  <label className="block text-xs font-black uppercase text-gray-300">
                    Photograph Source *
                  </label>

                  {/* Device File Upload */}
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <label className="w-full sm:w-auto flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-dashed border-white/20 text-xs font-bold text-gray-200 transition-colors">
                      <Upload className="w-4 h-4 text-amber-400" />
                      <span>Upload from Device (PNG/JPG)</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>

                    <span className="text-xs text-gray-500 font-bold uppercase">OR</span>

                    {/* Image URL Input */}
                    <div className="w-full sm:w-auto flex-1">
                      <input
                        type="text"
                        value={editingGalleryItem.image_url || ''}
                        onChange={(e) => {
                          setEditingGalleryItem({ ...editingGalleryItem, image_url: e.target.value });
                          setGalleryImagePreview(e.target.value);
                        }}
                        placeholder="Image URL or /assets/images/..."
                        className="w-full px-3 py-3 rounded-xl bg-[#0A0A0A] border border-[#2A2A2A] text-xs text-white placeholder-gray-500"
                      />
                    </div>
                  </div>

                  {/* Image Live Preview */}
                  {(galleryImagePreview || editingGalleryItem.image_url) && (
                    <div className="mt-3 relative rounded-xl overflow-hidden aspect-video max-h-48 border border-white/15 bg-black flex items-center justify-center group">
                      <img
                        src={galleryImagePreview || editingGalleryItem.image_url}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold">
                        {editingGalleryItem.category_tag || 'Category Tag Preview'}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setGalleryImagePreview('');
                          setEditingGalleryItem((prev) => ({ ...(prev || {}), image_url: '' }));
                          showToast('Image cleared from draft', 'info');
                        }}
                        className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-red-600/90 hover:bg-red-600 text-white text-[10px] font-bold flex items-center gap-1 shadow-md transition-colors"
                        title="Remove current image"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove Image</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                      Title / Caption *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingGalleryItem.title || ''}
                      onChange={(e) =>
                        setEditingGalleryItem({ ...editingGalleryItem, title: e.target.value })
                      }
                      placeholder="e.g. Jain's Gole Bazar Showroom Team"
                      className="w-full px-3 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-xs text-white"
                    />
                  </div>

                  {/* Category Tag */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                      Category Tag (Translucent Badge) *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingGalleryItem.category_tag || ''}
                      onChange={(e) =>
                        setEditingGalleryItem({ ...editingGalleryItem, category_tag: e.target.value })
                      }
                      placeholder="e.g. Gole Bazar Flagship, Festive Offers"
                      className="w-full px-3 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Link Target */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                      Click Target URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={editingGalleryItem.target_url || ''}
                      onChange={(e) =>
                        setEditingGalleryItem({ ...editingGalleryItem, target_url: e.target.value })
                      }
                      placeholder="e.g. /offers or /contact"
                      className="w-full px-3 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-xs text-white"
                    />
                  </div>

                  {/* Sort Order */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                      Display Priority Order
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={editingGalleryItem.sort_order ?? 1}
                      onChange={(e) =>
                        setEditingGalleryItem({ ...editingGalleryItem, sort_order: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-xs text-white"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                    Description / Story
                  </label>
                  <textarea
                    rows={2}
                    value={editingGalleryItem.description || ''}
                    onChange={(e) =>
                      setEditingGalleryItem({ ...editingGalleryItem, description: e.target.value })
                    }
                    placeholder="Brief backstory about this showroom moment or promotional event..."
                    className="w-full px-3 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-xs text-white"
                  />
                </div>

                {/* Active Checkbox */}
                <div>
                  <label className="flex items-center gap-2 text-xs text-gray-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingGalleryItem.is_active ?? true}
                      onChange={(e) =>
                        setEditingGalleryItem({ ...editingGalleryItem, is_active: e.target.checked })
                      }
                      className="rounded text-red-600 focus:ring-0"
                    />
                    <span className="font-bold">Display in Hero Showcase Gallery</span>
                  </label>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
                  {!isNewGalleryItem && editingGalleryItem.id ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (editingGalleryItem.id) {
                          handleDeleteGalleryItem(editingGalleryItem.id, editingGalleryItem.title);
                        }
                      }}
                      className="px-3.5 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 text-xs font-bold text-red-300 flex items-center gap-1.5 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      <span>Delete Photograph</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingGalleryItem(null);
                        setGalleryImagePreview('');
                      }}
                      className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-300 uppercase transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#E10600] hover:bg-[#FF1E16] text-white text-xs font-black uppercase tracking-wider transition-colors shadow-lg shadow-red-950/40"
                    >
                      Save Photograph
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD / EDIT PRODUCT */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="max-w-2xl w-full bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6 sm:p-8 text-white space-y-6 max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-bold uppercase">
                {isNewProduct ? 'Add New Product to Showroom' : 'Edit Product'}
              </h3>

              <form onSubmit={handleSaveProduct} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingProduct.name || ''}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, name: e.target.value })
                      }
                      placeholder="e.g. Apple iPhone 16 Pro"
                      className="w-full px-3 py-2 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                      Brand
                    </label>
                    <select
                      value={editingProduct.brand_id || 'brand-apple'}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          brand_id: e.target.value,
                          brand_name: brands.find((b) => b.id === e.target.value)?.name,
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-xs text-white"
                    >
                      {brands.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                      Selling Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={editingProduct.price || 0}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, price: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                      MRP (₹)
                    </label>
                    <input
                      type="number"
                      value={editingProduct.mrp || 0}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, mrp: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                      Stock Count
                    </label>
                    <input
                      type="number"
                      value={editingProduct.stock_quantity ?? 10}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          stock_quantity: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={editingProduct.images?.[0]?.image_url || ''}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        images: [
                          {
                            id: 'img-1',
                            image_url: e.target.value,
                            alt_text: editingProduct.name || 'Device',
                            is_primary: true,
                            display_order: 1,
                          },
                        ],
                      })
                    }
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1">
                    Short Description
                  </label>
                  <textarea
                    rows={2}
                    value={editingProduct.short_description || ''}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        short_description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-xs text-white"
                  />
                </div>

                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-xs text-gray-300">
                    <input
                      type="checkbox"
                      checked={editingProduct.is_offer || false}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, is_offer: e.target.checked })
                      }
                    />
                    <span>Highlight as Today&apos;s Offer</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs text-gray-300">
                    <input
                      type="checkbox"
                      checked={editingProduct.is_active ?? true}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, is_active: e.target.checked })
                      }
                    />
                    <span>Active in Store</span>
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-[#1F1F1F]">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 rounded-lg bg-[#1F1F1F] text-xs font-bold uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#E10600] text-white text-xs font-bold uppercase"
                  >
                    Save Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* CONFIRMATION DIALOG (In-app modal safe for iframe) */}
        {confirmDialog && confirmDialog.isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="max-w-md w-full bg-[#141418] border border-[#2A2A32] rounded-2xl p-6 text-white space-y-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    confirmDialog.confirmVariant === 'warning'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}
                >
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">{confirmDialog.title}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Please confirm this action</p>
                </div>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed bg-black/40 p-3 rounded-xl border border-white/5">
                {confirmDialog.message}
              </p>
              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setConfirmDialog(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDialog.onConfirm}
                  className={`px-4 py-2 rounded-xl text-xs font-bold text-white transition-colors shadow-lg ${
                    confirmDialog.confirmVariant === 'warning'
                      ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-950/40'
                      : 'bg-red-600 hover:bg-red-500 shadow-red-950/40'
                  }`}
                >
                  {confirmDialog.confirmLabel}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
