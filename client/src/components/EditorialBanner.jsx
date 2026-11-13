import { Link } from 'react-router-dom';
import './EditorialBanner.css';

function EditorialBanner() {
  return (
    <section className="editorial-banner">
      <div className="editorial-banner-content">
        <p className="eyebrow">THE EVERYDAY EDIT</p>
        <h2>Confidence looks good on you.</h2>
        <p>Discover refined silhouettes, everyday layers and accessories for every occasion.</p>
        <Link to="/shop" className="editorial-banner-link">
          EXPLORE THE COLLECTION →
        </Link>
      </div>
    </section>
  );
}

export default EditorialBanner;
