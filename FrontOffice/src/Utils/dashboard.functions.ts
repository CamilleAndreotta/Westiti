import { Dispatch, SetStateAction } from "react";
import { CreateEventFormProps } from "../@types/CreateEventFormProps";
import { axiosInstance } from "./axiosInstance";

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
    e.preventDefault();
    const createdEvent: any = await axiosInstance.post(
      "/event",
      createEventForm
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
    const userId: string | null = localStorage.getItem("userId");
    const data = {
      userId,
      access_code: eventCode,
    };    
    const response = await axiosInstance.post(
      `/event/join`,
      data,
    );
    return response    
  } catch (error) {
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