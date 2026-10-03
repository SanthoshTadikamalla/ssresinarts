import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Phone, X } from 'lucide-react';

export default function ContactModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="store-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.section
            className="store-contact-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="store-contact-title"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
          >
            <button type="button" className="store-modal-close" aria-label="Close contact details" onClick={onClose}>
              <X />
            </button>
            <span className="store-product-category">GET IN TOUCH</span>
            <h2 id="store-contact-title">Contact us</h2>
            <p className="store-contact-intro">Have a question or custom idea? We’d love to hear from you.</p>
            <div className="store-contact-person">
              <span className="store-contact-avatar">S</span>
              <span>
                <small>Your contact</small>
                <strong>Santhosh</strong>
              </span>
            </div>
            <a className="store-contact-phone" href="tel:+919502691567">
              <Phone size={18} />
              <span>
                <small>Phone number</small>
                <strong>+91 95026 91567</strong>
              </span>
            </a>
            <a
              className="store-contact-whatsapp"
              href="https://wa.me/919502691567"
              target="_blank"
              rel="noopener noreferrer"
            >
              Message on WhatsApp
            </a>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
