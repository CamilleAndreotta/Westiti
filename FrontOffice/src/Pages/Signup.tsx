import { useState } from "react";
import Layout from "../Components/Layout";

import "../styles/signup.css";
import Button from "../Components/Button";

const Signup = () => {
  //  const image = "../assets/img/logo.svg";
  const [signup, setSignup] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });

  const inputChange = (e: any) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const submit = async (e: any) => {
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
      const response = await  fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signup),
      }); 
     /*  fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))*/
      const data = await response.json();
      console.log(data);
      if (data.status !== 200) {
        console.log("Une erreur c'est produite pednant la création du compte");
      }
      console.log("Compte créé avec succès");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="signup">
        <div className="signup__container">
          <form
            action="submit"
            className="signup__form"
            onSubmit={(e) => submit(e)}
          >
            <input
              type="text"
              placeholder="email"
              className="signup__input"
              name="email"
              value={signup.email}
              onChange={inputChange}
            />
            <input
              type="password"
              placeholder="password"
              className="signup__input"
              name="password"
              value={signup.password}
              onChange={inputChange}
            />
            <input
              type="password"
              placeholder="password__confirmation"
              className="signup__input"
              name="password_confirmation"
              value={signup.password_confirmation}
              onChange={inputChange}
            />
            <Button disabled={
                !signup.email ||
                !signup.password ||
                !signup.password_confirmation
              }
              type="button"
              className="signup__submit"
              onClick={(e: HTMLButtonElement) => submit(e)}> Création de compte</Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
