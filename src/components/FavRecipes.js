import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Recipes from "./Recipes";
import Paths from "../Paths";

const FavRecipes = ({ user, setUser }) => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [favRecipes, setFavRecipes] = useState([]);
  let history = useHistory();

  const getFavRecipes = () => {
    const faveRecipiesIds = user.user_recipes.map(user => user.spoonacular_id);
    const uniqArr = [...new Set(faveRecipiesIds)];
    const callIds = uniqArr.join(",");
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
      <div className="display-text">
        <h1 className="header">Your fave recipes</h1>
        <div className="sub-header">Enjoy them again and again</div>
      </div>
      {favRecipes.length > 0 ? (
        <Recipes
          recipes={favRecipes}
          user={user}
          showButton={false}
          setUser={setUser}
        />
      ) : (
        <div>
          No Recipes added yet, click "Add to favs" while browsing recipes to
          see them here{" "}
        </div>
      )}
    </div>
  );
};
export default FavRecipes;
