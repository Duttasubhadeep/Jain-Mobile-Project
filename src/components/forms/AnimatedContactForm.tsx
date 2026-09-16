import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Phone, 
  MessageCircle, 
  Sparkles, 
  Calendar, 
  Smartphone, 
  Laptop, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SHOWROOM_BRANCHES } from '../../services/dataService';
import { formatWhatsAppLink } from '../../utils/formatters';

interface AnimatedContactFormProps {
  onSuccess?: () => void;
}

export const AnimatedContactForm: React.FC<AnimatedContactFormProps> = ({ onSuccess }) => {
  const { settings, showToast } = useApp();

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedBranchId, setSelectedBranchId] = useState<string>('branch_1');
  const [inquiryType, setInquiryType] = useState<string>('Phone Availability');
  const [preferredSlot, setPreferredSlot] = useState<string>('Evening (5 PM - 9 PM)');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const selectedBranch = SHOWROOM_BRANCHES.find(b => b.id === selectedBranchId) || SHOWROOM_BRANCHES[0];

  const inquiryOptions = [
    { id: 'Phone Availability', label: 'Flagship Phone Stock', icon: Smartphone },
    { id: 'Laptop / MacBook', label: 'Laptop & Mac Specs', icon: Laptop },
    { id: 'Loot Lo Festive Offers', label: 'Loot Lo Sale & Free Gifts', icon: Sparkles },
    { id: '0% EMI Schemes', label: '0% EMI / Finance Schemes', icon: Clock },
    { id: 'General Query', label: 'After-Sales & Warranty', icon: HelpCircle },
  ];

  const timeSlots = [
    'Morning (10:30 AM - 1:00 PM)',
    'Afternoon (1:00 PM - 5:00 PM)',
    'Evening (5:00 PM - 9:30 PM)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      showToast('Please provide your name and phone number', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      const waMsg = `Hello ${settings.business_name},\n\n*SHOWROOM VISIT & PRODUCT ENQUIRY*\n• *Customer:* ${formData.name}\n• *Phone:* ${formData.phone}\n• *Target Showroom:* ${selectedBranch.name} (${selectedBranch.address})\n• *Enquiry Type:* ${inquiryType}\n• *Preferred Visit Slot:* ${preferredSlot}\n• *Notes:* ${formData.message || 'Ready for showroom visit'}\n\nPlease confirm availability and assist me with current Kharagpur festive offers!`;

      const waUrl = formatWhatsAppLink(settings.whatsapp_number, waMsg);

      showToast('Inquiry generated! Opening direct WhatsApp desk...', 'success');
      window.open(waUrl, '_blank');
      if (onSuccess) onSuccess();
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    setStep(1);
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <div className="rounded-3xl bg-gradient-to-b from-[#141414] to-[#0A0A0A] border border-[#262626] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#E10600]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Form Header */}
      <div className="relative z-10 mb-6 pb-4 border-b border-[#202020] flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black text-[#E10600] uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#E10600] animate-ping" />
            DIRECT SHOWROOM DESK • KHARAGPUR
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-1">
            Book Visit or Query
          </h3>
        </div>

        {/* Step Indicator */}
        {!submitted && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className={`w-7 h-7 rounded-full text-xs font-black flex items-center justify-center transition-all ${
                step === 1 ? 'bg-[#E10600] text-white' : 'bg-[#222222] text-gray-400'
              }`}
            >
              1
            </button>
            <span className="text-gray-600 text-xs">—</span>
            <button
              type="button"
              onClick={() => setStep(2)}
              className={`w-7 h-7 rounded-full text-xs font-black flex items-center justify-center transition-all ${
                step === 2 ? 'bg-[#E10600] text-white' : 'bg-[#222222] text-gray-400'
              }`}
            >
              2
            </button>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          /* Celebratory Confirmation Card */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="space-y-6 text-center py-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-950/50">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-black text-white uppercase">Enquiry Dispatched!</h4>
              <p className="text-xs text-gray-300 max-w-md mx-auto leading-relaxed">
                Thank you <span className="text-white font-bold">{formData.name}</span>. Your request has been pre-formatted for Jain&apos;s Mobiles &amp; Laptops WhatsApp desk.
              </p>
            </div>

            {/* Selected Showroom Summary Box */}
            <div className="p-4 rounded-2xl bg-[#0F0F0F] border border-[#252525] text-left text-xs space-y-2.5 max-w-md mx-auto">
              <div className="flex items-center justify-between text-gray-400 pb-2 border-b border-[#1E1E1E]">
                <span className="font-bold text-white uppercase">{selectedBranch.name}</span>
                <span className="text-emerald-400 font-bold text-[10px]">Open 10:30 AM - 9:30 PM</span>
              </div>
              <div className="flex items-start gap-2 text-gray-300">
                <MapPin className="w-4 h-4 text-[#E10600] shrink-0 mt-0.5" />
                <span>{selectedBranch.address}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Direct Line: {selectedBranch.phone} (086419 54500)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 max-w-md mx-auto">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(`Jain's Mobiles and Laptops ${selectedBranch.address}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-5 rounded-xl bg-[#1C1C1C] hover:bg-[#252525] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all border border-[#333333]"
              >
                <span>Showroom Directions</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="py-3 px-5 rounded-xl bg-[#E10600] hover:bg-[#FF1E16] text-white text-xs font-bold uppercase tracking-wider transition-all"
              >
                Submit Another Enquiry
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="relative z-10">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                {/* 1. Branch Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                    1. Select Showroom Branch in Kharagpur *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {SHOWROOM_BRANCHES.map((b) => {
                      const isSelected = selectedBranchId === b.id;
                      return (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          key={b.id}
                          type="button"
                          onClick={() => setSelectedBranchId(b.id)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'bg-[#240B0B] border-[#E10600] text-white shadow-lg shadow-red-950/50 ring-1 ring-[#E10600]'
                              : 'bg-[#0E0E0E] border-[#252525] text-gray-400 hover:text-white hover:bg-[#141414]'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] font-black uppercase text-[#E10600]">
                            <span>{b.is_main ? '★ MAIN' : 'OUTLET'}</span>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#E10600]" />}
                          </div>
                          <div className="text-xs font-bold text-white mt-0.5 truncate">{b.name}</div>
                          <div className="text-[10px] text-gray-400 truncate mt-0.5">{b.landmark}</div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Inquiry Category Pills */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                    2. What are you interested in?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {inquiryOptions.map((opt) => {
                      const isSelected = inquiryType === opt.id;
                      const Icon = opt.icon;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setInquiryType(opt.id)}
                          className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                            isSelected
                              ? 'bg-[#1F1414] border-[#E10600] text-white shadow-md'
                              : 'bg-[#0E0E0E] border-[#222222] text-gray-400 hover:text-white hover:bg-[#151515]'
                          }`}
                        >
                          <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#E10600]' : 'text-gray-500'}`} />
                          <span className="text-[11px] font-bold truncate">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Preferred Visit Slot */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                    3. Preferred Visiting Time (Optional)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {timeSlots.map((slot) => {
                      const isSelected = preferredSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setPreferredSlot(slot)}
                          className={`p-2 rounded-lg border text-center text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]'
                              : 'bg-[#0E0E0E] border-[#222222] text-gray-400 hover:text-white'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#E10600] hover:bg-[#FF1E16] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-red-950/50"
                  >
                    Next: Contact Details
                    <span>→</span>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                {/* Selected Summary Pill */}
                <div className="p-3 rounded-xl bg-[#111111] border border-[#252525] flex items-center justify-between text-xs">
                  <div className="truncate">
                    <span className="text-gray-400">Target: </span>
                    <span className="text-white font-bold">{selectedBranch.name}</span>
                    <span className="text-[#E10600] font-bold"> • {inquiryType}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-[#D4AF37] hover:underline text-[11px] font-bold shrink-0 ml-2"
                  >
                    Change
                  </button>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Subir Ghosh"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#080808] border border-[#282828] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#E10600] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 86419 54500"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#080808] border border-[#282828] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#E10600] transition-colors"
                    />
                  </div>
                </div>

                {/* Optional Email */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080808] border border-[#282828] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#E10600] transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-1">
                    Specific Device Model or Offer Question
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="e.g. Is iPhone 15 128GB Black in stock? Also looking for Bajaj 0% EMI and free tempered glass!"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#080808] border border-[#282828] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#E10600] transition-colors"
                  />
                </div>

                {/* Buttons */}
                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-3 rounded-xl bg-[#141414] hover:bg-[#1E1E1E] text-gray-300 text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    ← Back
                  </button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all disabled:opacity-50"
                  >
                    <MessageCircle className="w-4 h-4 fill-current text-black" />
                    {isSubmitting ? 'Formatting WhatsApp Ticket...' : 'Send Query via WhatsApp'}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </form>
        )}
      </AnimatePresence>
    </div>
  );
};
