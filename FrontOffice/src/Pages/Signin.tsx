import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { useLoader } from "../contexts/LoaderContext";

import Button from "../Components/Button";
import Input from "../Components/Input";
import AuthLayout from "../Components/AuthLayout";

import "../styles/signin.css";
import "../styles/button.css";

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader(); // Utilisation du hook Loader

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showLoader(); // Affiche le loader avant la requête

    try {
      const response = await fetch(
        `${import.meta.env.VITE_DEV_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: password,
            email: email,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.status !== 201) {
        return;
      }

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("isConnected", "true");
      localStorage.setItem("userId", data.id);
      localStorage.setItem("username", data.username);

      toast.success("Connexion réussie", {
        autoClose: 2000,
        position: "bottom-center",
      });
      navigate(`/dashboard/${localStorage.getItem("userId")}`);
    } catch (error) {
      console.log("Erreur:", error);
    } finally {
      setTimeout(() => hideLoader(), 2000); // Cache le loader après la requête
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
