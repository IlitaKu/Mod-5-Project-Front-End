import React, { useState } from "react";
import DisplayItems from "./DisplayItems";
import Input from "./Input";
import Button from "./Button.js";
import { useHistory } from "react-router-dom";

const UserItems = ({ user }) => {
  let history = useHistory();
  const [ingredient, setIngredient] = useState(user.ingredients);

  const deleteItem = async id => {
    const deleteResponse = await fetch(
      `http://localhost:3000/api/v1/ingredients/${id}`,
      {
        method: "DELETE"
      }
    );
    if (deleteResponse.status === 204) {
      setIngredient(ingredient.filter(item => item.id !== id));
    }
  };

  const list =
    ingredient.length > 0 ? (
      ingredient.map(item => {
        console.log(item);
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
    console.log("some", e.target);
    const item = e.target.elements.fridgerItems.value;
    await fetch("http://localhost:3000/api/v1/ingredients", {
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
        // The API call was successful!
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then(function(data) {
        // This is the JSON from our response
        console.log(data);
        // data = {id: '234', name: 'cucumber'}
        // item = 'cucmber'
        setIngredient([...ingredient, data]);
      })
      .catch(function(err) {
        // There was an error
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
          <Button
            type="submit"
            className="form_button"
            // onClick={saveIngredient}
          >
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
