import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="store-hero">
      <video
        className="store-hero-video"
        src="/videos/WhatsApp%20Video%202026-10-03%20at%2012.28.08%20PM.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      <div className="store-hero-copy">
        <h1>Resin Art</h1>
        <a className="store-primary-button" href="#client-view">
          Shop Now <ArrowRight size={17} />
        </a>
      </div>
    </section>
  );
}
