import React, { useState, useEffect } from 'react';
import { Sparkles, MessageSquare, Phone, Layers, Eye, Film, Menu, X, Volume2, VolumeX } from 'lucide-react';

export default function Navbar({ onOpenOrderModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = React.useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (audioPlaying) {
      audioRef.current.pause();
      setAudioPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setAudioPlaying(true);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-2xl border-b border-black/10 py-2.5 shadow-[0_10px_30px_rgba(15,23,42,0.12)]'
          : 'bg-gradient-to-b from-white/90 via-white/70 to-transparent py-4 sm:py-5'
      }`}
    >
      {/* Background ambient audio stream */}
      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=ambient-ocean-breeze-11354.mp3"
      />

      <div className="w-full max-w-[1700px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 sm:gap-3 group text-decoration-none">
          <div className="relative">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-yellow-400 via-amber-500 to-yellow-200 flex items-center justify-center text-black font-black text-lg sm:text-xl shadow-[0_0_15px_rgba(255,215,0,0.4)] group-hover:scale-105 transition-all">
              SS
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-[#070b14] animate-pulse" title="Available for Custom Orders" />
          </div>
          <div>
            <span className="text-base sm:text-lg md:text-xl font-extrabold text-gradient-gold block tracking-wide">
              SS CREATION <span className="text-xs text-blue-600 font-mono font-bold">0118</span>
            </span>
            <span className="text-[9px] sm:text-[10px] text-slate-600 uppercase tracking-widest block -mt-1 font-semibold">
              Handcrafted Resin Art
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-slate-700">
          <a href="#customizer" className="hover:text-orange-500 transition-all flex items-center gap-1.5 hover:scale-105">
            <Layers className="w-3.5 h-3.5 text-yellow-500" /> 3D Customizer
          </a>
          <a href="#client-view" className="hover:text-blue-600 transition-all flex items-center gap-1.5 hover:scale-105">
            <Eye className="w-3.5 h-3.5 text-blue-600" /> Client View & Reviews
          </a>
          <a href="#crafting-video" className="hover:text-green-600 transition-all flex items-center gap-1.5 hover:scale-105">
            <Film className="w-3.5 h-3.5 text-green-600" /> Crafting Video
          </a>
          <a href="#contact" className="hover:text-orange-500 transition-all flex items-center gap-1.5 hover:scale-105">
            <Phone className="w-3.5 h-3.5 text-orange-500" /> Contact & Inquiry
          </a>
        </div>

        {/* Actions & WhatsApp Direct Button */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={toggleAudio}
            title={audioPlaying ? 'Mute Ocean Ambience' : 'Play Ocean Ambience'}
            className="p-2 sm:p-2.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 hover:border-yellow-400 hover:text-yellow-500 transition-all"
          >
            {audioPlaying ? (
              <div className="flex items-center gap-1">
                <Volume2 className="w-4 h-4 text-yellow-500 animate-pulse" />
                <span className="text-[9px] text-yellow-500 font-bold hidden xl:inline">Playing Ocean Audio</span>
              </div>
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          <a
            href="https://wa.me/919392292616?text=Hi%20SS%20Creation%200118!%20I'd%20like%20to%20place%20a%20custom%20resin%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex btn-gold py-2.5 px-5 text-xs uppercase font-black tracking-wider shadow-[0_0_20px_rgba(255,215,0,0.3)] items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" /> WhatsApp Order
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all border border-slate-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-yellow-500" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-3xl border-b border-slate-200 px-6 py-6 space-y-4 shadow-[0_20px_50px_rgba(15,23,42,0.08)] animate-fadeIn">
          <a
            href="#customizer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 text-sm font-bold text-slate-800 hover:text-orange-500 transition-colors py-2 border-b border-slate-100"
          >
            <div className="p-2 rounded-xl bg-yellow-100 text-yellow-600">
              <Layers className="w-4 h-4" />
            </div>
            3D Customizer Lab
          </a>
          <a
            href="#client-view"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 text-sm font-bold text-slate-800 hover:text-blue-600 transition-colors py-2 border-b border-slate-100"
          >
            <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
              <Eye className="w-4 h-4" />
            </div>
            Client Showcase & Reviews
          </a>
          <a
            href="#crafting-video"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 text-sm font-bold text-slate-800 hover:text-green-600 transition-colors py-2 border-b border-slate-100"
          >
            <div className="p-2 rounded-xl bg-green-100 text-green-600">
              <Film className="w-4 h-4" />
            </div>
            Crafting Video Visualizer
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 text-sm font-bold text-slate-800 hover:text-orange-500 transition-colors py-2 border-b border-slate-100"
          >
            <div className="p-2 rounded-xl bg-orange-100 text-orange-600">
              <Phone className="w-4 h-4" />
            </div>
            Contact & Custom Quote
          </a>
          <a
            href="https://wa.me/919392292616"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold flex w-full justify-center text-xs py-3.5 mt-3 font-black tracking-wider uppercase shadow-xl items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" /> Direct WhatsApp Chat (9392292616)
          </a>
        </div>
      )}
    </nav>
  );
}
