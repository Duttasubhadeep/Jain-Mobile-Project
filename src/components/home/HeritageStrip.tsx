import React from 'react';
import { ShieldCheck, Tag, Headphones, CreditCard, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getYearsOfTrust } from '../../utils/formatters';

export const HeritageStrip: React.FC = () => {
  const { settings } = useApp();
  const years = getYearsOfTrust(settings.established_year || 2005);

  const benefits = [
    {
      icon: ShieldCheck,
      title: 'Genuine Products',
      desc: '100% brand sealed stock with valid manufacturer warranty.',
    },
    {
      icon: Tag,
      title: 'Best Prices',
      desc: 'Competitive showroom deals, festive offers & bundle discounts.',
    },
    {
      icon: Headphones,
      title: 'After-Sales Support',
      desc: 'Dedicated assistance, data transfer, setup & guidance.',
    },
    {
      icon: CreditCard,
      title: 'Finance Available',
      desc: 'Easy paperless EMI from Bajaj Finserv, IDFC & top partners.',
    },
  ];

  return (
    <section className="bg-transparent border-b border-white/10 py-10 select-none relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heritage headline bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-8 mb-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-full glass-pill border border-[var(--theme-accent)]/50 text-[var(--theme-accent)] text-xs font-black tracking-widest uppercase shadow-md">
              SINCE {settings.established_year || 2005}
            </div>
            <div className="text-xl sm:text-2xl font-black text-white tracking-wide flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[var(--theme-accent)]" />
              <span>{years}+ YEARS OF TRUST &amp; SERVICE</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-black tracking-widest text-gray-300 uppercase">
            <span className="text-white">TRUST</span>
            <span className="text-[var(--theme-primary)]">•</span>
            <span className="text-white">QUALITY</span>
            <span className="text-[var(--theme-primary)]">•</span>
            <span className="text-white">SERVICE</span>
          </div>
        </div>

        {/* 4 Key Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="p-5 rounded-2xl glass-card border border-[var(--theme-border)] hover:border-[var(--theme-primary)]/80 hover:shadow-xl hover:shadow-[var(--theme-glow)] transition-all duration-300 group flex items-start gap-4 hover:-translate-y-1"
              >
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-[var(--theme-primary)]/20 text-[var(--theme-primary)] shrink-0 transition-all duration-300 group-hover:scale-110 shadow-md">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white mb-1 group-hover:text-[var(--theme-primary)] transition-colors">
                    {b.title}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-normal">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
