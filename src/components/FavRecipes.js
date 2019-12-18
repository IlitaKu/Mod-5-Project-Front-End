import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Recipes from "./Recipes";
import Paths from "../Paths";
import Button from "./Button.js";

const FavRecipes = ({ user, setUser }) => {
  console.log("5 component frim fav recioes", user);
  const API_KEY = "apiKey=3350d3f0b0614e2eaeedb34fcadd6c05";
  const [favRecipes, setFavRecipes] = useState([]);
  let history = useHistory();

  const getFavRecipes = () => {
    const faveRecipiesIds = user.user_recipes.map(user => user.spoonacular_id);
    const uniqArr = [...new Set(faveRecipiesIds)];
    const callIds = uniqArr.join(",");
    console.log(callIds);
    fetch(
      `https://api.spoonacular.com/recipes/informationBulk?ids=${callIds}&${API_KEY}`
    )
      .then(resp => resp.json())
      .then(data => {
        setFavRecipes(data);
        history.push(Paths.FAVOURITES);
      });
  };
  console.log("fdfdgfhhfdsdfsgdhfdsfghds", user);
  useEffect(() => {
    console.log("fave items", user);
    if (favRecipes.length === 0 && user.user_recipes.length > 0) {
      getFavRecipes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      {/* state tooge of an on */}
      <Button
        className="back-to-recipes"
        onClick={() => history.push("/recipes")}
      >
        Back
      </Button>
      <Recipes recipes={favRecipes} user={user} />
    </div>
  );
};
export default FavRecipes;
