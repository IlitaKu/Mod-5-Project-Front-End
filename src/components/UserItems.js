import React, { useState, useEffect } from "react";
import DisplayItems from "./DisplayItems";

const UserItems = ({ user }) => {
  const [ingredient, setIngredient] = useState([]);

  useEffect(() => {
    const getItem = () => {
      fetch("http://localhost:3000/api/v1/ingredients")
        .then(resp => resp.json())
        .then(data => setIngredient(data));
    };
    getItem();
  }, []);

  const saveIngredient = e => {
    e.preventDefault();
    console.log(e.target.elements.fridgerItems.value);
    fetch("http://localhost:3000/api/v1/ingredients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user_id: user.id,
        name: e.target.elements.fridgerItems.value
      })
    });
  };

  return (
    <div>
      <div className="ui search">
        <form onSubmit={saveIngredient}>
          <input
            className="prompt"
            type="text"
            name="fridgerItems"
            placeholder="Fridger item"
          />
          <button className="form_button">Add</button>
        </form>
      </div>
      <DisplayItems ingredient={ingredient} />
    </div>
  );
};

export default UserItems;
