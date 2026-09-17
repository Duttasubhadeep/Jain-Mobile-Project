import React from 'react';
import {
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  CreditCard,
  RefreshCw,
  Sparkles,
  Zap,
  Flame,
  Award,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getYearsOfTrust, formatWhatsAppLink } from '../../utils/formatters';
import { HeroPhotoGallery } from './HeroPhotoGallery';

interface HeroSectionProps {
  navigate: (path: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ navigate }) => {
  const { settings, visualTheme } = useApp();
  const years = getYearsOfTrust(settings.established_year || 2005);

  const heroWhatsAppMsg = `Hello ${settings.business_name},\n\nI am browsing your website and would like to know more about current smartphone and laptop offers!`;
  const heroWhatsAppUrl = formatWhatsAppLink(settings.whatsapp_number, heroWhatsAppMsg);

  return (
    <section className="relative overflow-hidden pt-10 pb-20 sm:pt-16 sm:pb-28 border-b border-white/10 select-none">
      {/* Dynamic Background Glow Orbs */}
      <div className="absolute top-1/4 right-10 sm:right-1/4 w-[450px] h-[450px] rounded-full bg-[var(--theme-primary)]/15 blur-[120px] pointer-events-none animate-pulse [animation-duration:8s]" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] rounded-full bg-[var(--theme-accent)]/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT CONTENT (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            {/* HERITAGE BADGE with shimmering neon border */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-pill border border-[var(--theme-accent)]/50 text-[var(--theme-accent)] text-xs font-black tracking-widest uppercase shadow-lg shadow-[var(--theme-glow)]/20 animate-pulse [animation-duration:4s]">
              <Sparkles className="w-4 h-4 text-[var(--theme-accent)]" />
              <span>SINCE {settings.established_year || 2005} • {years}+ YEARS OF TRUST • KHARAGPUR</span>
            </div>

            {/* MAIN HEADLINE with animated gradient glow */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] uppercase">
              NEXT-GEN TECH.{' '}
              <span className="shimmer-text block sm:inline">
                UNBEATABLE VALUE.
              </span>
            </h1>

            {/* STRATEGIC PHOTO GALLERY SHOWCASE — Placed directly between headline and subtitle */}
            <HeroPhotoGallery onNavigate={navigate} />

            {/* SUPPORTING SUBTITLE */}
            <p className="text-base sm:text-lg text-gray-300 font-medium tracking-wide max-w-xl leading-relaxed">
              {settings.hero_subtitle || "Kharagpur's #1 Destination for Smartphones, Laptops & Genuine Accessories Since 2005."}
            </p>

            {/* LIVE KHARAGPUR SHOWROOM BADGE */}
            <div className="flex flex-wrap items-center gap-2.5 py-1 text-xs">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-bold">Showroom Open Today</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[var(--theme-accent)] font-bold">
                <Flame className="w-3.5 h-3.5" />
                <span>Loot Lo Deals Live</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 font-medium">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>0% EMI Available</span>
              </div>
            </div>

            {/* CTAS */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              {/* PRIMARY CTA with pulsating neon shadow */}
              <button
                id="hero-shop-now-cta"
                onClick={() => navigate('/shop')}
                className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--theme-primary)] via-red-600 to-[var(--theme-primary)] bg-[length:200%_auto] hover:bg-[position:right_center] text-white font-black text-sm uppercase tracking-wider flex items-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-[var(--theme-glow)]"
              >
                <span>EXPLORE ALL GADGETS</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* SECONDARY CTA */}
              <a
                id="hero-whatsapp-cta"
                href={heroWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-4 rounded-xl bg-[#0D0B12]/80 hover:bg-[#25D366] text-gray-200 hover:text-white border border-white/15 hover:border-[#25D366] font-black text-sm uppercase tracking-wider flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
              >
                <MessageCircle className="w-4 h-4 fill-current text-[#25D366] group-hover:text-white" />
                <span>WHATSAPP VIP DESK</span>
              </a>
            </div>

            {/* BRAND PILLARS */}
            <div className="pt-6 border-t border-white/10 space-y-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm font-black tracking-widest text-white uppercase">
                <span>100% GENUINE</span>
                <span className="text-[var(--theme-primary)]">•</span>
                <span>OFFICIAL WARRANTY</span>
                <span className="text-[var(--theme-primary)]">•</span>
                <span>INSTANT EXCHANGE</span>
              </div>
              <p className="text-xs font-bold text-[var(--theme-accent)] tracking-wider uppercase flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                Trusted by 50,000+ Happy Kharagpur Customers
              </p>
            </div>
          </div>

          {/* RIGHT SIDE: 3D-STYLE FLOATING COMPOSITION (5 cols on lg) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Composition container */}
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              {/* Rotating Holographic Neon Halo Ring */}
              <div className="absolute inset-2 rounded-full border border-white/10 animate-spin-slow opacity-60"
                style={{
                  background: `conic-gradient(from 0deg, transparent, var(--theme-primary), transparent, var(--theme-accent), transparent)`,
                  mask: 'radial-gradient(transparent 68%, black 70%)',
                  WebkitMask: 'radial-gradient(transparent 68%, black 70%)',
                }}
              />

              {/* Pulsing Backlight Orb */}
              <div className="absolute inset-10 rounded-full bg-[var(--theme-primary)]/20 blur-3xl animate-pulse [animation-duration:5s]" />

              {/* Main Flagship Phone with Floating Motion */}
              <div className="relative z-10 w-64 sm:w-72 drop-shadow-[0_25px_60px_rgba(var(--theme-primary-rgb),0.4)] animate-float cursor-pointer transition-transform duration-500 hover:scale-105">
                <img
                  src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=900&auto=format&fit=crop&q=80"
                  alt="Flagship Smartphone"
                  className="w-full h-auto object-contain rounded-3xl"
                  loading="eager"
                />
              </div>

              {/* Laptop in Background */}
              <div className="absolute -top-4 -right-4 sm:-right-8 w-44 sm:w-56 opacity-85 z-0 blur-[0.4px] animate-float-delayed">
                <img
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80"
                  alt="Premium Laptop"
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  loading="eager"
                />
              </div>

              {/* Wireless Earbuds */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 w-32 sm:w-40 z-20 animate-float">
                <img
                  src="https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&auto=format&fit=crop&q=80"
                  alt="Earbuds"
                  className="w-full h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                  loading="eager"
                />
              </div>

              {/* FLOATING INTERACTIVE INFORMATION CARDS */}
              {/* Card 1: 100% GENUINE */}
              <div className="absolute top-4 left-0 z-30 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0D0B12]/90 backdrop-blur-xl border border-emerald-500/40 shadow-xl shadow-black/50 text-white text-[11px] font-black uppercase tracking-wider animate-float">
                <ShieldCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>100% GENUINE</span>
              </div>

              {/* Card 2: 0% EMI FINANCE */}
              <div className="absolute bottom-16 right-0 z-30 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0D0B12]/90 backdrop-blur-xl border border-[var(--theme-primary)]/50 shadow-xl shadow-[var(--theme-glow)] text-white text-[11px] font-black uppercase tracking-wider animate-float-delayed">
                <CreditCard className="w-4 h-4 text-[var(--theme-primary)]" />
                <span>0% EMI ON SPOT</span>
              </div>

              {/* Card 3: FESTIVE EXCHANGE */}
              <div className="absolute -bottom-4 right-10 z-30 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#0D0B12]/90 backdrop-blur-xl border border-[var(--theme-accent)]/50 shadow-xl shadow-black/50 text-[var(--theme-accent)] text-[11px] font-black uppercase tracking-wider animate-float">
                <RefreshCw className="w-4 h-4 text-[var(--theme-accent)] animate-spin-slow" />
                <span>+₹5,000 EXCHANGE BONUS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

