import React from 'react';
import { ArrowLeft, Heart, ShoppingCart, Trash2 } from 'lucide-react';

export default function WishlistPage({ items, onToggleWishlist, onAddToCart, onContinueShopping }) {
  return (
    <main id="wishlist" className="store-cart-page">
      <div className="store-cart-heading">
        <div>
          <span className="store-product-category">YOUR SAVED PIECES</span>
          <h1>My Wishlist</h1>
        </div>
        <button type="button" className="store-continue-button" onClick={onContinueShopping}>
          <ArrowLeft size={16} /> Continue shopping
        </button>
      </div>

      {items.length === 0 ? (
        <div className="store-cart-empty">
          <Heart size={38} />
          <h2>Your wishlist is empty</h2>
          <p>Tap the heart on a product to save it here for later.</p>
          <button type="button" className="store-add-button" onClick={onContinueShopping}>
            Browse products
          </button>
        </div>
      ) : (
        <div className="store-product-grid store-wishlist-grid">
          {items.map((item) => (
            <article className="store-product-card" key={item.id}>
              <div className="store-product-photo">
                <img src={item.path} alt={item.title} />
                <button
                  type="button"
                  className="store-like liked"
                  aria-label={`Remove ${item.title} from wishlist`}
                  onClick={() => onToggleWishlist(item)}
                >
                  <Heart size={16} fill="currentColor" />
                </button>
              </div>
              <div className="store-product-details">
                <span className="store-product-category">{item.category}</span>
                <h2>{item.title}</h2>
                <div className="store-product-price">
                  <strong>{item.price}</strong>
                  {item.originalPrice && <del>{item.originalPrice}</del>}
                </div>
                <div className="store-wishlist-actions">
                  <button type="button" className="store-add-button" onClick={() => onAddToCart(item)}>
                    <ShoppingCart size={14} /> Add to Cart
                  </button>
                  <button
                    type="button"
                    className="store-wishlist-remove"
                    aria-label={`Remove ${item.title} from wishlist`}
                    onClick={() => onToggleWishlist(item)}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
