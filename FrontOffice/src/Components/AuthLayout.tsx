import React from "react";
import image from "../assets/img/loadingscreen.webp";
import "../styles/homepage.css";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className="homepage">
      <div className="homepage__box">
        <div className="left__section">
          <h1>{title}</h1>
          {children}
        </div>
        <div className="right__section">
          <img src={image} alt="Illustration" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
