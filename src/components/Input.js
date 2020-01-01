import React from "react";

const Input = ({
  type = "text",
  value,
  name,
  disabled,
  ariaLabel,
  placeholder,
  onChange,
  onBlur
}) => {
  return (
    <input
      className="input_field"
      type={type}
      value={value === null ? undefined : value}
      name={name}
      disabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
      aria-label={ariaLabel}
      placeholder={placeholder}
    />
  );
};

export default Input;
