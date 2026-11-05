
import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
  return (
    <section className="hero-section" id="home">
      <img
        className="hero-image"
        src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1800&q=85"
        alt="New fashion collection"
      />

      <div className="hero-overlay" />

      <div className="hero-content">
        <p className="eyebrow hero-eyebrow">
          NEW SEASON · NEW STYLE
        </p>

        <h1>
          STYLE THAT
          <br />
          SPEAKS
          <br />
          FOR YOU.
        </h1>

        <p className="hero-description">
          Discover timeless fashion and modern essentials
          designed to make every moment stylish.
        </p>

        <Link to="/shop" className="btn btn-light hero-button">
          SHOP COLLECTION <span>↗</span>
        </Link>
      </div>

      <span className="hero-index">01 / NEW COLLECTION</span>
    </section>
  );
}

export default Hero;
