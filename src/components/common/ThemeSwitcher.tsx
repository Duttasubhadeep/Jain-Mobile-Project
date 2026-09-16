import React, { useState } from 'react';
import { Palette, Sparkles, Zap, Flame, Check, ChevronUp, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { VisualTheme } from '../../types';

export const ThemeSwitcher: React.FC = () => {
  const { visualTheme, setVisualTheme, animationsEnabled, setAnimationsEnabled, showToast } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const themes: {
    id: VisualTheme;
    name: string;
    subtitle: string;
    primaryColor: string;
    accentColor: string;
    icon: typeof Flame;
  }[] = [
    {
      id: 'cyber-crimson',
      name: 'Cyber Crimson',
      subtitle: 'Flagship Neon & Gold',
      primaryColor: '#FF1E46',
      accentColor: '#FFB703',
      icon: Flame,
    },
    {
      id: 'festive-gold',
      name: 'Festive Loot Lo',
      subtitle: 'Grand Gold & Celebrations',
      primaryColor: '#F59E0B',
      accentColor: '#EF4444',
      icon: Sparkles,
    },
    {
      id: 'hyper-blue',
      name: 'Hyper Titanium',
      subtitle: 'Electric Cyan & Sapphire',
      primaryColor: '#00F0FF',
      accentColor: '#A855F7',
      icon: Zap,
    },
  ];

  const triggerFestiveCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.8 },
      colors: visualTheme === 'festive-gold' 
        ? ['#F59E0B', '#EF4444', '#FFD700', '#FBBF24'] 
        : visualTheme === 'hyper-blue'
        ? ['#00F0FF', '#38BDF8', '#A855F7', '#FFFFFF']
        : ['#FF1E46', '#FFB703', '#FFFFFF', '#B30024'],
    });
    showToast('🎉 Festive Loot Lo Dhamaka Activated!', 'success');
  };

  const handleSelectTheme = (themeId: VisualTheme) => {
    setVisualTheme(themeId);
    showToast(`Switched theme to ${themes.find(t => t.id === themeId)?.name}`, 'info');
  };

  const activeThemeObj = themes.find(t => t.id === visualTheme) || themes[0];

  return (
    <div className="fixed bottom-24 right-5 z-40 select-none">
      {/* Expanded Theme Menu */}
      {isOpen && (
        <div className="mb-3 w-72 rounded-2xl bg-[#0D0B12]/95 backdrop-blur-xl border border-white/15 p-4 shadow-2xl shadow-black/80 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-[var(--theme-primary)]" />
              <span className="text-xs font-black uppercase tracking-wider text-white">
                Website Theme &amp; Atmosphere
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white text-xs p-1"
              aria-label="Close theme menu"
            >
              ✕
            </button>
          </div>

          {/* Theme choices */}
          <div className="space-y-2 py-3">
            {themes.map((t) => {
              const Icon = t.icon;
              const isSelected = visualTheme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => handleSelectTheme(t.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all text-left group ${
                    isSelected
                      ? 'bg-white/10 border-[var(--theme-primary)] shadow-lg shadow-[var(--theme-glow)]'
                      : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.07] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white relative shadow-sm"
                      style={{
                        background: `linear-gradient(135deg, ${t.primaryColor}, ${t.accentColor})`,
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-black tracking-wide text-white uppercase flex items-center gap-1.5">
                        {t.name}
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-primary)] animate-ping" />
                        )}
                      </div>
                      <div className="text-[10px] text-gray-400">
                        {t.subtitle}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-[var(--theme-primary)]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Controls: Animations toggle & Confetti button */}
          <div className="pt-2 border-t border-white/10 space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-semibold text-gray-300">
                Live Animations
              </span>
              <button
                onClick={() => {
                  const next = !animationsEnabled;
                  setAnimationsEnabled(next);
                  showToast(next ? 'Animations Enabled' : 'Reduced Motion Active', 'info');
                }}
                className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all ${
                  animationsEnabled
                    ? 'bg-[var(--theme-primary)] text-white shadow-sm'
                    : 'bg-white/10 text-gray-400'
                }`}
              >
                {animationsEnabled ? '⚡ Active' : 'Calm'}
              </button>
            </div>

            <button
              onClick={triggerFestiveCelebration}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 bg-[length:200%_auto] hover:bg-[position:right_center] text-white text-[11px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Festive Confetti Blast!
            </button>
          </div>
        </div>
      )}

      {/* Floating Theme Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#0D0B12]/90 backdrop-blur-md border border-[var(--theme-primary)]/70 text-white shadow-2xl shadow-[var(--theme-glow)] transition-all duration-300 hover:scale-105 active:scale-95"
        title="Customize Theme & Animations"
        aria-label="Toggle Theme & Animation Controls"
      >
        <div
          className="w-5 h-5 rounded-full flex items-center justify-center text-white"
          style={{
            background: `linear-gradient(135deg, ${activeThemeObj.primaryColor}, ${activeThemeObj.accentColor})`,
          }}
        >
          <Palette className="w-3 h-3" />
        </div>
        <span className="text-xs font-black uppercase tracking-wider hidden sm:inline-block">
          {activeThemeObj.name}
        </span>
        {isOpen ? (
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        ) : (
          <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
        )}

        {/* Pulsing indicator dot */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--theme-primary)] opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--theme-primary)]" />
        </span>
      </button>
    </div>
  );
};
