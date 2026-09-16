import React, { useState, useEffect } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  User as UserIcon,
  Menu,
  X,
  ShieldCheck,
  Sparkles,
  LayoutDashboard,
  Palette,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getYearsOfTrust } from '../../utils/formatters';

interface HeaderProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, navigate }) => {
  const {
    settings,
    cartCount,
    wishlist,
    currentUser,
    setCartOpen,
    setSearchOpen,
    visualTheme,
    setVisualTheme,
    showToast,
  } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const years = getYearsOfTrust(settings.established_year || 2005);

  const cycleTheme = () => {
    const next =
      visualTheme === 'cyber-crimson'
        ? 'festive-gold'
        : visualTheme === 'festive-gold'
        ? 'hyper-blue'
        : 'cyber-crimson';
    setVisualTheme(next);
    const names = {
      'cyber-crimson': 'Cyber Crimson',
      'festive-gold': 'Festive Loot Lo',
      'hyper-blue': 'Hyper Titanium',
    };
    showToast(`Theme: ${names[next]}`, 'info');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'MOBILES', path: '/mobiles' },
    { name: 'LAPTOPS', path: '/laptops' },
    { name: 'ACCESSORIES', path: '/accessories' },
    { name: 'OFFERS', path: '/offers' },
    { name: 'EXCHANGE', path: '/exchange' },
    { name: 'FINANCE', path: '/finance' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full select-none">
      {/* SECTION 01 — ANNOUNCEMENT BAR */}
      <div className="bg-gradient-to-r from-[var(--theme-primary)] via-red-600 to-[var(--theme-primary)] text-white text-xs font-semibold py-1.5 px-4 overflow-hidden border-b border-black/20 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden md:flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-white animate-ping" />
            <span className="tracking-wider uppercase font-black text-[11px]">AUTHORISED MULTI-BRAND SHOWROOM • KHARAGPUR</span>
          </div>

          <div className="overflow-hidden w-full md:w-auto flex-1 md:flex-initial text-center">
            <p className="font-extrabold tracking-widest text-xs uppercase animate-pulse sm:animate-none flex items-center justify-center gap-2">
              <Sparkles className="w-3 h-3 inline-block animate-spin-slow" />
              {settings.announcement_text || 'NEW ARRIVALS • BEST PRICES • EXCHANGE • 0% FINANCE AVAILABLE'}
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-[11px] font-bold tracking-wider">
            <button
              onClick={() => navigate('/faq')}
              className="hover:underline transition-all"
            >
              FAQS
            </button>
            <span>•</span>
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center gap-1 hover:bg-black/30 bg-black/20 px-2.5 py-0.5 rounded-full font-mono text-[10px] transition-colors"
            >
              <LayoutDashboard className="w-3 h-3" />
              ADMIN
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 02 — NAVIGATION */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[var(--theme-bg-surface)] backdrop-blur-xl shadow-2xl border-b border-[var(--theme-border)]'
            : 'bg-[var(--theme-bg-base)]/90 backdrop-blur-md border-b border-[var(--theme-border-subtle)]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20">
            {/* LEFT: JAIN'S Logo & Since 2005 Badge */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => navigate('/')}
            >
              <div className="relative">
                <img
                  src={settings.logo_url || "/assets/images/jains_brand_logo_1789505559002.jpg"}
                  alt={settings.business_name}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl object-contain bg-neutral-900/90 border border-white/10 p-1 group-hover:border-white/25 group-hover:scale-[1.03] transition-all duration-300 shadow-sm"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-[var(--theme-primary)] transition-colors">
                    JAIN&apos;S
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--theme-primary)]" />
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-[var(--theme-accent)]/50 text-[var(--theme-accent)] font-bold tracking-widest uppercase">
                    EST. {settings.established_year || 2005}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] sm:text-xs font-bold tracking-wider text-gray-300 uppercase">
                    Mobiles &amp; Laptops
                  </span>
                  <span className="text-[9px] text-[var(--theme-accent)] font-bold tracking-wide">
                    • Kharagpur
                  </span>
                </div>
              </div>
            </div>

            {/* CENTER: DESKTOP NAV LINKS */}
            <div className="hidden xl:flex items-center space-x-1 lg:space-x-1.5">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <button
                    key={link.name}
                    onClick={() => navigate(link.path)}
                    className={`px-3 py-2 text-xs font-black tracking-wider uppercase transition-all duration-200 relative ${
                      isActive
                        ? 'text-[var(--theme-primary)]'
                        : 'text-gray-300 hover:text-white hover:bg-white/5 rounded-lg'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-[var(--theme-primary)] rounded-full shadow-[0_0_8px_var(--theme-glow)]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* RIGHT: ACTIONS (Theme Switcher, Search, Wishlist, Cart, Account, Mobile Menu) */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Quick Theme Switcher Pill in Header */}
              <button
                onClick={cycleTheme}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-gray-200 hover:text-white transition-all text-xs font-bold active:scale-95"
                title="Click to cycle website theme"
                aria-label="Cycle theme"
              >
                <Palette className="w-3.5 h-3.5 text-[var(--theme-primary)]" />
                <span className="hidden md:inline text-[11px] font-black uppercase tracking-wider">
                  Theme
                </span>
              </button>

              {/* Search trigger */}
              <button
                id="header-search-btn"
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                title="Search products (Ctrl+K)"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <button
                id="header-wishlist-btn"
                onClick={() => navigate('/wishlist')}
                className="relative p-2.5 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                title="Wishlist"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[var(--theme-primary)] text-white text-[10px] font-black flex items-center justify-center shadow-md">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart trigger */}
              <button
                id="header-cart-btn"
                onClick={() => setCartOpen(true)}
                className="relative p-2.5 rounded-full text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                title="Cart"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[var(--theme-primary)] text-white text-[10px] font-black flex items-center justify-center shadow-md">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Account */}
              <button
                id="header-account-btn"
                onClick={() => navigate('/account')}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[var(--theme-primary)]/60 text-gray-200 text-xs font-bold tracking-wide transition-colors"
                aria-label="Account"
              >
                <UserIcon className="w-4 h-4 text-[var(--theme-primary)]" />
                <span className="max-w-[80px] truncate">
                  {currentUser ? currentUser.name.split(' ')[0] : 'Account'}
                </span>
              </button>

              {/* Hamburger for mobile/tablet */}
              <button
                id="header-mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE SLIDE MENU */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[var(--theme-bg-card)] border-b border-white/15 px-4 pt-3 pb-6 space-y-3 backdrop-blur-xl">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <button
                    key={link.name}
                    onClick={() => {
                      navigate(link.path);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-2.5 text-left text-xs font-black tracking-wider uppercase rounded-xl transition-all ${
                      isActive
                        ? 'bg-[var(--theme-primary)] text-white shadow-lg'
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  navigate('/account');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-xs font-bold text-gray-200 hover:text-white py-2"
              >
                <UserIcon className="w-4 h-4 text-[var(--theme-primary)]" />
                {currentUser ? currentUser.name : 'My Account / Login'}
              </button>

              <button
                onClick={() => {
                  navigate('/admin');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 text-xs font-bold text-[var(--theme-accent)] bg-white/5 px-3 py-1.5 rounded-lg border border-[var(--theme-accent)]/30"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Admin Panel
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
