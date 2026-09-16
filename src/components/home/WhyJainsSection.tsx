import React from 'react';
import { Shield, Award, HeartHandshake } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getYearsOfTrust } from '../../utils/formatters';

export const WhyJainsSection: React.FC = () => {
  const { settings } = useApp();
  const years = getYearsOfTrust(settings.established_year || 2005);

  const pillars = [
    {
      word: 'TRUST.',
      highlight: 'Serving customers since 2005.',
      desc: `Over ${years}+ years of unbroken reputation in physical showroom retail. Genuine Indian billing and transparent business ethics.`,
      icon: Shield,
    },
    {
      word: 'QUALITY.',
      highlight: 'Products from leading technology brands.',
      desc: 'Authorized stock from Apple, Samsung, OnePlus, HP, Dell & top manufacturers with 100% genuine sealed boxes and brand warranty.',
      icon: Award,
    },
    {
      word: 'SERVICE.',
      highlight: 'Support before and after your purchase.',
      desc: 'Hands-on expert product guidance, zero-loss phone-to-phone data transfer, device inspection, and after-sales support.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section className="bg-[#0A0A0A] py-24 border-b border-[#1A1A1A] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-black tracking-widest text-[#E10600] uppercase mb-2">
            OUR CORE PHILOSOPHY
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            WHY JAIN&apos;S MOBILES &amp; LAPTOPS?
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-2 font-medium">
            Rooted in authentic electronics retailing since {settings.established_year || 2005}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={p.word}
                className="relative flex flex-col justify-between p-8 rounded-2xl bg-[#111111] border border-[#2A2A2A] hover:border-[#E10600]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#E10600]/10 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] group-hover:bg-[#E10600] text-[#E10600] group-hover:text-white flex items-center justify-center transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-gray-600">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-red-400 transition-colors">
                    {p.word}
                  </h3>

                  <h4 className="text-sm font-bold text-[#D4AF37] mb-3 leading-snug">
                    {p.highlight}
                  </h4>

                  <p className="text-xs text-gray-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#1A1A1A] flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E10600]" />
                  <span>JAIN&apos;S VERIFIED PROMISE</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
