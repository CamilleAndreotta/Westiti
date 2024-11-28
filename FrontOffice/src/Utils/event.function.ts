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
