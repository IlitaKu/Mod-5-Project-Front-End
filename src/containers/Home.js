import React, { Component } from "react";
import SearchForm from "../components/SearchForm";
import FavRecipes from "../components/FavRecipes";
import UserItems from "../components/UserItems";
import API from "../adapters/API";
import Button from "../components/Button";
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
      <Button
        className="back-to-recipes"
        onClick={() => history.push("/favourites")}
      >
        View fav
      </Button>
      <Button
        className="back-to-recipes"
        onClick={() => history.push("/fridger")}
      >
        View your items
      </Button>
    </div>
  );
};

export default Home;
