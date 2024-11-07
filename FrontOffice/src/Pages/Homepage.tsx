import React from "react";
import image from "../assets/img/loadingscreen.webp";
import "../styles/homepage.css";
import Button from "../Components/Button";
import { Link } from "react-router-dom";

const Homepage: React.FC = () => {
  return (
    <div className="homepage">
      <div className="homepage__box">
        <div className="left__section">
          <h1>Bienvenue sur Westiti</h1>
          <div className="buttons">
            <Button className="btn" to="/signup">
              S'inscrire
            </Button>
            <Link to="/signin">
              <Button className="btn">Se connecter</Button>
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
