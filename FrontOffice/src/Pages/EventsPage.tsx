// EventsPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import Card from "../Components/Card";
import Button from "../Components/Button";
import Input from "../Components/Input";
import Modale from "../Components/Modale";

import "../styles/eventspage.css";
import "../styles/modale.css";
import "../styles/button.css";
import "../styles/input.css";

interface Event {
  id: string;
  image: string;
  title: string;
  description: string;
}

const EventsPage: React.FC = () => {
  const navigate = useNavigate();
  const [eventsData, setEventsData] = useState<Event[]>([]);
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [isJoinEventModalOpen, setIsJoinEventModalOpen] = useState(false);

  // Récupération de l'utilisateur connecté
  const userId = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("access_token");

  // Vérification si l'utilisateur est connecté
  useEffect(() => {
    if (!accessToken || !userId) {
      navigate("/signin");
    }
  }, [accessToken, userId, navigate]);

  // États pour les formulaires
  const [createEventForm, setCreateEventForm] = useState({
    eventName: "",
    eventDate: "",
    eventLocation: "",
    eventDescription: "",
  });

  const [eventCode, setEventCode] = useState("");

  // Récupération des événements de l'utilisateur
  useEffect(() => {
    fetch(`http://localhost:3000/events/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des événements");
        }
        return response.json();
      })
      .then((data: Event[]) => {
        setEventsData(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des événements :", error);
      });
  }, [userId, accessToken]);

  // Gestion des changements dans le formulaire de création d'événement
  const handleCreateEventChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCreateEventForm({
      ...createEventForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateEventSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: createEventForm.eventName,
          date: createEventForm.eventDate,
          location: createEventForm.eventLocation,
          description: createEventForm.eventDescription,
          userId: userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création de l'événement");
      }

      const newEvent = await response.json();

      // Mise à jour de la liste des événements
      setEventsData([...eventsData, newEvent]);

      // Fermeture de la modale et réinitialisation du formulaire
      setIsCreateEventModalOpen(false);
      setCreateEventForm({
        eventName: "",
        eventDate: "",
        eventLocation: "",
        eventDescription: "",
      });
    } catch (error) {
      console.error("Erreur lors de la création de l'événement :", error);
    }
  };

  // Gestion des changements dans le formulaire de rejoindre un événement
  const handleEventCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventCode(e.target.value);
  };

  const handleJoinEventSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/events/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          code: eventCode,
          userId: userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la jonction à l'événement");
      }

      const joinedEvent = await response.json();

      // Mise à jour de la liste des événements
      setEventsData([...eventsData, joinedEvent]);

      // Fermeture de la modale et réinitialisation du formulaire
      setIsJoinEventModalOpen(false);
      setEventCode("");
    } catch (error) {
      console.error("Erreur lors de la jonction à l'événement :", error);
    }
  };

  return (
    <Layout>
      <div className="events__page">
        <h1 className="events__title">Voici vos événements</h1>
        <div className="events__container">
          {eventsData.map((event) => (
            <div key={event.id} className="event__card">
              <Card
                dataImage={event.image}
                header={event.title}
                content={event.description}
              />
            </div>
          ))}
        </div>
        <div className="events__buttons-container">
          <Button
            onClick={() => setIsCreateEventModalOpen(true)}
            className="btn"
          >
            Créer un événement
          </Button>
          <Button onClick={() => setIsJoinEventModalOpen(true)} className="btn">
            Rejoindre un événement
          </Button>
        </div>

        {/* Modale pour créer un événement */}
        <Modale
          isOpen={isCreateEventModalOpen}
          onClose={() => setIsCreateEventModalOpen(false)}
        >
          <h2 className="modale__title">Créer un événement</h2>
          <form onSubmit={handleCreateEventSubmit}>
            <Input
              type="text"
              name="eventName"
              label="Nom de l'événement"
              value={createEventForm.eventName}
              onChange={handleCreateEventChange}
              required
            />
            <Input
              type="date"
              name="eventDate"
              label="Date de l'événement"
              value={createEventForm.eventDate}
              onChange={handleCreateEventChange}
              required
              labelPosition="above"
            />
            <Input
              type="text"
              name="eventLocation"
              label="Lieu de l'événement"
              value={createEventForm.eventLocation}
              onChange={handleCreateEventChange}
              required
            />
            <div className="user__box">
              <textarea
                name="eventDescription"
                value={createEventForm.eventDescription}
                onChange={handleCreateEventChange}
                required
              ></textarea>
              <label>Description de l'événement</label>
            </div>
            <Button type="submit" className="btn modale__btn">
              Créer
            </Button>
          </form>
        </Modale>

        {/* Modale pour rejoindre un événement */}
        <Modale
          isOpen={isJoinEventModalOpen}
          onClose={() => setIsJoinEventModalOpen(false)}
        >
          <h2 className="modale__title">Rejoindre un événement</h2>
          <form onSubmit={handleJoinEventSubmit}>
            <Input
              type="text"
              name="eventCode"
              label="Code de l'événement"
              value={eventCode}
              onChange={handleEventCodeChange}
              required
            />
            <Button type="submit" className="btn modale__btn">
              Rejoindre
            </Button>
          </form>
        </Modale>
      </div>
    </Layout>
  );
};

export default EventsPage;
