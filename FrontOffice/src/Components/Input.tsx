import React, { useState } from "react";
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
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const inputType = type === "password" && isPasswordVisible ? "text" : type;

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div
      className={`user__box ${type === "datetime-local" ? "date__input" : ""}`}
    >
      <input
        type={inputType}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <label>{label}</label>
      {/* Ajout du bouton pour afficher/masquer le mot de passe */}
      {type === "password" && (
        <button
          type="button"
          className="input__toggle-password"
          onClick={togglePasswordVisibility}
          aria-label={
            isPasswordVisible
              ? "Masquer le mot de passe"
              : "Afficher le mot de passe"
          }
        >
          {isPasswordVisible ? "👁️" : "👁️‍🗨️"}
        </button>
      )}
    </div>
  );
};

export default Input;
