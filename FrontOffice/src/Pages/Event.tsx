import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { validFileSize } from "../Utils/event.function";

import { FileProps } from "../@types/FileProps";

import useToast from "../Hooks/useToast";
import Layout from "../Components/Layout";

import { acceptedFormats } from "../Utils/acceptedFormats";

import "../styles/event.scss";

const Event = () => {
  const { eventId } = useParams();
  const [_file, setFile] = useState<FileProps | null>(null);
  const [files, setFiles] = useState<FileProps[] | null>([]);
  const { onError, onSuccess } = useToast();

  const maxSize = 2900000;

  const handleUpdateImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(files);
    if (!files) {
      return;
    }
    const formData = new FormData();
    formData.append("photo", files[0]);
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`); // Doit afficher "photo: [object File]"
    }
    try {
      const userId = localStorage.getItem('userId')
      const response = await axios.post(
        `${import.meta.env.VITE_DEV_API_URL}/api/event/${eventId}/user/${userId}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(response);

      if (response.status !== 200) {
        onError("Une erreur c'est produite pendant l'envoi des photos");
        return;
      }
      console.log(response);
      setFiles(null);
      setFile(null);
      onSuccess("Photos envoyées");
      return;
    } catch (error) {
      onError("Une erreur c'est produite pendant l'envoi des photos");
      console.log(error);
    }
  };

  /*  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files?.[0];
    console.log("file", file);
    const data = new FormData();
    data.append("file", file);

    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }

    if (!acceptedFormats.includes(file.type)) {
      console.log("Le format de fichier n'est pas accepté");
      return;
    }
    if (file.size > maxSize) {
      console.log("Le fichier est trop lourd, merci de le compresser");
      return;
    }
    setFile(file);
  };
 */
  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);

    const files: any = e.target.files;
    console.log(files);

    const filesArray: FileProps[] | any = Array.from(files);
    const validArray = validFileSize(filesArray, maxSize);
    console.log(validArray);
    setFiles(validArray);
    return;
  };

  const deleteImageFromFiles = (index: number | string) => {
    console.log(typeof index);
    if (typeof index === "string") {
      console.log(index);
      return;
    }
    if (!files || index < 0 || index >= files.length) {
      console.error("Index invalide ou fichiers non disponibles.");
      return;
    }
    setFiles((prevState) => {
      if (prevState === null) {
        // Si prevState est null, retourne simplement null ou un tableau vide
        return null; // ou return [] si tu préfères un tableau vide.
      }
      return prevState.filter((_, i) => i !== index);
    });
    console.log("Fichiers restants :", files);
  };

  return (
    <Layout>
      <div className="event__page">
        <div className="event__box">
          <h1 className="event__title">
            Événement {localStorage.getItem("eventName")}
          </h1>
          <form className="event__form">
            <label htmlFor="images" className="event__label">
              Ajouter des images
              <input
                type="file"
                id="images"
                multiple
                accept={acceptedFormats.join(",")}
                onChange={handleFilesChange}
              />
            </label>
            {files && files?.length > 0 && (
              <button
                className="event__button"
                type="button"
                onClick={handleUpdateImage}
              >
                Partager les images
              </button>
            )}
          </form>
          <div className="event__files-section">
            {files &&
              files.map((file: any, index) => (
                <div key={index} className="img-div">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="image"
                  />
                  <div className="middle">
                    <button
                      className="event__delete-button"
                      onClick={() => deleteImageFromFiles(index)}
                    >
                      &times;
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Event;
