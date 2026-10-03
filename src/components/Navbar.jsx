import React, { useState } from 'react';
import { Heart, Menu, Search, ShoppingCart, UserRound, X } from 'lucide-react';

export default function Navbar({
  cartCount = 0,
  wishlistCount = 0,
  searchQuery,
  onSearchChange,
  onOpenCart,
  onOpenWishlist,
  onOpenCustomQuote,
  onOpenContact,
  onNavigateShop,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Shop', href: '#client-view' },
    { label: 'Custom Orders', href: '#custom-orders' },
    
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="store-header sticky top-0 z-50">
      <div className="store-announcement">
        <span>✦ Handmade with Love</span>
        <span>✦ Unique Resin Art</span>
        <span>✦ Shop Your Favourite Pieces</span>
      </div>

      <nav className="store-nav" aria-label="Main navigation">
        <a href="#home" className="store-logo" aria-label="SS Creation Resin Art home">
          <span className="store-logo-mark">SS</span>
          <span className="store-logo-copy">
            <strong>CREATION</strong>
            <small>RESIN ART</small>
          </span>
        </a>

        <div className="store-nav-links">
          {navLinks.map((link, index) => (
            <a
              href={link.href}
              key={link.label}
              className={index === 0 ? 'active' : ''}
              onClick={(event) => {
                if (link.label === 'Custom Orders') {
                  event.preventDefault();
                  onOpenCustomQuote();
                }
                if (link.label === 'Contact') {
                  event.preventDefault();
                  onOpenContact();
                }
                if (link.label === 'Home' || link.label === 'Shop') {
                  onNavigateShop();
                }
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="store-nav-actions">
          <button
            type="button"
            aria-label={searchOpen ? 'Close search' : 'Open search'}
            onClick={() => {
              setSearchOpen((open) => !open);
              if (searchOpen) onSearchChange('');
            }}
          >
            {searchOpen ? <X /> : <Search />}
          </button>
          <a href="#contact" aria-label="Custom orders and account">
            <UserRound />
          </a>
          <button
            type="button"
            className="store-wishlist"
            aria-label={`Wishlist with ${wishlistCount} items`}
            onClick={onOpenWishlist}
          >
            <Heart />
            <span>{wishlistCount}</span>
          </button>
          <button
            type="button"
            className="store-cart"
            aria-label={`Shopping cart with ${cartCount} items`}
            onClick={onOpenCart}
          >
            <ShoppingCart />
            <span>{cartCount}</span>
          </button>
          <button
            type="button"
            className="store-menu-toggle"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {searchOpen && (
        <div className="store-search">
          <Search aria-hidden="true" />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search handmade resin pieces..."
            aria-label="Search products"
            autoFocus
          />
        </div>
      )}

      {mobileMenuOpen && (
        <div className="store-mobile-menu">
          {navLinks.map((link) => (
            <a
              href={link.href}
              key={link.label}
              onClick={(event) => {
                setMobileMenuOpen(false);
                if (link.label === 'Custom Orders') {
                  event.preventDefault();
                  onOpenCustomQuote();
                }
                if (link.label === 'Contact') {
                  event.preventDefault();
                  onOpenContact();
                }
                if (link.label === 'Home' || link.label === 'Shop') onNavigateShop();
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
