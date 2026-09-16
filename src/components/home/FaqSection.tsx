import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqSearch, setFaqSearch] = useState('');

  const faqs = [
    {
      q: 'Are your products genuine?',
      a: 'Yes, 100%. All devices and accessories at Jain’s Mobiles & Laptops are authentic brand-sealed products sourced directly from authorized brand distributors. Every device comes with an official GST tax invoice and manufacturer warranty.',
    },
    {
      q: 'What brands do you sell?',
      a: 'We are authorized multi-brand retailers for Apple, Samsung, Motorola, Nothing, OnePlus, Oppo, Realme, Tecno, Vivo, Xiaomi, Google, HP, Dell, and ASUS.',
    },
    {
      q: 'Do you offer exchange?',
      a: 'Yes! We provide instant on-spot valuation for your old smartphones and laptops. You can upgrade to any new device with guaranteed valuation adjustments and free data transfer assistance in our showroom.',
    },
    {
      q: 'Do you provide finance?',
      a: 'Yes, flexible zero/low down-payment EMI finance is available through our verified partners: Bajaj Finserv, IDFC FIRST Bank, TVS Credit, Cholamandalam, HDB Financial Services, and Home Credit. Approvals typically take 15–20 minutes with standard KYC.',
    },
    {
      q: 'Can I order through WhatsApp?',
      a: 'Absolutely. Every product card and cart has a dedicated "Order on WhatsApp" button that automatically creates a structured message for our showroom desk to verify stock, process your invoice, and arrange pickup or delivery.',
    },
    {
      q: 'What payment options are available?',
      a: 'We accept UPI (Google Pay, PhonePe, Paytm), Credit & Debit Cards (Visa, MasterCard, RuPay), Net Banking, Cash on Delivery / Store Pickup, and partner paperless EMIs.',
    },
    {
      q: 'Do products have manufacturer warranty?',
      a: 'Yes, every product carries the standard official manufacturer warranty (e.g. 1 Year for smartphones and laptops, 6–12 months for chargers/earbuds). You can claim service at any authorized brand service center across India.',
    },
    {
      q: 'Can I check availability before visiting?',
      a: 'Yes! Simply click "Chat on WhatsApp" on any device page or call our showroom directly at the telephone number listed in our header. Our team will verify real-time physical inventory.',
    },
    {
      q: 'Do you sell accessories?',
      a: 'Yes, we carry a complete catalogue of original chargers (25W, 45W, 65W, 100W), braided Type-C cables, premium TWS earbuds, headphones, tempered glass screen guards, and shockproof cases.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (item) =>
      item.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      item.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <section className="bg-[#0A0A0A] py-20 border-b border-[#1A1A1A] select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-black tracking-widest text-[#E10600] uppercase mb-1">
            <HelpCircle className="w-4 h-4" />
            CLEAR ANSWERS
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            Everything you need to know about purchasing, exchange, warranty and showroom visits.
          </p>

          {/* Quick FAQ Search */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Search questions (e.g. warranty, finance, exchange)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#111111] border border-[#2A2A2A] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#E10600]"
            />
          </div>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="rounded-xl bg-[#111111] border border-[#222222] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-white hover:text-red-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#E10600] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs text-gray-400 leading-relaxed border-t border-[#1A1A1A] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
