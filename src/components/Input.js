import React from "react";

const Input = ({
  type = "text",
  value,
  name,
  disabled,
  ariaLabel,
  placeholder,
  onChange
}) => {
  return (
    <input
      class="input_field"
      type={type}
      value={value === null ? undefined : value}
      name={name}
      disabled={disabled}
      onChange={onChange}
      aria-label={ariaLabel}
      placeholder={placeholder}
    />
  );
};

export default Input;
