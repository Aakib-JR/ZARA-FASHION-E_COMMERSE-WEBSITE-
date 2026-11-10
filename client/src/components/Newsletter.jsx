import { useState } from 'react';
import './Newsletter.css';
import { api } from '../services/api';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim()) {
      setMessage('Please enter your email address.');
      return;
    }

    try {
      const result = await api.subscribeNewsletter(email.trim());
      setMessage(result.message);
      setEmail('');
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <section className="newsletter-section" id="newsletter">
      <div className="container newsletter-inner">
        <p className="eyebrow">STAY IN THE KNOW</p>
        <h2>A little style in your inbox.</h2>
        <p>Get updates on new arrivals, collections and more.</p>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email address"
            aria-label="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <button type="submit" className="submit-btn">SUBSCRIBE ↗</button>
        </form>

        {message && (
          <p className="newsletter-message" role="status">
            {message}
          </p>
        )}
      </div>
    </section>
  );
}

export default Newsletter;
