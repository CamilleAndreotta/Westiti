import React from "react";
import { Link } from "react-router-dom";
import image from "../assets/img/loadingscreen.webp";
import "../styles/homepage.css";

const Homepage: React.FC = () => {
  return (
    <div className="homepage">
      <div className="left__section">
        <h1>Bienvenue sur Westiti</h1>
        <div className="buttons">
          <Link to="/signup" className="signup__button">
            Signup
          </Link>
          <Link to="/signin" className="signin__button">
            Signin
          </Link>
        </div>
      </div>
      <div className="right__section">
        <img src={image} alt="Home" />
      </div>
    </div>
  );
};

export default Homepage;
