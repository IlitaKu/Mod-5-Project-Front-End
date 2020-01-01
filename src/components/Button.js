import React from "react";

const Button = ({
  id,
  type = "button",
  onClick,
  children,
  disabled = false
}) => (
  <button
    className="recipe_button"
    id={id}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
