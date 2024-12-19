import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { FileProps } from "../@types/FileProps";
import { PhotoProps } from "../@types/PhotoProps";
import type { Event } from "../@types/Event";

import useToast from "../Hooks/useToast";
import Layout from "../Components/Layout";

import {
  formatAddress,
  getAllEventPhotosByUsertId,
  getEventByEventId,
  handleFilesChange,
  submitDeletePhoto,
} from "../Utils/event.function";
import { acceptedFormats } from "../Utils/acceptedFormats";

import BackArrowIcon from "../assets/img/back-arrow.svg";

import "../styles/event.scss";
import Modale from "../Components/Modale";
import Button from "../Components/Button";

const eventTypeImages: Record<string, string> = {
  mariage:
    "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?q=80&w=1990&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  anniversaire:
    "https://images.unsplash.com/photo-1583875762487-5f8f7c718d14?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  soiree_etudiante:
    "https://images.unsplash.com/photo-1505236858219-8359eb29e329?q=80&w=1924&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  autres:
    "https://images.unsplash.com/photo-1519214605650-76a613ee3245?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const Event = () => {
  const { onError, onSuccess } = useToast();
  const { eventId } = useParams();
  const [files, setFiles] = useState<FileProps[] | null>([]);
  const [event, setEvent] = useState<Event | null>(null);
  const [photosList, setPhotosList] = useState<PhotoProps[] | null>([]);
  const [isUploadPhotosModalOpen, setIsUploadPhotosModalOpen] = useState(false);
  const navigate = useNavigate();
  const getEventImage = (event_type: string | undefined): string => {
    return (
      eventTypeImages[event_type?.toLowerCase() as keyof typeof eventTypeImages] ||
      eventTypeImages["autres"]
    );
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const event = await getEventByEventId(eventId);
        if (event.data.status === 401) {
          onError("Vous n'êtes pas autorisé à accéder à cet événement");
          return
        }
        
        setEvent(event.data);
        const photos = await getAllEventPhotosByUsertId(eventId);
        setPhotosList(photos.data);
      };
      fetchData();
    } catch (error) {
      onError("Une erreur est survenue lors de la récupération des données");
      console.log(error);
    }
  }, []);

  const userId = localStorage.getItem("userId"); // Récupère l'ID utilisateur

  const selectFilesToUpload = (files: []) => {
    const response = handleFilesChange(files);
    console.log(response);
    setFiles(response);
  };

  const handleUpdateImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsUploadPhotosModalOpen(false);
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
        `${import.meta.env.VITE_DEV_API_URL}/event/${eventId}/user/${userId}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.status !== 201) {
        onError("Une erreur c'est produite pendant l'envoi des photos");
        return;
      }
      setPhotosList(response.data);
      setFiles(null);
      onSuccess("Photos envoyées");
      return;
    } catch (error) {
      onError("Une erreur c'est produite pendant l'envoi des photos");
      console.log(error);
    }
  };

  const deleteImageFromFiles = (index: number | string) => {
    if (typeof index === "string") {
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

  const handleDeletePhoto = async (photoId: null | string): Promise<void> => {
    const data = await submitDeletePhoto(photoId, eventId);
    if (data.status !== 200) {
      onError("Une erreur s'est produite pendant la suppression de la photo");
    }
    const photos = await getAllEventPhotosByUsertId(eventId);
    setPhotosList(photos.data);
  };
  const handleLeaveEvent = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const userId = localStorage.getItem("userId");
      const data = {
        userId,
        eventId,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_DEV_API_URL}/event/leave`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 201) {
        navigate(`/dashboard/${userId}`);
        
      }
    }
    catch (error) {
      console.log(error);
      
      throw error;
    }
  };
  return (
    <Layout>
      <div className="event__page">
        <div className="event__box">
          <div className="back__arrow">
            <Link to={`/dashboard/${userId}`}>
              <img src={BackArrowIcon} alt="Retour aux événements" />
            </Link>
          </div>
          <h1 className="event__title">Événement {event?.name}</h1>
          <div className="event__informations">
            <div
              className="event__img"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <img
                src={getEventImage(event?.event_type)}
                alt={event?.event_type || "autres"}
                style={{ width: "250px", height: "130px" }}
              />
              <Button className="btn" onClick={handleLeaveEvent}>
                Quitter l'événement
              </Button>
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
              {event?.address ? (
                <div className="event__adress">
                  {" "}
                  Adresse :{" "}
                  <a
                    style={{ textDecoration: "none" }}
                    href={`https://www.openstreetmap.org/search?query=${formatAddress(
                      event.address
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {event.address}
                  </a>
                </div>
              ) : null}
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
            <label htmlFor="images" className="event__label" >
              Ajouter des images
              <input
                type="file"
                id="images"
                multiple
                accept={acceptedFormats.join(",")}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  console.log(e.target.files);
                  const targetFiles: any = e.target.files;
                  selectFilesToUpload(targetFiles);
                  if (targetFiles?.length > 0) {
                    setIsUploadPhotosModalOpen(true);
                  }
                }}
              />
            </label>
            <Modale
              isOpen={isUploadPhotosModalOpen}
              onClose={() => setIsUploadPhotosModalOpen(false)}
            >
              {files && files?.length > 0 && (
                <button
                  className="event__button"
                  type="button"
                  onClick={(e) => handleUpdateImage(e)}
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
            </Modale>
          </form>
          <div className="event__photoslist">
            {photosList &&
              photosList.map((photo: any) => (
                <div
                  key={photo.id}
                  className="event__photoslist-photo"
                  id={photo.id}
                >
                  <img
                    src={`${import.meta.env.VITE_DEV_API_SERVER}/${photo.url}`}
                    alt={
                      "photo" + photo.url.replace("public/uploads/photos/", "")
                    }
                    style={{ width: "300px", height: "300px" }}
                  />
                  <button className="event__delete-photo" onClick={() => handleDeletePhoto(photo.id)}>
                  &#128465;
                  </button>
                </div>
              ))}
            {event &&
              event?.photos?.map((photo) => (
                <div key={photo.id} className="event__photoslist-photo">
                  <img
                    src={`${import.meta.env.VITE_DEV_API_URL}/${photo.url}`}
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
