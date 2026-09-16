import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Clock, Navigation, ExternalLink, Building2, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SHOWROOM_BRANCHES } from '../../services/dataService';
import { formatWhatsAppLink } from '../../utils/formatters';

export const StoreExperienceSection: React.FC = () => {
  const { settings } = useApp();
  const [selectedBranch, setSelectedBranch] = useState(0);

  const branches = SHOWROOM_BRANCHES;
  const activeBranch = branches[selectedBranch];

  return (
    <section className="bg-[#050505] py-20 border-b border-[#1A1A1A] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-10 pb-4 border-b border-[#1F1F1F] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-black tracking-widest text-[#E10600] uppercase mb-1">
              PHYSICAL SHOWROOM EXPERIENCE • KHARAGPUR
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
              VISIT JAIN&apos;S SHOWROOMS.
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              3 Premier Showrooms across Kharagpur with 18+ retail specialists, live demo counters &amp; certified after-sales service.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1 rounded-full bg-[#111111] border border-[#D4AF37]/50 text-[#D4AF37] font-bold uppercase tracking-wider">
              3 SHOWROOM LOCATIONS
            </span>
            <span className="text-xs px-3 py-1 rounded-full bg-[#111111] border border-emerald-500/50 text-emerald-400 font-bold uppercase tracking-wider">
              OPEN TODAY
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Storefront Team Photograph (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-2xl overflow-hidden bg-[#111111] border border-[#2A2A2A] relative aspect-[16/10] group shadow-2xl">
              <img
                src="/src/assets/images/jains_store_team_1789505580520.jpg"
                alt="Jain's Mobiles & Laptops Storefront Team"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-black/85 backdrop-blur-md border border-[#2A2A2A] text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    MEET THE TEAM • EST. 2005
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold">18+ SPECIALISTS</span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white mt-1">
                  Our retail &amp; technical team outside the Gole Bazar flagship showroom
                </h4>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-[#0D0D0D] border border-[#222222] text-center">
                <div className="text-lg font-black text-[#E10600]">21+</div>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Years of Trust</div>
              </div>
              <div className="p-3 rounded-xl bg-[#0D0D0D] border border-[#222222] text-center">
                <div className="text-lg font-black text-white">9,800+</div>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Followers</div>
              </div>
              <div className="p-3 rounded-xl bg-[#0D0D0D] border border-[#222222] text-center">
                <div className="text-lg font-black text-emerald-400">86%</div>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Recommended</div>
              </div>
            </div>
          </div>

          {/* Right: Interactive 3 Branch Selector (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Branch Selector Tabs */}
            <div className="grid grid-cols-3 gap-2">
              {branches.map((b, idx) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBranch(idx)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedBranch === idx
                      ? 'bg-[#1E1212] border-[#E10600] text-white shadow-lg shadow-red-950/40'
                      : 'bg-[#0E0E0E] border-[#222222] text-gray-400 hover:text-white hover:bg-[#141414]'
                  }`}
                >
                  <div className="text-[10px] font-black uppercase text-[#E10600]">BRANCH 0{idx + 1}</div>
                  <div className="text-xs font-bold truncate">{b.name.split(' ')[0]}</div>
                </button>
              ))}
            </div>

            {/* Selected Branch Details Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#111111] border border-[#2A2A2A] space-y-5">
              <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-3">
                <div>
                  <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-wider">
                    {activeBranch.is_main ? '★ MAIN FLAGSHIP SHOWROOM' : 'OFFICIAL SHOWROOM BRANCH'}
                  </span>
                  <h3 className="text-lg font-black text-white uppercase">{activeBranch.name}</h3>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-bold">
                  Open Today
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#E10600] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-white uppercase text-[11px]">Full Address:</span>
                    <span className="text-gray-300">{activeBranch.address}</span>
                    <span className="block text-[11px] text-gray-500 mt-0.5">Landmark: {activeBranch.landmark}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#E10600] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-white uppercase text-[11px]">Showroom Hours:</span>
                    <span className="text-gray-300">{activeBranch.timing}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-[#E10600] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-white uppercase text-[11px]">Specialty / Focus:</span>
                    <span className="text-gray-300">{activeBranch.specialty}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#E10600] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-white uppercase text-[11px]">Direct Phone:</span>
                    <a href={`tel:${activeBranch.phone}`} className="text-gray-300 hover:text-white font-mono">
                      {activeBranch.phone} (086419 54500)
                    </a>
                  </div>
                </div>
              </div>

              {/* Action Buttons: WhatsApp & Google Maps */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#1F1F1F]">
                <a
                  href={formatWhatsAppLink(settings.whatsapp_number, `Hello Jain Mobiles, I would like to visit your ${activeBranch.name} in Kharagpur!`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-[#162A1F] hover:bg-[#25D366] text-[#25D366] hover:text-black border border-[#25D366]/40 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  CHAT ON WHATSAPP
                </a>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(`Jain's Mobiles and Laptops ${activeBranch.address}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-[#E10600] hover:bg-[#FF1E16] text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-950/40"
                >
                  <Navigation className="w-4 h-4 fill-current" />
                  GET DIRECTIONS
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
