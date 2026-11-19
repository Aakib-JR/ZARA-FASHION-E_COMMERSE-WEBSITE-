import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from './Hero';
import CategorySection from './CategorySection';
import FeaturedProducts from './FeaturedProducts';
import PromoBanner from './PromoBanner';
import Newsletter from './Newsletter';
import Footer from './Footer';
import ServiceHighlights from './ServiceHighlights';
import EditorialBanner from './EditorialBanner';

function HomePage({ onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0 });
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      document.getElementById(location.hash.slice(1))?.scrollIntoView();
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [location.hash, location.pathname]);

  return (
    <>
      <main>
        <Hero />
        <ServiceHighlights />
        <CategorySection />
        <FeaturedProducts
          onAddToCart={onAddToCart}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <EditorialBanner />
        <PromoBanner />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
