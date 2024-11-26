// Header.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../assets/img/logo.webp";

import "../styles/header.css";
import useToast from "../Hooks/useToast";

const Header: React.FC = () => {
  const { onError, onSuccess } = useToast();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [userIsConnected, setUserIsConnected] = useState(
    localStorage.getItem("isConnected")
  );
  const navigate = useNavigate();

  const handleMenuToggle = (): void => {
    setMenuIsOpen(!menuIsOpen);
  };

  const handleLogout = async (): Promise<void> => {
    try {
      const response = await fetch(
        `http://localhost:3000/auth/logout/${localStorage.getItem("userId")}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          

        }
      );
      const data = await response.json();
      console.log(data);

      if (response.status !== 200) {
        onError("Une erreur s'est produite pendant la déconnexion");
        return;
      }
      onSuccess("Déconnexion réussie");
      localStorage.clear();
      setMenuIsOpen(false);
      setUserIsConnected(null);
      navigate("/");
    } catch (error) {
      onError("Erreur lors de la déconnexion");
      console.log(error, "Logout");
    }
  };

  return (
    <div className={`header ${menuIsOpen ? "menu-open" : ""}`}>
      <Link to="/" className="logo">
        <img src={Logo} alt="logo" />
      </Link>

      <div className="menu-icon" onClick={handleMenuToggle}>
        {/* L'icône du menu sera stylisée avec CSS */}
      </div>

      <nav className="nav">
        <ul className="pt-5">
          {userIsConnected ? (
            <li>
              <Link
                to={`/profile/${localStorage.getItem("userId")}`}
                onClick={handleMenuToggle}
              >
                {localStorage.getItem("username")}
              </Link>
            </li>
          ) : (
            <li>
              <Link to={`/signin`} onClick={handleMenuToggle}>
                Se connecter
              </Link>
            </li>
          )}

          <li>
            <Link
              to={`/events/${localStorage.getItem("userId")}`}
              onClick={handleMenuToggle}
            >
              Mes événements
            </Link>
          </li>
          <li>
            <Link to={`/join-an-event`} onClick={handleMenuToggle}>
              Rejoindre un événement
            </Link>
          </li>
          <li>
            <Link to={`/register-new-event`} onClick={handleMenuToggle}>
              Créer un nouvel événement
            </Link>
          </li>
          {userIsConnected && (
            <li
              onClick={() => {
                handleMenuToggle();
                handleLogout();
              }}
            >
              Déconnexion
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
