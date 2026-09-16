import React from 'react';
import { ArrowRight, CreditCard, CheckCircle2, ShieldCheck } from 'lucide-react';
import { FINANCE_PARTNERS } from '../../services/dataService';

interface FinanceSectionProps {
  navigate: (path: string) => void;
}

export const FinanceSection: React.FC<FinanceSectionProps> = ({ navigate }) => {
  return (
    <section className="bg-[#0A0A0A] py-20 border-b border-[#1A1A1A] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161616] border border-[#E10600]/40 text-[#E10600] text-xs font-black tracking-widest uppercase mb-3">
            <CreditCard className="w-3.5 h-3.5" />
            EASY INSTALMENT SCHEMES
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            GET YOUR DREAM DEVICE TODAY.
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-3 font-medium">
            Finance options available through selected partner institutions at Jain&apos;s showroom.
          </p>
        </div>

        {/* Finance Partners Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {FINANCE_PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="p-6 rounded-2xl bg-[#111111] border border-[#222222] hover:border-[#E10600]/60 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-extrabold text-white group-hover:text-red-400 transition-colors">
                    {partner.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded bg-[#1A1A1A] border border-[#2A2A2A] text-[10px] font-bold text-[#D4AF37] uppercase">
                    {partner.badge}
                  </span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {partner.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#1A1A1A] flex items-center gap-1.5 text-[11px] text-gray-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>Instore verification &amp; paperwork support</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="p-8 rounded-2xl bg-[#111111] border border-[#2A2A2A] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-white">
              Want to check EMI schemes for your chosen phone or laptop?
            </h4>
            <p className="text-xs text-gray-400">
              Submit your enquiry online or visit our showroom with your Aadhaar and PAN card.
            </p>
          </div>

          <button
            onClick={() => navigate('/finance')}
            className="px-6 py-3.5 rounded-xl bg-[#E10600] hover:bg-[#FF1E16] text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-red-950/40 shrink-0"
          >
            CHECK FINANCE OPTIONS
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
