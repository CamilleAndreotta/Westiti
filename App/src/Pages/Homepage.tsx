import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Button from "../Components/Button";

import imageDesktop from "../assets/img/loadingscreen_desktop.webp";
import imageMobile from "../assets/img/loadingscreen_mobile.webp";

import "../styles/homepage.css";
import "../styles/button.css";

const Homepage: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  
  useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      window.addEventListener("resize", handleResize);
  
      // Nettoyage de l'événement lors du démontage
      return () => window.removeEventListener("resize", handleResize);
    }, []);

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
          <img src={isMobile ? imageMobile : imageDesktop} alt="Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
