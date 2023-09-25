import React from "react";
import { Input } from "reactstrap";

export default function TextInput({
  value,
  onChange,
  name,
  placeholder,
  type,
  className = "",
}) {
  return (
    <Input
      value={value}
      onChange={onChange}
      name={name}
      placeholder={placeholder}
      type={type}
      className={className}
    />
  );
}
