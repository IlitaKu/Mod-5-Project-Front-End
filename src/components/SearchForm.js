/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Recipes from "./Recipes";
import Input from "./Input";
import Button from "./Button.js";

const SearchForm = ({ user, setUser }) => {
  const [recipes, setRecipes] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;

  // useEffect(() => {
  //   fetch(`https://api.spoonacular.com/recipes/random?number=10&${API_KEY}`)
  //     .then(resp => resp.json())
  //     .then(data => setRecipes(data.recipes));
  // }, []);

  const getRecipe = e => {
    var ingredientName = e.target.elements.ingredient.value;
    e.preventDefault();
    e.target.reset();
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
            placeholder="Blue cheese, broccoli"
          />
          <Button type="submit" className="form_button">
            <i className="search icon"></i>
            Search Recipes
          </Button>
        </form>
      </div>
      <Recipes recipes={recipes} user={user} setUser={setUser} />
    </div>
  );
};

export default SearchForm;
