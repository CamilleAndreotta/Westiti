import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useLoader } from "../contexts/LoaderContext";
import useToast from "../Hooks/useToast";

import Button from "../Components/Button";
import Input from "../Components/Input";
import AuthLayout from "../Components/AuthLayout";

import axios from "axios";

import "../styles/signin.css";
import "../styles/button.css";

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { onError, onSuccess } = useToast();
  const { showLoader, hideLoader } = useLoader(); // Utilisation du hook Loader

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showLoader(); // Affiche le loader avant la requête
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DEV_API_URL}/auth/login`,
        {
          password: password,
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("isConnected", "true");
      localStorage.setItem("userId", response.data.id);
      localStorage.setItem("username", response.data.username);
      onSuccess("Connexion réussie");
      navigate(`/dashboard/${localStorage.getItem("userId")}`);
    } catch (error: any) {
      if (error.response.status === 401) {
        onError(error.response.data.message);
      }
      hideLoader()
    }
  };

  return (
    <AuthLayout title="Connexion">
      <form onSubmit={handleSubmit}>
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
