import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      {announcementVisible && (
        <div className="announcement-bar">
          <span>FREE SHIPPING ON ORDERS OVER LKR 10,000</span>

          <button
            type="button"
            className="announcement-close"
            aria-label="Close announcement"
            onClick={() => setAnnouncementVisible(false)}
          >
            ×
          </button>
        </div>
      )}

      <header className="site-header">
        <div className="container-fluid header-inner">
          <button
            type="button"
            className="menu-toggle"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>

          <Link to="/" className="brand-logo" onClick={closeMenu}>
            ZARA
            <span>F A S H I O N</span>
          </Link>

          <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`}>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>

            <a href="#categories" onClick={closeMenu}>
              Collections
            </a>

            <Link to="/shop" onClick={closeMenu}>
              Shop
            </Link>

            <a href="#shop" onClick={closeMenu}>
              New Arrivals
            </a>

            <a href="#footer" onClick={closeMenu}>
              Contact
            </a>
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="header-icon"
              aria-label="Search products"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              ⌕
            </button>

            <a
              href="#newsletter"
              className="header-icon"
              aria-label="My account"
            >
              ♙
            </a>

            <Link
              to="/cart"
              className="header-icon cart-link"
              aria-label="Shopping cart"
            >
              ♧
              <span className="cart-count">{cartCount}</span>
            </Link>
          </div>
        </div>

        {searchOpen && (
          <div className="container search-panel">
            <label htmlFor="nav-search">
              Search our collection
            </label>

            <input
              id="nav-search"
              type="search"
              placeholder="Search clothing and accessories..."
              onChange={(event) => {
                window.dispatchEvent(
                  new CustomEvent('zara-search', {
                    detail: event.target.value,
                  })
                );
              }}
            />
          </div>
        )}
      </header>
    </>
  );
}

export default Navbar;
