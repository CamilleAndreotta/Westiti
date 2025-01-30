import { Dispatch, SetStateAction } from "react";
import { CreateEventFormProps } from "../@types/CreateEventFormProps";

import axios from "axios";

// axios send credentials (cookie) by ddefault with every requests
axios.defaults.withCredentials = true;

export const getAllEventsUser = async (): Promise<[] | { message: string }> => {
  const userId = localStorage.getItem("userId");
  //const accessToken = localStorage.getItem("access_token");
  const response = await axios.get(
    `${import.meta.env.VITE_DEV_API_URL}/event`,
    {
      params: { userId },
      headers: {
        // Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (response.status === 401) {
    return { message: "Vous n'êtes pas autorisé à accéder à cette ressource" };
  }
  return response.data;
};

export const handleCreateEventSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  createEventForm: CreateEventFormProps
): Promise<any> => {
  e.preventDefault();
  try {
    //const accessToken = localStorage.getItem("access_token");
    const createdEvent: any = await axios.post(
      `${import.meta.env.VITE_DEV_API_URL}/event`,
      createEventForm,
      {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${accessToken}`,
        },

      }
    );
    return { createdEvent };
  } catch (error) {
    console.error("Erreur lors de la création de l'événement :", error);
  }
};

// Gestion des changements dans le formulaire de création d'événement
export const handleCreateEventChange = (
  e:
     React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
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
  eventCode: string | null
) => {
  e.preventDefault();

  try {
    //const accessToken = localStorage.getItem("access_token");
    const userId: string | null = localStorage.getItem("userId");
    const data = {
      userId,
      access_code: eventCode,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_DEV_API_URL}/api/event/join`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
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
