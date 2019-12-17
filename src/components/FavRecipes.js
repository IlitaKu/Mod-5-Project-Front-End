import React, { useState, useEfect } from "react";
import { useHistory } from "react-router-dom";
import Recipes from "./Recipes";
const FavRecipes = ({ user }) => {
  const API_KEY = "apiKey=3350d3f0b0614e2eaeedb34fcadd6c05";
  const [favRecipes, setFavRecipes] = useState([]);
  let history = useHistory();

  const getFavRecipes = () => {
    const ids = user.user_recipes;
    const idsArray = ids.map(id => id.spoonacular_id);
    const callIds = idsArray.join(",");
    const fetchFavRecipes = fetch(
      `https://api.spoonacular.com/recipes/informationBulk?ids=${callIds}&${API_KEY}`
    )
      .then(resp => resp.json())
      .then(data => setFavRecipes(data));
    // history.pushState("/favourites");
    console.log("this", favRecipes);
  };

  return (
    <div>
      <button className="view-fav-recipes" onClick={getFavRecipes}>
        View Favs
      </button>
      <Recipes recipes={favRecipes} />
    </div>
  );
};
export default FavRecipes;
