import React from "react";
import "../styles/input.css";

interface InputProps {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  value,
  onChange,
  label,
  required = false,
}) => {
  return (
    <div className="user__box">
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
      />
      <label>{label}</label>
    </div>
  );
};

export default Input;
