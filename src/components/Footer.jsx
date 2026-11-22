import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">

        <div className="footer-col brand">
          <img src={logo} alt="Foodies" className="footer-logo" />
          <p>
            Delicious food from the best restaurants, delivered fast to your
            doorstep.
          </p>

          <div className="socials">
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/restaurants">Restaurants</Link>
          <Link to="/orders">My Orders</Link>
          <Link to="/about">About Us</Link>
        </div>

        <div className="footer-col">
          <h3>Support</h3>
          <Link to="/contact">Contact Us</Link>
          <Link to="/login">Login / Sign Up</Link>
          <Link to="/about">FAQs</Link>
          <Link to="/about">Privacy Policy</Link>
        </div>

        <div className="footer-col">
          <h3>Contact</h3>
          <span>📍 Ranchi, Jharkhand, India</span>
          <span>📞 +916200992980</span>
          <span>✉️ prabhatsingh8578@gmail.com</span>
          <span>🕒 Open: 10 AM - 11 PM</span>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Foodies. All rights reserved.</p>
        <p>Made with ❤️ PRABHAT RAJPUT</p>
      </div>
    </footer>
  );
}

export default Footer;