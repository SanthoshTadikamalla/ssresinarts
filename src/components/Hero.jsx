import React from 'react';
import { ArrowRight } from 'lucide-react';

const mainImages = [
  { src: '/mainimages/r1.jpeg', alt: 'Handmade resin art design one' },
  { src: '/mainimages/r2.jpeg', alt: 'Handmade resin art design two' },
  { src: '/mainimages/r3.jpeg', alt: 'Handmade resin art design three' },
  { src: '/mainimages/r5.jpeg', alt: 'Handmade resin art design four' },
  { src: '/mainimages/r6.jpeg', alt: 'Handmade resin art design five' },
];

export default function Hero() {
  return (
    <section id="home" className="store-hero">
      <div className="store-hero-copy">
     
        <h1>Resin Art</h1>
       
       
        <a className="store-primary-button" href="#client-view">
          Shop Now <ArrowRight size={17} />
        </a>
      </div>

      <div className="store-hero-art">
        <div className="store-image-marquee" aria-label="Resin art gallery scrolling automatically">
          <div className="store-image-marquee-track">
            {[0, 1].map((copy) => (
              <div
                className="store-image-marquee-group"
                key={copy}
                aria-hidden={copy === 1}
              >
                {mainImages.map((image) => (
                  <img
                    className="store-image-marquee-item"
                    key={image.src}
                    src={image.src}
                    alt={copy === 0 ? image.alt : ''}
                    loading={copy === 0 ? 'eager' : 'lazy'}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
