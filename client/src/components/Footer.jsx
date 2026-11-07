import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="container">
        <div className="row g-4 footer-main">
          <div className="col-12 col-md-5">
            <Link to="/#home" className="brand-logo footer-logo">
              ZARA
              <span>F A S H I O N</span>
            </Link>
            <p className="footer-description">
              Timeless style. Modern essentials. Made for the way you live.
            </p>
          </div>

          <div className="col-6 col-md-2">
            <h3>EXPLORE</h3>
            <Link to="/#home">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="/#categories">Collections</Link>
            <Link to="/#shop">New Arrivals</Link>
          </div>

          <div className="col-6 col-md-2">
            <h3>HELP</h3>
            <Link to="/#footer">Contact Us</Link>
            <Link to="/#footer">Shipping</Link>
            <Link to="/#footer">Returns</Link>
            <Link to="/#footer">FAQs</Link>
          </div>

          <div className="col-12 col-md-3">
            <h3>FOLLOW OUR JOURNEY</h3>
            <div className="social-links">
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram ↗</a>
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook ↗</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ZARA Fashion. Developed by Aakib Nasim ❤</p>
          <p>Designed for everyday style.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
