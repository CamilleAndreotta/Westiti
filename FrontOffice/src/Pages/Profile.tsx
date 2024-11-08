import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../Components/Layout";
import Modale from "../Components/Modale";

import "../styles/profile.css";
import "../styles/modale.css";
import Button from "../Components/Button";

const Profile: FC = () => {
  type UserProps = {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [user, setUser] = useState<UserProps>({
    id: "",
    name: "",
    email: "",
    avatar: "",
  });
  useEffect(() => {
    const isConnected = localStorage.getItem("isConnected");

    const userID = localStorage.getItem("userId");
    const name = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const avatar = localStorage.getItem("avatar");
    console.log(isConnected);

    setUser({
      ...user,
      id: userID,
      name: name,
      email: email,
      avatar:
        "https://t3.ftcdn.net/jpg/01/26/91/78/360_F_126917812_XlWgkaV9f81Hde4wvmvJWM3huJRvy5EM.webp",
    });
    //vérifier si l'utilisateur est connecté
    if (isConnected === "false") {
      navigate("/");
    }
  }, []);

  const openModale = (e: any): void => {
    e.preventDefault();
    setModalIsOpen(!modalIsOpen);
  };
  return (
    <Layout>
      <div className="profile">
        <div className="profile__container">
          <img src={user.avatar} alt="user avatar" />
          <div className="profile__user-info">
            <div>
              Nom de l'utilisateur:
              <span className="profile__user-info__name">{user?.name}</span>
            </div>
            <div>
              Email:
              <span className="profile__user-info__email">{user?.email}</span>
            </div>
          </div>
          
        </div><Button
            type="button"
            className="btn profile__delete-account"
            onClick={(e) => openModale(e)}
          >
            Supprimer mon compte ?
          </Button>
      </div>
      {modalIsOpen && <Modale />}
    </Layout>
  );
};

export default Profile;
