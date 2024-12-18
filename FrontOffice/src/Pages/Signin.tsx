import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useToast from "../Hooks/useToast";

import Button from "../Components/Button";
import Input from "../Components/Input";
import AuthLayout from "../Components/AuthLayout";

import "../styles/signin.css";
import "../styles/button.css";
import { submitLogin } from "../Utils/user.fonction";

import { useLoader } from "../contexts/LoaderContext";
import { log } from "node:console";

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { onError, onSuccess } = useToast();
  const { showLoader, hideLoader } = useLoader(); // Utilisation du hook Loader

  const handleLogin = async (e: any): Promise<void> => {
    showLoader()
    try {      
      const response = await submitLogin(e, password, email);
      console.log(response);
      if (response !== undefined) {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("isConnected", "true");
        localStorage.setItem("userId", response.data.id);
        localStorage.setItem("username", response.data.username);
        onSuccess("Connexion réussie");
        navigate(`/dashboard/${localStorage.getItem("userId")}`);
        hideLoader()
      }
    } catch (error) {
      console.log(error);
      onError("Erreur lors de la connexion");
      hideLoader()
    }
  };
  return (
    <AuthLayout title="Connexion">
      <form onSubmit={(e: any) => handleLogin(e)}>
        <Input
          type="text"
          name="email"
          label="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          name="password"
          label="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="signup__text">
          Vous n'avez pas de compte ?{" "}
          <Link to="/signup" className="signup__link">
            Inscrivez-vous
          </Link>
        </p>
        <Button className="btn" type="submit">
          Se connecter
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Signin;
