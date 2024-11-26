import React from "react";
import "../styles/input.css";

interface InputProps {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  required?: boolean;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  value,
  onChange,
  label,
  required = false,
  placeholder,
}) => {
  return (
    <div
      className={`user__box ${type === "datetime-local" ? "date__input" : ""}`}
    >
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <label>{label}</label>
    </div>
  );
};

export default Input;
