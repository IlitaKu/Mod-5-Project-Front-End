import React, { useState, useEffect } from "react";
import Recipes from "./Recipes";
const API_KEY = process.env.REACT_APP_API_KEY;

const Suggestions = ({ user, setUser }) => {
  const [userIngredients, setUserIngredients] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    setUserIngredients(user.ingredients);
    const ingArr = userIngredients.map(i => i.name);
    const coppyOfAr = [...ingArr.slice(0, 3)];
    const queryApi = coppyOfAr.join(",+");
    fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${queryApi}&${API_KEY}`
    )
      .then(data => data.json())
      .then(data => setSuggestions(data));
  }, [user.ingredients, userIngredients]);
  return (
    <div>
      <Recipes recipes={suggestions} user={user} setUser={setUser} />
    </div>
  );
};

export default Suggestions;
