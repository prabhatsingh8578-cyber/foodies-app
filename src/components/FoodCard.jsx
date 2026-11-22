function FoodCard({ id, name, description, price, image, onAddToCart, isFav, onToggleFav }) {
  return (
    <div className="food-card">
      <div className="img-wrap">
        <img src={image} alt={name} />
        <button className="fav-btn" onClick={() => onToggleFav(id)}>
          {isFav ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="food-info">
        <h3>{name}</h3>
        <p>{description}</p>

        <div className="food-bottom">
          <h3>₹{price}</h3>
          <button onClick={() => onAddToCart({ id, name, price, image })}>
            Add +
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
