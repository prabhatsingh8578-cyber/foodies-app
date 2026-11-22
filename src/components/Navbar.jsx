import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Navbar.css";
import Logo from "../assets/Logo.png";

function Navbar({ onCartClick, user, onLogout, darkMode, onToggleDark }) {
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
    <Link to="/" className="logo-wrap">
  <img src={Logo} alt="Foodies - Good Food, Good Mood" className="logo-img" />
</Link>

      <ul
        className={menuOpen ? "nav-links open" : "nav-links"}
        onClick={() => setMenuOpen(false)}
      >
        <li><Link to="/">Home</Link></li>
        <li><Link to="/restaurants">Restaurants</Link></li>
        <li><Link to="/orders">Orders</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className="nav-right">
        <button className="icon-btn" onClick={onToggleDark}>
          {darkMode ? "☀️" : "🌙"}
        </button>

        {user ? (
          <>
            <span className="user-name">Hi, {user.name}</span>
            <button className="icon-btn" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="login-link">Login</Link>
        )}

        <button className="cart-btn" onClick={onCartClick}>
          🛒 ({cartCount})
        </button>
      </div>

      <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✕" : "☰"}
      </button>
    </nav>
  );
}

export default Navbar;