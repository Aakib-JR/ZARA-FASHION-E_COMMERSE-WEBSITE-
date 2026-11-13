
import { Link } from 'react-router-dom';
import './CategorySection.css';

const categories = [
  {
    name: 'Men',
    subtitle: 'MODERN ESSENTIALS',
    image:
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Women',
    subtitle: 'TIMELESS ELEGANCE',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHY0zCUDMqeaERxGU65_XObspPyCmYmNN6MzCJ2CWinedXVMr_E0zHLGym&s=10',
  },
  {
    name: 'Kids',
    subtitle: 'EVERYDAY COMFORT',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvS7Mo-EZ3XJij2Ml7MFHD3syX_JbMQItvswkVeLLhEGi5Sew7XAAGwkKq&s=10',
  },
];

function CategorySection() {
  const categoryPath = {
    Men: '/shop?category=Men',
    Women: '/shop?category=Women',
    Kids: '/shop?category=Kids',
  };

  return (
    <section
      className="section-padding category-section"
      id="categories"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FIND YOUR STYLE</p>
            <h2>Shop by category</h2>
          </div>

          <Link className="text-link" to="/shop">
            VIEW ALL <span>↗</span>
          </Link>
        </div>

        <div className="row g-3 g-md-4">
          {categories.map((category) => (
            <div
              className="col-12 col-sm-4"
              key={category.name}
            >
              <Link
                to={categoryPath[category.name]}
                className="category-card"
              >
                <img
                  src={category.image}
                  alt={`${category.name} fashion`}
                  loading="lazy"
                />

                <span className="category-shade" />

                <span className="category-info">
                  <span className="category-subtitle">
                    {category.subtitle}
                  </span>

                  <span className="category-title">
                    {category.name}
                  </span>

                  <span className="category-cta">
                    SHOP NOW ↗
                  </span>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
