import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../Assets/Img/logo.webp";
import BurgerMenuClosed from "../Assets/Img/burger-menu-svgrepo-com.svg";
import BurgerMenuOpen from "../Assets/Img/close-svgrepo-com.svg";

import "../styles/header.css";

const Header = () => {
  const [menuBurgerIsOpen, setMenuBurgerIsOpen] = useState(false);
  const [userIsConnected, setUserIsConnected] = useState(false);
  
  const navigate = useNavigate();

  const userName: string = "John Doe";
  const userId: number = 1;

  const handleMenuBurger = (): void => {
    setMenuBurgerIsOpen(!menuBurgerIsOpen);
  };
  const handleLogout = async (): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:3000/logout/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status !== 200) {
        console.log("Une erreur s'est produite pendant la déconnexion");
        return;
      }
      console.log("L'utilisateur a été déconnecté");

      navigate("/");
      console.log(data);
    } catch (error) {
      console.log(error, "Logout");
    }
  };
  return (
    <div className="header">
      <div className="header__container">
        <img className="header__logo" src={Logo} alt="logo" />
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
                  <Link to={`/profile/${userId}`}>{userName}</Link>
                </li>
              ) : (
                <li className="header__list-item">
                  <Link to={`/signin`}>Se connecter</Link>
                </li>
              )}

              <li className="header__list-item">
                <Link to={`/my-events/${userId}`}>Mes événements</Link>
              </li>
              <li className="header__list-item">
                <Link to={`/register-to-an-event`}>Rejoindre un événement</Link>
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
