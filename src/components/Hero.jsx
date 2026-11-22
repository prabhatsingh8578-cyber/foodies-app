
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <span className="offer">
          50% OFF ON FIRST ORDER
        </span>

        <h1>
          Delicious Food,
          <br />
          <span>Delivered Fast!</span>
        </h1>

        <p>
          Enjoy your favourite food from the
          best restaurants near you.
        </p>

        <a href="#menu" className="order-btn">
          Order Now →
        </a>

      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500"
          alt="Delicious Burger"
        />
      </div>

    </section>
  );
}

export default Hero;
