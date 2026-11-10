import './CartToast.css';

function CartToast({ message }) {
  if (!message) return null;

  return (
    <div className="cart-toast" role="status" aria-live="polite">
      <span>✓</span>
      {message}
    </div>
  );
}

export default CartToast;
