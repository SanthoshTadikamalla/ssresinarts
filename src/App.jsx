import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ClientShowcase from './components/ClientShowcase';
import ContactFooter from './components/ContactFooter';
import CartPage from './components/CartPage';

export default function App() {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

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

  return (
    <div className="storefront min-h-screen">
      <Navbar
        cartCount={cartCount}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCart={() => {
          setShowCart(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateShop={() => setShowCart(false)}
      />

      {showCart ? (
        <CartPage
          items={cart}
          onQuantityChange={changeQuantity}
          onRemove={(itemId) => setCart((currentCart) => currentCart.filter((item) => item.id !== itemId))}
          onContinueShopping={() => setShowCart(false)}
        />
      ) : (
        <>
          <Hero />
          <ClientShowcase searchQuery={searchQuery} onAddToCart={addToCart} />
          <ContactFooter />
        </>
      )}
    </div>
  );
}
