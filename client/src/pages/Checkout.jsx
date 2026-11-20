
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Checkout.css';
import { api } from '../services/api';

function Checkout({ cartItems, onClearCart }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'Cash on Delivery',
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal === 0 || subtotal >= 10000 ? 0 : 500;
  const total = subtotal + shipping;

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (cartItems.length === 0) {
      alert('Your shopping bag is empty!');
      return;
    }

    try {
      await api.createOrder({
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
        },
        items: cartItems,
        paymentMethod: formData.paymentMethod,
      });
      setOrderPlaced(true);
      onClearCart();
    } catch (error) {
      alert(error.message);
    }
  }

  if (orderPlaced) {
    return (
      <main className="checkout-page">
        <div className="checkout-success">
          <div className="success-icon">✓</div>
          <p className="checkout-eyebrow">ZARA FASHION</p>
          <h1>Thank You for Your Order!</h1>
          <p>Your order has been received and will be prepared for delivery.</p>
          <Link to="/" className="checkout-primary-button">
            CONTINUE SHOPPING
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="container">
        <div className="checkout-heading">
          <p className="checkout-eyebrow">ZARA FASHION</p>
          <h1>Checkout</h1>
          <p>Complete your delivery details below.</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="checkout-empty">
            <h2>Your shopping bag is empty</h2>
            <p>Add products before proceeding to checkout.</p>
            <Link to="/" className="checkout-primary-button">
              EXPLORE COLLECTION
            </Link>
          </div>
        ) : (
          <div className="row g-5">
            <div className="col-12 col-lg-7">
              <form className="checkout-form" onSubmit={handleSubmit}>
                <h2>Delivery Information</h2>

                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />

                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />

                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />

                <label htmlFor="address">Delivery Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House number, street name"
                  rows="3"
                  required
                />

                <label htmlFor="city">City</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  required
                />

                <h2 className="payment-heading">Payment Method</h2>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash on Delivery"
                    checked={formData.paymentMethod === 'Cash on Delivery'}
                    onChange={handleChange}
                  />
                  Cash on Delivery
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Bank Transfer"
                    checked={formData.paymentMethod === 'Bank Transfer'}
                    onChange={handleChange}
                  />
                  Bank Transfer
                </label>

                <button type="submit" className="place-order-button">
                  PLACE ORDER — LKR {total.toLocaleString('en-LK')}
                </button>

                <p className="checkout-demo-note">
                  Cash or bank transfer payment options are available at checkout.
                </p>
              </form>
            </div>

            <div className="col-12 col-lg-5">
              <aside className="checkout-summary">
                <h2>Your Order</h2>

                {cartItems.map((item) => (
                  <div
                    className="checkout-product"
                    key={`${item.id}-${item.selectedSize || 'default'}`}
                  >
                    <img src={item.image} alt={item.name} />

                    <div className="checkout-product-info">
                      <h3>{item.name}</h3>
                      {item.selectedSize && (
                        <p>Size: {item.selectedSize}</p>
                      )}
                      <p>Quantity: {item.quantity}</p>
                    </div>

                    <strong>
                      LKR {(item.price * item.quantity).toLocaleString('en-LK')}
                    </strong>
                  </div>
                ))}

                <div className="checkout-total-row">
                  <span>Subtotal</span>
                  <span>LKR {subtotal.toLocaleString('en-LK')}</span>
                </div>

                <div className="checkout-total-row">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0
                      ? 'FREE'
                      : `LKR ${shipping.toLocaleString('en-LK')}`}
                  </span>
                </div>

                <div className="checkout-total-row checkout-grand-total">
                  <span>Total</span>
                  <span>LKR {total.toLocaleString('en-LK')}</span>
                </div>

                <Link to="/cart" className="checkout-edit-cart">
                  ← Edit shopping bag
                </Link>
              </aside>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Checkout;
