import { useState, useEffect } from "react";
import "./About.css";

function Counter({ end, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const step = Math.ceil(end / 50);

    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      setCount(current);
    }, 30);

    return () => clearInterval(timer);
  }, [end]);

  return <span>{count}{suffix}</span>;
}

const stats = [
  { id: 1, end: 500, suffix: "+", label: "Restaurants" },
  { id: 2, end: 10, suffix: "K+", label: "Happy Customers" },
  { id: 3, end: 30, suffix: " min", label: "Avg. Delivery" },
  { id: 4, end: 50, suffix: "+", label: "Cities" },
];

const steps = [
  { id: 1, icon: "🔍", title: "Choose Food", text: "Browse restaurants and pick your favourite dishes." },
  { id: 2, icon: "🛒", title: "Place Order", text: "Add items to cart and checkout in a few clicks." },
  { id: 3, icon: "🚀", title: "Fast Delivery", text: "Hot and fresh food reaches your doorstep." },
];

const features = [
  { id: 1, icon: "⚡", title: "Super Fast", text: "Average delivery in 30 minutes." },
  { id: 2, icon: "🥗", title: "Fresh Food", text: "Prepared fresh by trusted restaurants." },
  { id: 3, icon: "💸", title: "Best Prices", text: "Great offers and discounts every day." },
  { id: 4, icon: "🔒", title: "Safe Payment", text: "Secure and easy checkout experience." },
];

const faqs = [
  { id: 1, q: "How do I place an order?", a: "Choose your food, add it to the cart, login and complete the checkout form." },
  { id: 2, q: "How long does delivery take?", a: "Most orders reach you within 30 to 40 minutes." },
  { id: 3, q: "Can I see my past orders?", a: "Yes. Open the Orders page from the menu to see your order history." },
  { id: 4, q: "Is my cart saved?", a: "Yes. Your cart stays saved even after you refresh the page." },
];

function About() {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="about-page">

      <section className="about-hero">
        <h1>About Foodies 🍔</h1>
        <p>
          We connect hungry people with the best local restaurants.
          Good Food, Good Mood, delivered fast.
        </p>
      </section>

      <section className="stats">
        {stats.map((s) => (
          <div className="stat-card" key={s.id}>
            <h2><Counter end={s.end} suffix={s.suffix} /></h2>
            <p>{s.label}</p>
          </div>
        ))}
      </section>

      <section className="about-section">
        <h2>How It Works</h2>
        <div className="card-grid three">
          {steps.map((s) => (
            <div className="info-card" key={s.id}>
              <div className="info-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2>Why Choose Us</h2>
        <div className="card-grid four">
          {features.map((f) => (
            <div className="info-card" key={f.id}>
              <div className="info-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((item) => (
            <div className="faq-item" key={item.id}>
              <button
                className="faq-q"
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
              >
                <span>{item.q}</span>
                <span>{openId === item.id ? "−" : "+"}</span>
              </button>

              {openId === item.id && <p className="faq-a">{item.a}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="about-section builder">
        <h2>Built By</h2>
        <p>
          Designed and developed by <strong>Prabhat Kumar Singh</strong> as a
          React learning project.
        </p>
        <div className="tech-tags">
          <span>React</span>
          <span>Vite</span>
          <span>React Router</span>
          <span>Context API</span>
          <span>REST API</span>
          <span>CSS</span>
        </div>
      </section>

    </div>
  );
}

export default About;