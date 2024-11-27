// EventsPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../Components/Layout";
import Card from "../Components/Card";
import Button from "../Components/Button";
import Input from "../Components/Input";

import "../styles/eventspage.scss";
import "../styles/modale.css";
import "../styles/button.css";
import "../styles/input.css";
import Modale from "../Components/Modale";
import AutoCompleteInput from "../Components/AutoCompleteInput";

import useToast from "../Hooks/useToast";

import {
  getAllEventsUser,
  handleCreateEventChange,
  handleCreateEventSubmit,
  handleEventCodeChange,
  handleJoinEventSubmit,
} from "../Utils/event.functions";

import { EventProps } from "../@types/EventProps";
import { CreateEventFormProps } from "../@types/CreateEventFormProps";

const EventsPage: React.FC = () => {
  const navigate = useNavigate();
  const { onError, onSuccess } = useToast();

  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [isJoinEventModalOpen, setIsJoinEventModalOpen] = useState(false);
  const [eventCode, setEventCode] = useState<string>("");
  const [eventsList, setEventsList] = useState<EventProps[] | []>([]);
  const [createEventForm, setCreateEventForm] = useState<CreateEventFormProps>({
    name: "",
    started_at: "",
    ended_at: "",
    address: "",
    content: "",
    picture:
      "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?q=80&w=1895&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    creator_id: localStorage.getItem("userId"),
  });

  // Récupération de l'utilisateur connecté
  const userId = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("access_token");

  // Vérification si l'utilisateur est connecté
  useEffect(() => {
    if (!accessToken || !userId) {
      navigate("/signin");
    }
  }, [accessToken, userId, navigate]);

  // Récupération des événements de l'utilisateur
  useEffect(() => {
    // get all user events
    const userId: string | null = localStorage.getItem("userId");
    const fetchData = async (): Promise<void> => {
      try {
        getAllEventsUser(userId, setEventsList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userId, accessToken]);

  return (
    <Layout>
      <div className="events__page">
        <h1 className="events__title">Voici vos événements</h1>
        <div className="events__container">
          {eventsList &&
            eventsList.map((event: EventProps) => (
              <Link to={`/event/${event.id}`}>
                <Card
                  dataImage={event.picture}
                  header={event.name}
                  content={event.content}
                  key={event.id}
                />
              </Link>
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
          <form
            onSubmit={(e) =>
              handleCreateEventSubmit(
                e,
                createEventForm,
                onError,
                onSuccess,
                setEventsList,
                setCreateEventForm,
                setIsCreateEventModalOpen
              )
            }
          >
            {/* Nom de l'événement */}
            <Input
              type="text"
              name="name"
              label="Nom de l'événement"
              value={createEventForm.name}
              onChange={(e) =>
                handleCreateEventChange(e, setCreateEventForm, createEventForm)
              }
              required
            />
            {/* Date et heure de début */}
            <Input
              type="datetime-local"
              name="started_at"
              label="Date et heure de début"
              value={createEventForm.started_at}
              onChange={(e) =>
                handleCreateEventChange(e, setCreateEventForm, createEventForm)
              }
              required
            />
            {/* Date et heure de fin */}
            <Input
              type="datetime-local"
              name="ended_at"
              label="Date et heure de fin"
              value={createEventForm.ended_at}
              onChange={(e) =>
                handleCreateEventChange(e, setCreateEventForm, createEventForm)
              }
              required
            />

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
                onChange={(e) =>
                  handleCreateEventChange(
                    e,
                    setCreateEventForm,
                    createEventForm
                  )
                }
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
          <form
            onSubmit={(e) =>
              handleJoinEventSubmit(e, setIsJoinEventModalOpen, setEventCode)
            }
          >
            <Input
              type="text"
              name="eventCode"
              label="Code de l'événement"
              value={eventCode}
              onChange={(e) => handleEventCodeChange(e, setEventCode)}
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
