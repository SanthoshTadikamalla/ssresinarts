import React from 'react';
import { Camera, Heart, Package, Phone } from 'lucide-react';

export default function ContactFooter() {
  return (
    <footer id="contact" className="store-footer">
      <div className="store-footer-inner">
        <div className="store-footer-main">
          <div className="store-footer-brand">
            <div className="store-footer-logo">SS</div>
            <div>
              <h2>SS Resinarts</h2>
              <span>Handcrafted resin art</span>
            </div>
            <p>Unique, handmade keepsakes, jewelry, and custom resin art made with care.</p>
          </div>

          <div className="store-footer-links" aria-label="Contact and delivery information">
            <a className="store-footer-link" href="https://wa.me/919392292616" target="_blank" rel="noopener noreferrer">
              <Phone size={17} />
              <span>
                <small>WhatsApp / Call</small>
                <strong>9392292616 / 9502691567</strong>
              </span>
            </a>
            <a className="store-footer-link" href="https://www.instagram.com/ss_creation0118?stkn=MnRjNno5cDY5cW5u" target="_blank" rel="noopener noreferrer">
              <Camera size={17} />
              <span>
                <small>Instagram</small>
                <strong>@ss_Creation0118</strong>
              </span>
            </a>
            <div className="store-footer-link">
              <Package size={17} />
              <span>
                <small>Delivery</small>
                <strong>Pan-India delivery</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="store-footer-bottom">
          <span>© 2026 SS Resinarts · Handcrafted with love in India</span>
          <span className="store-footer-thanks"><Heart size={13} fill="currentColor" /> Thank you for supporting small business</span>
        </div>
      </div>
    </footer>
  );
}
