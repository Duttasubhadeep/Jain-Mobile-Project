import React from 'react';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatWhatsAppLink } from '../../utils/formatters';

interface FinalCtaSectionProps {
  navigate: (path: string) => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ navigate }) => {
  const { settings } = useApp();

  const ctaWhatsAppMsg = `Hello ${settings.business_name},\n\nI am ready to upgrade my device and would like to speak with a showroom advisor!`;
  const ctaWhatsAppUrl = formatWhatsAppLink(settings.whatsapp_number, ctaWhatsAppMsg);

  return (
    <section className="relative overflow-hidden bg-transparent py-24 border-b border-white/10 select-none text-center z-10">
      {/* Background glow orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[var(--theme-primary)]/15 blur-[140px] pointer-events-none animate-pulse [animation-duration:6s]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-[var(--theme-accent)]/50 text-[var(--theme-accent)] text-xs font-black tracking-widest uppercase shadow-lg shadow-[var(--theme-glow)]/20">
          <Sparkles className="w-4 h-4 text-[var(--theme-accent)]" />
          START YOUR UPGRADE JOURNEY TODAY
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight leading-tight">
          READY FOR YOUR <span className="shimmer-text">NEXT DEVICE?</span>
        </h2>

        <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto font-medium leading-relaxed">
          Visit our Kharagpur showroom or connect with our team on WhatsApp for VIP pricing, 0% EMI assistance and live device inventory.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => navigate('/shop')}
            className="px-9 py-4 rounded-xl bg-gradient-to-r from-[var(--theme-primary)] to-rose-600 hover:brightness-110 text-white font-black text-xs uppercase tracking-widest flex items-center gap-2.5 transition-all shadow-xl shadow-[var(--theme-glow)] hover:scale-105 active:scale-95"
          >
            EXPLORE STORE
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={ctaWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-9 py-4 rounded-xl bg-white/5 hover:bg-[#25D366] text-white border border-white/15 hover:border-[#25D366] font-black text-xs uppercase tracking-widest flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 shadow-md"
          >
            <MessageCircle className="w-4 h-4 fill-current text-[#25D366] group-hover:text-white" />
            WHATSAPP ADVISOR
          </a>
        </div>
      </div>
    </section>
  );
};
