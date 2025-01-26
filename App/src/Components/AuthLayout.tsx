import React from "react";
import { Link } from "react-router-dom";

import image from "../assets/img/loadingscreen.webp";
import BackArrowIcon from "../assets/img/back-arrow.svg";
import "../styles/homepage.css";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className="homepage">
      <div className="homepage__box">
        <div className="back__arrow">
          <Link to="/">
            <img src={BackArrowIcon} alt="Retour à l'accueil" />
          </Link>
        </div>
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
