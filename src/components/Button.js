import React from "react";

const Button = ({
  id,
  type = "button",
  onClick,
  className,
  children,
  disabled = false
}) => (
  <button
    className={`recipe_button ${className}`}
    id={id}
    type={type}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
