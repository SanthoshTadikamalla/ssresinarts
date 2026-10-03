import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ClientShowcase from './components/ClientShowcase';
import ContactFooter from './components/ContactFooter';
import CartPage from './components/CartPage';
import WishlistPage from './components/WishlistPage';
import CustomQuoteModal from './components/CustomQuoteModal';
import ContactModal from './components/ContactModal';

export default function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = window.localStorage.getItem('ssresinarts-wishlist');
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.warn('Unable to load saved wishlist:', error);
      return [];
    }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showCustomQuote, setShowCustomQuote] = useState(false);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem('ssresinarts-wishlist', JSON.stringify(wishlist));
    } catch (error) {
      console.warn('Unable to save wishlist:', error);
    }
  }, [wishlist]);

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const updateWishlist = (product) => {
    setWishlist((currentWishlist) => {
      const updatedWishlist = currentWishlist.some((item) => item.id === product.id)
        ? currentWishlist.filter((item) => item.id !== product.id)
        : [...currentWishlist, product];
      return updatedWishlist;
    });
  };

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);
      if (existingItem) {
        return currentCart.map((item) => (
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ));
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const changeQuantity = (itemId, quantity) => {
    if (quantity < 1) return;
    setCart((currentCart) => currentCart.map((item) => (
      item.id === itemId ? { ...item, quantity } : item
    )));
  };

  const decreaseCartQuantity = (itemId, quantity) => {
    if (quantity < 1) {
      setCart((currentCart) => currentCart.filter((item) => item.id !== itemId));
      return;
    }
    changeQuantity(itemId, quantity);
  };

  return (
    <div className="storefront min-h-screen">
      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCart={() => {
          setShowCart(true);
          setShowWishlist(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenWishlist={() => {
          setShowWishlist(true);
          setShowCart(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCustomQuote={() => setShowCustomQuote(true)}
        onOpenContact={() => {
          setShowCart(false);
          setShowWishlist(false);
          setShowContact(true);
        }}
        onNavigateShop={() => {
          setShowCart(false);
          setShowWishlist(false);
        }}
      />

      {showWishlist ? (
        <WishlistPage
          items={wishlist}
          onToggleWishlist={updateWishlist}
          onAddToCart={addToCart}
          onContinueShopping={() => setShowWishlist(false)}
        />
      ) : showCart ? (
        <CartPage
          items={cart}
          onQuantityChange={changeQuantity}
          onRemove={(itemId) => setCart((currentCart) => currentCart.filter((item) => item.id !== itemId))}
          onContinueShopping={() => setShowCart(false)}
        />
      ) : (
        <>
          <Hero />
          <ClientShowcase
            searchQuery={searchQuery}
            onAddToCart={addToCart}
            cartItems={cart}
            onChangeCartQuantity={decreaseCartQuantity}
            wishlistItems={wishlist}
            onToggleWishlist={updateWishlist}
          />
          <ContactFooter />
        </>
      )}
      <CustomQuoteModal open={showCustomQuote} onClose={() => setShowCustomQuote(false)} />
      <ContactModal open={showContact} onClose={() => setShowContact(false)} />
    </div>
  );
}
