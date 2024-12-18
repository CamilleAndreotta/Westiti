import axios, { AxiosResponse } from "axios";
import { FileProps } from "../@types/FileProps";
import { acceptedFormats } from "./acceptedFormats";

const accessToken = localStorage.getItem("access_token");
export const validFileSize = (
  arrayOfFiles: [] | Array<FileProps>,
  maxSize: number
) => {
  return arrayOfFiles.filter((file: FileProps) => {
    console.log(file);
    
    if (file && !acceptedFormats.includes(file.type)) {
      console.error(
        `Le format de fichier ${file.name} n'est pas accepté. Ignorée.`
      );
      return false;
    }

    if (file.size && file.size > maxSize) {
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
    return error
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
    console.log(error);
    // throw new Error(error);
  }
};

export const submitDeletePhoto = async (
  id: null | string,
  eventId: string | undefined
): Promise<AxiosResponse> => {
  const userId: string | null = localStorage.getItem("userId");
  const data = {
    userId,
    eventId,
  };
  const response: AxiosResponse = await axios.delete(
    `${import.meta.env.VITE_DEV_API_URL}/photo/${id}`,
    {
      data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response;
};

export const formatAddress = (address: string): string => {
  const formatedAddress = encodeURIComponent(address);
  return formatedAddress;
};

export const handleFilesChange = (files: Iterable<File>) => {
  const maxSize = 5000000;
  const filesArray: FileProps[] | any = Array.from(files);
  const validArray = validFileSize(filesArray, maxSize);

  return validArray;
};
