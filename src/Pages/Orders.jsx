import "./Orders.css";

function Orders({ orders }) {
  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p className="no-orders">No orders yet 📦</p>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order.id}>
            <div className="order-head">
              <span>Order #{String(order.id).slice(-6)}</span>
              <span>{order.date}</span>
            </div>

            {order.items.map((item) => (
              <div className="order-row" key={item.id}>
                <span>{item.name} × {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}

            <div className="order-row order-total">
              <span>Total</span>
              <span>₹{order.total}</span>
            </div>

            <p className="order-addr">📍 {order.address}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;