import './ServiceHighlights.css';

const highlights = [
  { icon: '◇', title: 'Free Delivery', text: 'On orders over LKR 10,000' },
  { icon: '↻', title: 'Easy Returns', text: '14-day return policy' },
  { icon: '✓', title: 'Secure Payment', text: 'Safe and protected checkout' },
  { icon: '♡', title: 'Customer Support', text: 'We are here to help' },
];

function ServiceHighlights() {
  return (
    <section className="service-highlights" aria-label="Shopping benefits">
      <div className="container service-highlights-grid">
        {highlights.map((item) => (
          <div className="service-highlight" key={item.title}>
            <span className="service-highlight-icon" aria-hidden="true">
              {item.icon}
            </span>
            <div>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServiceHighlights;
