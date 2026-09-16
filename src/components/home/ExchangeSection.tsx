import React, { useState } from 'react';
import { RefreshCw, MessageCircle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DataService } from '../../services/dataService';
import { formatWhatsAppLink } from '../../utils/formatters';

export const ExchangeSection: React.FC = () => {
  const { settings, showToast } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    brand: 'Apple',
    model: '',
    condition: 'Working (Good condition)',
    preferredNewDevice: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.model) {
      showToast('Please fill required fields (Name, Phone, Device Model)', 'error');
      return;
    }

    // Save to DataService
    DataService.addExchangeRequest({
      id: `ex_${Date.now()}`,
      name: formData.name,
      phone: formData.phone,
      device_brand: formData.brand,
      device_model: formData.model,
      device_condition: formData.condition,
      preferred_device: formData.preferredNewDevice || 'Any flagship upgrade',
      message: formData.message,
      status: 'New',
      created_at: new Date().toISOString(),
    });

    // Generate prefilled WhatsApp message
    const waMsg = `Hello ${settings.business_name},\n\n*Device Exchange Valuation Request*\n• Customer Name: ${formData.name}\n• Phone: ${formData.phone}\n• Old Device Brand: ${formData.brand}\n• Model: ${formData.model}\n• Condition: ${formData.condition}\n• Interested in: ${formData.preferredNewDevice || 'New Model'}\n${formData.message ? `• Notes: ${formData.message}\n` : ''}\nPlease let me know the estimated exchange value and upgrade process.`;

    const waUrl = formatWhatsAppLink(settings.whatsapp_number, waMsg);

    setSubmitted(true);
    showToast('Exchange request recorded! Opening WhatsApp...', 'success');

    // Open WhatsApp
    window.open(waUrl, '_blank');
  };

  return (
    <section className="bg-[#050505] py-20 border-b border-[#1A1A1A] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Trust */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111] border border-[#E10600]/40 text-[#E10600] text-xs font-black tracking-widest uppercase">
              <RefreshCw className="w-3.5 h-3.5" />
              INSTANT STORE UPGRADE
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-tight">
              UPGRADE. EXCHANGE. SAVE.
            </h2>

            <p className="text-sm text-gray-300 leading-relaxed font-medium">
              Have an old mobile or laptop? Submit your device details and our team can contact you regarding exchange options.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span>Instant on-spot inspection and honest transparent evaluation.</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span>Free complete data backup and safe data migration to your new device.</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span>Additional exchange bonus during festive promotions.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#111111] border border-[#2A2A2A] shadow-2xl">
              <div className="text-left mb-6 pb-4 border-b border-[#1F1F1F]">
                <h3 className="text-lg font-extrabold text-white uppercase">
                  GET EXCHANGE QUOTE
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Fill in your details to receive an instant valuation via WhatsApp.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#E10600]"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#E10600]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Brand */}
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase mb-1">
                      Old Device Brand
                    </label>
                    <select
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-white text-xs focus:outline-none focus:border-[#E10600]"
                    >
                      <option value="Apple">Apple (iPhone / iPad / Mac)</option>
                      <option value="Samsung">Samsung Galaxy</option>
                      <option value="OnePlus">OnePlus</option>
                      <option value="Xiaomi / Redmi">Xiaomi / Redmi</option>
                      <option value="Vivo / Oppo">Vivo / Oppo</option>
                      <option value="Realme">Realme</option>
                      <option value="Motorola">Motorola</option>
                      <option value="HP / Dell / ASUS">HP / Dell / ASUS Laptop</option>
                      <option value="Other">Other Brand</option>
                    </select>
                  </div>

                  {/* Model */}
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase mb-1">
                      Old Model &amp; Storage *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      placeholder="e.g. iPhone 13 128GB"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#E10600]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Condition */}
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase mb-1">
                      Physical Condition
                    </label>
                    <select
                      value={formData.condition}
                      onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-white text-xs focus:outline-none focus:border-[#E10600]"
                    >
                      <option value="Flawless (No scratches, all original)">Flawless (No scratches, all original)</option>
                      <option value="Good (Minor cosmetic scratches, fully working)">Good (Minor cosmetic scratches, fully working)</option>
                      <option value="Fair (Dents or wear, fully working)">Fair (Dents or wear, fully working)</option>
                      <option value="Damaged screen/body (Functional motherboard)">Damaged screen/body (Functional motherboard)</option>
                    </select>
                  </div>

                  {/* Preferred New Device */}
                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase mb-1">
                      Preferred New Device
                    </label>
                    <input
                      type="text"
                      value={formData.preferredNewDevice}
                      onChange={(e) => setFormData({ ...formData, preferredNewDevice: e.target.value })}
                      placeholder="e.g. iPhone 16 Pro / Galaxy S25"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#E10600]"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase mb-1">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Include if you have original box, bill, accessories..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#E10600]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  SUBMIT VIA WHATSAPP
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
