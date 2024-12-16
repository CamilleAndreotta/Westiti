import { FileProps } from "../@types/FileProps";
import { acceptedFormats } from "./acceptedFormats";
import { axiosInstance } from "./axiosInstance";

export const validFileSize = (
  arrayOfFiles: [] | Array<FileProps>,
  maxSize: number
) => {
  return arrayOfFiles.filter((file: FileProps) => {
    // @ts-ignore
    if (!acceptedFormats.includes(file.type)) {
      console.error(
        `Le format de fichier ${file.name} n'est pas accepté. Ignorée.`
      );
      return false;
    }
    // @ts-ignore
    if (file.size > maxSize) {
      console.error(
        `La photo ${file.name} est trop lourde (${file.size} octets). Ignorée.`
      );
      return false;
    }
    console.log("true");
    return true;
  });
};

export const getEventByEventId = async (
  eventId: string | undefined,
) : Promise<any> => {
  try {
    const response = await axiosInstance.get(`event/${eventId}/`);
    return response;

  } catch (error : any) {
    throw new Error(error);
  }
};

// récupérer tout les photos de l'user lié à un event
export const getAllEventPhotosByUsertId = async (eventId: string |undefined): Promise<any> => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axiosInstance.get(`
      photo/event/${eventId}/user/${userId}`);
      console.log(response);
      return response;
    } catch (error: any) {
      throw new Error(error);
    }
  };
