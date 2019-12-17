import React, { useState, useEffect } from "react";
import DisplayItems from "./DisplayItems";

const UserItems = ({ user }) => {
  console.log("fridger", user);
  const [ingredient, setIngredient] = useState(user.ingredients);

  const list = ingredient.map(item =>
    item ? (
      <DisplayItems ingredient={item.name} />
    ) : (
      <div>No items added to the fridger</div>
    )
  );

  const saveIngredient = async e => {
    e.preventDefault();
    const item = e.target.elements.fridgerItems.value;
    const newIngred = await fetch("http://localhost:3000/api/v1/ingredients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user_id: user.id,
        name: item
      })
    });

    if (newIngred.status === 200) {
      setIngredient([...ingredient, { name: item }]);
    }
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
      {list}
    </div>
  );
};

export default UserItems;
