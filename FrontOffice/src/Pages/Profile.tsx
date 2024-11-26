import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../Components/Layout";
//import Modale from "../Components/Modale";

import "../styles/profile.css";
import "../styles/modale.css";
import Button from "../Components/Button";
import useToast from "../Hooks/useToast";

import axios from "axios";

const Profile: FC = () => {
  type UserProps = {
    id: null | string;
    name: null | string;
    email: null | string;
    avatar: string | undefined;
  };
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [user, setUser] = useState<UserProps>({
    id: null,
    name: null,
    email: null,
    avatar: undefined,
  });
  const { onError, onSuccess } = useToast();
  useEffect(() => {
    const isConnected = localStorage.getItem("isConnected");

    const userId = localStorage.getItem("userId");
    const name = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const avatar = localStorage.getItem("avatar");
    console.log(isConnected);

    setUser({
      ...user,
      id: userId,
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

  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/user/${localStorage.getItem("userId")}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        onSuccess("Compte supprimé avec succès");
        localStorage.clear();
        navigate("/");
      }
    } catch (error) {
      onError("Une erreur c'est produite pendant la suppression de votre compte");
    }
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
        </div>
        <Button
          type="button"
          className="btn profile__delete-account"
          onClick={(e) => openModale(e)}
        >
          Supprimer mon compte ?
        </Button>
      </div>
      {modalIsOpen && (
        <div className="modale__delete-account">
          <div className="modale__container">
            <Button className="btn" onClick={handleDeleteUser}>
              Oui
            </Button>
            <Button className="btn" onClick={() => setModalIsOpen(false)}>
              Non
            </Button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Profile;
