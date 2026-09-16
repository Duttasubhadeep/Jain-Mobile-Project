import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, ShieldCheck, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DataService } from '../../services/dataService';
import { formatDate } from '../../utils/formatters';

export const ReviewsSection: React.FC = () => {
  const { showToast } = useApp();
  const [reviews, setReviews] = useState(() => DataService.getReviews());
  const [showReviewModal, setShowReviewModal] = useState(false);

  const [formData, setFormData] = useState({
    customer_name: '',
    rating: 5,
    product_name: '',
    review_text: '',
  });

  const approvedReviews = reviews.filter((r) => r.is_approved);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customer_name || !formData.review_text) {
      showToast('Please fill in your name and review', 'error');
      return;
    }

    const newReview = {
      id: `rev_${Date.now()}`,
      product_id: 'general',
      product_name: formData.product_name || 'Showroom Experience',
      customer_name: formData.customer_name,
      rating: formData.rating,
      review_text: formData.review_text,
      is_approved: false, // Requires admin moderation as per rule!
      is_demo: false,
      created_at: new Date().toISOString(),
    };

    DataService.addReview(newReview);
    setReviews(DataService.getReviews());
    setShowReviewModal(false);
    showToast('Thank you! Your review has been submitted for admin approval.', 'success');
  };

  return (
    <section className="bg-[#0A0A0A] py-20 border-b border-[#1A1A1A] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#1F1F1F]">
          <div>
            <div className="text-xs font-black tracking-widest text-[#E10600] uppercase mb-1">
              VERIFIED TESTIMONIALS
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              WHAT OUR CUSTOMERS SAY.
            </h2>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#141414] hover:bg-[#E10600] text-white border border-[#2A2A2A] hover:border-[#E10600] text-xs font-bold uppercase tracking-wider transition-all"
          >
            <MessageSquarePlus className="w-4 h-4" />
            WRITE A REVIEW
          </button>
        </div>

        {/* Reviews Cards Carousel / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {approvedReviews.map((rev) => (
            <div
              key={rev.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-[#111111] border border-[#222222] relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center font-bold text-sm text-[#FF1E16]">
                      {rev.customer_name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {rev.customer_name}
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified Buyer</span>
                      </div>
                    </div>
                  </div>

                  {rev.is_demo && (
                    <span className="px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[9px] font-bold uppercase">
                      DEMO CONTENT
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-[#D4AF37] mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating ? 'fill-current' : 'text-gray-700'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-xs text-gray-300 leading-relaxed italic mb-4">
                  &quot;{rev.review_text}&quot;
                </p>
              </div>

              <div className="pt-3 border-t border-[#1A1A1A] flex items-center justify-between text-[11px] text-gray-500">
                <span className="text-gray-400">{rev.product_name || 'Verified Purchase'}</span>
                <span>{formatDate(rev.created_at)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="max-w-md w-full bg-[#111111] border border-[#2A2A2A] rounded-2xl p-6 text-white relative">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold mb-1">Share Your Experience</h3>
            <p className="text-xs text-gray-400 mb-4">
              Your honest feedback helps our physical showroom maintain high standards.
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customer_name}
                  onChange={(e) =>
                    setFormData({ ...formData, customer_name: e.target.value })
                  }
                  placeholder="e.g. Anand Verma"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#E10600]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1">
                  Device Purchased / Experience
                </label>
                <input
                  type="text"
                  value={formData.product_name}
                  onChange={(e) =>
                    setFormData({ ...formData, product_name: e.target.value })
                  }
                  placeholder="e.g. Samsung S25 Ultra / iPhone Exchange"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#E10600]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1">
                  Rating (1 to 5 Stars)
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1 text-[#D4AF37]"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= formData.rating ? 'fill-current' : 'text-gray-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase mb-1">
                  Your Review *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.review_text}
                  onChange={(e) =>
                    setFormData({ ...formData, review_text: e.target.value })
                  }
                  placeholder="Tell us about the customer service, delivery, or product quality..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] border border-[#2A2A2A] text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#E10600]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-[#E10600] hover:bg-[#FF1E16] text-white text-xs font-bold uppercase tracking-wider transition-all"
              >
                SUBMIT FOR MODERATION
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
