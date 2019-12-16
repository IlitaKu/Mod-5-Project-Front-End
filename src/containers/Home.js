import React, { Component } from "react";
import SearchForm from "../components/SearchForm";
import Recipes from "../components/Recipes";
// import Recipe from "../components/Recipe";
// import { Route, Redirect } from "react-router-dom";
// import Paths from "../Paths";
// import RecipeInfo from "../components/RecipeInfo";
// import { useHistory } from "react-router-dom";

const API_KEY = "apiKey=3350d3f0b0614e2eaeedb34fcadd6c05";
class Home extends Component {
  state = {
    recipes: []
  };
  //   component did mount to find suggestions-based on ingredients/ if no ingredients than random
  getRecipe = async e => {
    const ingredientName = e.target.elements.ingredient.value;
    e.preventDefault();
    const query = await fetch(
      `https://api.spoonacular.com/recipes/search?query=${ingredientName}&${API_KEY}`
    );

    const data = await query.json();
    this.setState({ recipes: data.results });
    console.log(this.state.recipes);
  };
  render() {
    const { user } = this.props;
    console.log("home", user);
    return (
      <div>
        <SearchForm getRecipe={this.getRecipe} />
        <Recipes recipes={this.state.recipes} user={user} />
      </div>
    );
  }
}

export default Home;
