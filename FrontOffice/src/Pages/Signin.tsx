import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import Button from "../Components/Button";
import Input from "../Components/Input";
import AuthLayout from "../Components/AuthLayout";

import "../styles/signin.css";
import "../styles/button.css";
import { log } from "node:console";

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          email: email,
        }),
      });
      const data = await response.json();

      if (response.status !== 201) {
        return;
      }
      console.log(data);
      
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("isConnected", "true");
      localStorage.setItem("userId", "219fc358-b5eb-482b-a3fa-2f02e5d8b066");
      localStorage.setItem("email", email);

      toast.success("Connexion réussie", {
        autoClose: 2000,
        position: "bottom-center",
      });
      navigate(`/events/${localStorage.getItem("userId")}`);
    } catch (error) {
      console.log("Erreur:", error);
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
