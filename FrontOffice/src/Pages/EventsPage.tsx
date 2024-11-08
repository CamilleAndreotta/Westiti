import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import Card from "../Components/Card";
import Button from "../Components/Button";
import { Link } from "react-router-dom";
import "../styles/eventspage.css";

interface Event {
  id: number;
  image: string;
  title: string;
  description: string;
}

const EventsPage: React.FC = () => {
  const [eventsData, setEventsData] = useState<Event[]>([]);

  useEffect(() => {
    fetch("/api/events")
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
  }, []);

  return (
    <Layout>
      <div className="events-page">
        <h1 className="title">Voici vos événements</h1>
        <div className="container">
          {eventsData.map((event) => (
            <Card
              key={event.id}
              dataImage={event.image}
              header={event.title}
              content={event.description}
            />
          ))}
        </div>
        <div className="buttons-container">
          <Link to="/create-event">
            <Button className="btn">Créer un événement</Button>
          </Link>
          <Link to="/create-notification">
            <Button className="btn">Rejoindre un événement</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default EventsPage;
