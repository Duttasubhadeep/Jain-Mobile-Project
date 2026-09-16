import React, { useState } from 'react';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Store,
  Truck,
  CreditCard,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { formatINR, formatWhatsAppLink } from '../utils/formatters';
import { DataService } from '../services/dataService';
import { Order } from '../types';

interface CartCheckoutPageProps {
  navigate: (path: string) => void;
}

export const CartCheckoutPage: React.FC<CartCheckoutPageProps> = ({ navigate }) => {
  const { cart, updateCartQuantity, removeFromCart, clearCart, settings, showToast } = useApp();

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Fulfillment: pickup or delivery
  const [fulfillment, setFulfillment] = useState<'delivery' | 'pickup'>('pickup');

  // Customer shipping details
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'Kharagpur',
    pincode: '721301',
    notes: '',
  });

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'COD' | 'Finance'>('UPI');

  // Completed order state
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  const getItemPrice = (item: (typeof cart)[0]) =>
    item.variant ? item.variant.price : item.product.price;

  const subtotal = cart.reduce((acc, item) => acc + getItemPrice(item) * item.quantity, 0);
  const deliveryCharge = fulfillment === 'delivery' && subtotal < 1000 ? 99 : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryCharge);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'JAIN500') {
      if (subtotal < 2000) {
        showToast('JAIN500 requires minimum order of ₹2,000', 'error');
        return;
      }
      setDiscountAmount(500);
      setAppliedCoupon('JAIN500');
      showToast('₹500 discount applied!', 'success');
    } else if (code === 'TRUST2005') {
      const fivePercent = Math.round(subtotal * 0.05);
      setDiscountAmount(fivePercent);
      setAppliedCoupon('TRUST2005');
      showToast('5% Trust Anniversary discount applied!', 'success');
    } else {
      showToast('Invalid promo code. Try JAIN500 or TRUST2005', 'error');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast('Your cart is empty', 'error');
      return;
    }

    if (!customer.name || !customer.phone) {
      showToast('Please provide your name and WhatsApp phone number', 'error');
      return;
    }

    if (fulfillment === 'delivery' && (!customer.address || !customer.pincode)) {
      showToast('Please provide delivery address and pincode', 'error');
      return;
    }

    const orderId = `JM-${Date.now().toString().slice(-6)}`;

    const newOrder: Order = {
      id: orderId,
      order_number: orderId,
      customer_name: customer.name,
      customer_phone: customer.phone,
      customer_email: customer.email || 'customer@example.com',
      status: 'Pending',
      payment_status: 'Pending',
      payment_method: paymentMethod === 'COD' ? 'Cash on Delivery' : 'WhatsApp Order',
      subtotal,
      discount: discountAmount,
      delivery_fee: deliveryCharge,
      total: grandTotal,
      shipping_address: {
        address: fulfillment === 'delivery' ? customer.address : `Showroom Store Pickup (${settings.address})`,
        city: customer.city || 'Kharagpur',
        state: 'West Bengal',
        pincode: customer.pincode || '721301',
      },
      notes: customer.notes,
      whatsapp_order: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      items: cart.map((i, idx) => {
        const uPrice = getItemPrice(i);
        return {
          id: `item-${orderId}-${idx}`,
          order_id: orderId,
          product_id: i.product.id,
          variant_id: i.variant?.id,
          product_name: i.product.name,
          variant_description: i.variant ? `${i.variant.colour || ''} ${i.variant.storage || ''}`.trim() : undefined,
          quantity: i.quantity,
          unit_price: uPrice,
          total_price: uPrice * i.quantity,
          image_url: i.product.images?.[0]?.image_url,
        };
      }),
    };

    // Save order in DataService
    DataService.createOrder(newOrder);

    // Fire celebratory confetti!
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#E10600', '#D4AF37', '#ffffff'],
      });
    } catch {
      // safe fallback
    }

    // Prepare pre-filled WhatsApp message
    const itemsList = cart
      .map(
        (i) =>
          `• ${i.product.name}${i.variant ? ` (${i.variant.colour} ${i.variant.storage || ''})` : ''} x${i.quantity} = ${formatINR(getItemPrice(i) * i.quantity)}`
      )
      .join('\n');

    const waMsg = `Hello ${settings.business_name},\n\n*NEW ORDER BOOKING #${orderId}*\n\n*Customer Details:*\n• Name: ${customer.name}\n• Phone: ${customer.phone}\n• Fulfillment: ${fulfillment === 'pickup' ? 'Showroom Store Pickup' : 'Home Delivery'}\n${fulfillment === 'delivery' ? `• Address: ${customer.address}, ${customer.city} - ${customer.pincode}\n` : ''}• Payment Mode: ${paymentMethod}\n\n*Ordered Items:*\n${itemsList}\n\n*Grand Total:* ${formatINR(grandTotal)}\n\nPlease confirm availability and dispatch!`;

    const waUrl = formatWhatsAppLink(settings.whatsapp_number, waMsg);

    clearCart();
    setPlacedOrder(newOrder);

    // Open WhatsApp in new tab for seamless store confirmation
    window.open(waUrl, '_blank');
  };

  // SUCCESS RECEIPT VIEW
  if (placedOrder) {
    return (
      <div className="bg-transparent min-h-screen py-16 text-white select-none relative z-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="p-8 rounded-3xl glass-card border border-[var(--theme-border)] shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-black text-[var(--theme-accent)] uppercase tracking-widest">
                BOOKING RECORDED
              </span>
              <h1 className="text-2xl sm:text-3xl font-black uppercase text-white mt-1">
                ORDER #{placedOrder.id} CONFIRMED
              </h1>
              <p className="text-xs sm:text-sm text-gray-300 mt-2">
                Thank you, {placedOrder.customer_name}! Your booking has been dispatched to our showroom WhatsApp desk for billing and dispatch.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-left text-xs space-y-3">
              <div className="flex justify-between border-b border-white/10 pb-2 font-bold">
                <span>Total Payable:</span>
                <span className="text-[var(--theme-primary)] text-base font-black">{formatINR(placedOrder.total)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Payment Method:</span>
                <span className="text-white font-medium">{placedOrder.payment_method}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Fulfillment:</span>
                <span className="text-white font-medium">{placedOrder.shipping_address?.address}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                onClick={() => navigate('/shop')}
                className="flex-1 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase transition-colors"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex-1 py-3.5 rounded-xl bg-[var(--theme-primary)] hover:brightness-110 text-white text-xs font-black uppercase transition-all shadow-lg shadow-[var(--theme-glow)]"
              >
                Back To Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // EMPTY CART VIEW
  if (cart.length === 0) {
    return (
      <div className="bg-transparent min-h-[70vh] flex flex-col items-center justify-center p-6 text-white select-none relative z-10">
        <div className="w-20 h-20 rounded-3xl glass-card border border-[var(--theme-border)] flex items-center justify-center text-gray-400 mb-4 shadow-xl">
          <ShoppingBag className="w-10 h-10 text-[var(--theme-primary)] animate-pulse" />
        </div>
        <h2 className="text-xl font-black uppercase mb-2">YOUR CART IS EMPTY</h2>
        <p className="text-xs text-gray-400 max-w-sm text-center mb-6">
          Explore our latest smartphones, laptops, and original accessories to add items to your cart.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="px-6 py-3.5 rounded-xl bg-[var(--theme-primary)] hover:brightness-110 text-white text-xs font-black uppercase tracking-wider transition-all shadow-lg shadow-[var(--theme-glow)] hover:scale-105 active:scale-95"
        >
          EXPLORE CATALOGUE
        </button>
      </div>
    );
  }

  return (
    <div className="bg-transparent min-h-screen py-10 text-white select-none relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black uppercase tracking-tight mb-8">
          SHOPPING CART &amp; SECURE CHECKOUT
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Cart Items & Delivery Information (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Cart Items List */}
            <div className="p-6 rounded-3xl glass-card border border-[var(--theme-border)] space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-black uppercase tracking-wider text-gray-300">
                <span>Items in Cart ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
                <button
                  onClick={clearCart}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  Clear All
                </button>
              </div>

              <div className="divide-y divide-white/5">
                {cart.map((item) => (
                  <div key={item.id} className="py-4 flex gap-4 items-center">
                    <img
                      src={item.product.images?.[0]?.image_url || ''}
                      alt={item.product.name}
                      className="w-16 h-16 object-contain bg-white/5 p-1.5 rounded-2xl border border-white/10 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-black text-[var(--theme-primary)] uppercase tracking-wider">
                        {item.product.brand_name}
                      </span>
                      <h4 className="text-xs sm:text-sm font-black text-white truncate">
                        {item.product.name}
                      </h4>
                      {item.variant && (
                        <p className="text-[11px] text-gray-400">
                          {item.variant.colour} {item.variant.storage ? `(${item.variant.storage})` : ''}
                        </p>
                      )}
                      <div className="text-xs font-black text-white mt-1">
                        {formatINR(getItemPrice(item))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex items-center bg-white/5 border border-white/10 rounded-xl">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-xs text-gray-300 hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-mono font-black text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-xs text-gray-300 hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery / Store Pickup Option */}
            <div className="p-6 rounded-3xl glass-card border border-[var(--theme-border)] space-y-4 shadow-xl">
              <h3 className="text-sm font-black uppercase tracking-wider text-white">
                Fulfillment Method
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFulfillment('pickup')}
                  className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                    fulfillment === 'pickup'
                      ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/15 shadow-md shadow-[var(--theme-glow)]'
                      : 'border-white/10 bg-white/5 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Store className="w-5 h-5 text-[var(--theme-primary)] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-black text-white uppercase">
                      Showroom Pickup
                    </div>
                    <div className="text-[11px] text-gray-300">
                      Collect instantly from our physical showroom at {settings.address} (Gole Bazar)
                    </div>
                    <div className="text-[10px] text-emerald-400 font-black mt-1">FREE</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFulfillment('delivery')}
                  className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                    fulfillment === 'delivery'
                      ? 'border-[var(--theme-primary)] bg-[var(--theme-primary)]/15 shadow-md shadow-[var(--theme-glow)]'
                      : 'border-white/10 bg-white/5 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Truck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-black text-white uppercase">
                      Doorstep Delivery
                    </div>
                    <div className="text-[11px] text-gray-300">
                      Safe insured courier across Kharagpur, Medinipur &amp; India (24-48 hrs)
                    </div>
                    <div className="text-[10px] text-emerald-400 font-black mt-1">
                      {subtotal >= 1000 ? 'FREE' : '₹99'}
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Customer Details Form */}
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="p-6 rounded-3xl glass-card border border-[var(--theme-border)] space-y-4 shadow-xl">
              <h3 className="text-sm font-black uppercase tracking-wider text-white border-b border-white/10 pb-3">
                Customer &amp; Contact Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black text-gray-300 uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/70 border border-white/10 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[var(--theme-primary)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-300 uppercase mb-1">
                    WhatsApp Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="+91 86419 54500"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/70 border border-white/10 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[var(--theme-primary)]"
                  />
                </div>
              </div>

              {fulfillment === 'delivery' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-black text-gray-300 uppercase mb-1">
                      Delivery Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      placeholder="House/Plot no, street, landmark in Kharagpur"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/70 border border-white/10 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[var(--theme-primary)]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-gray-300 uppercase mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={customer.city}
                        onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/70 border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--theme-primary)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-300 uppercase mb-1">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        required
                        value={customer.pincode}
                        onChange={(e) => setCustomer({ ...customer, pincode: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/70 border border-white/10 text-xs text-white focus:outline-none focus:border-[var(--theme-primary)]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Method Selector */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-black text-gray-300 uppercase">
                  Preferred Payment / Billing Mode:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'UPI', label: 'UPI / QR' },
                    { id: 'Card', label: 'Credit/Debit Card' },
                    { id: 'COD', label: 'Cash / In-Store' },
                    { id: 'Finance', label: 'Easy EMI Scheme' },
                  ].map((pm) => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-2.5 rounded-xl text-xs font-black uppercase border transition-all ${
                        paymentMethod === pm.id
                          ? 'bg-[var(--theme-primary)] text-white border-[var(--theme-primary)] shadow-md shadow-[var(--theme-glow)]'
                          : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {pm.label}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>

          {/* RIGHT: Order Summary & Coupon & Confirm Button (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Promo Code Card */}
            <div className="p-6 rounded-3xl glass-card border border-[var(--theme-border)] space-y-3 shadow-xl">
              <h4 className="text-xs font-black uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                Promo / Coupon Code
              </h4>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Try JAIN500 or TRUST2005"
                  className="flex-1 px-3 py-2 rounded-xl bg-black/70 border border-white/10 text-xs text-white uppercase placeholder-gray-400 focus:outline-none focus:border-[var(--theme-primary)]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[var(--theme-primary)] hover:brightness-110 text-white text-xs font-black uppercase transition-colors"
                >
                  Apply
                </button>
              </form>
              {appliedCoupon && (
                <div className="text-xs text-emerald-400 font-semibold">
                  ✓ Coupon {appliedCoupon} applied (-{formatINR(discountAmount)})
                </div>
              )}
            </div>

            {/* Price Calculation Summary */}
            <div className="p-6 rounded-3xl glass-card border border-[var(--theme-border)] space-y-4 shadow-2xl">
              <h3 className="text-sm font-black uppercase tracking-wider text-white border-b border-white/10 pb-3">
                Order Total Breakdown
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-gray-300">
                  <span>Cart Subtotal:</span>
                  <span className="text-white font-medium">{formatINR(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount:</span>
                    <span>-{formatINR(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-300">
                  <span>Fulfillment ({fulfillment === 'pickup' ? 'Showroom Pickup' : 'Delivery'}):</span>
                  <span className="text-white font-medium">
                    {deliveryCharge === 0 ? 'FREE' : formatINR(deliveryCharge)}
                  </span>
                </div>

                <div className="flex justify-between text-gray-300">
                  <span>GST &amp; Brand Warranty Invoice:</span>
                  <span className="text-emerald-400 font-bold">Included</span>
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
                  <span className="text-sm font-black uppercase text-white">Grand Total:</span>
                  <span className="text-2xl font-black text-[var(--theme-primary)] animate-pulse">{formatINR(grandTotal)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                form="checkout-form"
                className="w-full py-4 rounded-xl bg-[var(--theme-primary)] hover:brightness-110 text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl shadow-[var(--theme-glow)] hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                PLACE ORDER &amp; CONFIRM ON WHATSAPP
              </button>

              <div className="pt-3 border-t border-white/10 flex items-center justify-center gap-2 text-[11px] text-gray-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Secure Showroom Direct Booking in Kharagpur</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
