import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { SearchModal } from './components/common/SearchModal';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { ToastContainer } from './components/common/ToastContainer';
import { CustomCursor } from './components/common/CustomCursor';
import { QuickViewModal } from './components/common/QuickViewModal';
import { AnimatedTechBackground } from './components/common/AnimatedTechBackground';
import { ThemeSwitcher } from './components/common/ThemeSwitcher';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartCheckoutPage } from './pages/CartCheckoutPage';
import { ExchangePage } from './pages/ExchangePage';
import { FinancePage } from './pages/FinancePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { WishlistPage } from './pages/WishlistPage';
import { AdminPage } from './pages/AdminPage';
import { Product } from './types';

const MainLayout: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // Global QuickView product state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    // Check if it's an in-page anchor (e.g., #deals, #finance)
    if (path.startsWith('#')) {
      const targetId = path.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // If on another page and clicking an anchor like /#deals
    if (path.includes('#') && !path.startsWith('#')) {
      const [pagePath, hash] = path.split('#');
      window.history.pushState({}, '', path);
      setCurrentPath(pagePath || '/');
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Route matching logic
  const renderCurrentPage = () => {
    // 1. Product Detail Page: /product/:slug
    if (currentPath.startsWith('/product/')) {
      const slug = currentPath.replace('/product/', '').split('?')[0].split('#')[0];
      return <ProductDetailPage slug={slug} navigate={navigate} />;
    }

    // 2. Exact or base paths
    const cleanPath = currentPath.split('?')[0].split('#')[0];

    switch (cleanPath) {
      case '/':
        return <HomePage navigate={navigate} />;

      case '/shop':
        return <ShopPage navigate={navigate} />;

      case '/mobiles':
        return <ShopPage navigate={navigate} initialCategory="cat-mobiles" />;

      case '/laptops':
        return <ShopPage navigate={navigate} initialCategory="cat-laptops" />;

      case '/accessories':
        return <ShopPage navigate={navigate} initialCategory="cat-accessories" />;

      case '/offers':
        return <ShopPage navigate={navigate} initialCategory="offers" />;

      case '/cart':
      case '/checkout':
        return <CartCheckoutPage navigate={navigate} />;

      case '/exchange':
        return <ExchangePage navigate={navigate} />;

      case '/finance':
        return <FinancePage />;

      case '/about':
        return <AboutPage navigate={navigate} />;

      case '/contact':
        return <ContactPage />;

      case '/wishlist':
        return <WishlistPage navigate={navigate} />;

      case '/admin':
        return <AdminPage />;

      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--theme-bg-base,#060507)] text-[#F8FAFC] flex flex-col font-sans relative antialiased selection:bg-[var(--theme-primary,#FF1E46)] selection:text-white transition-colors duration-300">
      {/* Dynamic Animated Ambient Auroras & Particle Mesh Canvas */}
      <AnimatedTechBackground />

      {/* Custom Mouse Cursor for Desktop */}
      <CustomCursor />

      {/* Primary Sticky Header */}
      <Header currentPath={currentPath} navigate={navigate} />

      {/* Main Page View */}
      <main className="flex-1 w-full relative z-10">
        {renderCurrentPage()}
      </main>

      {/* Global Footer */}
      <Footer navigate={navigate} />

      {/* Interactive Theme Palette & Animation Switcher */}
      <ThemeSwitcher />

      {/* Slide-out Cart Drawer */}
      <CartDrawer navigate={navigate} />

      {/* Instant Search & Discovery Modal */}
      <SearchModal navigate={navigate} />

      {/* Floating WhatsApp Action Pill */}
      <FloatingWhatsApp />

      {/* Quick View Product Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          navigate={navigate}
        />
      )}

      {/* Global Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
