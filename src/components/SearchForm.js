import React, { useState } from "react";
import Recipes from "./Recipes";
import Input from "./Input";
import Button from "./Button.js";
const SearchForm = ({ user, setUser }) => {
  console.log("4 component from search", user);
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
          <Input
            className="prompt"
            type="text"
            name="ingredient"
            placeholder="Ingredient"
          />
          <Button type="submit" className="form_button">
            <i class="search icon"></i>
            Search
          </Button>
        </form>
      </div>
      <Recipes recipes={recipes} user={user} setUser={setUser} />
    </div>
  );
};

export default SearchForm;
