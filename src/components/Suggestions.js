import React, { useState, useEffect } from "react";
import Recipes from "./Recipes";
import { useHistory } from "react-router-dom";
import Button from "./Button";
const Suggestions = ({ user, setUser }) => {
  const [userIngredients, setUserIngredients] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  let history = useHistory();
  useEffect(() => {
    setUserIngredients(user.ingredients);
    const ingArr = userIngredients.map(i => i.name);
    const coppyOfAr = [...ingArr.slice(0, 3)];
    const queryApi = coppyOfAr.join(",+");
    console.log(queryApi);
    fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${queryApi}&apiKey=3350d3f0b0614e2eaeedb34fcadd6c05`
    )
      .then(data => data.json())
      .then(data => setSuggestions(data));
  }, [user.ingredients, userIngredients]);
  console.log(suggestions);
  return (
    <div>
      <Button
        className="back-to-recipes"
        onClick={() => history.push("/recipes")}
      >
        Back
      </Button>
      <Recipes recipes={suggestions} user={user} setUser={setUser} />
    </div>
  );
};

export default Suggestions;
