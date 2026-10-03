import React, { useState, useEffect } from 'react';
import { Sparkles, MessageSquare, ShieldCheck, Truck, Heart, Layers, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_ITEMS = [
  {
    id: 1,
    badge: "Featured 3D Masterpiece",
    badgeBg: "bg-yellow-400 text-black",
    title: "3D Ocean Wave Epoxy Clock",
    description: "Handcrafted with real beach sand, seashells, gold numerals, and crystal clear ocean foam lacing.",
    price: "₹2,499",
    image: "/images/ocean_clock_hero.jpg",
    waMsg: "Hi! I'd like to order the 3D Ocean Wave Epoxy Clock."
  },
  {
    id: 2,
    badge: "Couple Initial Special",
    badgeBg: "bg-pink-500 text-white",
    title: "Custom Monogram 'R&S' Stand",
    description: "High clarity crystal resin letters with real preserved red rose petals and 24K gold foil flakes.",
    price: "₹1,299",
    image: "/images/monogram_rs.jpg",
    waMsg: "Hi! I'd like to order the Custom Monogram R&S Stand."
  },
  {
    id: 3,
    badge: "Trending Jewelry",
    badgeBg: "bg-cyan-400 text-black",
    title: "Preserved Floral Resin Bangle",
    description: "Ultra-clear curved resin bracelet encapsulated with dried botanical petals and gold foil shimmer.",
    price: "₹599",
    image: "/images/floral_bangle.jpg",
    waMsg: "Hi! I'd like to order the Preserved Floral Resin Bangle."
  },
  {
    id: 4,
    badge: "Personalized Memory",
    badgeBg: "bg-purple-500 text-white",
    title: "Scalloped Floral Photo Frame",
    description: "Handcrafted pearl-bordered resin frame decorated with preserved wildflowers and personal photo insert.",
    price: "₹1,499",
    image: "/images/scallop_frame.jpg",
    waMsg: "Hi! I'd like to order the Scalloped Floral Photo Frame."
  },
  {
    id: 5,
    badge: "Executive Hamper",
    badgeBg: "bg-amber-400 text-black",
    title: "Luxury Resin Executive Gift Box",
    description: "Curated hamper with resin pen, floral lockets, photo block, and handmade scented candle.",
    price: "₹2,999",
    image: "/images/luxury_hamper.jpg",
    waMsg: "Hi! I'd like to order the Luxury Resin Executive Gift Box."
  }
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_ITEMS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_ITEMS.length) % HERO_ITEMS.length);
  };

  // Automatic scroll left to right
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      prevSlide();
    }, 3200);
    return () => clearInterval(interval);
  }, [isHovered]);

  // Touch Swipe Handlers for Mobile
  const minSwipeDistance = 40;

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <section className="relative min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 md:px-12 lg:px-16 w-full max-w-[1700px] mx-auto flex flex-col justify-center">
      {/* Glow Orbs background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-4 sm:right-10 w-60 sm:w-80 h-60 sm:h-80 bg-yellow-400/10 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10">
        {/* Left Headline Column */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-yellow-400/10 to-amber-500/10 border border-yellow-400/30 text-yellow-300 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest max-w-full">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 animate-spin shrink-0" /> 
            <span>SS CREATION 0118 • HANDMADE • UNIQUE • CUSTOMIZED</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.15] sm:leading-[1.1]">
            Crafting Memories with Resin... <br className="hidden sm:inline" />
            <span className="text-gradient-gold">Small Pieces, Big Emotions.</span>
          </h1>

          <p className="text-xs sm:text-base lg:text-lg text-[var(--text-muted)] max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
            Welcome to the official 3D interactive showcase of <strong className="text-white">SS Creation 0118 Resin Art</strong>. Preserve bridal garland varmalas, baby memories, anniversary dates, and ocean waves inside crystal epoxy resin.
          </p>

          {/* Product Pill Tags - Swipeable on Mobile */}
          <div className="flex overflow-x-auto no-scrollbar sm:flex-wrap gap-1.5 sm:gap-2 justify-start sm:justify-center lg:justify-start pt-1 sm:pt-2 w-full pb-1">
            {[
              'Ocean Clocks',
              'Floral Monograms',
              'Resin Bangles',
              'Photo Frames',
              'Lockets & Earrings',
              'Pen & Stand Set',
              'Gift Hampers',
              'Varmala Preservation'
            ].map((tag) => (
              <span
                key={tag}
                className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-white/5 border border-white/10 text-white/80 whitespace-nowrap shrink-0"
              >
                ✦ {tag}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-3 sm:pt-4">
            <a href="#customizer" className="btn-gold flex text-xs sm:text-sm py-3.5 px-6 sm:px-8 uppercase font-bold shadow-2xl justify-center items-center">
              <Layers className="w-4 h-4 sm:w-5 sm:h-5" /> Launch 3D Customizer
            </a>
            <a href="#client-view" className="btn-outline flex text-xs sm:text-sm py-3.5 px-6 sm:px-8 font-bold justify-center items-center">
              <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" /> View Client Showcase
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-white/10 max-w-lg mx-auto lg:mx-0 text-left">
            <div className="flex items-center gap-2.5 bg-white/5 sm:bg-transparent p-2.5 sm:p-0 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-yellow-400 shrink-0" />
              <div className="text-xs">
                <strong className="block text-white">Premium Quality</strong>
                <span className="text-white/50 text-[10px]">Non-yellowing UV resin</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 bg-white/5 sm:bg-transparent p-2.5 sm:p-0 rounded-xl">
              <Heart className="w-5 h-5 text-pink-400 shrink-0" />
              <div className="text-xs">
                <strong className="block text-white">100% Customized</strong>
                <span className="text-white/50 text-[10px]">Custom names & photos</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 bg-white/5 sm:bg-transparent p-2.5 sm:p-0 rounded-xl">
              <Truck className="w-5 h-5 text-cyan-400 shrink-0" />
              <div className="text-xs">
                <strong className="block text-white">Safe Shipping</strong>
                <span className="text-white/50 text-[10px]">Pan-India Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Hero Visual Card - Multi-Image Left to Right Auto Scroll */}
        <div className="lg:col-span-5">
          <div 
            className="relative glass-panel-gold p-3 sm:p-6 animate-float"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Carousel Container */}
            <div className="relative rounded-2xl overflow-hidden aspect-square bg-black shadow-2xl group">
              
              {/* Horizontal Image Track */}
              <div 
                className="flex w-full h-full transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {HERO_ITEMS.map((item, idx) => (
                  <div key={item.id} className="w-full h-full shrink-0 relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover select-none"
                    />
                    
                    {/* Gradient Overlay & Details */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-4 sm:p-6 text-left">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-extrabold uppercase shadow-md ${item.badgeBg}`}>
                          {item.badge}
                        </span>
                        <span className="text-[10px] sm:text-xs font-mono font-bold text-yellow-300 bg-black/60 px-2 py-0.5 rounded-full border border-yellow-400/30">
                          {String(idx + 1).padStart(2, '0')} / {String(HERO_ITEMS.length).padStart(2, '0')}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-2xl font-extrabold text-white line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-white/75 mt-1 line-clamp-2 sm:line-clamp-none">
                        {item.description}
                      </p>

                      <div className="mt-3 sm:mt-4 flex items-center justify-between">
                        <span className="text-lg sm:text-xl font-extrabold text-gradient-gold">{item.price}</span>
                        <a
                          href={`https://wa.me/919392292616?text=${encodeURIComponent(item.waMsg)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-gold py-2 px-3.5 sm:px-4 text-xs font-bold flex items-center gap-1.5"
                        >
                          <MessageSquare className="w-3.5 h-3.5" /> Order Now
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Left Arrow */}
              <button
                onClick={prevSlide}
                aria-label="Previous Image"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-yellow-400 hover:text-black text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 z-20 shadow-lg active:scale-95"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Navigation Right Arrow */}
              <button
                onClick={nextSlide}
                aria-label="Next Image"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-yellow-400 hover:text-black text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 z-20 shadow-lg active:scale-95"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Slide Indicators / Dots */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1.5 z-20 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                {HERO_ITEMS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to image ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentIndex === idx ? 'w-5 bg-yellow-400' : 'w-1.5 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

