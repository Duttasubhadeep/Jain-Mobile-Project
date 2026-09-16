import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  Category,
  Brand,
  CartItem,
  BusinessSettings,
  User,
  Order,
  ProductVariant,
  VisualTheme,
} from '../types';
import { DataService } from '../services/dataService';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  settings: BusinessSettings;
  updateSettings: (newSettings: BusinessSettings) => void;
  products: Product[];
  categories: Category[];
  brands: Brand[];
  cart: CartItem[];
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  currentUser: User | null;
  loginUser: (user: Partial<User>) => void;
  logoutUser: () => void;
  orders: Order[];
  refreshData: () => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  toasts: ToastState[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  visualTheme: VisualTheme;
  setVisualTheme: (theme: VisualTheme) => void;
  animationsEnabled: boolean;
  setAnimationsEnabled: (enabled: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<BusinessSettings>(DataService.getSettings());
  const [products, setProducts] = useState<Product[]>(DataService.getProducts());
  const [categories, setCategories] = useState<Category[]>(DataService.getCategories());
  const [brands, setBrands] = useState<Brand[]>(DataService.getBrands());
  const [orders, setOrders] = useState<Order[]>(DataService.getOrders());

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('jm_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('jm_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Current User (simulating authentication with roles)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('jm_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Theme
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('jm_theme');
      return saved === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [visualTheme, setVisualThemeState] = useState<VisualTheme>(() => {
    try {
      const saved = localStorage.getItem('jm_visual_theme') as VisualTheme;
      if (saved && ['cyber-crimson', 'festive-gold', 'hyper-blue'].includes(saved)) {
        return saved;
      }
      return 'cyber-crimson';
    } catch {
      return 'cyber-crimson';
    }
  });

  const [animationsEnabled, setAnimationsEnabledState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('jm_animations');
      return saved !== 'false';
    } catch {
      return true;
    }
  });

  const setVisualTheme = (newTheme: VisualTheme) => {
    setVisualThemeState(newTheme);
    try {
      localStorage.setItem('jm_visual_theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    } catch {
      // ignore
    }
  };

  const setAnimationsEnabled = (enabled: boolean) => {
    setAnimationsEnabledState(enabled);
    try {
      localStorage.setItem('jm_animations', enabled ? 'true' : 'false');
      document.documentElement.setAttribute('data-animations', enabled ? 'true' : 'false');
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', visualTheme);
    document.documentElement.setAttribute('data-animations', animationsEnabled ? 'true' : 'false');
  }, [visualTheme, animationsEnabled]);

  // Toasts
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const refreshData = () => {
    setSettings(DataService.getSettings());
    setProducts(DataService.getProducts());
    setCategories(DataService.getCategories());
    setBrands(DataService.getBrands());
    setOrders(DataService.getOrders());
  };

  useEffect(() => {
    const handleDataUpdate = () => {
      refreshData();
    };
    window.addEventListener('jm_data_updated', handleDataUpdate);
    return () => window.removeEventListener('jm_data_updated', handleDataUpdate);
  }, []);

  useEffect(() => {
    localStorage.setItem('jm_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('jm_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('jm_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('jm_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('jm_theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleUpdateSettings = (newSettings: BusinessSettings) => {
    const updated = DataService.updateSettings(newSettings);
    setSettings(updated);
    showToast('Settings saved successfully', 'success');
  };

  const addToCart = (product: Product, variant?: ProductVariant, quantity = 1) => {
    const variantId = variant?.id || 'default';
    const itemId = `${product.id}_${variantId}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: itemId, product, variant, quantity }];
    });

    showToast(`ADDED TO CART ✓ ${product.name}`, 'success');
    setCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => {
    const unitPrice = item.variant ? item.variant.price : item.product.price;
    return sum + unitPrice * item.quantity;
  }, 0);

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Added to wishlist ♥', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  const loginUser = (userData: Partial<User>) => {
    const newUser: User = {
      id: userData.id || `usr_${Date.now()}`,
      name: userData.name || 'Guest User',
      email: userData.email || 'customer@jainsmobiles.com',
      phone: userData.phone || '+91 98765 00000',
      role: userData.role || 'customer',
      created_at: new Date().toISOString(),
      ...userData,
    };
    setCurrentUser(newUser);
    showToast(`Logged in as ${newUser.name} (${newUser.role})`, 'success');
  };

  const logoutUser = () => {
    setCurrentUser(null);
    showToast('Logged out successfully', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        settings,
        updateSettings: handleUpdateSettings,
        products,
        categories,
        brands,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        cartOpen,
        setCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist: (id: string) => wishlist.includes(id),
        currentUser,
        loginUser,
        logoutUser,
        orders,
        refreshData,
        searchOpen,
        setSearchOpen,
        toasts,
        showToast,
        removeToast,
        theme,
        toggleTheme,
        visualTheme,
        setVisualTheme,
        animationsEnabled,
        setAnimationsEnabled,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
