import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatWhatsAppLink } from '../../utils/formatters';

interface FloatingWhatsAppProps {
  customMessage?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ customMessage }) => {
  const { settings } = useApp();

  const defaultMessage = `Hello ${settings.business_name},\n\nI am contacting you from your website. I would like to inquire about products, pricing, and availability.\n\nThank you!`;

  const finalMessage = customMessage || defaultMessage;
  const whatsappUrl = formatWhatsAppLink(settings.whatsapp_number, finalMessage);

  return (
    <aside aria-label="WhatsApp Support" className="fixed bottom-6 left-6 sm:bottom-6 sm:right-6 sm:left-auto z-40">
      <a
        id="floating-whatsapp-btn"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] text-white font-semibold text-sm shadow-2xl hover:bg-[#20ba5a] transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          boxShadow: '0 8px 24px rgba(37, 211, 102, 0.35)',
        }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline font-bold tracking-wide">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
};
