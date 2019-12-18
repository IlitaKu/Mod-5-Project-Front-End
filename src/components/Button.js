import React from "react";

const Button = ({ id, type = "button", onClick, children }) => (
  <button className="recipe_button" id={id} type={type} onClick={onClick}>
    {children}
  </button>
);

export default Button;
