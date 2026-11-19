import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './ProductDetails.css';
import { api } from '../services/api';

const products = [
  {
    id: 1,
    name: 'Relaxed Fit Linen Shirt',
    category: 'Men',
    price: 3990,
    description:
      'A versatile linen shirt designed for effortless everyday style.',
    image:
      'https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=85',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 2,
    name: 'Elegant Summer Dress',
    category: 'Women',
    price: 5990,
    description:
      'A timeless dress for warm days, special occasions and everyday wear.',
    image:
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85',
    sizes: ['XS', 'S', 'M', 'L'],
  },
  {
    id: 3,
    name: 'Classic Everyday T-Shirt',
    category: 'Men',
    price: 2490,
    description:
      'A simple wardrobe essential with a clean, versatile silhouette.',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 4,
    name: 'Minimal Shoulder Bag',
    category: 'Women',
    price: 4490,
    description:
      'A minimal accessory designed to complement your everyday outfits.',
    image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85',
    sizes: ['One Size'],
  },
  {
    id: 5,
    name: 'Kids Casual Outfit',
    category: 'Kids',
    price: 2990,
    description:
      'A comfortable casual style for everyday adventures.',
    image:
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=85',
    sizes: ['2Y', '4Y', '6Y', '8Y'],
  },
  {
    id: 6,
    name: 'Modern Denim Jacket',
    category: 'Men',
    price: 6990,
    description:
      'A modern layering piece that works across seasons.',
    image:
      'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=85',
    sizes: ['S', 'M', 'L', 'XL'],
  },
];

function ProductDetails({ onAddToCart }) {
  const { id } = useParams();
  const fallbackProduct = products.find((item) => item.id === Number(id));
  const [product, setProduct] = useState(fallbackProduct);
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    api.getProduct(id)
      .then((data) => {
        const fallback = products.find((item) => item.id === Number(id));
        setProduct({
          ...data,
          id: data.legacyId || data._id,
          sizes: data.sizes?.length ? data.sizes : fallback?.sizes || [],
        });
      })
      .catch(() => undefined);
  }, [id]);

  if (!product) {
    return (
      <main className="product-not-found">
        <h1>Product not found</h1>
        <p>This product does not exist in our demo collection.</p>
        <Link to="/" className="btn btn-dark">
          BACK TO HOME
        </Link>
      </main>
    );
  }

  function handleAddToCart() {
    if (!selectedSize) {
      alert('Please select a size first.');
      return;
    }

    const added = onAddToCart({
      ...product,
      selectedSize,
    });

    if (added) alert(`${product.name} (${selectedSize}) added to your shopping bag.`);
  }

  return (
    <main className="product-details-page">
      <div className="container">
        <div className="product-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/#shop">Shop</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="row g-4 g-lg-5 product-details-layout">
          <div className="col-12 col-md-6">
            <div className="product-details-image">
              <img src={product.image} alt={product.name} />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="product-details-info">
              <p className="product-details-category">
                {product.category} COLLECTION
              </p>

              <h1>{product.name}</h1>

              <p className="product-details-price">
                LKR {product.price.toLocaleString('en-LK')}
              </p>

              <div className="product-details-divider" />

              <p className="product-details-description">
                {product.description}
              </p>

              <h2 className="size-heading">SELECT SIZE</h2>

              <div className="size-options">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`size-option ${
                      selectedSize === size ? 'selected' : ''
                    }`}
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={selectedSize === size}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="add-to-cart-button"
                onClick={handleAddToCart}
              >
                ADD TO BAG — LKR{' '}
                {product.price.toLocaleString('en-LK')}
              </button>

              <div className="product-extra-info">
                <p>✓ Easy everyday styling</p>
                <p>✓ Secure checkout and order tracking</p>
                <p>✓ Product availability confirmed from our store</p>
              </div>

              <Link to="/" className="back-to-shop">
                ← CONTINUE SHOPPING
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;