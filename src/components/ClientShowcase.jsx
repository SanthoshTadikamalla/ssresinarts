import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Heart, Minus, Plus, ShoppingCart, Star, X } from 'lucide-react';

const categories = [
  { label: 'Clocks', category: 'Clocks', image: '/images/clocks/ocean_clock_hero.jpg' },
  { label: 'Name Stands', category: 'Name Stands', image: '/images/name stands/name stand.jpg' },
  { label: 'Bangles', category: 'Bangles', image: '/images/bangles/floral_bangle.jpg' },
  { label: 'Photo Frames', category: 'Photo Frames', image: '/images/photo frames/scallop_frame.jpg' },
  { label: 'Gift Hampers', category: 'Gift Hampers', image: '/images/gift hampers/hampersss.jpeg' },
  { label: 'Bookmarks', category: 'Bookmarks', image: '/images/book marks/book msrk.jpeg' },
  { label: 'Jewelry', category: 'Jewelry', image: '/images/jelwery/chains.jpg' },
  { label: 'Earrings', category: 'Earrings', image: '/images/earings/earrings.jpg' },
  { label: 'Keychains', category: 'Keychains', image: '/images/keychain/heart shape keychain.jpg' },
  { label: 'Pens', category: 'Pens', image: '/images/pens/pens.jpg' },
  { label: 'Combos', category: 'Combos', image: '/images/combos/combo letter +pen+bookmark.jpg' },
  { label: 'Rose Preservation', category: 'Rose Preservation', image: '/images/roseprevention/rose prevention.jpg' },
  { label: 'Wedding Preservation', category: 'Wedding Preservation', image: '/images/wood prevention/wedding prevention.jpg' },
  { label: 'Mobile Pouches', category: 'Mobile Pouches', image: '/images/mobile pouches/mobile pouch.jpg' },
  { label: 'Fridge Magnets', category: 'Fridge Magnets', image: '/images/fridge manget/name frigez manget.jpg' },
  { label: 'Name Boards', category: 'Name Boards', image: '/images/name boards/boards.jpeg' },
];

const featuredImagePaths = [
  '/images/photo frames/scallop_frame.jpg',
  '/images/keychain/heart shape keychain.jpg',
  '/images/pens/pens.jpg',
  '/images/earings/earrings.jpg',
  '/images/jelwery/chains.jpg',
];

const getDiscountPercent = (price, originalPrice) => {
  const actual = Number(String(price || '').replace(/[^\d]/g, ''));
  const original = Number(String(originalPrice || '').replace(/[^\d]/g, ''));
  if (!actual || !original || actual >= original) return null;
  return Math.round(((original - actual) / original) * 100);
};

export default function ClientShowcase({
  searchQuery = '',
  onAddToCart,
  cartItems = [],
  onChangeCartQuantity,
  wishlistItems = [],
  onToggleWishlist,
}) {
  const [catalog, setCatalog] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Featured');
  const [selectedItem, setSelectedItem] = useState(null);

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
         
        </div>

        {visibleItems.length ? (
          <motion.div layout className="store-product-grid">
            <AnimatePresence>
              {visibleItems.map((item) => {
                const quantity = cartItems.find((cartItem) => cartItem.id === item.id)?.quantity || 0;
                return (
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
                        className={`store-like${wishlistItems.some((savedItem) => savedItem.id === item.id) ? ' liked' : ''}`}
                        aria-label={wishlistItems.some((savedItem) => savedItem.id === item.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                        onClick={(event) => {
                          event.stopPropagation();
                          onToggleWishlist(item);
                        }}
                      >
                        <Heart
                          size={16}
                          fill={wishlistItems.some((savedItem) => savedItem.id === item.id) ? 'currentColor' : 'none'}
                        />
                      </button>
                    </div>
                    <div className="store-product-details">
                      <span className="store-product-category">{item.category}</span>
                      <h3>{item.title}</h3>
                      <div className="store-product-rating">
                        {item.rating != null ? (
                          <>
                            <Star size={13} fill="currentColor" />
                            <span>{item.rating}</span>
                            <span className="store-review-count">({item.reviewsCount ?? 0})</span>
                          </>
                        ) : (
                          <span>New item - not yet rated</span>
                        )}
                      </div>
                      <div className="store-product-price">
                        <strong>{item.price}</strong>
                        {item.originalPrice && <del>{item.originalPrice}</del>}
                      </div>
                      {quantity > 0 ? (
                        <div
                          className="store-card-quantity"
                          role="group"
                          aria-label={`${item.title} quantity in cart`}
                          onClick={(event) => event.stopPropagation()}
                        >
                          <button
                            type="button"
                            aria-label={`Remove one ${item.title} from cart`}
                            onClick={() => onChangeCartQuantity(item.id, quantity - 1)}
                          >
                            <Minus size={14} />
                          </button>
                          <span>{quantity} in cart</span>
                          <button
                            type="button"
                            aria-label={`Add one ${item.title} to cart`}
                            onClick={() => onAddToCart(item)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      ) : (
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
                      )}
                    </div>
                  </motion.article>
                );
              })}
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
                <button
                  type="button"
                  className="store-add-button"
                  onClick={() => {
                    onAddToCart(selectedItem);
                    setSelectedItem(null);
                  }}
                >
                  <ShoppingCart size={14} /> Add to Cart
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
