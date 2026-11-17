import './PromoBanner.css';

function PromoBanner() {
  return (
    <section className="promo-section">
      <div className="promo-image">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=85"
          alt="Fashion collection"
          loading="lazy"
        />
      </div>

      <div className="promo-content">
        <p className="eyebrow">LESS, BUT BETTER</p>
        <h2>Build a wardrobe<br />that lasts.</h2>
        <p>
          Thoughtfully selected essentials that work together, season after season.
        </p>
        <a href="#shop" className="btn btn-dark promo-button">
          DISCOVER MORE ↗
        </a>
      </div>
    </section>
  );
}

export default PromoBanner;
