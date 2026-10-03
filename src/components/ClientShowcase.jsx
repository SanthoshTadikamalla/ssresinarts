import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Heart, ShoppingCart, Star, X } from 'lucide-react';

const categories = [
  { label: 'Photo Frames', category: 'Photo Frames & Coasters', image: '/images/scallop_frame.jpg' },
  { label: 'Key Chains', category: 'Monograms & Names', image: '/images/heart shape keychain.jpg' },
  { label: 'Moulds', category: 'Photo Frames & Coasters', image: '/images/heart shape mould.jpg' },
  { label: 'Pens', category: 'Pens & Hampers', image: '/images/pens.jpg' },
  { label: 'Earrings', category: 'Bangles & Jewelry', image: '/images/earrings.jpg' },
  { label: 'Lockets', category: 'Bangles & Jewelry', image: '/images/neckalce set.jpg' },
  { label: 'Bangles', category: 'Bangles & Jewelry', image: '/images/floral_bangle.jpg' },
  { label: 'Hampers', category: 'Pens & Hampers', image: '/images/luxury_hamper.jpg' },
];

const featuredImagePaths = [
  '/images/scallop_frame.jpg',
  '/images/heart shape keychain.jpg',
  '/images/pens.jpg',
  '/images/earrings.jpg',
  '/images/neckalce set.jpg',
];

const getDiscountPercent = (price, originalPrice) => {
  const actual = Number(String(price || '').replace(/[^\d]/g, ''));
  const original = Number(String(originalPrice || '').replace(/[^\d]/g, ''));
  if (!actual || !original || actual >= original) return null;
  return Math.round(((original - actual) / original) * 100);
};

export default function ClientShowcase({ searchQuery = '', onAddToCart }) {
  const [catalog, setCatalog] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Featured');
  const [selectedItem, setSelectedItem] = useState(null);
  const [likedItems, setLikedItems] = useState({});

  useEffect(() => {
    fetch('/images/catalog.json')
      .then((response) => {
        if (!response.ok) throw new Error(`Catalog request failed: ${response.status}`);
        return response.json();
      })
      .then((data) => setCatalog(data))
      .catch((error) => console.error('Unable to load product catalog:', error));
  }, []);

  const featuredItems = featuredImagePaths
    .map((path) => catalog.find((item) => item.path === path))
    .filter(Boolean);
  const categoryItems = activeCategory === 'Featured'
    ? featuredItems
    : activeCategory === 'All Products'
      ? catalog
      : catalog.filter((item) => item.category === activeCategory);
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const visibleItems = normalizedSearch
    ? categoryItems.filter((item) =>
      `${item.title} ${item.category} ${item.description}`.toLowerCase().includes(normalizedSearch))
    : categoryItems;

  const handleOrder = (item) => {
    const text = `Hi SS Creation! I am interested in ordering "${item.title}" (${item.price}). Please share customization details.`;
    window.open(`https://wa.me/919392292616?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="client-view" className="store-shop">
      <div className="store-category-row" aria-label="Shop by category">
        {categories.map((category) => (
          <button
            type="button"
            key={category.label}
            className={`store-category${activeCategory === category.category ? ' selected' : ''}`}
            onClick={() => setActiveCategory(category.category)}
          >
            <span className="store-category-image">
              <img src={category.image} alt="" />
            </span>
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      <div className="store-featured">
        <div className="store-section-heading">
          <div>
            <span className="store-eyebrow">Made with care, just for you</span>
            <h2>{activeCategory === 'Featured' ? 'Featured Products' : activeCategory}</h2>
          </div>
          <button
            type="button"
            className="store-view-all"
            onClick={() => setActiveCategory(activeCategory === 'All Products' ? 'Featured' : 'All Products')}
          >
            {activeCategory === 'All Products' ? 'Featured' : 'View All'} <ArrowRight size={16} />
          </button>
        </div>

        {visibleItems.length ? (
          <motion.div layout className="store-product-grid">
            <AnimatePresence>
              {visibleItems.map((item) => (
                <motion.article
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="store-product-card"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="store-product-photo">
                    <img src={item.path} alt={item.title} loading="lazy" />
                    {getDiscountPercent(item.price, item.originalPrice) && (
                      <span className="store-sale-badge">{getDiscountPercent(item.price, item.originalPrice)}% OFF</span>
                    )}
                    <button
                      type="button"
                      className={`store-like${likedItems[item.id] ? ' liked' : ''}`}
                      aria-label={likedItems[item.id] ? 'Remove from favourites' : 'Add to favourites'}
                      onClick={(event) => {
                        event.stopPropagation();
                        setLikedItems((current) => ({ ...current, [item.id]: !current[item.id] }));
                      }}
                    >
                      <Heart size={16} fill={likedItems[item.id] ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <div className="store-product-details">
                    <span className="store-product-category">{item.category}</span>
                    <h3>{item.title}</h3>
                    <div className="store-product-rating">
                      <Star size={13} fill="currentColor" />
                      <span>{item.rating || '5.0'}</span>
                      <span className="store-review-count">({item.reviewsCount || 42})</span>
                    </div>
                    <div className="store-product-price">
                      <strong>{item.price}</strong>
                      {item.originalPrice && <del>{item.originalPrice}</del>}
                    </div>
                    <button
                      type="button"
                      className="store-add-button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onAddToCart(item);
                      }}
                    >
                      <ShoppingCart size={14} /> Add to Cart
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <p className="store-empty">No products match your search. Try another name or category.</p>
        )}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="store-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="store-product-modal"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button type="button" className="store-modal-close" aria-label="Close product details" onClick={() => setSelectedItem(null)}>
                <X />
              </button>
              <img src={selectedItem.path} alt={selectedItem.title} />
              <div className="store-modal-info">
                <span className="store-product-category">{selectedItem.category}</span>
                <h2>{selectedItem.title}</h2>
                <p>{selectedItem.description}</p>
                <div className="store-product-price store-modal-price">
                  <strong>{selectedItem.price}</strong>
                  {selectedItem.originalPrice && <del>{selectedItem.originalPrice}</del>}
                </div>
                <button type="button" className="store-add-button" onClick={() => handleOrder(selectedItem)}>
                  Order on WhatsApp <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
