import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Gift, Flame, MessageCircle, Percent } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getYearsOfTrust, formatWhatsAppLink } from '../../utils/formatters';

interface PromoBannerSectionProps {
  navigate: (path: string) => void;
}

export const PromoBannerSection: React.FC<PromoBannerSectionProps> = ({ navigate }) => {
  const { settings } = useApp();
  const years = getYearsOfTrust(settings.established_year || 2005);

  const lootLoWhatsAppMsg = `Hello Jain's Mobiles & Laptops,\n\nI want to know more about the *LOOT LO SALE* offers, exchange bonus, and free lifetime tempered glass perks!`;
  const lootLoWhatsAppUrl = formatWhatsAppLink(settings.whatsapp_number, lootLoWhatsAppMsg);

  return (
    <section className="relative overflow-hidden bg-transparent py-20 border-b border-white/10 select-none z-10">
      {/* Ambient Light Atmosphere */}
      <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[var(--theme-primary)]/15 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[var(--theme-accent)]/15 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl glass-card border border-[var(--theme-border)] p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-2xl hover:border-[var(--theme-primary)]/60 transition-all duration-500 hover:shadow-[0_20px_60px_var(--theme-glow)]">
          {/* Subtle decorative grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(var(--theme-primary)_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--theme-primary)] text-white text-[11px] font-black tracking-widest uppercase shadow-md">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  GRAND FESTIVE CAMPAIGN
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-[var(--theme-accent)]/50 text-[var(--theme-accent)] text-[11px] font-bold tracking-widest uppercase shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  LOOT LO SALE LIVE
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-tight">
                LOOT LO SALE <span className="shimmer-text">DHAMAKA.</span>
              </h2>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-xl">
                Upgrade your smartphone or laptop at Jain&apos;s Mobiles &amp; Laptops with unmatched festive offers, zero-cost EMI, and bumper assured prizes!
              </p>

              {/* Offer Badges Grid from Official Poster */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-left hover:border-[var(--theme-accent)]/50 transition-colors">
                  <div className="text-[var(--theme-accent)] font-black text-xs">FREE TEMPERED GLASS</div>
                  <div className="text-[10px] text-gray-400">Lifetime on phones &gt; ₹10,001</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-left hover:border-[var(--theme-primary)]/50 transition-colors">
                  <div className="text-[var(--theme-primary)] font-black text-xs">EXTRA ₹5,000 BONUS</div>
                  <div className="text-[10px] text-gray-400">On device exchange</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-left hover:border-emerald-400/50 transition-colors">
                  <div className="text-emerald-400 font-black text-xs">UPTO 30 MONTH EMI</div>
                  <div className="text-[10px] text-gray-400">0% interest finance schemes</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-left hover:border-sky-400/50 transition-colors">
                  <div className="text-sky-400 font-black text-xs">UPTO 90% OFF</div>
                  <div className="text-[10px] text-gray-400">On extended warranty</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-left hover:border-purple-400/50 transition-colors">
                  <div className="text-purple-400 font-black text-xs">SWISS MILITARY</div>
                  <div className="text-[10px] text-gray-400">Assured brand gifts</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-left hover:border-amber-400/50 transition-colors">
                  <div className="text-amber-400 font-black text-xs">WIN ELECTRIC SCOOTER</div>
                  <div className="text-[10px] text-gray-400">1st Bumper lucky draw prize</div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={lootLoWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[var(--theme-primary)] to-rose-600 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-xl shadow-[var(--theme-glow)] hover:scale-105 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  CLAIM OFFERS ON WHATSAPP
                </a>

                <button
                  onClick={() => navigate('/offers')}
                  className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 hover:text-white border border-white/15 font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
                >
                  VIEW ALL OFFERS
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Showcase Image - Authentic Festive Loot Lo Banner */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full rounded-2xl overflow-hidden border border-[var(--theme-border)] shadow-2xl group hover:border-[var(--theme-primary)] transition-all duration-500">
                <img
                  src="/src/assets/images/festive_lootlo_sale_1789505594932.jpg"
                  alt="Festive Loot Lo Sale at Jain's Mobiles & Laptops"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/85 backdrop-blur-md border border-white/15 flex items-center justify-between">
                  <div className="text-left">
                    <div className="text-[10px] font-black text-[var(--theme-accent)] uppercase">JAIN&apos;S MOBILES &amp; APPLIANCES</div>
                    <div className="text-xs font-bold text-white">Call/WhatsApp: 086419 54500</div>
                  </div>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[var(--theme-primary)] text-white font-bold uppercase shadow-sm">
                    KHARAGPUR
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
