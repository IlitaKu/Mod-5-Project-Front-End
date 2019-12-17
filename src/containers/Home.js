import React, { Component } from "react";
import SearchForm from "../components/SearchForm";
import FavRecipes from "../components/FavRecipes";
import UserItems from "../components/UserItems";
import API from "../adapters/API";
// import Recipe from "../components/Recipe";
// import { Route, Redirect } from "react-router-dom";
import Paths from "../Paths";
// import RecipeInfo from "../components/RecipeInfo";
import { useHistory } from "react-router-dom";

// const API_KEY = "apiKey=3350d3f0b0614e2eaeedb34fcadd6c05";
const Home = ({ user }) => {
  let history = useHistory();
  console.log(user);
  return (
    <div>
      <SearchForm user={user} />
      {/* <Recipes recipes={this.state.recipes} user={user} /> */}
      <button
        className="back-to-recipes"
        onClick={() => history.push("/favourites")}
      >
        View fav
      </button>
      <button
        className="back-to-recipes"
        onClick={() => history.push("/fridger")}
      >
        View your items
      </button>
    </div>
  );
};

export default Home;
