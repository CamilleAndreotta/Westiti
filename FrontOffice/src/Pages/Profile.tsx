import { FC, useEffect, useState } from "react";
import Layout from "../Components/Layout";
import "../styles/profile.css";
import { useNavigate } from "react-router-dom";
import Modale from "../Components/Modale";

const Profile: FC = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  useEffect(() => {
    // vérifier si l'utilisateur est connecté
    /* if (!localStorage.getItem("isConnected")) {
      navigate("/");
    } */
  }, []);

  const openModale = (e: any): void => {
    e.preventDefault();
    setModalIsOpen(!modalIsOpen);
  };
  return (
    <Layout>
      <div className="profile">
        <h1 className="profile__title">Profile</h1>
        <p className="profile__user-info">
          <span className="profile__user-info__name">John Doe</span>
          <span className="profile__user-info__username">@johndoe</span>
          <span className="profile__user-info__email">john@example.com</span>
        </p>
        <p className="profile__delete-account" onClick={(e) => openModale(e)}>
          Delete my account ?
        </p>
      </div>
      {modalIsOpen && <Modale></Modale>}
    </Layout>
  );
};

export default Profile;
