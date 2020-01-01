import React from "react";

const Input = ({
  type = "text",
  value,
  name,
  disabled,
  ariaLabel,
  placeholder,
  onChange,
  onBlur,
  className
}) => {
  return (
    <input
      className={`input_field ${className}`}
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
