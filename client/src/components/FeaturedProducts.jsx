import { useEffect, useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import { api } from '../services/api';
import './FeaturedProducts.css';

function FeaturedProducts({ onAddToCart, selectedCategory, setSelectedCategory }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getProducts('?sort=featured')
      .then((data) => setProducts(data.map((product) => ({
        ...product,
        id: product.legacyId || product._id,
      }))))
      .catch((requestError) => {
        setProducts([]);
        setError(requestError.message || 'Unable to load new arrivals.');
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    function handleNavbarSearch(event) {
      setSearchTerm(event.detail);
    }
    window.addEventListener('zara-search', handleNavbarSearch);
    return () => window.removeEventListener('zara-search', handleNavbarSearch);
  }, []);

  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }), [selectedCategory, searchTerm, products]);

  return (
    <section className="section-padding featured-section" id="shop">
      <div className="container">
        <div className="section-heading">
          <div><p className="eyebrow">FRESHLY ADDED</p><h2>New arrivals</h2></div>
          <p className="section-side-note">The latest additions to our collection.</p>
        </div>
        <div className="shop-toolbar">
          <div className="category-filters" aria-label="Filter products">
            {['All', 'Men', 'Women', 'Kids'].map((category) => (
              <button key={category} className={`filter-button ${selectedCategory === category ? 'active' : ''}`} onClick={() => setSelectedCategory(category)}>
                {category}
              </button>
            ))}
          </div>
          <input className="product-search" type="search" placeholder="Search products..." aria-label="Search products" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
        </div>
        {loading ? (
          <div className="empty-products"><p>Loading collection...</p></div>
        ) : (
          <div className="row g-3 g-md-4">
            {filteredProducts.map((product) => (
              <div className="col-6 col-lg-4 col-xl-3" key={product.id}>
                <ProductCard product={product} onAddToCart={onAddToCart} />
              </div>
            ))}
          </div>
        )}
        {!loading && filteredProducts.length === 0 && (
          <div className="empty-products">
            <h3>{error ? 'New arrivals unavailable' : 'No products found'}</h3>
            <p>{error || 'Try a different search or category.'}</p>
            <button className="btn btn-dark" onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}>CLEAR FILTERS</button>
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
