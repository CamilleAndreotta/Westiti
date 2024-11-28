import React from "react";
import { Link } from "react-router-dom";

import Button from "../Components/Button";

import image from "../assets/img/loadingscreen.webp";
import Logo from "../assets/img/logo.webp";

import "../styles/homepage.css";
import "../styles/button.css";

const Homepage: React.FC = () => {
  return (
    <div className="homepage">
      <div className="homepage__box">
        <div className="left__section">
          <h1>Bienvenue sur Westiti</h1>
          <div className="buttons">
            <Link to="/signup">
              <Button className="btn" to="/signup">
                S'inscrire
              </Button>
            </Link>
            <Link to="/signin">
              <Button className="btn" type="button">
                Se connecter
              </Button>
            </Link>
          </div>
        </div>
        <div className="right__section">
          <img src={image} alt="Home" />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
