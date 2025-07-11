import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import passwordValidator from "password-validator";
import { Link, useNavigate } from "react-router-dom";
import useToast from "../Hooks/useToast";
import validator from "validator";
import Button from "../Components/Button";
import Input from "../Components/Input";
import AuthLayout from "../Components/AuthLayout";
import { useLoader } from "../contexts/LoaderContext";

import "../styles/signup.scss";
import "../styles/input.css";
import "../styles/button.css";
import "aos/dist/aos.css";
import { submitLogin } from "../Utils/user.fonction";

type UserSignupProps = {
  email: string;
  password: string;
  password_confirmation: string;
  username: string;
};
const Signup = () => {
  const { onSuccess, onError } = useToast();
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader(); // Utilisation du hook LoaderContext
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
      .digits(1) // Must have at least 1 digit
      .has()
      .symbols(1) // Must have at least 1 symbol
      .has()
      .not()
      .spaces() // Should not have spaces
      .is()
      .not()
      .oneOf(["Passw0rd", "Password123", "1234", "azerty"]); // Blacklist these values
    if (!schema.validate(password)) {
      onError("Le mot de passe ne correspond pas aux prérequis de sécurité");
      return false;
    }
    return true;
  };

  const inputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSignup((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const testUserPassword: boolean = testPasswordSecurity(signup.password);
    if (!testUserPassword) {
      onError("Le mot de passe ne correspond pas aux prérequis de sécurité");
      throw new Error(
        "Le mot de passe ne correspond pas aux prérequis de sécurité"
      );
    }
    const testUserEmail: boolean = validator.isEmail(signup.email);
    if (!testUserEmail) {
      onError("L'email n'est pas valide");
      throw new Error("L'email n'est pas valide");
    }

    if (!signup.password || !signup.password_confirmation) {
      onError("Pas de mots de passe rentré");
      return;
    }

    if (signup.password !== signup.password_confirmation) {
      onError("Les mots de passe ne correspondent pas");
      return;
    }

    if (!signup.email) {
      onError("Pas d'email");
      return;
    }

    try {
      showLoader(); // Active le loader
      const body = {
        password: signup.password,
        email: signup.email,
        name: signup.username,
      };
      const response: AxiosResponse = await axios.post(
        `${import.meta.env.VITE_DEV_API_URL}/auth/register`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("isConnected", "true");
      localStorage.setItem("userId", response.data.id);
      localStorage.setItem("username", response.data.name);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("avatar", response.data.avatar);
      onSuccess("Compte créé avec succès.");
      
      // type LoginUser = {
      //   status: number;
      //   data: {
      //     id: string;
      //     name: string;
      //     access_token: string;
      //   };
      // };
      
      const loginUser
        :any
        = await submitLogin(
        e,
        signup.password,
        signup.email
      );


      if (loginUser && loginUser.status === 201) {
        localStorage.setItem("email", signup.email);
        localStorage.setItem("userId", loginUser.data.id);
        localStorage.setItem("access_token", loginUser.data.access_token);
        hideLoader();
        navigate(`/dashboard/${response.data.id}`);
      }
    } catch (error) {
      onError("Erreur:" + error);
      console.log("Erreur:", error);
      hideLoader();
    }
  };

  return (
    <AuthLayout title="Inscription">
      <form onSubmit={(e) => submit(e)}>
        <Input
          type="text"
          name="email"
          label="E-mail"
          value={signup.email}
          onChange={inputChange}
          required
        />
        <Input
          type="text"
          name="username"
          label="Nom d'utilisateur"
          value={signup.username}
          onChange={inputChange}
          required
        />
        <Input
          type="password"
          name="password"
          label="Mot de passe"
          value={signup.password}
          onChange={inputChange}
          required
        />
        <Input
          type="password"
          name="password_confirmation"
          label="Confirmer le mot de passe"
          value={signup.password_confirmation}
          onChange={inputChange}
          required
        />
        <p className="signup__text">
          Vous avez déjà un compte ?{" "}
          <Link to="/signin" className="signup__link">
            Connectez-vous
          </Link>
        </p>
        <Button className="btn" type="submit" /*  disabled={userInfoAreOk()} */>
          Créer son compte
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Signup;
