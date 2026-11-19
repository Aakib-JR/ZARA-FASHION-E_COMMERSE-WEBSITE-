import { useEffect, useState } from 'react';
import './Contact.css';
import Footer from '../components/Footer';

const CONTACT_EMAIL = 'hello@zarafashion.lk';

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Website enquiry: ${formData.get('topic')}`);
    const body = encodeURIComponent(
      `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\n${formData.get('message')}`
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <>
      <main className="contact-page">
      <section className="contact-banner">
        <p>WE’RE HERE TO HELP</p>
        <h1>Let’s talk.</h1>
        <span>Questions about your order or need a little style advice? We’d love to hear from you.</span>
      </section>

      <section className="container contact-content">
        <div className="contact-intro">
          <p className="contact-eyebrow">GET IN TOUCH</p>
          <h2>How can we help?</h2>
          <p>Send us a message and our team will be happy to help with orders, products, or anything else.</p>
        </div>

        <div className="contact-layout">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-row">
              <label>
                Your name
                <input name="name" type="text" autoComplete="name" required />
              </label>
              <label>
                Email address
                <input name="email" type="email" autoComplete="email" required />
              </label>
            </div>

            <label>
              What can we help with?
              <select name="topic" defaultValue="Order enquiry">
                <option>Order enquiry</option>
                <option>Product question</option>
                <option>Delivery and returns</option>
                <option>Other</option>
              </select>
            </label>

            <label>
              Your message
              <textarea name="message" rows="6" required />
            </label>

            <button type="submit">SEND YOUR MESSAGE <span aria-hidden="true">↗</span></button>
            {submitted && (
              <p className="contact-status" role="status">
                Your email app should open with your message ready to send. You can also email us at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
              </p>
            )}
          </form>

          <aside className="contact-details">
            <div>
              <span className="contact-detail-icon" aria-hidden="true">✉</span>
              <h3>Email us</h3>
              <p>For order and product enquiries, get in touch by email.</p>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </div>
            <div>
              <span className="contact-detail-icon" aria-hidden="true">◷</span>
              <h3>Customer care</h3>
              <p>Monday–Friday</p>
              <p>9:00 AM–6:00 PM (Sri Lanka time)</p>
            </div>
            <div className="contact-order-note">
              <h3>Getting in touch about an order?</h3>
              <p>Include your order number in your message so we can help you faster.</p>
            </div>
          </aside>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}

export default Contact;
