import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Sparkles,
  MapPin,
  Camera,
  Scan,
} from 'lucide-react';
import { GalleryItem } from '../../types';
import { DataService } from '../../services/dataService';

interface HeroPhotoGalleryProps {
  onNavigate?: (path: string) => void;
  className?: string;
}

export const HeroPhotoGallery: React.FC<HeroPhotoGalleryProps> = ({
  onNavigate,
  className = '',
}) => {
  const [items, setItems] = useState<GalleryItem[]>(() => {
    const all = DataService.getGalleryItems();
    return all.filter((i) => i.is_active);
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [fitMode, setFitMode] = useState<'contain' | 'cover'>('contain');
  const touchStartX = useRef<number | null>(null);

  // Listen for real-time updates from Admin management and fetch server updates on mount
  useEffect(() => {
    DataService.syncGalleryWithServer().then((updated) => {
      if (Array.isArray(updated) && updated.length > 0) {
        setItems(updated.filter((i) => i.is_active));
      }
    });

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.key === 'gallery' || customEvent.detail?.key === 'all') {
        const all = DataService.getGalleryItems();
        setItems(all.filter((i) => i.is_active));
      }
    };
    window.addEventListener('jm_data_updated', handleUpdate);
    return () => window.removeEventListener('jm_data_updated', handleUpdate);
  }, []);

  // Ensure current index is within bounds if items change
  useEffect(() => {
    if (items.length > 0 && currentIndex >= items.length) {
      setCurrentIndex(0);
    }
  }, [items, currentIndex]);

  // Auto-slide rotation with pause-on-hover
  useEffect(() => {
    if (items.length <= 1 || isPaused || lightboxOpen) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [items.length, isPaused, lightboxOpen]);

  const prevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (items.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const nextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (items.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const goToSlide = (idx: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex(idx);
  };

  // Touch swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  if (!items || items.length === 0) {
    return null;
  }

  const currentItem = items[currentIndex] || items[0];

  return (
    <>
      <div
        id="hero-photo-gallery-showcase"
        className={`relative w-full my-4 select-none ${className}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Showcase Frame with subtle rounded corners, deep atmospheric shadow and full photo visibility */}
        <div
          className="group relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] min-h-[300px] sm:min-h-[360px] md:min-h-[420px] max-h-[520px] rounded-2xl overflow-hidden bg-[#09090e] border border-white/15 shadow-2xl transition-all duration-300 hover:border-white/25"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Photos Stack */}
          {items.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={item.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {/* 1. Ambient Background Glow of the exact same photograph to fill frame edges seamlessly */}
                <img
                  src={item.image_url}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 scale-110 pointer-events-none select-none"
                  referrerPolicy="no-referrer"
                />

                {/* 2. Main Photograph — 100% Fully Visible with zero face/signage cropping and no AI distortion */}
                <img
                  src={item.image_url}
                  alt={item.title}
                  className={`relative z-10 w-full h-full ${
                    fitMode === 'contain' ? 'object-contain' : 'object-cover'
                  } object-center transition-all duration-500 ease-out group-hover:scale-[1.01]`}
                  referrerPolicy="no-referrer"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  onError={(e) => {
                    // Graceful fallback if a newly linked asset path has not finished writing
                    const target = e.currentTarget;
                    if (!target.src.includes('jains_store_team')) {
                      target.src = '/assets/images/jains_store_team_1789505580520.jpg';
                    }
                  }}
                />

                {/* Subtle dark gradient overlay on bottom edge for clean caption contrast */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none z-10" />
              </div>
            );
          })}

          {/* Top-Left Translucent Overlay Tag/Badge — Exact Aesthetic of Screenshot Reference ("MLT Lab") */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-gray-100 drop-shadow">
              {currentItem.category_tag || 'Showroom Photo'}
            </span>
          </div>

          {/* Top-Right Quick Action Controls: Fit Mode Toggle & Fullscreen Lightbox */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center gap-2">
            <button
              onClick={() => setFitMode((prev) => (prev === 'contain' ? 'cover' : 'contain'))}
              aria-label="Toggle photo fit mode"
              title={fitMode === 'contain' ? 'Switch to Filled View' : 'Switch to Full Photo (Uncropped)'}
              className="px-2.5 py-1.5 rounded-xl bg-black/55 hover:bg-black/85 backdrop-blur-md border border-white/20 text-white/90 hover:text-white transition-all duration-200 shadow-sm flex items-center gap-1.5 text-xs font-semibold"
            >
              <Scan className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">
                {fitMode === 'contain' ? 'Fully Visible' : 'Filled'}
              </span>
            </button>

            <button
              onClick={() => setLightboxOpen(true)}
              aria-label="View Fullscreen"
              title="Expand High-Resolution Photo"
              className="p-2 rounded-xl bg-black/55 hover:bg-black/85 backdrop-blur-md border border-white/20 text-white/90 hover:text-white transition-all duration-200 shadow-sm hover:scale-105 active:scale-95"
            >
              <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Subtitle / Caption Overlay on hover or subtle display */}
          <div className="absolute bottom-11 sm:bottom-12 left-4 right-4 z-20 pointer-events-none hidden sm:block">
            <div className="max-w-2xl bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10 inline-block">
              <p className="text-xs sm:text-sm font-bold text-white tracking-wide truncate">
                {currentItem.title}
              </p>
            </div>
          </div>

          {/* Bottom-Center Pagination Indicators — Replicating the wide capsule + dots from screenshot */}
          <div
            className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/15 shadow-md"
            role="tablist"
            aria-label="Gallery slides"
          >
            {items.map((item, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={item.id}
                  onClick={(e) => goToSlide(idx, e)}
                  aria-label={`Go to slide ${idx + 1}`}
                  role="tab"
                  aria-selected={isSelected}
                  className={`transition-all duration-300 rounded-full ${
                    isSelected
                      ? 'w-6 sm:w-8 h-2 bg-white shadow-sm'
                      : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                  }`}
                />
              );
            })}
          </div>

          {/* Previous Arrow Button */}
          {items.length > 1 && (
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="absolute left-2.5 sm:left-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/15 text-white flex items-center justify-center transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}

          {/* Next Arrow Button */}
          {items.length > 1 && (
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="absolute right-2.5 sm:right-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/15 text-white flex items-center justify-center transition-all duration-200 opacity-80 hover:opacity-100 hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal for Crisp High-Resolution Viewing */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 select-none animate-fadeIn"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setLightboxOpen(false)}
            aria-label="Close Lightbox"
            className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image Container */}
          <div
            className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black">
              <img
                src={currentItem.image_url}
                alt={currentItem.title}
                className="max-h-[75vh] w-auto max-w-full object-contain mx-auto"
                referrerPolicy="no-referrer"
              />

              {/* Tag and Title Header */}
              <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
                <Camera className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentItem.category_tag}</span>
              </div>
            </div>

            {/* Caption & Navigation Controls inside Lightbox */}
            <div className="w-full mt-3 flex items-center justify-between text-white text-xs sm:text-sm px-2">
              <div className="space-y-0.5">
                <p className="font-bold text-gray-100">{currentItem.title}</p>
                {currentItem.description && (
                  <p className="text-gray-400 text-xs line-clamp-1">{currentItem.description}</p>
                )}
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-mono text-xs text-gray-400">
                  {currentIndex + 1} / {items.length}
                </span>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
