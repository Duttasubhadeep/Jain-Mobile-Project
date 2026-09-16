import React, { useState } from 'react';
import { CreditCard, Calculator, FileText, CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FINANCE_PARTNERS } from '../services/dataService';
import { formatINR, formatWhatsAppLink } from '../utils/formatters';

export const FinancePage: React.FC = () => {
  const { settings } = useApp();

  const [devicePrice, setDevicePrice] = useState<number>(60000);
  const [downPayment, setDownPayment] = useState<number>(10000);
  const [tenureMonths, setTenureMonths] = useState<number>(6);
  const [selectedPartner, setSelectedPartner] = useState<string>('Bajaj Finserv');

  // Calculate estimated monthly installment
  const loanAmount = Math.max(0, devicePrice - downPayment);
  const estimatedMonthly = tenureMonths > 0 ? Math.round(loanAmount / tenureMonths) : 0;

  const handleWhatsappEnquiry = () => {
    const waMsg = `Hello ${settings.business_name},\n\n*FINANCE / EMI ENQUIRY*\n• Partner Preference: ${selectedPartner}\n• Approximate Device Price: ${formatINR(devicePrice)}\n• Planned Down Payment: ${formatINR(downPayment)}\n• Desired Tenure: ${tenureMonths} Months\n• Estimated Monthly EMI: ${formatINR(estimatedMonthly)}/month\n\nPlease let me know the paperwork, eligibility and ongoing zero-downpayment festive schemes!`;
    const waUrl = formatWhatsAppLink(settings.whatsapp_number, waMsg);
    window.open(waUrl, '_blank');
  };

  return (
    <div className="bg-transparent min-h-screen py-12 text-white select-none relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-[var(--theme-accent)]/50 text-[var(--theme-accent)] text-xs font-black tracking-widest uppercase mb-3 shadow-md">
            <CreditCard className="w-3.5 h-3.5" />
            SHOWROOM EMI DESK
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            GET YOUR DREAM DEVICE <span className="shimmer-text">TODAY.</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-300 mt-3 font-medium">
            Flexible finance options available through selected partner institutions at Jain&apos;s Mobiles &amp; Laptops in Kharagpur.
          </p>
        </div>

        {/* Interactive EMI Calculator Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          {/* Sliders & Controls (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl glass-card border border-[var(--theme-border)] space-y-6 shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white border-b border-white/10 pb-3">
              <Calculator className="w-4 h-4 text-[var(--theme-primary)]" />
              Interactive EMI Estimator
            </div>

            {/* Device Price */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase">
                <span className="text-gray-300">Device Price:</span>
                <span className="text-white text-sm font-black">{formatINR(devicePrice)}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="250000"
                step="5000"
                value={devicePrice}
                onChange={(e) => setDevicePrice(Number(e.target.value))}
                className="w-full accent-[var(--theme-primary)] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>₹10,000</span>
                <span>₹2,50,000</span>
              </div>
            </div>

            {/* Down Payment */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase">
                <span className="text-gray-300">Planned Down Payment:</span>
                <span className="text-white text-sm font-black">{formatINR(downPayment)}</span>
              </div>
              <input
                type="range"
                min="0"
                max={devicePrice}
                step="2000"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full accent-[var(--theme-primary)] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                <span>₹0 (Zero Down Payment)</span>
                <span>{formatINR(devicePrice)}</span>
              </div>
            </div>

            {/* Tenure selector */}
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase text-gray-300">
                Repayment Tenure
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[3, 6, 9, 12, 24].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setTenureMonths(m)}
                    className={`py-2.5 rounded-xl text-xs font-black uppercase border transition-all ${
                      tenureMonths === m
                        ? 'bg-[var(--theme-primary)] text-white border-[var(--theme-primary)] shadow-md shadow-[var(--theme-glow)]'
                        : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/30'
                    }`}
                  >
                    {m} Mos
                  </button>
                ))}
              </div>
            </div>

            {/* Partner Choice */}
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase text-gray-300">
                Preferred Finance Partner
              </label>
              <select
                value={selectedPartner}
                onChange={(e) => setSelectedPartner(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--theme-primary)]"
              >
                {FINANCE_PARTNERS.map((p) => (
                  <option key={p.name} value={p.name}>
                    {p.name} ({p.badge})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Calculator Output (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl glass-card border border-[var(--theme-border)] shadow-2xl space-y-6 text-center hover:border-[var(--theme-primary)]/70 transition-all duration-300">
            <span className="text-xs font-black text-[var(--theme-accent)] uppercase tracking-widest">
              ESTIMATED MONTHLY INSTALLMENT
            </span>

            <div className="text-4xl sm:text-5xl font-black text-[var(--theme-primary)] animate-pulse">
              {formatINR(estimatedMonthly)}
              <span className="text-xs text-gray-300 font-normal"> / month</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-2 text-left">
              <div className="flex justify-between text-gray-300">
                <span>Financed Loan Amount:</span>
                <span className="text-white font-bold">{formatINR(loanAmount)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Selected Tenure:</span>
                <span className="text-white font-bold">{tenureMonths} Months</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Partner:</span>
                <span className="text-white font-bold">{selectedPartner}</span>
              </div>
            </div>

            <button
              onClick={handleWhatsappEnquiry}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current text-white" />
              ENQUIRE EMI ON WHATSAPP
            </button>

            <p className="text-[10px] text-gray-400 leading-relaxed font-normal">
              *Finance terms, schemes (including zero-interest EMI and processing fees) are subject to credit verification by the selected partner institution at our physical showroom.
            </p>
          </div>
        </div>

        {/* Finance Partners Directory */}
        <div className="mb-20">
          <div className="mb-8">
            <h2 className="text-2xl font-black uppercase text-white tracking-tight">
              AUTHORIZED FINANCE PARTNER INSTITUTIONS
            </h2>
            <p className="text-xs text-gray-300 mt-1 font-medium">
              Available in-person with our trained finance executives at the Kharagpur showrooms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FINANCE_PARTNERS.map((p) => (
              <div
                key={p.name}
                className="p-6 rounded-2xl glass-card border border-[var(--theme-border)] hover:border-[var(--theme-primary)]/70 transition-all space-y-3 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--theme-glow)]"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-white">{p.name}</h3>
                  <span className="px-2.5 py-0.5 rounded-full glass-pill border border-[var(--theme-accent)]/50 text-[10px] font-black text-[var(--theme-accent)]">
                    {p.badge}
                  </span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-normal">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Required Documents Checklist */}
        <div className="p-8 rounded-3xl glass-card border border-[var(--theme-border)] shadow-2xl">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[var(--theme-primary)] mb-2">
            <FileText className="w-4 h-4" />
            PAPERWORK CHECKLIST
          </div>
          <h3 className="text-xl font-black uppercase text-white mb-4">
            Documents Required for 15-Minute Instant In-Store EMI Approval
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-300">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Aadhaar Card with linked mobile number for instant OTP verification.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>PAN Card (Physical card or Digilocker verified).</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Active Bank Debit Card or Netbanking for automated NACH/e-mandate setup.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
