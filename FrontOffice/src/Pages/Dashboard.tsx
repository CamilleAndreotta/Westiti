
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Layout from "../Components/Layout";
import Card from "../Components/Card";
import Button from "../Components/Button";
import Input from "../Components/Input";
import Modale from "../Components/Modale";
import AutoCompleteInput from "../Components/AutoCompleteInput";

import useToast from "../Hooks/useToast";

import {
  getAllEventsUser,
  handleCreateEventChange,
  handleCreateEventSubmit,
  handleEventCodeChange,
  handleJoinEventSubmit,
} from "../Utils/dashboard.functions";

import { CreateEventFormProps } from "../@types/CreateEventFormProps";
import { EventProps } from "../@types/EventProps";

import "../styles/modale.css";
import "../styles/button.css";
import "../styles/input.css";
import "../styles/dashboard.scss";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { onError, onSuccess } = useToast();

  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
  const [isJoinEventModalOpen, setIsJoinEventModalOpen] = useState(false);
  const [eventCode, setEventCode] = useState<string>("");
  const [eventsList, setEventsList] = useState<EventProps[] | []>([]);
  const [loading, setLoading] = useState(false)
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

  const accessToken: string | null = localStorage.getItem("access_token");
  const userId: string | null = localStorage.getItem("userId");

  // Récupération des événements de l'utilisateur
  useEffect(() => {
    // get all user events
    const userId = localStorage.getItem("userId");
    if (!accessToken || !userId) {
      navigate("/signin");
    }
    const fetchData = async (): Promise<void> => {
      try {
        const eventsUser = await getAllEventsUser(userId);
        setEventsList(eventsUser);
        console.log(eventsList);
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userId, accessToken]);

  const submitEvent = async (e: any) => {
    e.preventDefault();
    try {
      const response = await handleCreateEventSubmit(e, createEventForm);
      if (response.createdEvent.status === 201) {
        setIsCreateEventModalOpen(false);
        setCreateEventForm({
          name: "",
          started_at: "",
          ended_at: "",
          address: "",
          content: "",
          picture:
            "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?q=80&w=1895&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          creator_id: localStorage.getItem("userId"),
        });
        const eventsUser = await getAllEventsUser(userId);
        setEventsList(eventsUser);
        onSuccess("2vénement crée");
      }
    } catch (error) {
      onError("Erreur pendant la création, de l'évent");
      console.log(error);
    }
  };

  const joinEvent = async (e: any) => {
    try {
      const userId = localStorage.getItem('userId')
      const response = await handleJoinEventSubmit(e, eventCode);
      if (response && response.status === 201) {
        setIsJoinEventModalOpen(false);
        setEventCode("");
        onSuccess(
          `Vous êtes maintenant membre de cet l'événement ${
            response.data[response.data.length - 1].event_id.name
          }`
        );
        const eventsUser = await getAllEventsUser(userId);
        setEventsList(eventsUser);
      }
    } catch (error) {
      onError("Erreur pendant la création, de l'évent");
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="dashboard">
        <div className="dashboard__buttons">
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
        <h1 className="dashboard__title">Voici vos événements</h1>
        <div className="dashboard__container">
          {Array.isArray(eventsList) && eventsList.length > 0 ? (
            eventsList.map((event: EventProps) => (
              <Link
                key={event.event_id.id}
                to={`/event/${event.event_id.id}`}
                onClick={() =>
                  localStorage.setItem("eventName", event.event_id.name)
                }
              >
                <Card
                  dataImage={event.event_id.picture}
                  header={event.event_id.name}
                  content={event.event_id.content}
                />
              </Link>
            ))
          ) : (
            <p>Aucun événement trouvé.</p>
          )}
        </div>

        {/* Modale pour créer un événement */}
        <Modale
          isOpen={isCreateEventModalOpen}
          onClose={() => setIsCreateEventModalOpen(false)}
        >
          <h2 className="modale__title">Créer un événement</h2>
          <form onSubmit={(e) => submitEvent(e)}>
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
          <form onSubmit={(e: any) => joinEvent(e)}>
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
export default Dashboard;
