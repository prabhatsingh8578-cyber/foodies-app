import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useCart } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Home from "./Pages/Home";
import Restaurants from "./Pages/Restaurants";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Checkout from "./Pages/checkOut";
import Orders from "./Pages/Orders";
import Login from "./Pages/Login";
import Footer from "./components/Footer";

function load(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const { cartItems, clearCart, toast } = useCart();

  const [favorites, setFavorites] = useState(() => load("favorites", []));
  const [orders, setOrders] = useState(() => load("orders", []));
  const [user, setUser] = useState(() => load("user", null));
  const [darkMode, setDarkMode] = useState(() => load("dark", false));
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(darkMode));
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  function handleToggleFav(id) {
    setFavorites(
      favorites.includes(id)
        ? favorites.filter((favId) => favId !== id)
        : [...favorites, id]
    );
  }

  function handlePlaceOrder(details) {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    setOrders([
      {
        id: Date.now(),
        date: new Date().toLocaleString(),
        items: cartItems,
        total,
        name: details.name,
        address: details.address,
      },
      ...orders,
    ]);

    clearCart();
  }

  return (
     <div className="app-wrapper">
      <Navbar
        onCartClick={() => setShowCart(true)}
        user={user}
        onLogout={() => setUser(null)}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(!darkMode)}
      />
       <main className="main-content">
      <Routes>
        <Route
          path="/"
          element={<Home favorites={favorites} onToggleFav={handleToggleFav} />}
        />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/orders" element={<Orders orders={orders} />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route
          path="/checkout"
          element={
            user ? (
              <Checkout onPlaceOrder={handlePlaceOrder} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
      </main>
      <Footer></Footer>

      {showCart && <Cart onClose={() => setShowCart(false)} />}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}

export default App;