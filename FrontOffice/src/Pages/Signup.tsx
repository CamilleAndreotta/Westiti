import { useState } from "react";
import Layout from "../Components/Layout";

import "../styles/signup.css";
import Button from "../Components/Button";
import Input from "../Components/Input";

const Signup = () => {
  const [signup, setSignup] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignup((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signup.password !== signup.password_confirmation) {
      console.log("Les mots de passe ne correspondent pas");
      return;
    }

    if (!signup.password || !signup.password_confirmation) {
      console.log("Pas de mots de passe rentré");
      return;
    }

    if (!signup.email) {
      console.log("Pas d'email");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signup),
      });
      const data = await response.json();

      if (!response.ok) {
        console.log("Une erreur s'est produite pendant la création du compte");
        return;
      }

      console.log("Compte créé avec succès");
    } catch (error) {
      console.log("Erreur:", error);
    }
  };

  return (
    <Layout>
      <div className="signup">
        <div className="signup__container">
          <form action="submit" className="signup__form" onSubmit={submit}>
            <Input
              type="text"
              placeholder="Email"
              name="email"
              value={signup.email}
              onChange={inputChange}
              className="signup__input"
            />
            <Input
              type="password"
              placeholder="Mot de passe"
              name="password"
              value={signup.password}
              onChange={inputChange}
              className="signup__input"
            />
            <Input
              type="password"
              placeholder="Confirmation du mot de passe"
              name="password_confirmation"
              value={signup.password_confirmation}
              onChange={inputChange}
              className="signup__input"
            />
            <Button
              disabled={
                !signup.email ||
                !signup.password ||
                !signup.password_confirmation
              }
              type="submit" // Utilisation de type="submit" pour le bouton du formulaire
              className="signup__submit"
            >
              Création de compte
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;