import React, { useState, useEffect } from "react";
import DisplayItems from "./DisplayItems";
import Input from "./Input";
import Button from "./Button.js";
import { useHistory } from "react-router-dom";
import moment from "moment";

const API_ENDPOINT =
  process.env.REACT_APP_API_ENDPOINT || "http://localhost:3000/api/v1/";

const UserItems = ({ user, setUser }) => {
  let history = useHistory();
  const [ingredient, setIngredient] = useState(user.ingredients);
  useEffect(() => {
    setUser({ ...user, ingredients: ingredient });
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
            dates={moment(item.created_at).fromNow()}
            onClick={() => deleteItem(item.id)}
          />
        );
      })
    ) : (
      <div>No items added to the fridger</div>
    );

  const saveIngredient = async e => {
    e.preventDefault();
    // e.target.reset();
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
      .then(e.target.reset());
  };

  return (
    <div>
      <div className="display-text">
        <h1 className="header">Eat while good</h1>
        <div className="sub-header">
          Add the items to fridger section.<br></br>
          Search for personalised recipes based on your fridger content, so the
          question "what's for dinner?" is answered before it's even asked.
        </div>
      </div>
      <div className="ui search">
        <form onSubmit={saveIngredient}>
          <Input
            className="prompt"
            type="text"
            name="fridgerItems"
            placeholder="Fridger item"
          />
          <Button type="submit" className="form_button">
            <i class="plus circle icon"></i>
            Add to fridger
          </Button>
        </form>
      </div>

      <ul className="ingredients_list card">{list}</ul>
      {ingredient.length > 0 && (
        <Button
          id="personalised-recipe-button"
          className="suggestions-button"
          onClick={() => history.push("/suggestions")}
        >
          <i class="fas fa-carrot"></i>
          Personalised Recepes
        </Button>
      )}
    </div>
  );
};

export default UserItems;
