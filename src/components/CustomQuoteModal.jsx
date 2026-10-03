import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Send, Sparkles, X } from 'lucide-react';

export default function CustomQuoteModal({ open, onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [productInterest, setProductInterest] = useState('Ocean Wave Resin Clock');
  const [customNotes, setCustomNotes] = useState('');

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const message = `Hello SS Resinarts!\nName: ${name.trim()}\nPhone: ${phone.trim()}\nInterested product: ${productInterest}\nCustomization notes: ${customNotes.trim()}\n\nPlease contact me with a custom quote.`;
    window.open(`https://wa.me/919392292616?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="store-modal-backdrop store-quote-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.section
            className="store-quote-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="custom-quote-title"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
          >
            <button type="button" className="store-modal-close" aria-label="Close custom quote" onClick={onClose}>
              <X />
            </button>
            <span className="store-product-category">CUSTOM MADE FOR YOU</span>
            <h2 id="custom-quote-title">Instant Custom Quote</h2>
            <p>Share your idea and we’ll help create a resin piece made just for you.</p>

            <form onSubmit={handleSubmit} className="store-quote-form">
              <label>
                Your name
                <input
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your name"
                />
              </label>
              <label>
                Phone number
                <input
                  type="tel"
                  autoComplete="tel"
                  required
                  pattern="[0-9]{10}"
                  maxLength={10}
                  minLength={10}
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Enter your 10-digit phone number"
                />
              </label>
              <label>
                Product category
                <select value={productInterest} onChange={(event) => setProductInterest(event.target.value)}>
                  <option value="Ocean Wave Resin Clock">Ocean Wave Resin Clock</option>
                  <option value="Monogram Initial Stand">Monogram Initial Stand</option>
                  <option value="Resin Bangle / Jewelry">Resin Bangle / Jewelry</option>
                  <option value="Photo Frame / Coasters">Photo Frame / Coasters</option>
                  <option value="Varmala Garland Preservation">Varmala Garland Preservation</option>
                  <option value="Resin Pen & Gift Hamper">Resin Pen & Gift Hamper</option>
                  <option value="Other Custom Order">Other Custom Order</option>
                </select>
              </label>
              <label>
                Customization notes
                <textarea
                  rows={3}
                  value={customNotes}
                  onChange={(event) => setCustomNotes(event.target.value)}
                  placeholder="Colors, names, initials, flowers, or any special details..."
                />
              </label>
              <button type="submit" className="store-add-button store-checkout-button">
                <Send size={15} /> Send inquiry on WhatsApp
              </button>
              <span className="store-quote-whatsapp"><Sparkles size={13} /> Replies go to +91 93922 92616</span>
            </form>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
