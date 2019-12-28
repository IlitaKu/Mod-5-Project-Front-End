import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Recipes from "./Recipes";
import Paths from "../Paths";
import Button from "./Button.js";

const FavRecipes = ({ user, setUser }) => {
  const API_KEY = process.env.REACT_APP_API_KEY;
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
  useEffect(() => {
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
      <Recipes
        recipes={favRecipes}
        user={user}
        showButton={false}
        setUser={setUser}
      />
    </div>
  );
};
export default FavRecipes;
