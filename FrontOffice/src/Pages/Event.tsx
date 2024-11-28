import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { FileProps } from "../@types/FileProps";
import { EventProps } from "../@types/EventProps";

import useToast from "../Hooks/useToast";
import Layout from "../Components/Layout";

import { validFileSize } from "../Utils/event.function";
import { acceptedFormats } from "../Utils/acceptedFormats";

import "../styles/event.scss";

interface PhotoProps {
  id: number;
  name: string;
  type: string;
  size: number;
}
const Event = () => {
  const { onError, onSuccess } = useToast();
  const { eventId } = useParams();
  const [files, setFiles] = useState<FileProps[] | null>([]);
  const [event, setEvent] = useState<EventProps | null>();
  const [_photos, setPhotos] = useState<PhotoProps[] | null>([]);
  const maxSize = 5000000;

  useEffect(() => {
    try {
      const fetchData = async () => {
        Promise.all([
          await getEventByEventId(),
          await getAllEventPhotosByUsertId(),
        ]);
      };
      fetchData();
    } catch (error) {
      onError("Une erreur est survenue lors de la récupération des données");
      console.log(error);
    }
  }, []);

  const getEventByEventId = async () => {
    try {
      const response = await axios.get(`
        ${import.meta.env.VITE_DEV_API_URL}/api/event/${eventId}/`);

      console.log(response);
      setEvent(response.data);
      onSuccess("événement récupéré");
    } catch (error) {
      console.log(error);
    }
  };

  // récupérer tout les photos de l'user lié à un event
  const getAllEventPhotosByUsertId = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(`
      ${
        import.meta.env.VITE_DEV_API_URL
      }/api/photo/event/${eventId}/user/${userId}`);
      console.log(response);
      setPhotos(response.data);
      onSuccess("Photos récupérées");
    } catch (error) {
      onError("Une erreur c'est produite lors de la récupération des photos");
      console.log(error);
    }
  };

  const handleUpdateImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!files) {
      return;
    }
    const formData = new FormData();
    /*  const fileSelected: any = files[0]; */
    files.forEach((file: any) => {
      formData.append("file", file);
    });

    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.post(
        `${
          import.meta.env.VITE_DEV_API_URL
        }/api/event/${eventId}/user/${userId}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(response);

      if (response.status !== 201) {
        onError("Une erreur c'est produite pendant l'envoi des photos");
        return;
      }

      console.log(response);
      setFiles(null);
      onSuccess("Photos envoyées");
      return;
    } catch (error) {
      onError("Une erreur c'est produite pendant l'envoi des photos");
      console.log(error);
    }
  };

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
    //e.preventDefault()
    console.log(index);

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
          <h1 className="event__title">Événement {event?.name}</h1>
          <div className="event__informations">
            <div className="event__img">
              <img
                src={event?.picture}
                alt=""
                style={{ width: "250px", height: "130px" }}
              />
            </div>

            <div className="event__text">
              <div>Code: {event?.access_code}</div>
              <div>Description: {event?.content}</div>
              {event?.started_at ? (
                <div>
                  Date de début :
                  {new Date(event?.started_at).toLocaleDateString("Fr-fr")}
                </div>
              ) : null}
              {event?.ended_at ? (
                <div>
                  Date de fin :
                  {new Date(event?.ended_at).toLocaleDateString("Fr-fr")}
                </div>
              ) : null}
              {event?.address ? <div>Adresse :{event.address}</div> : null}
              <div>
                Status d'upload:
                {!event?.upload_status
                  ? "Inconnu"
                  : event?.upload_status === true
                  ? "Ouvert"
                  : "Fermé"}
              </div>
            </div>
          </div>
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
                        type="button"
                        className="event__delete-button"
                        onClick={() => deleteImageFromFiles(index)}
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Event;
