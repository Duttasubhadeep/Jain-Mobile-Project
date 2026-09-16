import React, { useState } from 'react';
import { Play, ExternalLink, Video, Instagram, Facebook, Youtube } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DataService } from '../../services/dataService';

export const SocialMediaSection: React.FC = () => {
  const { settings } = useApp();
  const [socialItems] = useState(() => DataService.getSocialMedia());
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const featuredItems = socialItems.filter((i) => i.is_active && i.is_featured);

  return (
    <section className="bg-[#050505] py-20 border-b border-[#1A1A1A] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* SECTION 15: SOCIAL MEDIA / JAIN'S MOMENTS */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-[#1F1F1F]">
            <div>
              <div className="text-xs font-black tracking-widest text-[#E10600] uppercase mb-1">
                COMMUNITY &amp; SHOWROOM STORIES
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                FOLLOW JAIN&apos;S
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-[#111111] hover:bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#E10600] text-xs font-bold uppercase text-white flex items-center gap-2 transition-all"
              >
                <Instagram className="w-4 h-4 text-pink-500" />
                Instagram
              </a>
              <a
                href={settings.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-[#111111] hover:bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#E10600] text-xs font-bold uppercase text-white flex items-center gap-2 transition-all"
              >
                <Facebook className="w-4 h-4 text-blue-500" />
                Facebook
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl overflow-hidden bg-[#111111] border border-[#2A2A2A] hover:border-[#E10600]/60 transition-all duration-300"
              >
                <div className="aspect-[4/3] w-full bg-[#0A0A0A] overflow-hidden relative">
                  <img
                    src={item.media_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-sm text-[10px] font-bold text-white flex items-center gap-1.5">
                    {item.platform === 'Instagram' && <Instagram className="w-3 h-3 text-pink-400" />}
                    {item.platform === 'Facebook' && <Facebook className="w-3 h-3 text-blue-400" />}
                    {item.platform === 'YouTube' && <Youtube className="w-3 h-3 text-red-500" />}
                    <span>{item.platform}</span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                  <a
                    href={item.target_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E10600] hover:text-[#FF1E16] pt-1"
                  >
                    View Post <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 16: VIDEO / REELS */}
        <div className="pt-8 border-t border-[#1F1F1F]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-black tracking-widest text-[#E10600] uppercase mb-1">
                <Video className="w-4 h-4" />
                SHOWROOM EXPERIENCE &amp; REVIEWS
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                SEE JAIN&apos;S IN ACTION.
              </h3>
            </div>

            <a
              href={settings.youtube_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-extrabold text-[#E10600] hover:text-[#FF1E16] uppercase tracking-wider"
            >
              VIEW MORE VIDEOS →
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden bg-[#111111] border border-[#2A2A2A] relative aspect-video max-w-4xl mx-auto flex items-center justify-center group shadow-2xl">
            {activeVideo ? (
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
                title="Showroom Walkthrough"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1400&auto=format&fit=crop&q=80"
                  alt="Showroom Walkthrough"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

                <button
                  onClick={() => setActiveVideo('playing')}
                  className="relative z-10 w-20 h-20 rounded-full bg-[#E10600] hover:bg-[#FF1E16] text-white flex items-center justify-center pl-1 shadow-2xl transition-transform duration-300 group-hover:scale-110 active:scale-95"
                  aria-label="Play video"
                >
                  <Play className="w-8 h-8 fill-current" />
                </button>

                <div className="absolute bottom-6 left-6 z-10 text-left">
                  <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                    JAIN&apos;S SHOWROOM EXPERIENCE
                  </div>
                  <h4 className="text-lg font-bold text-white">
                    Walk inside our tech showroom &amp; explore new arrivals
                  </h4>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
