import React from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatINR, formatWhatsAppLink } from '../../utils/formatters';

interface CartDrawerProps {
  navigate: (path: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ navigate }) => {
  const {
    cart,
    cartOpen,
    setCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    settings,
  } = useApp();

  if (!cartOpen) return null;

  // Delivery fee calculation
  const deliveryFee = cartTotal > 5000 || cartTotal === 0 ? 0 : 150;
  const finalTotal = cartTotal + deliveryFee;

  // WhatsApp Enquiry for Cart
  const cartItemsText = cart
    .map(
      (i) =>
        `• ${i.product.name}${
          i.variant ? ` (${i.variant.colour || ''} ${i.variant.storage || ''})` : ''
        } × ${i.quantity} = ${formatINR(
          (i.variant ? i.variant.price : i.product.price) * i.quantity
        )}`
    )
    .join('\n');

  const whatsappCartMsg = `Hello ${settings.business_name},\n\nI would like to enquire/order about the following products from my cart:\n\n${cartItemsText}\n\nSubtotal: ${formatINR(
    cartTotal
  )}\nEstimated Total: ${formatINR(
    finalTotal
  )}\n\nPlease confirm product availability and store pickup / delivery details.`;

  const whatsappCartUrl = formatWhatsAppLink(settings.whatsapp_number, whatsappCartMsg);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        onClick={() => setCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0A0A0A] border-l border-[#2A2A2A] text-white flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#1A1A1A] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#E10600]" />
              <h3 className="text-base font-extrabold uppercase tracking-wide">
                YOUR CART ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={() => setCartOpen(false)}
              className="p-1 text-gray-400 hover:text-white transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#111111] border border-[#2A2A2A] flex items-center justify-center text-gray-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold">YOUR CART IS WAITING.</h4>
                <p className="text-xs text-gray-400 max-w-xs">
                  Discover something you&apos;ll love from our curated mobiles, laptops and genuine accessories.
                </p>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    navigate('/shop');
                  }}
                  className="px-6 py-2.5 rounded-lg bg-[#E10600] hover:bg-[#FF1E16] text-white text-xs font-bold uppercase tracking-wider transition-all"
                >
                  SHOP NOW
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const unitPrice = item.variant ? item.variant.price : item.product.price;
                const img =
                  item.product.images && item.product.images.length > 0
                    ? item.product.images[0].image_url
                    : 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&auto=format&fit=crop&q=80';

                return (
                  <div
                    key={item.id}
                    className="flex gap-3.5 p-3 rounded-lg bg-[#111111] border border-[#2A2A2A]"
                  >
                    <img
                      src={img}
                      alt={item.product.name}
                      className="w-16 h-16 object-contain bg-[#050505] p-1.5 rounded-md shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-bold truncate text-white">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-500 hover:text-red-500 transition-colors p-0.5"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {item.variant && (
                          <p className="text-[11px] text-gray-400">
                            {item.variant.colour} {item.variant.storage ? `• ${item.variant.storage}` : ''}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#1A1A1A]">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-[#2A2A2A] rounded bg-[#0A0A0A]">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-[#E10600] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold px-2">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-[#E10600] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-white">
                          {formatINR(unitPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Summary & CTAs */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#1A1A1A] bg-[#0A0A0A] space-y-3">
              <div className="space-y-1.5 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">{formatINR(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery / Pickup</span>
                  <span className="text-emerald-400 font-medium">
                    {deliveryFee === 0 ? 'FREE' : formatINR(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-[#1A1A1A]">
                  <span>Total Amount</span>
                  <span className="text-[#FF1E16]">{formatINR(finalTotal)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    setCartOpen(false);
                    navigate('/checkout');
                  }}
                  className="w-full py-3 px-4 rounded-lg bg-[#E10600] hover:bg-[#FF1E16] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-98 shadow-lg shadow-red-950/40"
                >
                  PROCEED TO CHECKOUT
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={whatsappCartUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-lg bg-[#111111] hover:bg-[#25D366] text-gray-200 hover:text-white border border-[#2A2A2A] hover:border-[#25D366] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-98"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  ORDER ON WHATSAPP
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>100% Genuine Sealed Stock • Manufacturer Warranty</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
