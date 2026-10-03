import React, { useState } from 'react';
import ThreeCanvas from './ThreeCanvas';
import { Sparkles, Palette, MessageSquare, Check, Layers, RefreshCw, ShoppingBag } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ResinCustomizer3D() {
  const [modelType, setModelType] = useState('clock');
  const [resinColor, setResinColor] = useState('#00f2fe');
  const [hasGoldFoil, setHasGoldFoil] = useState(true);
  const [hasRosePetals, setHasRosePetals] = useState(true);
  const [hasPearls, setHasPearls] = useState(false);
  const [customText, setCustomText] = useState('R & S');
  const [customOccasion, setCustomOccasion] = useState('Anniversary Gift');

  const colorOptions = [
    { name: 'Ocean Aqua', hex: '#00f2fe', bg: 'from-cyan-500 to-blue-600' },
    { name: 'Sunset Rose', hex: '#ff4e50', bg: 'from-pink-500 to-rose-600' },
    { name: 'Crystal Clear', hex: '#ffffff', bg: 'from-slate-200 to-white' },
    { name: 'Golden Amber', hex: '#ffd700', bg: 'from-yellow-400 to-amber-600' },
    { name: 'Emerald Jade', hex: '#10b981', bg: 'from-emerald-400 to-teal-600' },
  ];

  const handleOrderWhatsApp = () => {
    // Trigger celebration confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    const message = `Hello SS   Resinarts! 👋 I customized a piece on your 3D Website:
- Model Type: ${modelType.toUpperCase()}
- Resin Color: ${colorOptions.find(c => c.hex === resinColor)?.name || resinColor}
- Elements: ${hasGoldFoil ? '24K Gold Foil, ' : ''}${hasRosePetals ? 'Dried Rose Petals, ' : ''}${hasPearls ? 'Freshwater Pearls' : ''}
- Custom Text/Initials: "${customText}"
- Occasion: ${customOccasion}

Can you please share pricing and confirmation for this custom order? Thank you!`;

    const whatsappUrl = `https://wa.me/919392292616?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="customizer" className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-16 w-full max-w-[1700px] mx-auto">
      <div className="text-center mb-8 sm:mb-12">
        <span className="px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold bg-yellow-400/10 text-[var(--accent-gold)] border border-yellow-400/30 uppercase tracking-widest inline-flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4" /> 3D Resin Craft Lab
        </span>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gradient-gold">
          Design Your Own Custom 3D Resin Piece
        </h2>
        <p className="mt-2.5 text-[var(--text-muted)] max-w-2xl mx-auto text-xs sm:text-sm md:text-base">
          Customize shape, resin tint, embedded botanicals, and gold accents in real-time 3D before placing your order directly on WhatsApp!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
        {/* Left Column: 3D Viewport */}
        <div className="lg:col-span-7">
          <ThreeCanvas activeModel={modelType} resinColor={resinColor} goldFoil={hasGoldFoil} />
          
          <div className="mt-3 flex items-center justify-between text-[11px] sm:text-xs text-white/50 px-2">
            <span>Model: <strong className="text-white uppercase">{modelType}</strong></span>
            <span>Real-time Shader Refraction: <strong className="text-[var(--accent-cyan)]">Active</strong></span>
          </div>
        </div>

        {/* Right Column: Customization Controls */}
        <div className="lg:col-span-5 glass-panel-gold p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-[var(--accent-gold)]" /> Customization Studio
            </h3>
            <button 
              onClick={() => {
                setModelType('clock');
                setResinColor('#00f2fe');
                setHasGoldFoil(true);
                setHasRosePetals(true);
              }}
              className="text-xs text-white/60 hover:text-yellow-400 flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          {/* 1. Base Product Model Selector */}
          <div>
            <label className="text-xs font-semibold text-white/70 uppercase tracking-wider block mb-2">
              1. Choose Base Shape
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'clock', label: 'Ocean Clock' },
                { id: 'monogram', label: 'Monogram Stand' },
                { id: 'bangle', label: 'Floral Bangle' },
                { id: 'frame', label: 'Pearl Frame' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setModelType(item.id)}
                  className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all border text-center ${
                    modelType === item.id
                      ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black border-yellow-300 shadow-md'
                      : 'bg-white/5 text-white/80 border-white/10 hover:border-white/30'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Resin Tint Color Picker */}
          <div>
            <label className="text-xs font-semibold text-white/70 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-cyan-400" /> 2. Select Resin Tint
            </label>
            <div className="flex items-center gap-3">
              {colorOptions.map((col) => (
                <button
                  key={col.hex}
                  onClick={() => setResinColor(col.hex)}
                  title={col.name}
                  className={`w-9 h-9 rounded-full bg-gradient-to-tr ${col.bg} transition-transform flex items-center justify-center border-2 ${
                    resinColor === col.hex ? 'scale-125 border-yellow-400 shadow-lg ring-2 ring-yellow-400/50' : 'border-transparent opacity-80 hover:opacity-100'
                  }`}
                >
                  {resinColor === col.hex && <Check className="w-4 h-4 text-black font-bold" />}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Inclusions & Embeds */}
          <div>
            <label className="text-xs font-semibold text-white/70 uppercase tracking-wider block mb-2">
              3. Embedded Elements
            </label>
            <div className="space-y-2">
              {[
                { state: hasGoldFoil, setter: setHasGoldFoil, label: '24K Gold Leaf Flakes' },
                { state: hasRosePetals, setter: setHasRosePetals, label: 'Preserved Rose Petals & Botanicals' },
                { state: hasPearls, setter: setHasPearls, label: 'Freshwater Pearls Accent' },
              ].map((opt, i) => (
                <label key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                  <span className="text-xs font-medium text-white/90">{opt.label}</span>
                  <input
                    type="checkbox"
                    checked={opt.state}
                    onChange={(e) => opt.setter(e.target.checked)}
                    className="w-4 h-4 accent-yellow-400 rounded cursor-pointer"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* 4. Custom Text Input */}
          <div>
            <label className="text-xs font-semibold text-white/70 uppercase tracking-wider block mb-2">
              4. Custom Text / Initials
            </label>
            <input
              type="text"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="e.g. R & S or Happy Birthday"
              className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-yellow-400"
            />
          </div>

          {/* Order Action Button */}
          <button
            onClick={handleOrderWhatsApp}
            className="w-full btn-gold flex justify-center items-center gap-2 py-3.5 text-sm uppercase tracking-wider font-black shadow-[0_0_25px_rgba(255,215,0,0.4)]"
          >
            <MessageSquare className="w-5 h-5" /> Send 3D Customization to WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}
