import React, { useState } from "react";
import "../styles/signin.css";
import Button from "../Components/Button";
import Input from "../Components/Input";
import { Link } from "react-router-dom";

const Signin: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="login__box">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="email"
          label="E-mail"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <Button type="submit">Se connecter</Button>
      </form>
    </div>
  );
};

export default Signin;
