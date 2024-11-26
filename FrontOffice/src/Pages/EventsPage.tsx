// EventsPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../Components/Layout";
import Card from "../Components/Card";
import Button from "../Components/Button";
import Input from "../Components/Input";

import "../styles/eventspage.css";
import "../styles/modale.css";
import "../styles/button.css";
import "../styles/input.css";
import Modale from "../Components/Modale";
import AutoCompleteInput from "../Components/AutoCompleteInput";
import axios from "axios";
import { log } from "node:console";
import useToast from "../Hooks/useToast";

interface Event {
  id: string;
  image: string;
  title: string;
  description: string;
}
const eventId = "1";
const EventsPage: React.FC = () => {
  const navigate = useNavigate();
  const [eventsData, setEventsData] = useState<Event[]>([]);
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [isJoinEventModalOpen, setIsJoinEventModalOpen] = useState(false);
  const { onError, onSuccess } = useToast();
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
    name: "",
    started_at: "",
    ended_at: "",
    address: "",
    content: "",
    picture: "http//pivutre.jpreg",
    creator_id: localStorage.getItem("userId"),
  });

  const [eventCode, setEventCode] = useState("");
  const [eventsList, setEventsList] = useState();
  // Récupération des événements de l'utilisateur
  useEffect(() => {
    // get all events by user ID
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/event`, {
          params: { userId },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response.data);
        setEventsList(response.data);
        /* .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur lors de la récupération des événements");
          }
          return response.json();
        })
        .then((data: Event[]) => {
          setEventsData(data);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des événements :",
            error
          );
        }); */
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
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
      const response: any = await axios.post(
        "http://localhost:3000/api/event",
        createEventForm,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      if (response.status !== 201) {
        onError("Erreur lors de la création de l'événement");
        throw new Error("Erreur lors de la création de l'événement");
      }

      onSuccess("Événement créé avec succès");

      setIsCreateEventModalOpen(false);

      // Mise à jour de la liste des événements
      setEventsData([...eventsData, newEvent]);

      // Fermeture de la modale et réinitialisation du formulaire
      setCreateEventForm({
        name: "",
        started_at: "",
        ended_at: "",
        address: "",
        content: "",
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
      const response = await fetch(`http://localhost:3000/api/event/join`, {
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
          {/*  <Link to={`/event/${eventId}`}>
            <div className="event__card">
              <Card
                dataImage="https://images.unsplash.com/photo-1460978812857-470ed1c77af0?q=80&w=1895&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                header="Evenement"
                content="Mariage numéro 1"
              />
            </div>
          </Link> */}
          {eventsList &&
            eventsList.map(
              (event: {
                id: string;
                name: string;
                content: string;
                address: string;
                started_at: string;
                ended_at: string;
                access_code: string;
                upload_status: true;
                picture: string;
                created_at: string;
                updated_at: string;
                userId: string;
              }) => (
                <Card
                  dataImage="https://images.unsplash.com/photo-1460978812857-470ed1c77af0?q=80&w=1895&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  header={event.name}
                  content={event.content}
                  key={event.id}

                />
              )
            )}
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
            {/* Nom de l'événement */}
            <Input
              type="text"
              name="name"
              label="Nom de l'événement"
              value={createEventForm.name}
              onChange={handleCreateEventChange}
              required
            />
            {/* Date et heure de début */}
            <Input
              type="datetime-local"
              name="started_at"
              label="Date et heure de début"
              value={createEventForm.started_at}
              onChange={handleCreateEventChange}
              required
              //labelPosition="above"
            />
            {/* Date et heure de fin */}
            <Input
              type="datetime-local"
              name="ended_at"
              label="Date et heure de fin"
              value={createEventForm.ended_at}
              onChange={handleCreateEventChange}
              required
              //   labelPosition="above"
            />
            {/* Lieu de l'événement avec autocomplétion */}
            <AutoCompleteInput
              value={createEventForm.address}
              onChange={(value) =>
                setCreateEventForm({ ...createEventForm, address: value })
              }
              label="Lieu de l'événement"
            />
            {/* Description de l'événement */}
            <div className="user__box">
              <textarea
                name="content"
                value={createEventForm.content}
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
