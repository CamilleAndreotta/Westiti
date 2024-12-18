import axios from "axios";
import { FileProps } from "../@types/FileProps";
import { acceptedFormats } from "./acceptedFormats";


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
    return true;
  });
};

export const getEventByEventId = async (
  eventId: string | undefined
): Promise<any> => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.get(
      `${import.meta.env.VITE_DEV_API_URL}/event/${eventId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );    
    return response;
  } catch (error: any) {
    console.log(error);

    //throw new Error(error);
  }
};

// récupérer tout les photos de l'user lié à un event
export const getAllEventPhotosByUsertId = async (
  eventId: string | undefined
): Promise<any> => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const userId = localStorage.getItem("userId");
    const response = await axios.get(
      `http://localhost:3000/api/event/${eventId}/user/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );    
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const handleUpdateImage = async (
  e: React.MouseEvent<HTMLButtonElement>,
  files: any,
  eventId: string | undefined
) => {
  console.log(files);
  e.preventDefault();
  if (!files) {
    return;
  }
  const formData = new FormData();
  files.forEach((file: any) => {
    console.log(file);
    
    formData.append("file", file);
  });
  console.log(formData);
  
  try {
    const accessToken = localStorage.getItem("access_token");
    const userId = localStorage.getItem("userId");
    const response = await axios.post(
      // `${
      //   import.meta.env.VITE_DEV_API_URL
      // }/event/${eventId}/user/${userId}/upload`,
      // formData,
      `http://localhost:3000/api/event/${eventId}/user/${userId}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response);
    
    if (response.status !== 201) {
      return response.data.message;
    }
    return response.data;
  } catch (error: any) {
    console.log(error)
   // throw new Error(error);
  }
};