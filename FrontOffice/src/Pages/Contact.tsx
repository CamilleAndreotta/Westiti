import React, { useState } from "react";
import Layout from "../Components/Layout";
import Input from "../Components/Input";
import Button from "../Components/Button";
import "../styles/contact.scss";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Vous pouvez ajouter ici un appel API ou une autre logique pour traiter les données du formulaire.
  };

  return (
    <Layout>
      <div className="contact">
        <div className="contact__box">
          <h2 className="contact__title">Nous Contacter</h2>
          <form className="contact__form" onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              label="Votre nom"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              label="Votre email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="contact__textarea">
              <label htmlFor="message">Votre message</label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <Button type="submit" className="btn contact__submit">
              Envoyer
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
