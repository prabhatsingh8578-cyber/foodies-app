import { useState } from "react";
import { Link } from "react-router-dom";
import "./Checkout.css";
import { useCart } from "../context/CartContext";

function Checkout({onPlaceOrder }) {
   const { cartItems } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setOrderPlaced(true);
    onPlaceOrder(form);
  }

  if (orderPlaced) {
    return (
      <div className="checkout success">
        <h1>🎉 Order Placed!</h1>
        <p>Thank you, {form.name}. Your food will arrive soon.</p>
        <Link to="/" className="back-btn">Back to Home</Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout success">
        <h1>Your cart is empty 🛒</h1>
        <Link to="/" className="back-btn">Order Something</Link>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h1>Checkout</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3>Delivery Details</h3>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <textarea
            name="address"
            placeholder="Full Address"
            rows="3"
            value={form.address}
            onChange={handleChange}
            required
          />

          <button type="submit">Place Order</button>
        </form>

        <div className="order-summary">
          <h3>Order Summary</h3>

          {cartItems.map((item) => (
            <div className="summary-row" key={item.id}>
              <span>{item.name} × {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}

          <div className="summary-row total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;