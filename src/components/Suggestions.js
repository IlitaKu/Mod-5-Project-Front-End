import React, { useState, useEffect } from "react";
import Recipes from "./Recipes";
const Suggestions = ({ user, setUser }) => {
  const [userIngredients, setUserIngredients] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

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
  return <div>{<Recipes recipes={suggestions} />}</div>;
};

export default Suggestions;
