import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Award,
  ChevronRight,
  ExternalLink,
  MessageCircle,
  Building2,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SHOWROOM_BRANCHES } from '../../services/dataService';
import { getYearsOfTrust, formatWhatsAppLink } from '../../utils/formatters';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const { settings } = useApp();
  const years = getYearsOfTrust(settings.established_year || 2005);
  const [modalPolicy, setModalPolicy] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="bg-transparent text-gray-300 border-t border-white/10 pt-16 pb-12 select-none relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP OUTLETS HIGHLIGHT STRIP */}
        <div className="mb-12 p-6 rounded-3xl glass-card border border-[var(--theme-border)] shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/10 mb-6">
            <div>
              <div className="text-[11px] font-black text-[var(--theme-primary)] uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                VISIT OUR 3 KHARAGPUR SHOWROOMS
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight mt-0.5">
                Authentic Experience Stores &amp; Service Hubs
              </h3>
            </div>
            <a
              href={formatWhatsAppLink(settings.whatsapp_number, 'Hello Jain Mobiles & Laptops, I would like to inquire about showroom stock!')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-[#25D366] text-white border border-white/15 hover:border-[#25D366] text-xs font-black uppercase flex items-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current text-[#25D366] group-hover:text-white" />
              <span>WhatsApp: 086419 54500</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SHOWROOM_BRANCHES.map((b) => (
              <div key={b.id} className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-black text-white uppercase flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                    {b.name}
                  </span>
                  {b.is_main && (
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-[var(--theme-primary)] text-white font-black uppercase">
                      MAIN
                    </span>
                  )}
                </div>
                <p className="text-gray-400 font-normal leading-relaxed">
                  {b.address}
                </p>
                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {b.timing}
                  </span>
                  <a href={`tel:${b.phone}`} className="font-mono text-gray-300 hover:text-white font-bold">
                    {b.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* COLUMN 1 & 2: BRAND IDENTITY & STORE CONTACT */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                JAIN&apos;S
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--theme-primary)] shadow-[0_0_8px_var(--theme-glow)]" />
              <span className="text-[10px] px-2.5 py-0.5 rounded-full glass-pill border border-[var(--theme-accent)]/50 text-[var(--theme-accent)] font-black tracking-widest uppercase">
                SINCE {settings.established_year || 2005}
              </span>
            </div>

            <p className="text-xs font-black tracking-widest text-[var(--theme-primary)] uppercase">
              {settings.tagline || 'TRUST • QUALITY • SERVICE'}
            </p>

            <p className="text-sm text-gray-300 leading-relaxed max-w-sm font-normal">
              Your trusted electronics destination with over {years}+ years of excellence in genuine smartphones, laptops, original accessories, hassle-free exchange, and instant partner financing.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[var(--theme-primary)] shrink-0 mt-0.5" />
                <span>{settings.address}, {settings.city} - {settings.pincode}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[var(--theme-primary)] shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-white font-mono font-bold">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={formatWhatsAppLink(settings.whatsapp_number, 'Hello Jain Mobiles & Laptops!')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 font-mono font-bold"
                >
                  WhatsApp: {settings.whatsapp_number} (086419 54500)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[var(--theme-accent)] shrink-0" />
                <span>{settings.opening_hours}</span>
              </div>
            </div>
          </div>

          {/* COLUMN 3: SHOP */}
          <div>
            <h4 className="text-white text-xs font-black tracking-widest uppercase mb-4 border-b border-white/10 pb-2">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => navigate('/mobiles')}
                  className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[var(--theme-primary)]" />
                  Smartphones
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/laptops')}
                  className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[var(--theme-primary)]" />
                  Laptops &amp; MacBooks
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/accessories')}
                  className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[var(--theme-primary)]" />
                  Accessories &amp; Audio
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/offers')}
                  className="text-[var(--theme-primary)] hover:underline hover:translate-x-1 transition-all flex items-center gap-1.5 font-black"
                >
                  <ChevronRight className="w-3 h-3 text-[var(--theme-primary)]" />
                  Today&apos;s Offers 🔥
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/shop')}
                  className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[var(--theme-primary)]" />
                  All Products
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 4: SERVICES */}
          <div>
            <h4 className="text-white text-xs font-black tracking-widest uppercase mb-4 border-b border-white/10 pb-2">
              SERVICES
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => navigate('/exchange')}
                  className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[var(--theme-primary)]" />
                  Device Exchange
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/finance')}
                  className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[var(--theme-primary)]" />
                  Partner Finance (EMI)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[var(--theme-primary)]" />
                  About Jain&apos;s (Since 2005)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contact')}
                  className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[var(--theme-primary)]" />
                  Store Locations &amp; Hours
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/faq')}
                  className="hover:text-white hover:translate-x-1 transition-all flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3 h-3 text-[var(--theme-primary)]" />
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 5: FOLLOW & TRUST */}
          <div>
            <h4 className="text-white text-xs font-black tracking-widest uppercase mb-4 border-b border-white/10 pb-2">
              CONNECT
            </h4>
            <div className="space-y-3 text-xs">
              <a
                href={settings.facebook_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <span className="w-6 h-6 rounded bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 font-bold">
                  f
                </span>
                Facebook
              </a>
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <span className="w-6 h-6 rounded bg-white/5 border border-white/10 flex items-center justify-center text-pink-500 font-bold">
                  ig
                </span>
                Instagram
              </a>
              <a
                href={settings.youtube_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <span className="w-6 h-6 rounded bg-white/5 border border-white/10 flex items-center justify-center text-red-500 font-bold">
                  yt
                </span>
                YouTube
              </a>
              <a
                href={formatWhatsAppLink(settings.whatsapp_number, 'Hello Jain Mobiles & Laptops Kharagpur!')}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[#25D366] hover:underline font-bold"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                WhatsApp Direct (086419 54500)
              </a>
            </div>

            <div className="mt-6 p-3 rounded-2xl glass-card border border-white/10">
              <div className="flex items-center gap-2 text-[11px] font-black text-[var(--theme-accent)]">
                <Award className="w-4 h-4" />
                <span>100% GENUINE SEALED STOCK</span>
              </div>
              <p className="text-[10px] text-gray-400 mt-1">
                All products come with original brand manufacturer warranty &amp; GST bill.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM STRIP */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            &copy; 2026 {settings.business_name}. All Rights Reserved. Established Since 2005 in Kharagpur, WB.
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setModalPolicy('privacy')}
              className="hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setModalPolicy('terms')}
              className="hover:text-gray-300 transition-colors"
            >
              Terms &amp; Conditions
            </button>
            <span>•</span>
            <button
              onClick={() => navigate('/admin')}
              className="hover:text-[var(--theme-primary)] transition-colors font-mono"
            >
              Admin Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* PRIVACY / TERMS MODAL */}
      {modalPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="max-w-md w-full glass-card border border-white/20 rounded-2xl p-6 text-white max-h-[85vh] overflow-y-auto shadow-2xl">
            <h3 className="text-lg font-black mb-3">
              {modalPolicy === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed mb-5">
              {modalPolicy === 'privacy'
                ? `At ${settings.business_name} (Since 2005), customer trust is our foundation. We collect your contact details solely to fulfill purchases, verify device exchange valuations, or assist with partner finance approvals. We do not sell your personal data to third parties.`
                : `All electronic purchases at ${settings.business_name} are backed by official brand warranties (Apple, Samsung, HP, etc.). Exchange valuations are finalized after in-person device inspection at our showroom. Partner finance is subject to terms and approval of the financing institution.`}
            </p>
            <button
              onClick={() => setModalPolicy(null)}
              className="w-full py-2.5 bg-[var(--theme-primary)] hover:brightness-110 text-white text-xs font-black rounded-xl uppercase tracking-wider shadow-lg shadow-[var(--theme-glow)]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
