import React from "react";
import "../styles/button.css";
import { ButtonProps } from "../../src/@types/ButtonProps";

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className = "",
}) => {
  const buttonClasses = `btn ${className}`;

  return (
    <button onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;
