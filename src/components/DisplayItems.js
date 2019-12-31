import React from "react";
const DisplayItems = ({ ingredient, dates, onClick }) => {
  return (
    <li className="list_item">
      <div className="item_wrapper">
        {ingredient} - added on: {dates}
        <span class="close" role="button" onClick={onClick}>
          &times;
        </span>
      </div>
    </li>
  );
};
export default DisplayItems;
