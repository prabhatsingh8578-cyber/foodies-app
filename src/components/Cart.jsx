import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart({ onClose }) {
  const navigate = useNavigate();
  const {cartItems, increase, decrease, remove } = useCart();
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-panel" onClick={(e) => e.stopPropagation()}>

        <div className="cart-header">
          <h2>My Cart 🛒</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {cartItems.length === 0 ? (
          <p className="cart-empty">Your cart is empty</p>
        ) : (
          <>
            <div className="cart-list">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p>₹{item.price}</p>

                    <div className="qty">
                      <button onClick={() => decrease(item.id)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increase(item.id)}>+</button>
                    </div>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => remove(item.id)}
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-total">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button className="checkout-btn"
             onClick={() => {
              onClose();
             navigate("/checkout");
            }}
            >
             Checkout
              </button>
          </>
        )}

      </div>
    </div>
  );
}

export default Cart;