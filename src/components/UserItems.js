import React, { useState, useEffect } from "react";
import DisplayItems from "./DisplayItems";
import Input from "./Input";
import Button from "./Button.js";
import { useHistory } from "react-router-dom";
const API_ENDPOINT =
  process.env.REACT_APP_API_ENDPOINT || "http://localhost:3000/api/v1/";

const UserItems = ({ user, setUser }) => {
  let history = useHistory();
  const [ingredient, setIngredient] = useState(user.ingredients);

  useEffect(() => {
    setUser({ ...user, ingredients: ingredient });
    console.log("eff", user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredient]);

  const deleteItem = async id => {
    const deleteResponse = await fetch(`${API_ENDPOINT}ingredients/${id}`, {
      method: "DELETE"
    });
    if (deleteResponse.status === 204) {
      setIngredient(ingredient.filter(item => item.id !== id));
    }
  };

  const list =
    ingredient.length > 0 ? (
      ingredient.map(item => {
        return (
          <DisplayItems
            ingredient={item.name}
            onClick={() => deleteItem(item.id)}
          />
        );
      })
    ) : (
      <div>No items added to the fridger</div>
    );

  const saveIngredient = async e => {
    e.preventDefault();
    const item = e.target.elements.fridgerItems.value;
    await fetch(`${API_ENDPOINT}ingredients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user_id: user.id,
        name: item
      })
    })
      .then(function(response) {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then(function(data) {
        setIngredient([...ingredient, data]);
      })
      // .then(function(ingredient) {
      //   setUser({ ...user, ingredients: [...user.ingredients, ingredient] });
      // })
      .then(console.log("is this an array?", ingredient))
      .catch(function(err) {
        console.warn("Something went wrong.", err);
      });
  };

  return (
    <div>
      <div className="ui search">
        <form onSubmit={saveIngredient}>
          <Input
            className="prompt"
            type="text"
            name="fridgerItems"
            placeholder="Fridger item"
          />
          <Button type="submit" className="form_button">
            Add
          </Button>
          <Button
            className="back-to-recipes"
            onClick={() => history.push("/recipes")}
          >
            Back to recipes
          </Button>
        </form>
      </div>

      <ul className="ingredients_list card">{list}</ul>
    </div>
  );
};

export default UserItems;
