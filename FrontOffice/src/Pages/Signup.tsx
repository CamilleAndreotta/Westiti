import { useState } from "react";
import passwordValidator from "password-validator";
import { Link } from "react-router-dom";
import validator from 'validator'
import Layout from "../Components/Layout";
import Button from "../Components/Button";
import Input from "../Components/Input";

import "../styles/signup.css";
import "aos/dist/aos.css";

type UserSignupProps = {
  email: string;
  password: string;
  password_confirmation: string;
  username: string;
};
const Signup = () => {
  const [signup, setSignup] = useState<UserSignupProps>({
    email: "",
    password: "",
    password_confirmation: "",
    username: "",
  });

  const testPasswordSecurity = (password: string) => {
    // Create a new instance of passwordValidator
    var schema = new passwordValidator();

    // Add properties to it
    schema
      .is()
      .min(12) // Minimum length 12
      .is()
      .max(100) // Maximum length 100
      .has()
      .uppercase() // Must have uppercase letters
      .has()
      .lowercase() // Must have lowercase letters
      .has()
      .digits(1)// Must have at least 1 digit
      .has()
      .symbols(1) // Must have at least 1 symbol
      .has()
      .not()
      .spaces() // Should not have spaces
      .is()
      .not()
      .oneOf(["Passw0rd", "Password123", '1234', 'azerty']); // Blacklist these values

    console.log(schema.validate(signup.password));
    if (!schema.validate(password)) {
      console.log(
        "Le mot de passe ne correspond pas aux prérequis de sécurité"
      );
      return false;
    }
    return true;
  };

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignup((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const testUserPassword = testPasswordSecurity(signup.password);
    if (!testUserPassword) {
      throw new Error(
        "Le mot de passe ne correspond pas aux prérequis de sécurité"
      );
    }
    const testUserEmail = validator.isEmail(signup.email);
    if (!testUserEmail) {
      throw new Error("L'email n'est pas valide");
    }
    console.log(e);
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
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signup),
      });
      const data = await response.json();
      console.log(data);

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
              type="text"
              placeholder="Nom d'utilisateur"
              name="username"
              value={signup.username}
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
          <div className="signup__account-exist">
            <Link to="/signin">
              <p>Vous avez déjà un compte ? </p>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
