import { Dispatch, SetStateAction } from "react";
import { CreateEventFormProps } from "../@types/CreateEventFormProps";
import { axiosInstance } from "./axiosInstance";
import axios from "axios";

export const getAllEventsUser = async (userId: string | null) => {
  const response = await axiosInstance.get(`event`, {
    params: { userId },
 });

  return response.data;
};

export const handleCreateEventSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  createEventForm: CreateEventFormProps
): Promise<any> => {
  e.preventDefault();
  try {
      const accessToken = localStorage.getItem("access_token");
    e.preventDefault();
    const createdEvent: any = await axios.post(
      `${import.meta.env.VITE_DEV_API_URL}/event`,
      createEventForm,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
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
  eventCode: string | null,
) => {
  e.preventDefault();

  try {
    const accessToken = localStorage.getItem("access_token");
    const userId: string | null = localStorage.getItem("userId");
    const data = {
      userId,
      access_code: eventCode,
    };    
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
    console.log(response);
    
    return response    
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