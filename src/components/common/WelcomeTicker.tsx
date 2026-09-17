import React from 'react';
import { Sparkles, Megaphone, ChevronRight } from 'lucide-react';

interface WelcomeTickerProps {
  onNewsClick?: () => void;
  className?: string;
}

export const WelcomeTicker: React.FC<WelcomeTickerProps> = ({ onNewsClick, className = '' }) => {
  return (
    <div
      id="welcome-news-ticker-bar"
      className={`relative w-full bg-[#0a0f1d] border-y border-[#1e293b] text-white overflow-hidden select-none z-30 shadow-md ${className}`}
    >
      <div className="max-w-7xl mx-auto flex items-stretch h-10 sm:h-11">
        {/* Left Pinned Badge — Replicating the "LATEST NEWS" style from the reference video */}
        <div className="flex-shrink-0 flex items-center gap-2 px-3 sm:px-5 bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-black text-xs sm:text-sm tracking-wider uppercase shadow-md relative z-10">
          <Megaphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 animate-pulse" />
          <span className="whitespace-nowrap">LATEST NEWS</span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
        </div>

        {/* Scrolling Ticker Viewport with Pause on Hover */}
        <div className="relative flex-1 overflow-hidden flex items-center bg-[#070b14] group">
          <div className="flex items-center whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused] py-1 cursor-pointer">
            {/* Repeated segments for smooth seamless infinite loop */}
            {[1, 2, 3].map((cycle) => (
              <div
                key={cycle}
                onClick={onNewsClick}
                className="flex items-center gap-6 sm:gap-8 mx-4 sm:mx-6 text-xs sm:text-sm font-bold tracking-wide"
              >
                {/* Red NEW Badge matching reference video */}
                <span className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-[11px] font-black px-2 py-0.5 rounded shadow-sm animate-pulse tracking-wider">
                  NEW!
                </span>

                {/* Primary Requested Animated Text */}
                <span className="text-amber-300 font-extrabold tracking-wider drop-shadow-sm hover:text-white transition-colors">
                  WELCOME TO JAIN&apos;S MOBILE AND LAPTOP&apos;S WORLD
                </span>

                <span className="text-gray-400 font-normal hidden sm:inline">
                  • Kharagpur&apos;s #1 Multi-Brand Destination Since 2005
                </span>

                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 inline" />
                  S-82 Gole Bazar • S-24 Shimla Center • Prem Bazar Hijli
                </span>

                <span className="text-cyan-300 font-semibold flex items-center gap-1">
                  Festive Loot Lo Sale Live
                  <ChevronRight className="w-3.5 h-3.5 inline text-amber-400" />
                </span>

                <span className="text-gray-500 font-black">•</span>
              </div>
            ))}
          </div>

          {/* Right edge fade gradient */}
          <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-[#070b14] to-transparent pointer-events-none" />
        </div>
        {/* Right Navigation & Admin shortcuts */}
        <div className="hidden lg:flex items-center gap-3 px-3 bg-[#0a0f1d] border-l border-[#1e293b] text-[11px] font-bold tracking-wider text-gray-300 z-10 flex-shrink-0">
          <a
            href="/faq"
            className="hover:text-white hover:underline transition-colors"
          >
            FAQS
          </a>
          <span className="text-gray-600">•</span>
          <a
            href="/admin"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-mono text-[10px] transition-colors"
          >
            ADMIN
          </a>
        </div>
      </div>
    </div>
  );
};
