import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  RefreshCw, 
  Smartphone, 
  Laptop, 
  Tablet, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  MessageCircle, 
  ShieldCheck, 
  Gift 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatINR, formatWhatsAppLink } from '../../utils/formatters';
import { DataService } from '../../services/dataService';

export const AnimatedExchangeForm: React.FC = () => {
  const { settings, showToast } = useApp();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Step 1: Specs
  const [deviceType, setDeviceType] = useState<'Mobile' | 'Laptop' | 'Tablet'>('Mobile');
  const [brand, setBrand] = useState<string>('Apple');
  const [model, setModel] = useState<string>('');
  const [storage, setStorage] = useState<string>('128GB');

  // Step 2: Condition Diagnostics
  const [screenCondition, setScreenCondition] = useState<'flawless' | 'good' | 'scratched' | 'broken'>('flawless');
  const [bodyCondition, setBodyCondition] = useState<'flawless' | 'good' | 'dented'>('good');
  const [hasBoxAndBill, setHasBoxAndBill] = useState<boolean>(true);
  const [allFunctionsWorking, setAllFunctionsWorking] = useState<boolean>(true);

  // Step 3: Contact & Target Device
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [targetDevice, setTargetDevice] = useState<string>('');

  const brandOptions = [
    'Apple',
    'Samsung',
    'OnePlus',
    'Xiaomi',
    'Vivo',
    'Oppo',
    'Realme',
    'HP',
    'Dell',
    'ASUS',
  ];

  // Calculate live dynamic valuation breakdown
  const calculateValuation = () => {
    let base = deviceType === 'Mobile' ? 22000 : deviceType === 'Laptop' ? 32000 : 18000;
    if (brand === 'Apple') base += 14000;
    else if (brand === 'Samsung') base += 9000;
    else if (brand === 'OnePlus') base += 6000;

    let multiplier = 0.85;
    if (screenCondition === 'flawless') multiplier += 0.15;
    else if (screenCondition === 'good') multiplier += 0.05;
    else if (screenCondition === 'scratched') multiplier -= 0.15;
    else if (screenCondition === 'broken') multiplier -= 0.45;

    if (bodyCondition === 'flawless') multiplier += 0.05;
    else if (bodyCondition === 'dented') multiplier -= 0.15;

    if (!allFunctionsWorking) multiplier -= 0.25;

    let conditionVal = Math.round(base * Math.max(0.2, multiplier));
    let boxBonus = hasBoxAndBill ? 2000 : 0;
    let lootLoFestiveBonus = 5000; // Special Kharagpur Festive Loot Lo bonus

    let totalEstimate = conditionVal + boxBonus + lootLoFestiveBonus;

    return {
      baseValue: conditionVal,
      boxBonus,
      lootLoFestiveBonus,
      totalEstimate,
      minRange: Math.max(3000, totalEstimate - 2500),
      maxRange: totalEstimate + 2000,
    };
  };

  const val = calculateValuation();

  const handleCompleteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !model.trim()) {
      showToast('Please provide your name, phone number, and device model', 'error');
      return;
    }

    DataService.addExchangeRequest({
      id: `ex_${Date.now()}`,
      name: customerName,
      phone: customerPhone,
      device_brand: brand,
      device_model: `${model} (${storage})`,
      device_condition: `Screen: ${screenCondition}, Body: ${bodyCondition}, Box/Bill: ${hasBoxAndBill ? 'Yes' : 'No'}`,
      preferred_device: targetDevice || 'Showroom Upgrade',
      message: `Estimated Trade-in Credit: ${formatINR(val.totalEstimate)} (includes ₹5,000 Loot Lo Bonus)`,
      status: 'New',
      created_at: new Date().toISOString(),
    });

    const waMsg = `Hello ${settings.business_name} Kharagpur,\n\n*INSTANT DEVICE EXCHANGE APPRAISAL*\n• *Customer:* ${customerName}\n• *Phone:* ${customerPhone}\n• *Old Device:* ${brand} ${model} (${storage}, ${deviceType})\n• *Condition:* Screen: ${screenCondition.toUpperCase()} | Body: ${bodyCondition.toUpperCase()} | Bill & Box: ${hasBoxAndBill ? 'Available (+₹2,000)' : 'Not available'}\n• *Loot Lo Festive Bonus:* +₹5,000 applied\n• *Estimated Value:* ${formatINR(val.minRange)} - ${formatINR(val.maxRange)}\n• *Target Upgrade:* ${targetDevice || 'Undecided'}\n\nPlease inspect this valuation and confirm availability at Gole Bazar showroom.`;

    const waUrl = formatWhatsAppLink(settings.whatsapp_number, waMsg);

    showToast('Exchange appraisal generated! Opening WhatsApp...', 'success');
    window.open(waUrl, '_blank');
  };

  return (
    <div className="rounded-3xl bg-[#111111] border border-[#262626] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Ambient Red Glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#E10600]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Steps Nav Header */}
      <div className="flex items-center justify-between border-b border-[#202020] pb-5 mb-6">
        <div>
          <span className="text-[10px] font-black text-[#E10600] uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            INSTANT APPRAISAL WIZARD
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-0.5">
            Trade-In Valuation
          </h3>
        </div>

        {/* Step Toggles */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                if (s === 1 || model.trim()) setCurrentStep(s as any);
              }}
              className={`px-3 py-1 rounded-full text-xs font-black transition-all ${
                currentStep === s
                  ? 'bg-[#E10600] text-white shadow-md shadow-red-950/40'
                  : currentStep > s
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : 'bg-[#1F1F1F] text-gray-500'
              }`}
            >
              Step 0{s}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 1: DEVICE IDENTITY */}
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            {/* Device Category Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                1. Select Device Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'Mobile', label: 'Smartphone', icon: Smartphone },
                  { id: 'Laptop', label: 'Laptop / Mac', icon: Laptop },
                  { id: 'Tablet', label: 'Tablet / iPad', icon: Tablet },
                ].map((type) => {
                  const isSelected = deviceType === type.id;
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setDeviceType(type.id as any)}
                      className={`p-3.5 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-[#260B0B] border-[#E10600] text-white ring-1 ring-[#E10600]'
                          : 'bg-[#0E0E0E] border-[#252525] text-gray-400 hover:text-white'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-[#E10600]' : 'text-gray-500'}`} />
                      <span className="text-xs font-bold">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Brand Carousel / Buttons */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                2. Brand
              </label>
              <div className="flex flex-wrap gap-2">
                {brandOptions.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBrand(b)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      brand === b
                        ? 'bg-[#E10600] text-white border-[#E10600]'
                        : 'bg-[#0E0E0E] text-gray-300 border-[#262626] hover:border-gray-500'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Model Name & Storage */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                  3. Exact Model Name *
                </label>
                <input
                  type="text"
                  required
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="e.g. iPhone 13 / Galaxy S22 / Dell Inspiron"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080808] border border-[#282828] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#E10600] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                  Storage
                </label>
                <select
                  value={storage}
                  onChange={(e) => setStorage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080808] border border-[#282828] text-xs text-white focus:outline-none focus:border-[#E10600] transition-colors"
                >
                  <option value="64GB">64GB</option>
                  <option value="128GB">128GB</option>
                  <option value="256GB">256GB</option>
                  <option value="512GB">512GB</option>
                  <option value="1TB">1TB / Above</option>
                </select>
              </div>
            </div>

            {/* Next Button */}
            <div className="pt-3 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  if (!model.trim()) {
                    showToast('Please type your device model name to continue', 'error');
                    return;
                  }
                  setCurrentStep(2);
                }}
                className="px-6 py-3 rounded-xl bg-[#E10600] hover:bg-[#FF1E16] text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-red-950/50"
              >
                Next: Physical Condition
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: DIAGNOSTICS */}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            {/* Screen Condition */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                1. Screen &amp; Display Status
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'flawless', label: 'Flawless', desc: 'No scratches, like new' },
                  { id: 'good', label: 'Minor Wear', desc: 'Light surface scratches' },
                  { id: 'scratched', label: 'Deep Scratches', desc: 'Visible abrasions' },
                  { id: 'broken', label: 'Cracked Screen', desc: 'Glass cracked / line' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setScreenCondition(s.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      screenCondition === s.id
                        ? 'bg-[#221010] border-[#E10600] text-white'
                        : 'bg-[#0E0E0E] border-[#252525] text-gray-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{s.label}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Body Frame */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                2. Body Frame Condition
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'flawless', label: 'Pristine Frame', desc: 'Zero dents' },
                  { id: 'good', label: 'Normal Scuffs', desc: 'Minor corner wear' },
                  { id: 'dented', label: 'Dents / Bend', desc: 'Heavy drops or bent' },
                ].map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBodyCondition(b.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      bodyCondition === b.id
                        ? 'bg-[#221010] border-[#E10600] text-white'
                        : 'bg-[#0E0E0E] border-[#252525] text-gray-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{b.label}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">{b.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Checklist Checkboxes */}
            <div className="space-y-3 p-4 rounded-xl bg-[#090909] border border-[#222222]">
              <label className="flex items-center gap-3 text-xs text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasBoxAndBill}
                  onChange={(e) => setHasBoxAndBill(e.target.checked)}
                  className="w-4 h-4 rounded bg-black accent-[#E10600]"
                />
                <span className="flex-1">
                  I have the original box, charging cable, and valid tax bill{' '}
                  <span className="text-[#D4AF37] font-bold">(+₹2,000 Bonus)</span>
                </span>
              </label>

              <label className="flex items-center gap-3 text-xs text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allFunctionsWorking}
                  onChange={(e) => setAllFunctionsWorking(e.target.checked)}
                  className="w-4 h-4 rounded bg-black accent-[#E10600]"
                />
                <span className="flex-1">
                  Touch screen, cameras, speakers, Wi-Fi, and biometric sensors are working normally
                </span>
              </label>
            </div>

            {/* Buttons */}
            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2.5 rounded-xl bg-[#141414] hover:bg-[#1C1C1C] text-gray-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-6 py-3 rounded-xl bg-[#E10600] hover:bg-[#FF1E16] text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-red-950/50"
              >
                Next: Live Valuation &amp; Bonus
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: LIVE VALUATION & WHATSAPP SUBMISSION */}
        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Real-time Valuation Display Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#180808] via-[#101010] to-[#0D0D0D] border border-[#E10600]/40 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#252525] pb-3">
                <div>
                  <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-wider">
                    APPRAISAL TICKET FOR {brand} {model} ({storage})
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                    {formatINR(val.minRange)} - {formatINR(val.maxRange)}
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold self-start">
                  <Sparkles className="w-3 h-3" />
                  Instant Store Credit
                </span>
              </div>

              {/* Breakdown Ticker */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-black/60 border border-[#222222]">
                  <span className="text-gray-400 text-[10px] block">DEVICE BASE VALUE</span>
                  <span className="font-mono font-bold text-white">{formatINR(val.baseValue)}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-black/60 border border-[#222222]">
                  <span className="text-gray-400 text-[10px] block">ORIGINAL BOX &amp; BILL</span>
                  <span className="font-mono font-bold text-[#D4AF37]">{hasBoxAndBill ? '+₹2,000' : '₹0'}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-black/60 border border-[#E10600]/40">
                  <span className="text-[#E10600] text-[10px] font-black block flex items-center gap-1">
                    <Gift className="w-3 h-3" />
                    LOOT LO SALE BONUS
                  </span>
                  <span className="font-mono font-black text-[#E10600]">+₹5,000 EXTRA</span>
                </div>
              </div>
            </div>

            {/* Final Contact Form */}
            <form onSubmit={handleCompleteSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Ramesh Chandra"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080808] border border-[#282828] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#E10600]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+91 86419 54500"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080808] border border-[#282828] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#E10600]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                  Target Upgrade Device (Optional)
                </label>
                <input
                  type="text"
                  value={targetDevice}
                  onChange={(e) => setTargetDevice(e.target.value)}
                  placeholder="e.g. iPhone 15 Pro Max 256GB / Galaxy S24 Ultra / MacBook Air M2"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080808] border border-[#282828] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#E10600]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-3 rounded-xl bg-[#141414] hover:bg-[#1C1C1C] text-gray-300 text-xs font-bold uppercase tracking-wider"
                >
                  ← Back
                </button>

                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 active:scale-98 transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current text-black" />
                  Lock Appraisal On WhatsApp (+₹5,000 Bonus)
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
