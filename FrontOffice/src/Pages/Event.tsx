import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

import { FileProps } from "../@types/FileProps";

import { PhotoProps } from "../@types/PhotoProps";
import type { Event } from "../@types/Event";
import useToast from "../Hooks/useToast";
import Layout from "../Components/Layout";

import { getAllEventPhotosByUsertId, getEventByEventId, validFileSize } from "../Utils/event.function";
import { acceptedFormats } from "../Utils/acceptedFormats";

import "../styles/event.scss";
import { axiosInstance } from "../Utils/axiosInstance";

import BackArrowIcon from "../assets/img/back-arrow.svg";

const Event = () => {
  const { onError, onSuccess } = useToast();
  const { eventId } = useParams();
  const [files, setFiles] = useState<FileProps[] | null>([]);
  const [event, setEvent] = useState<Event | null>();
  const [_photos, setPhotos] = useState<PhotoProps[] | null>([]);
  const [photosList, setPhotosList] = useState([]);
  const maxSize = 5000000;

  useEffect(() => {
    try {
      const fetchData = async () => {
        const event = await getEventByEventId(eventId);
        setEvent(event);
        const photos = await getAllEventPhotosByUsertId(eventId);
        setPhotos(photos);
      };
      fetchData();
    } catch (error) {
      onError("Une erreur est survenue lors de la récupération des données");
      console.log(error);
    }
  }, []);

  const userId = localStorage.getItem("userId"); // Récupère l'ID utilisateur
  
  const handleUpdateImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!files) {
      return;
    }
    const formData = new FormData();
    files.forEach((file: any) => {
      formData.append("file", file);
    });
    try {
      const userId = localStorage.getItem("userId");
      const response = await axiosInstance.post(
        `event/${eventId}/user/${userId}/upload`,
        formData
      );
      if (response.status !== 201) {
        return response.data.message;
      }
      return response.data;
    } catch (error: any) {
      throw new Error(error);
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
          <div className="back__arrow">
            <Link to={`/events/${userId}`}>
              <img src={BackArrowIcon} alt="Retour aux événements" />
            </Link>
          </div>
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
              <div>Code : {event?.access_code}</div>
              <div>Description : {event?.content}</div>
              {event?.started_at ? (
                <div>
                  Date de début :{" "}
                  {new Date(event?.started_at).toLocaleDateString("Fr-fr")}
                </div>
              ) : null}
              {event?.ended_at ? (
                <div>
                  Date de fin :{" "}
                  {new Date(event?.ended_at).toLocaleDateString("Fr-fr")}
                </div>
              ) : null}
              {event?.address ? <div>Adresse : {event.address}</div> : null}
              <div>Créé par : {event?.creator_id?.name || "Inconnu"}</div>
              <div>
                Status d'upload :{" "}
                <span className={event?.upload_status ? "open" : "closed"}>
                  {event?.upload_status ? "Ouvert" : "Fermé"}
                </span>
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
          <div
            className="event__photoslist"
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              height: "200px",
              justifyContent: "space-around",
            }}
          >
            {photosList &&
              photosList.map((photo: any) => (
                <div key={photo.id} className="event__photoslist-photo">
                  <img
                    src={"http://localhost:3000/" + photo.url}
                    alt={
                      "photo" + photo.url.replace("public/uploads/photos/", "")
                    }
                    style={{ width: "300px", height: "300px" }}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Event;
