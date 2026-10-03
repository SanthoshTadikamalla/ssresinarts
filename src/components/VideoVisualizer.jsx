import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Film, Sparkles, Volume2, VolumeX, Flame, Droplets, Sun, Award } from 'lucide-react';

export default function VideoVisualizer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const canvasRef = useRef(null);

  const steps = [
    {
      title: 'Step 1: Crystal Epoxy Resin Mixing',
      icon: Droplets,
      desc: 'Measuring 2:1 ratio crystal resin and degas vacuum mixing for 100% optical clarity.',
      color: '#00f2fe'
    },
    {
      title: 'Step 2: Floral & Gold Leaf Encapsulation',
      icon: Sparkles,
      desc: 'Arranging preserved bridal rose petals and 24K gold foil flakes inside silicone molds.',
      color: '#ffd700'
    },
    {
      title: 'Step 3: Thermal Torch Bubble Elimination',
      icon: Flame,
      desc: 'Applying gentle thermal heat gun to remove micro-bubbles and achieve mirror gloss finish.',
      color: '#ff4e50'
    },
    {
      title: 'Step 4: 24hr Cure & Diamond Edge Polish',
      icon: Award,
      desc: 'Allowing zero-shrinkage curing followed by hand sanding and high gloss buffer polishing.',
      color: '#10b981'
    }
  ];

  // Auto advance crafting video simulator steps
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Canvas visualizer animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    const render = () => {
      t += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background swirl gradient
      const grad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 10,
        canvas.width / 2, canvas.height / 2, canvas.width / 1.5
      );
      const stepColor = steps[currentStep].color;
      grad.addColorStop(0, `${stepColor}44`);
      grad.addColorStop(1, '#070b14');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Swirling liquid resin simulation particles
      for (let i = 0; i < 40; i++) {
        const radius = 80 + Math.sin(t + i) * 30;
        const angle = i * 0.2 + t * 0.5;
        const x = canvas.width / 2 + Math.cos(angle) * radius;
        const y = canvas.height / 2 + Math.sin(angle) * radius;

        ctx.beginPath();
        ctx.arc(x, y, 4 + Math.sin(i + t) * 3, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? stepColor : '#ffd700';
        ctx.shadowBlur = 15;
        ctx.shadowColor = stepColor;
        ctx.fill();
      }

      // Center glowing logo text
      ctx.font = 'bold 20px Outfit, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText('SS CREATION 0118', canvas.width / 2, canvas.height / 2 - 10);
      
      ctx.font = '12px Inter, sans-serif';
      ctx.fillStyle = stepColor;
      ctx.fillText(steps[currentStep].title, canvas.width / 2, canvas.height / 2 + 20);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [currentStep]);

  return (
    <section id="crafting-video" className="py-16 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-16 w-full max-w-[1700px] mx-auto">
      <div className="text-center mb-8 sm:mb-12">
        <span className="px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold bg-pink-500/10 text-pink-400 border border-pink-500/30 uppercase tracking-widest inline-flex items-center gap-2 mb-3">
          <Film className="w-4 h-4" /> Video Crafting & Process Visualizer
        </span>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gradient-gold">
          Inside The Resin Workshop Video
        </h2>
        <p className="mt-2 text-[var(--text-muted)] text-xs sm:text-sm md:text-base max-w-xl mx-auto">
          Watch how raw epoxy resin is transformed into personalized dried-flower art pieces with precision and care.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
        {/* Interactive Video Player Canvas */}
        <div className="lg:col-span-7 glass-panel p-4 md:p-6 relative overflow-hidden">
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-black flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={640}
              height={360}
              className="w-full h-full object-cover"
            />

            {/* Video Controls Bar */}
            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between bg-black/70 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-full bg-yellow-400 text-black font-bold hover:scale-110 transition-transform"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <span className="text-xs font-semibold text-white">
                  Step {currentStep + 1} / 4
                </span>
              </div>

              {/* Progress dots */}
              <div className="flex gap-2">
                {steps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    className={`h-2 rounded-full transition-all ${
                      currentStep === idx ? 'w-6 bg-yellow-400' : 'w-2 bg-white/30'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-full text-white/80 hover:text-white transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Process Step Description Cards */}
        <div className="lg:col-span-5 space-y-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = currentStep === idx;
            return (
              <div
                key={idx}
                onClick={() => {
                  setCurrentStep(idx);
                  setIsPlaying(false);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white/10 border-yellow-400/60 shadow-xl scale-[1.02]'
                    : 'bg-white/5 border-white/5 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${step.color}22`, color: step.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                      {step.title}
                      {isActive && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-400 border border-yellow-400/30 uppercase">
                          Playing
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-white/70">{step.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
