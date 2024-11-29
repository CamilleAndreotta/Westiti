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
    console.log("true");
    return true;
  });
};

export const getEventByEventId = async (
  eventId: string | undefined,
  setEvent: any,
  onSuccess: any
) => {
  try {
    const response = await axios.get(`
      ${import.meta.env.VITE_DEV_API_URL}/api/event/${eventId}/`);
    console.log(response);
    setEvent(response.data);
    onSuccess("Événement récupéré");
  } catch (error) {
    console.log(error);
  }
};
