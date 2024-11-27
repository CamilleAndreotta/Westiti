import { FileProps } from "../@types/FileProps";
import { acceptedFormats } from "./acceptedFormats";

export const validFileSize = (arrayOfFiles: [], maxSize: number = 2900000) => {
  return arrayOfFiles.filter((file: FileProps) => {
    if (!acceptedFormats.includes(file.type)) {
      console.error(
        `Le format de fichier ${file.name} n'est pas accepté. Ignorée.`
      );
      return false;
    }

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
