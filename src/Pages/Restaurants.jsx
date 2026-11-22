import { useState } from "react";
import "./Restaurants.css";

function Restaurants() {
  const [cuisine, setCuisine] = useState("All");

  const cuisines = ["All", "Fast Food", "Indian", "Italian"];

  const restaurants = [
    { id: 1, name: "Burger Hub", cuisine: "Fast Food", rating: 4.3, time: "25-30 min", emoji: "🍔" },
    { id: 2, name: "Biryani House", cuisine: "Indian", rating: 4.6, time: "30-40 min", emoji: "🍛" },
    { id: 3, name: "Pizza Corner", cuisine: "Italian", rating: 4.2, time: "20-25 min", emoji: "🍕" },
    { id: 4, name: "Sandwich Point", cuisine: "Fast Food", rating: 4.0, time: "15-20 min", emoji: "🥪" },
    { id: 5, name: "Pasta Palace", cuisine: "Italian", rating: 4.4, time: "25-35 min", emoji: "🍝" },
    { id: 6, name: "Spice Garden", cuisine: "Indian", rating: 4.5, time: "30-35 min", emoji: "🍲" }
  ];

  const filtered =
    cuisine === "All"
      ? restaurants
      : restaurants.filter((r) => r.cuisine === cuisine);

  return (
    <div className="restaurants-page">
      <h1>Our Restaurants</h1>
      <p className="rest-sub">Best restaurants near you</p>

      <div className="rest-filters">
        {cuisines.map((c) => (
          <button
            key={c}
            className={cuisine === c ? "cat-btn active" : "cat-btn"}
            onClick={() => setCuisine(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="rest-grid">
        {filtered.map((r) => (
          <div className="rest-card" key={r.id}>
            <div className="rest-emoji">{r.emoji}</div>
            <h3>{r.name}</h3>
            <span className="rest-cuisine">{r.cuisine}</span>

            <div className="rest-meta">
              <span>⭐ {r.rating}</span>
              <span>🕒 {r.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Restaurants;