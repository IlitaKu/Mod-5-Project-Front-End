import React, { useState } from "react";
import Recipes from "./Recipes";

const SearchForm = ({ user }) => {
  const [recipes, setRecipes] = useState([]);
  const API_KEY = "apiKey=3350d3f0b0614e2eaeedb34fcadd6c05";

  const getRecipe = e => {
    const ingredientName = e.target.elements.ingredient.value;
    e.preventDefault();
    fetch(
      `https://api.spoonacular.com/recipes/search?query=${ingredientName}&${API_KEY}`
    )
      .then(resp => resp.json())
      .then(data => setRecipes(data.results));
  };
  return (
    <div>
      <div className="ui search">
        <form onSubmit={getRecipe}>
          <input
            className="prompt"
            type="text"
            name="ingredient"
            placeholder="Ingredient"
          />
          <i class="search icon"></i>
          <button className="form_button">Search</button>
        </form>
      </div>
      <Recipes recipes={recipes} user={user} />
    </div>
  );
};

export default SearchForm;
