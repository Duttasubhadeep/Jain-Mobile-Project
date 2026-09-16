import React from 'react';
import { MapPin, Phone, MessageCircle, Mail, Clock, ExternalLink, Building2, ShieldCheck, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SHOWROOM_BRANCHES } from '../services/dataService';
import { formatWhatsAppLink } from '../utils/formatters';
import { AnimatedContactForm } from '../components/forms/AnimatedContactForm';

export const ContactPage: React.FC = () => {
  const { settings } = useApp();

  return (
    <div className="bg-transparent min-h-screen py-12 text-white select-none relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-[var(--theme-accent)]/50 text-[var(--theme-accent)] text-xs font-black tracking-widest uppercase mb-3 shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            CONNECT WITH JAIN&apos;S KHARAGPUR
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            VISIT OR CONTACT OUR <span className="shimmer-text">SHOWROOMS.</span>
          </h1>
          <p className="text-sm text-gray-300 mt-3 font-medium">
            Reach our 18+ retail specialists for real-time stock checks, festive Loot Lo deals, zero-downpayment EMI, or after-sales support.
          </p>
        </div>

        {/* Main Grid: Info + Animated Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* LEFT: Showroom Details & Team Visual (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Storefront Team Card */}
            <div className="rounded-2xl overflow-hidden glass-card border border-[var(--theme-border)] relative group hover:border-[var(--theme-primary)] transition-all duration-500 shadow-xl">
              <img
                src="/src/assets/images/jains_store_team_1789505580520.jpg"
                alt="Jain's Mobiles & Laptops Kharagpur Team"
                className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/85 backdrop-blur-md border border-white/15 text-left">
                <span className="text-[10px] font-black text-[var(--theme-accent)] uppercase">KHARAGPUR SHOWROOM TEAM</span>
                <div className="text-xs font-bold text-white">18+ Certified Advisors &amp; Technicians On Deck</div>
              </div>
            </div>

            {/* Main Contact Card */}
            <div className="p-6 rounded-2xl glass-card border border-[var(--theme-border)] space-y-4 shadow-xl hover:border-[var(--theme-primary)]/80 transition-all duration-300">
              <h3 className="text-sm font-black uppercase text-white border-b border-white/10 pb-3 flex items-center justify-between">
                <span>HEAD OFFICE &amp; FLAGSHIP</span>
                <span className="text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Open Today
                </span>
              </h3>

              <div className="flex items-start gap-3 text-xs">
                <div className="p-2 rounded-lg bg-[var(--theme-primary)]/20 text-[var(--theme-primary)] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-black text-white uppercase block">Address</span>
                  <span className="text-gray-300 leading-relaxed font-normal">
                    {settings.address}, {settings.city}, {settings.state} - {settings.pincode}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <div className="p-2 rounded-lg bg-[var(--theme-accent)]/20 text-[var(--theme-accent)] shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-black text-white uppercase block">Showroom Timings</span>
                  <span className="text-gray-300 font-normal">{settings.opening_hours}</span>
                  <span className="text-[10px] text-emerald-400 font-bold block mt-0.5">
                    ● Mon - Sun: 10:30 AM to 09:30 PM
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400 shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-black text-white uppercase block">Direct Line</span>
                  <a href={`tel:${settings.phone}`} className="text-gray-300 hover:text-white font-mono font-bold">
                    {settings.phone} (086419 54500)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <div className="p-2 rounded-lg bg-[#25D366]/20 text-[#25D366] shrink-0 mt-0.5">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-black text-white uppercase block">WhatsApp Desk</span>
                  <a
                    href={formatWhatsAppLink(settings.whatsapp_number, 'Hello Jain Mobiles & Laptops Kharagpur!')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-emerald-400 font-mono font-bold"
                  >
                    {settings.whatsapp_number} (086419 54500)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <div className="p-2 rounded-lg bg-white/10 text-gray-300 shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-black text-white uppercase block">Email Support</span>
                  <a href={`mailto:${settings.email}`} className="text-gray-300 hover:text-white">
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <a
                  href={settings.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-[var(--theme-primary)] text-white text-xs font-black uppercase flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-[var(--theme-glow)]"
                >
                  <span>Open Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Animated Contact & Showroom Booking Form (7 cols) */}
          <div className="lg:col-span-7">
            <AnimatedContactForm />
          </div>
        </div>

        {/* 3 Showroom Outlets Directory in Kharagpur */}
        <div className="pt-8 border-t border-white/10">
          <div className="mb-6">
            <span className="text-xs font-black text-[var(--theme-primary)] uppercase tracking-widest">
              OUR SHOWROOM NETWORK IN KHARAGPUR
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white mt-1">
              3 Convenient Locations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SHOWROOM_BRANCHES.map((branch, idx) => (
              <div
                key={branch.id}
                className="p-6 rounded-2xl glass-card border border-[var(--theme-border)] hover:border-[var(--theme-primary)]/70 transition-all space-y-4 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--theme-glow)]"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] font-black text-[var(--theme-accent)] uppercase">
                      BRANCH 0{idx + 1}
                    </span>
                    <h4 className="text-base font-black text-white uppercase">{branch.name}</h4>
                  </div>
                  {branch.is_main && (
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[var(--theme-primary)] text-white font-bold uppercase shadow-sm">
                      Main Store
                    </span>
                  )}
                </div>

                <div className="space-y-2 text-xs text-gray-300">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[var(--theme-primary)] shrink-0 mt-0.5" />
                    <span className="font-medium">{branch.address}</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-400">
                    <Building2 className="w-4 h-4 text-[var(--theme-accent)] shrink-0 mt-0.5" />
                    <span>Landmark: {branch.landmark}</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-400">
                    <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{branch.timing}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <a
                    href={`tel:${branch.phone}`}
                    className="text-xs font-mono font-bold text-gray-300 hover:text-white"
                  >
                    {branch.phone}
                  </a>
                  <a
                    href={formatWhatsAppLink(settings.whatsapp_number, `Hello Jain Mobiles, I would like to visit your ${branch.name}!`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#25D366] hover:underline flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    Chat
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
