import React, { useState } from 'react';
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
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DataService } from '../services/dataService';
import { Product, Order, ExchangeRequest, Review, BusinessSettings } from '../types';
import { formatINR, formatDate, formatWhatsAppLink } from '../utils/formatters';

export const AdminPage: React.FC = () => {
  const { products, categories, brands, settings, updateSettings, showToast } = useApp();

  // Authentication
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('jm_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'exchanges' | 'reviews' | 'settings'>('overview');

  // Real-time data
  const [orders, setOrders] = useState<Order[]>(() => DataService.getOrders());
  const [exchanges, setExchanges] = useState<ExchangeRequest[]>(() => DataService.getExchangeRequests());
  const [reviews, setReviews] = useState<Review[]>(() => DataService.getReviews());

  // Product Editing / Creation Modal
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<BusinessSettings>(settings);

  // Search filter inside admin products
  const [productSearch, setProductSearch] = useState('');

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

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      DataService.deleteProduct(id);
      showToast('Product removed', 'info');
    }
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
    if (window.confirm('Reset all demo data back to default showroom catalog?')) {
      DataService.resetToDefaults();
      window.location.reload();
    }
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
                          onClick={() => handleDeleteProduct(p.id)}
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
      </div>
    </div>
  );
};
