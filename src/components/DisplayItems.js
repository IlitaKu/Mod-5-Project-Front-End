import React from "react";
const DisplayItems = ({ ingredient, onClick }) => {
  return (
    <li className="list_item">
      <div className="item_wrapper">
        {ingredient}
        <span class="close" role="button" onClick={onClick}>
          &times;
        </span>
      </div>
    </li>
  );
};
export default DisplayItems;
