import React from 'react';
import { RefreshCw, CheckCircle2, MessageCircle, ArrowRight, ShieldCheck, Sparkles, Gift, Flame, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AnimatedExchangeForm } from '../components/forms/AnimatedExchangeForm';
import { formatWhatsAppLink } from '../utils/formatters';

interface ExchangePageProps {
  navigate: (path: string) => void;
}

export const ExchangePage: React.FC<ExchangePageProps> = ({ navigate }) => {
  const { settings } = useApp();

  return (
    <div className="bg-transparent min-h-screen py-12 text-white select-none relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-[var(--theme-accent)]/50 text-[var(--theme-accent)] text-xs font-black tracking-widest uppercase mb-3 shadow-md">
            <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
            OFFICIAL UPGRADE &amp; TRADE-IN DESK
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            UPGRADE. EXCHANGE. <span className="shimmer-text">SAVE.</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-300 mt-3 font-medium">
            Turn your current smartphone or laptop into maximum store credit towards your dream device with our transparent, animated trade-in appraisal.
          </p>
        </div>

        {/* Festive Exchange Highlight Banner */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl glass-card border border-[var(--theme-border)] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[var(--theme-primary)]/70 transition-all duration-500 hover:shadow-[0_15px_45px_var(--theme-glow)]">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--theme-primary)] to-rose-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-[var(--theme-glow)]">
              <Flame className="w-7 h-7 fill-current animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-3 py-1 rounded-full bg-[var(--theme-primary)] text-white font-black uppercase tracking-wider shadow-sm">
                  LOOT LO SALE FESTIVE OFFER
                </span>
                <span className="text-xs font-black text-[var(--theme-accent)]">LIMITED TIME</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white uppercase mt-1.5">
                GET EXTRA UPTO ₹5,000 EXCHANGE BONUS
              </h3>
              <p className="text-xs text-gray-300 mt-0.5">
                On any old smartphone or laptop exchanged at our Kharagpur showrooms during the grand festival.
              </p>
            </div>
          </div>

          <a
            href={formatWhatsAppLink(settings.whatsapp_number, "Hello Jain's Mobiles Kharagpur, I want to avail the Extra ₹5,000 Loot Lo Exchange Bonus on my old device!")}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shrink-0 transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-current text-white" />
            CLAIM BONUS ON WHATSAPP
          </a>
        </div>

        {/* 3 Step Process Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl glass-card border border-[var(--theme-border)] space-y-2 hover:border-[var(--theme-primary)]/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--theme-glow)]">
            <span className="text-xs font-mono font-black text-[var(--theme-primary)]">STEP 01</span>
            <h3 className="text-base font-black text-white uppercase">Instant Valuation</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-normal">
              Use our animated calculator below to test condition parameters and lock your estimated value.
            </p>
          </div>
          <div className="p-6 rounded-2xl glass-card border border-[var(--theme-border)] space-y-2 hover:border-[var(--theme-primary)]/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--theme-glow)]">
            <span className="text-xs font-mono font-black text-[var(--theme-accent)]">STEP 02</span>
            <h3 className="text-base font-black text-white uppercase">Showroom Verification</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-normal">
              Visit any of our 3 Kharagpur branches (Gole Bazar, Shimla Center, Prem Bazar) for a rapid 5-minute physical diagnostic.
            </p>
          </div>
          <div className="p-6 rounded-2xl glass-card border border-[var(--theme-border)] space-y-2 hover:border-[var(--theme-primary)]/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--theme-glow)]">
            <span className="text-xs font-mono font-black text-emerald-400">STEP 03</span>
            <h3 className="text-base font-black text-white uppercase">Instant On-Spot Credit</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-normal">
              Apply value directly to your new device invoice. Complete phone-to-phone data transfer handled free!
            </p>
          </div>
        </div>

        {/* The Animated Exchange Appraisal Form */}
        <div className="mb-16">
          <AnimatedExchangeForm />
        </div>

        {/* Value Assurance Badges */}
        <div className="p-8 rounded-3xl glass-card border border-[var(--theme-border)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[var(--theme-primary)] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-black uppercase text-white">Guaranteed Best Price</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">Algorithmic fair market pricing benchmarked across India.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[var(--theme-accent)] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-black uppercase text-white">Zero Hidden Deductions</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">Transparent checklist — what you see is what you receive.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <RefreshCw className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-black uppercase text-white">Free Data Transfer</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">100% secure contacts, photos, WhatsApp chat backup &amp; transfer.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-black uppercase text-white">3 Kharagpur Branches</h4>
              <p className="text-[11px] text-gray-400 mt-0.5">Walk in anytime to Gole Bazar, Shimla Center or Prem Bazar.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
