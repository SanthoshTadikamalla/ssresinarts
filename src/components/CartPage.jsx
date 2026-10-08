import React, { useState } from 'react';
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import indiaLocations from '../india-states-districts.json';

const formatCurrency = (amount) => `₹${amount.toLocaleString('en-IN')}`;

const getAmount = (price) => {
  const amount = Number(String(price || '').replace(/[^\d]/g, ''));
  return Number.isFinite(amount) && amount > 0 ? amount : null;
};

const states = [...indiaLocations].sort((left, right) => left.state.localeCompare(right.state));

export default function CartPage({ items, onQuantityChange, onRemove, onContinueShopping }) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [orderError, setOrderError] = useState('');

  const selectedState = indiaLocations.find((location) => location.state === state);
  const districts = [...(selectedState?.districts || [])].sort((left, right) => left.localeCompare(right));
  const totalAmount = items.reduce((total, item) => {
    const amount = getAmount(item.price);
    return total + (amount === null ? 0 : amount * item.quantity);
  }, 0);
  const hasUnpricedItems = items.some((item) => getAmount(item.price) === null);

  const handleCheckout = (event) => {
    event.preventDefault();
    if (!items.length) {
      setOrderError('Add a product to your cart before placing an order.');
      return;
    }
    const itemLines = items.map((item) => {
      const amount = getAmount(item.price);
      const lineTotal = amount === null ? 'Price on request' : formatCurrency(amount * item.quantity);
      return `- ${item.title} | Qty: ${item.quantity} | ${lineTotal}`;
    });
    const message = [
      'Hello SS Creation! I would like to place this order:',
      '',
      ...itemLines,
      '',
      `Items total: ${formatCurrency(totalAmount)}${hasUnpricedItems ? ' (plus items priced on request)' : ''}`,
      'Delivery charge: To be confirmed',
      `Order total: ${formatCurrency(totalAmount)}${hasUnpricedItems ? ' (plus items priced on request)' : ''}, excluding delivery`,
      '',
      `Name: ${customerName.trim()}`,
      `Phone: ${phone.trim()}`,
      `Address: ${addressLine.trim()}`,
      `City: ${city.trim()}`,
      `District: ${district.trim()}`,
      `State: ${state.trim()}`,
    ].join('\n');

    setOrderError('');
    window.open(`https://wa.me/919392292616?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <main id="cart" className="store-cart-page">
      <div className="store-cart-heading">
        <div>
          <span className="store-product-category">YOUR ORDER</span>
          <h1>Shopping Cart</h1>
        </div>
        <button type="button" className="store-continue-button" onClick={onContinueShopping}>
          <ArrowLeft size={16} /> Continue shopping
        </button>
      </div>

      {items.length === 0 ? (
        <div className="store-cart-empty">
          <ShoppingBag size={38} />
          <h2>Your cart is empty</h2>
          <p>Explore our handmade resin art and add something special.</p>
          <button type="button" className="store-add-button" onClick={onContinueShopping}>
            Browse products
          </button>
        </div>
      ) : (
        <div className="store-cart-layout">
          <section className="store-cart-items" aria-label="Items in your cart">
            {items.map((item) => {
              const amount = getAmount(item.price);
              return (
                <article className="store-cart-item" key={item.id}>
                  <img src={item.path} alt={item.title} />
                  <div className="store-cart-item-info">
                    <span className="store-product-category">{item.category}</span>
                    <h2>{item.title}</h2>
                    <span className="store-cart-unit-price">
                      {amount === null ? 'Price on request' : `${formatCurrency(amount)} each`}
                    </span>
                    <div className="store-cart-item-actions">
                      <div className="store-quantity-control" aria-label={`Quantity for ${item.title}`}>
                        <button
                          type="button"
                          aria-label={`Decrease quantity of ${item.title}`}
                          onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                        >
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          aria-label={`Increase quantity of ${item.title}`}
                          onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        type="button"
                        className="store-remove-item"
                        onClick={() => onRemove(item.id)}
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </div>
                  <strong className="store-cart-line-total">
                    {amount === null ? 'Quote' : formatCurrency(amount * item.quantity)}
                  </strong>
                </article>
              );
            })}
          </section>

          <aside className="store-order-panel">
            <h2>Delivery & Order</h2>
            <form onSubmit={handleCheckout}>
              <label>
                Full name
                <input
                  type="text"
                  autoComplete="name"
                  required
                  value={customerName}
                  onChange={(event) => setCustomerName(event.target.value)}
                  placeholder="Your name"
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
                  placeholder="10-digit contact number"
                />
              </label>
              <label>
                House / street / area
                <textarea
                  autoComplete="street-address"
                  required
                  rows="2"
                  value={addressLine}
                  onChange={(event) => setAddressLine(event.target.value)}
                  placeholder="House or flat number, street, area"
                />
              </label>
              <div className="store-address-grid">
                <label>
                  State
                  <select
                    autoComplete="address-level1"
                    required
                    value={state}
                    onChange={(event) => {
                      setState(event.target.value);
                      setDistrict('');
                    }}
                  >
                    <option value="">Select state</option>
                    {states.map((location) => (
                      <option key={location.state} value={location.state}>{location.state}</option>
                    ))}
                  </select>
                </label>
                <label>
                  District
                  <select
                    required
                    disabled={!state}
                    value={district}
                    onChange={(event) => setDistrict(event.target.value)}
                  >
                    <option value="">{state ? 'Select district' : 'Select state first'}</option>
                    {districts.map((districtName) => (
                      <option key={districtName} value={districtName}>{districtName}</option>
                    ))}
                  </select>
                </label>
                <label>
                  City / town
                  <input
                    type="text"
                    autoComplete="address-level2"
                    required
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    placeholder="City or town"
                  />
                </label>
              </div>

              <div className="store-order-total">
                <span>Items total</span>
                <strong>{formatCurrency(totalAmount)}</strong>
              </div>
              <div className="store-order-total store-delivery-total">
                <span>Delivery charge</span>
                <strong>To be confirmed</strong>
              </div>
              <p className="store-delivery-note">
                Delivery charges and final total will be confirmed with you on WhatsApp.
                {hasUnpricedItems && ' Some items need a custom price quote.'}
              </p>
              {orderError && <p className="store-order-error" role="alert">{orderError}</p>}
              <button
                type="submit"
                className="store-add-button store-checkout-button"
              >
                Send order to WhatsApp
              </button>
              <p className="store-whatsapp-number">Order details will be sent to +91 93922 92616</p>
            </form>
          </aside>
        </div>
      )}
    </main>
  );
}
