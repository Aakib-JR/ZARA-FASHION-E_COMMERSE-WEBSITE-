import { Link } from 'react-router-dom';
import './Cart.css';

function Cart({ cartItems, onUpdateQuantity, onRemoveItem }) {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal === 0 || subtotal >= 10000 ? 0 : 500;
  const total = subtotal + shipping;
  const remainingForFreeShipping = Math.max(10000 - subtotal, 0);
  const shippingProgress = Math.min((subtotal / 10000) * 100, 100);

  return (
    <main className="cart-page">
      <div className="container">
        <div className="cart-heading">
          <p className="eyebrow">YOUR SELECTION</p>
          <h1>Shopping Bag</h1>
          <p>{cartItems.length} different item(s) in your bag</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">♡</div>
            <h2>Your bag is waiting</h2>
            <p>Discover something you love from our latest collection.</p>
            <Link to="/" className="continue-shopping-button">
              CONTINUE SHOPPING →
            </Link>
          </div>
        ) : (
          <div className="row g-5">
            <div className="col-12 col-lg-8">
              {cartItems.map((item) => (
                <article
                  className="cart-item"
                  key={`${item.id}-${item.selectedSize || 'default'}`}
                >
                  <Link to={`/product/${item.id}`} className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </Link>

                  <div className="cart-item-details">
                    <p className="cart-item-category">{item.category}</p>
                    <Link to={`/product/${item.id}`}>
                      <h2>{item.name}</h2>
                    </Link>

                    {item.selectedSize && (
                      <p className="cart-item-size">
                        Size: {item.selectedSize}
                      </p>
                    )}

                    <p className="cart-item-price">
                      LKR {item.price.toLocaleString('en-LK')}
                    </p>

                    <div className="cart-item-actions">
                      <div className="quantity-control">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() =>
                            onUpdateQuantity(item, item.quantity - 1)
                          }
                        >
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() =>
                            onUpdateQuantity(item, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="remove-item-button"
                        onClick={() => onRemoveItem(item)}
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="col-12 col-lg-4">
              <aside className="cart-summary">
                <h2>Order Summary</h2>

                <div className="shipping-progress">
                  <p>
                    {remainingForFreeShipping === 0
                      ? 'You unlocked free shipping!'
                      : `Add LKR ${remainingForFreeShipping.toLocaleString('en-LK')} for free shipping`}
                  </p>
                  <div className="shipping-progress-track">
                    <span style={{ width: `${shippingProgress}%` }} />
                  </div>
                </div>

                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>LKR {subtotal.toLocaleString('en-LK')}</span>
                </div>

                <div className="summary-row">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0
                      ? 'FREE'
                      : `LKR ${shipping.toLocaleString('en-LK')}`}
                  </span>
                </div>

                <p className="shipping-note">
                  {subtotal >= 10000
                    ? 'You qualify for free shipping!'
                    : 'Free shipping on orders over LKR 10,000.'}
                </p>

                <div className="summary-row summary-total">
                  <span>Total</span>
                  <span>LKR {total.toLocaleString('en-LK')}</span>
                </div>

                <Link to="/checkout" className="checkout-button">
                  PROCEED TO CHECKOUT →
                </Link>

                <Link to="/" className="continue-shopping-link">
                  Continue shopping
                </Link>
              </aside>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Cart;