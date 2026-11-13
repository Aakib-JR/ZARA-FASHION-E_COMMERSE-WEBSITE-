import { useState } from 'react';
import { Link } from 'react-router-dom';
import './FeaturedProducts.css';

function ProductCard({ product, onAddToCart }) {
  const [added, setAdded] = useState(false);
  const [favourite, setFavourite] = useState(false);

  function handleAdd() {
    if (!onAddToCart(product)) return;
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Link
          to={`/product/${product.id}`}
          className="product-image-link"
          aria-label={`View ${product.name}`}
        >
          <img
            className="product-image"
            src={product.image}
            alt={product.name}
            loading="lazy"
          />
        </Link>

        {product.label && (
          <span className="product-label">{product.label}</span>
        )}

        <button
          className={`wishlist-button ${favourite ? 'is-favourite' : ''}`}
          aria-label={`${favourite ? 'Remove' : 'Add'} ${product.name} ${favourite ? 'from' : 'to'} wishlist`}
          aria-pressed={favourite}
          onClick={() => setFavourite((current) => !current)}
        >
          {favourite ? '♥' : '♡'}
        </button>

        <button className="quick-add" onClick={handleAdd}>
          {added ? 'ADDED ✓' : 'ADD TO BAG +'}
        </button>
      </div>

      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="product-price">
          LKR {product.price.toLocaleString('en-LK')}
        </p>
      </div>
    </article>
  );
}

export default ProductCard;
