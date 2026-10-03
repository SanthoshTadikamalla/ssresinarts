import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, ExternalLink, Heart, Filter, X, ZoomIn, ShoppingBag, Eye } from 'lucide-react';

export default function ClientShowcase() {
  const [catalog, setCatalog] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [selectedItem, setSelectedItem] = useState(null);
  const [likedItems, setLikedItems] = useState({});

  useEffect(() => {
    fetch('/images/catalog.json')
      .then((res) => res.json())
      .then((data) => setCatalog(data))
      .catch((err) => console.error('Error loading catalog:', err));
  }, []);

  const categories = [
    'All Products',
    'Ocean Clocks',
    'Monograms & Names',
    'Bangles & Jewelry',
    'Photo Frames & Coasters',
    'Pens & Hampers',
    'Brochure'
  ];

  const filteredItems = activeCategory === 'All Products'
    ? catalog
    : catalog.filter((item) => item.category === activeCategory);

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleWhatsAppOrder = (item) => {
    const text = `Hi SS Creation 0118! 👋 I am interested in ordering item #${item.id}: "${item.title}" (${item.price}). Please share further customization details!`;
    window.open(`https://wa.me/919392292616?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="client-view" className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-16 w-full max-w-[1700px] mx-auto">
      {/* Section Title */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 gap-6">
        <div>
          <span className="px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold bg-cyan-400/10 text-[var(--accent-cyan)] border border-cyan-400/30 uppercase tracking-widest inline-flex items-center gap-2 mb-3">
            <Eye className="w-4 h-4" /> Client View & Showcase
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gradient-gold">
            Client Order Showcase & Reviews
          </h2>
          <p className="mt-2 text-[var(--text-muted)] text-xs sm:text-sm md:text-base max-w-xl">
            Explore authentic customer orders, custom handcrafted resin heirlooms, and real reviews from SS Creation 0118.
          </p>
        </div>

        {/* Filter Categories - Mobile Swipe Scrollbar */}
        <div className="flex overflow-x-auto no-scrollbar pb-2 sm:pb-0 gap-2 w-full lg:w-auto shrink-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black border-yellow-300 shadow-lg scale-105'
                  : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Client Product Cards - 4 Column Full Screen responsive */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="glass-panel p-4 group cursor-pointer hover:border-yellow-400/50 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
            >
              {/* Product Image Container */}
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-black/40">
                <img
                  src={item.path}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Badge Overlay */}
                {item.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase bg-yellow-400 text-black shadow-md">
                    {item.badge}
                  </span>
                )}

                {/* Heart Like Button */}
                <button
                  onClick={(e) => toggleLike(item.id, e)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 hover:scale-110 transition-all"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      likedItems[item.id] ? 'fill-red-500 text-red-500' : 'text-white'
                    }`}
                  />
                </button>

                {/* Hover Quick Zoom Action */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                  <span className="btn-gold flex items-center gap-2 text-xs px-4 py-2">
                    <ZoomIn className="w-4 h-4" /> Inspect Client View
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div>
                <div className="flex items-center justify-between text-xs text-white/60 mb-1">
                  <span className="text-[var(--accent-cyan)] font-medium">{item.category}</span>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-3.5 h-3.5 fill-yellow-400" />
                    <span>{item.rating || '5.0'} ({item.reviewsCount || 42})</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-white/60 line-clamp-2 mt-1">
                  {item.description}
                </p>

                {/* Pricing & WhatsApp Direct Action */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-extrabold text-gradient-gold">{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-xs text-white/40 line-through ml-2">
                        {item.originalPrice}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWhatsAppOrder(item);
                    }}
                    className="p-2.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500 hover:text-black transition-colors"
                    title="Order on WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Fullscreen High-Res Client Modal Inspection */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel-gold max-w-4xl w-full p-6 md:p-8 relative overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-black">
                <img
                  src={selectedItem.path}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Modal Details */}
              <div className="space-y-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                  {selectedItem.category}
                </span>

                <h3 className="text-2xl font-extrabold text-white">{selectedItem.title}</h3>

                <div className="flex items-center gap-2 text-yellow-400 text-sm">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400" />
                    ))}
                  </div>
                  <span className="font-bold text-white">{selectedItem.rating}</span>
                  <span className="text-white/60">({selectedItem.reviewsCount} Client Verified Reviews)</span>
                </div>

                <p className="text-sm text-white/80 leading-relaxed">
                  {selectedItem.description}
                </p>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/60">Handcrafted Material:</span>
                    <span className="text-white font-semibold">Crystal Clear Epoxy Resin & Dried Flowers</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Customization:</span>
                    <span className="text-white font-semibold">Names, Colors, Gold Leaf & Photos</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Delivery:</span>
                    <span className="text-green-400 font-semibold">Pan-India Delivery Available 🇮🇳</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-white/50 block">Price</span>
                    <span className="text-2xl font-black text-gradient-gold">{selectedItem.price}</span>
                  </div>

                  <button
                    onClick={() => handleWhatsAppOrder(selectedItem)}
                    className="btn-gold flex items-center gap-2 py-3 px-6 text-sm"
                  >
                    <MessageSquare className="w-4 h-4" /> Order This via WhatsApp
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
