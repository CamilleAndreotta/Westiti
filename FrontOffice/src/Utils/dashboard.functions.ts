import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { EventProps } from "../@types/EventProps";
import { CreateEventFormProps } from "../@types/CreateEventFormProps";

export const getAllEventsUser = async (
  userId: string | null,
  setEventsList: Dispatch<SetStateAction<EventProps[]>>
) => {
  const accessToken = localStorage.getItem("access_token");
  const response = await axios.get(`http://localhost:3000/api/event`, {
    params: { userId },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(response.data);
  setEventsList(response.data);
  return;
};

export const handleCreateEventSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  createEventForm: CreateEventFormProps,
  onError: (error: string) => void,
  onSuccess: (message: string) => void,
  setEventsList: Dispatch<SetStateAction<EventProps[]>>,
  setCreateEventForm: Dispatch<SetStateAction<CreateEventFormProps>>,
  setIsCreateEventModalOpen: Dispatch<SetStateAction<boolean>>
): Promise<void> => {
  e.preventDefault();

  const accessToken = localStorage.getItem("access_token");
  const userId = localStorage.getItem("user_id");

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

    // Mise à jour de la liste des événements
    await getAllEventsUser(userId, setEventsList);

    setIsCreateEventModalOpen(false);

    // Fermeture de la modale et réinitialisation du formulaire
    setCreateEventForm({
      name: "",
      started_at: "",
      ended_at: "",
      address: "",
      content: "",
      creator_id: localStorage.getItem("userId"),
      picture: "http//pivutre.jpreg",
    });
  } catch (error) {
    console.error("Erreur lors de la création de l'événement :", error);
  }
};

// Gestion des changements dans le formulaire de création d'événement
export const handleCreateEventChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setCreateEventForm: React.Dispatch<
    React.SetStateAction<CreateEventFormProps>
  >,
  createEventForm: CreateEventFormProps
) => {
  setCreateEventForm({
    ...createEventForm,
    [e.target.name]: e.target.value,
  });
};

export const handleJoinEventSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  setIsJoinEventModalOpen: Dispatch<SetStateAction<boolean>>,
  setEventCode: Dispatch<SetStateAction<string>>,
  eventCode: string,
  onSuccess: (message: string) => void,
  onError: (message: string) => void
) => {
  e.preventDefault();

  try {
    const userId: string | null = localStorage.getItem("userId");
    const data: {
      userId: string | null;
      access_code: string;
    } = {
      userId,
      access_code: eventCode,
    };
    const accessToken: string | null = localStorage.getItem("access_token");
    const response = await axios.post(
      `http://localhost:3000/api/event/join`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status !== 201) {
      onError("Erreur lors de la jonction à l'événement");
      throw new Error("Erreur lors de la jonction à l'événement");
    }

    // Fermeture de la modale et réinitialisation du formulaire
    setIsJoinEventModalOpen(false);
    setEventCode("");
    onSuccess("Vous êtes maintenant membre de cet événement");
  } catch (error) {
    onError("Erreur lors de la jonction à l'événement");
    console.error("Erreur lors de la jonction à l'événement");
  }
};

// Gestion des changements dans le formulaire de rejoindre un événement
export const handleEventCodeChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setEventCode: Dispatch<SetStateAction<string>>
) => {
  setEventCode(e.target.value);
};
