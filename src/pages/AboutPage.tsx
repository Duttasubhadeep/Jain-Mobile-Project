import React from 'react';
import { ShieldCheck, Award, HeartHandshake, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getYearsOfTrust } from '../utils/formatters';

interface AboutPageProps {
  navigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  const { settings } = useApp();
  const years = getYearsOfTrust(settings.established_year || 2005);

  const timeline = [
    {
      year: '2005',
      title: 'The Inception of Jain’s',
      desc: 'Founded with a clear vision: provide local citizens with transparent pricing and 100% genuine mobile phones backed by valid tax invoices.',
    },
    {
      year: '2012',
      title: 'Authorized Multi-Brand Expansion',
      desc: 'Formally partnered with leading tier-1 smartphone brands (Apple, Samsung, Sony) with dedicated live demo counters.',
    },
    {
      year: '2018',
      title: 'Laptops & Workstations Wing',
      desc: 'Expanded into premium computing — student laptops, corporate Ultrabooks, and high-performance gaming rigs from HP, Dell, and ASUS.',
    },
    {
      year: '2022',
      title: 'Integrated Finance & Instant Exchange',
      desc: 'Launched in-house paperless EMI approvals with Bajaj Finserv and IDFC FIRST Bank, alongside standardized transparent device exchange valuation.',
    },
    {
      year: 'Present',
      title: `${years}+ Years of Unbroken Trust`,
      desc: 'Serving over 50,000+ satisfied families and professionals with after-sales service, genuine accessories, and community-first hospitality.',
    },
  ];

  return (
    <div className="bg-transparent min-h-screen py-12 text-white select-none relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-[var(--theme-accent)]/50 text-[var(--theme-accent)] text-xs font-black tracking-widest uppercase shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            ESTABLISHED {settings.established_year || 2005} • {years}+ YEARS OF TRUST
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            TECHNOLOGY. TRUSTED <span className="shimmer-text">SINCE {settings.established_year || 2005}.</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium">
            Welcome to {settings.business_name} — where customer relationships are built on authentic stock, transparent advice, and dependable after-sales care in Kharagpur.
          </p>
        </div>

        {/* The 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl glass-card border border-[var(--theme-border)] space-y-3 group hover:border-[var(--theme-primary)]/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--theme-glow)]">
            <div className="w-12 h-12 rounded-2xl bg-white/5 group-hover:bg-[var(--theme-primary)] text-[var(--theme-primary)] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase">TRUST</h3>
            <p className="text-xs text-gray-300 leading-relaxed font-normal">
              Serving customers with complete honesty since 2005. Every device sold comes with an official GST tax invoice and manufacturer warranty. No grey market, no refurbished surprises.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-card border border-[var(--theme-border)] space-y-3 group hover:border-[var(--theme-primary)]/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--theme-glow)]">
            <div className="w-12 h-12 rounded-2xl bg-white/5 group-hover:bg-[var(--theme-primary)] text-[var(--theme-primary)] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-md">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase">QUALITY</h3>
            <p className="text-xs text-gray-300 leading-relaxed font-normal">
              Direct authorized inventory from Apple, Samsung, OnePlus, Google, HP, Dell, and ASUS. Sealed retail boxes with valid serial numbers and official country warranty.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-card border border-[var(--theme-border)] space-y-3 group hover:border-[var(--theme-primary)]/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--theme-glow)]">
            <div className="w-12 h-12 rounded-2xl bg-white/5 group-hover:bg-[var(--theme-primary)] text-[var(--theme-primary)] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-md">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase">SERVICE</h3>
            <p className="text-xs text-gray-300 leading-relaxed font-normal">
              Support before and after your purchase. From initial product selection and phone-to-phone data transfer to device inspection, finance approvals, and repair guidance.
            </p>
          </div>
        </div>

        {/* Milestone Timeline */}
        <div className="p-8 sm:p-12 rounded-3xl glass-card border border-[var(--theme-border)] space-y-10 shadow-2xl">
          <div>
            <span className="text-xs font-black text-[var(--theme-primary)] uppercase tracking-widest">
              OUR HISTORIC MILESTONES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white mt-1">
              Building Two Decades of Tech Excellence
            </h2>
          </div>

          <div className="relative border-l-2 border-white/10 ml-4 sm:ml-6 space-y-8">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative pl-6 sm:pl-8">
                <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-black border-2 border-[var(--theme-primary)] shadow-[0_0_8px_var(--theme-glow)]" />
                <span className="text-xs font-mono font-black text-[var(--theme-accent)] tracking-wider uppercase">
                  {item.year}
                </span>
                <h4 className="text-base font-black text-white mt-0.5">{item.title}</h4>
                <p className="text-xs text-gray-400 mt-1 max-w-2xl leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Showroom Visit CTA */}
        <div className="p-8 rounded-3xl glass-card border border-[var(--theme-border)] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl hover:border-[var(--theme-primary)]/70 transition-all duration-300">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-black uppercase text-white">Experience Jain&apos;s Live in Kharagpur</h3>
            <p className="text-xs text-gray-300">
              Visit our physical showrooms at {settings.address} (Gole Bazar, Shimla Center, Prem Bazar) for hands-on trials and personalized deals.
            </p>
          </div>
          <button
            onClick={() => navigate('/contact')}
            className="px-6 py-3.5 rounded-xl bg-[var(--theme-primary)] hover:brightness-110 text-white text-xs font-black uppercase tracking-wider transition-all shrink-0 shadow-lg shadow-[var(--theme-glow)] hover:scale-105 active:scale-95"
          >
            Visit Our Showroom
          </button>
        </div>
      </div>
    </div>
  );
};
