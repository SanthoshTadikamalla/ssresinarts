import React, { useState } from 'react';
import { Phone, MessageSquare, Heart, Send, MapPin, ShieldCheck, Sparkles, Package, Camera } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactFooter() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [productInterest, setProductInterest] = useState('Ocean Wave Resin Clock');
  const [customNotes, setCustomNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    confetti({ particleCount: 60, spread: 60 });
    const text = `Hello SS Creation 0118! 👋
Name: ${name}
Phone: ${phone}
Interested Product: ${productInterest}
Custom Request / Notes: ${customNotes}

Please contact me back with details!`;

    window.open(`https://wa.me/919392292616?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <footer id="contact" className="pt-16 sm:pt-20 pb-12 px-4 sm:px-6 md:px-12 lg:px-16 border-t border-white/10 bg-[#04070d]/90 relative overflow-hidden">
      <div className="w-full max-w-[1700px] mx-auto space-y-12 sm:space-y-16">
        {/* Main Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Brand Info & Flyer Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-yellow-400 to-amber-600 flex items-center justify-center text-black font-black text-2xl shadow-xl">
                SS
              </div>
              <div>
                <h3 className="text-2xl font-black text-gradient-gold">SS CREATION 0118</h3>
                <p className="text-xs text-white/60 uppercase tracking-widest font-semibold">Resin Art Specialist</p>
              </div>
            </div>

            <p className="text-sm text-white/70 leading-relaxed">
              Crafting unique, handmade, and customized resin art pieces. From wedding varmala preservation to custom initial stands, jewelry, and 3D ocean wall clocks.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-2">
              <a
                href="https://wa.me/919392292616"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-green-400 flex items-center gap-4 transition-all group"
              >
                <div className="p-2.5 rounded-xl bg-green-500/20 text-green-400 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-white/50 block font-semibold uppercase">WhatsApp / Call</span>
                  <span className="text-sm font-bold text-white group-hover:text-green-400 transition-colors">
                    9392292616 / 9502691567
                  </span>
                </div>
              </a>

              <a
                href="https://instagram.com/ss_creation0118"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500 flex items-center gap-4 transition-all group"
              >
                <div className="p-2.5 rounded-xl bg-pink-500/20 text-pink-400 group-hover:scale-110 transition-transform">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-white/50 block font-semibold uppercase">Instagram Official</span>
                  <span className="text-sm font-bold text-white group-hover:text-pink-400 transition-colors">
                    @ss_creation0118
                  </span>
                </div>
              </a>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-yellow-400/20 text-yellow-400">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-white/50 block font-semibold uppercase">Delivery Coverage</span>
                  <span className="text-sm font-bold text-white">Pan-India Delivery Available 🇮🇳</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Order Inquiry Form */}
          <div className="lg:col-span-7 glass-panel-gold p-6 md:p-8">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 uppercase tracking-widest inline-flex items-center gap-2 mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Instant Custom Quote
            </span>
            <h3 className="text-2xl font-black text-white mb-2">
              Send a Direct Inquiry to SS Creation 0118
            </h3>
            <p className="text-xs text-white/60 mb-6">
              Fill out your requirements below to instantly generate a pre-formatted WhatsApp message for custom orders!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-yellow-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-yellow-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1">Product Category Interest</label>
                <select
                  value={productInterest}
                  onChange={(e) => setProductInterest(e.target.value)}
                  className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400"
                >
                  <option value="Ocean Wave Resin Clock">Ocean Wave Resin Clock</option>
                  <option value="Monogram Initial Stand (e.g. R&S)">Monogram Initial Stand</option>
                  <option value="Resin Bangle / Jewelry">Resin Bangle / Jewelry</option>
                  <option value="Photo Frame / Coasters">Photo Frame / Coasters</option>
                  <option value="Varmala Garland Preservation">Varmala Garland Preservation</option>
                  <option value="Resin Pen & Gift Hamper">Resin Pen & Gift Hamper</option>
                  <option value="Other Custom Order">Other Custom Order</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1">Customization Notes / Flower Details</label>
                <textarea
                  rows={3}
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="Mention any custom colors, names, initial letters, or preserved flower requests..."
                  className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-yellow-400"
                />
              </div>

              <button
                type="submit"
                className="w-full btn-gold flex py-3.5 justify-center items-center text-sm font-black uppercase tracking-wider shadow-[0_0_25px_rgba(255,215,0,0.4)] gap-2 mt-2"
              >
                <Send className="w-4 h-4" /> Submit Inquiry via WhatsApp Direct
              </button>
            </form>
          </div>
        </div>

        {/* Footer Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© 2026 SS CREATION 0118. All Rights Reserved. Handcrafted with ♥ in India.</p>
          <div className="flex items-center gap-2 text-pink-400">
            <Heart className="w-4 h-4 fill-pink-400" />
            <span>Thank you for supporting small business!</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
