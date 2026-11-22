import Hero from "../components/Hero";
import FoodMenu from "../components/FoodMenu";

function Home({ favorites, onToggleFav }) {
  return (
    <>
      <Hero />
      <FoodMenu
        favorites={favorites}
        onToggleFav={onToggleFav}
      />
    </>
  );
}

export default Home;