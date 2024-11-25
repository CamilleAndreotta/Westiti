import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../Assets/Img/logo.webp";
import BurgerMenuClosed from "../Assets/Img/burger-menu-svgrepo-com.svg";
import BurgerMenuOpen from "../Assets/Img/close-svgrepo-com.svg";

import "../styles/header.css";
import useToast from "../Hooks/useToast";

const Header = () => {
  const { onError, onSuccess } = useToast();
  const [menuBurgerIsOpen, setMenuBurgerIsOpen] = useState(false);
  const [userIsConnected, setUserIsConnected] = useState(
    localStorage.getItem("isConnected")
  );

  const navigate = useNavigate();

  const handleMenuBurger = (): void => {
    setMenuBurgerIsOpen(!menuBurgerIsOpen);
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
      setMenuBurgerIsOpen(false);
      setUserIsConnected(null);
      navigate("/");
    } catch (error) {
      onError("Erreur lors de la déconnexion");
      console.log(error, "Logout");
    }
  };
  return (
    <div className="header">
      <div className="header__container">
        <Link to="/">
          <img className="header__logo" src={Logo} alt="logo" />
        </Link>
        {menuBurgerIsOpen ? (
          <img
            src={BurgerMenuOpen}
            className="header__burger-icon header__burger-icon--open"
            onClick={handleMenuBurger}
            alt="Close menu"
          />
        ) : (
          <img
            src={BurgerMenuClosed}
            className="header__burger-icon header__burger-icon--closed"
            onClick={handleMenuBurger}
            alt="Open menu"
          />
        )}

        {menuBurgerIsOpen && (
          <div className="header__menu header__menu--open" data-aos="fade-down">
            <ul className="header__list">
              {userIsConnected ? (
                <li className="header__list-item">
                  <Link to={`/profile/${localStorage.getItem("userId")}`}>
                    {localStorage.getItem("username")}
                  </Link>
                </li>
              ) : (
                <li className="header__list-item">
                  <Link to={`/signin`}>Se connecter</Link>
                </li>
              )}

              <li className="header__list-item">
                <Link to={`/events/${localStorage.getItem("userId")}`}>
                  Mes événements
                </Link>
              </li>
              <li className="header__list-item">
                <Link to={`/join-an-event`}>Rejoindre un événement</Link>
              </li>
              <li className="header__list-item">
                <Link to={`/register-new-event`}>
                  Créer un nouvel événement
                </Link>
              </li>
              {userIsConnected && (
                <li className="header__list-logout" onClick={handleLogout}>
                  Déconnexion
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
