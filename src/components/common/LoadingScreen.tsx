import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Sparkles } from 'lucide-react';
import { getYearsOfTrust } from '../../utils/formatters';

export const LoadingScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const years = getYearsOfTrust(2005);

  useEffect(() => {
    // Keep it short and premium (approx 1.1 seconds)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white select-none"
        >
          {/* Subtle background red glow */}
          <div className="absolute w-96 h-96 rounded-full bg-[#E10600]/15 blur-3xl pointer-events-none" />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative flex flex-col items-center text-center px-4"
          >
            {/* Heritage Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111111] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold tracking-wider uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              ESTABLISHED SINCE 2005 • {years}+ YEARS OF TRUST
            </div>

            {/* Brand Logo Title */}
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                JAIN&apos;S
              </h1>
              <span className="w-2.5 h-2.5 rounded-full bg-[#E10600] animate-pulse" />
            </div>
            <p className="text-lg sm:text-xl font-medium tracking-wide text-gray-300 mb-4">
              MOBILES &amp; LAPTOPS
            </p>

            {/* Brand Philosophy */}
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold tracking-widest text-gray-400 uppercase">
              <span className="text-white">TRUST</span>
              <span className="text-[#E10600]">•</span>
              <span className="text-white">QUALITY</span>
              <span className="text-[#E10600]">•</span>
              <span className="text-white">SERVICE</span>
            </div>

            {/* Loading line */}
            <div className="w-48 h-0.5 bg-[#1A1A1A] mt-8 overflow-hidden rounded-full">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full h-full bg-[#E10600]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
