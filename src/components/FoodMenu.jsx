import { useState, useEffect } from "react";
import FoodCard from "./FoodCard";
import { useCart } from "../context/CartContext";
import "./FoodMenu.css";

const API_URL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
const API_CATEGORIES = ["Chicken", "Pasta", "Dessert", "Vegetarian", "Seafood"];

function FoodMenu({ favorites, onToggleFav }) {
  const { addToCart } = useCart();

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  const [selected, setSelected] = useState("All");
  const [search, setSearch] = useState("");

  const categories = ["All", ...API_CATEGORIES, "Favorites"];

  useEffect(() => {
    let ignore = false;

    async function loadFoods() {
      try {
        const results = await Promise.all(
          API_CATEGORIES.map(async (cat) => {
            const res = await fetch(API_URL + cat);
            if (!res.ok) throw new Error("Network error");
            const data = await res.json();

            return data.meals.slice(0, 8).map((meal) => ({
              id: meal.idMeal,
              name: meal.strMeal,
              category: cat,
              description: `Tasty ${cat.toLowerCase()} dish`,
              price: 99 + (Number(meal.idMeal) % 10) * 20,
              image: meal.strMealThumb,
            }));
          }),
        );

        if (!ignore) setFoods(results.flat());
      } catch {
        if (!ignore) setError("Could not load food. Please try again.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadFoods();

    return () => {
      ignore = true;
    };
  }, [retry]);

  function handleRetry() {
    setError("");
    setLoading(true);
    setRetry((r) => r + 1);
  }

  const filteredFoods = foods.filter((food) => {
    const matchCategory =
      selected === "All" ||
      (selected === "Favorites"
        ? favorites.includes(food.id)
        : food.category === selected);

    const matchSearch = food.name.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <section className="food-menu" id="menu">
      <h2>Our Popular Foods</h2>
      <p>Explore our delicious food menu</p>

      <input
        type="text"
        className="search-input"
        placeholder="Search food..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={selected === cat ? "cat-btn active" : "cat-btn"}
            onClick={() => setSelected(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && (
        <div className="food-container">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div className="skeleton-card" key={n}>
              <div className="skeleton skeleton-img"></div>

              <div className="skeleton-body">
                <div className="skeleton skeleton-line"></div>
                <div className="skeleton skeleton-line short"></div>
                <div className="skeleton skeleton-line"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="status">
          <p>{error} 😕</p>
          <button className="retry-btn" onClick={handleRetry}>
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="food-container">
          {filteredFoods.length === 0 && (
            <p className="no-result">No food found 😕</p>
          )}

          {filteredFoods.map((food) => (
            <FoodCard
              key={food.id}
              id={food.id}
              name={food.name}
              description={food.description}
              price={food.price}
              image={food.image}
              onAddToCart={addToCart}
              isFav={favorites.includes(food.id)}
              onToggleFav={onToggleFav}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default FoodMenu;
