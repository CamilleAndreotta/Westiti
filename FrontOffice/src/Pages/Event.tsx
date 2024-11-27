import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import useToast from "../Hooks/useToast";
import Layout from "../Components/Layout";

interface File {
  name: string;
  type: string;
  size: number;
}

import "../styles/event.css";
const Event = () => {
  const { eventId } = useParams();
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[] | null>([]);
  const { onError, onSuccess } = useToast();
  const userId = localStorage.getItem("userId");

  const handleUpdateImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DEV_API_URL}/api/event/${eventId}/upload`,
        {
          data: files,
          userId,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
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
  const acceptedFormats = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/HEIC",
    "image/HEVC",
    "image/heic",
    "image/hevc",
  ];
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file:any = e.target.files?.[0];
    file.replace(' ', '-')
    console.log(file);
    const data = new FormData();
    data.append('file', file);
    console.log(data);
    if (!acceptedFormats.includes(file.type)) {
      console.log("Le format de fichier n'est pas accepté");
      onError(`Le format de ce fichier n\'est pas accepté`);
      return;
    }
    if (file.size > 2900000) {
      console.log("Le fichier est trop lourd, merci de le compresser");
      onError("Le fichier est trop lourd, merci de le compresser");
      return;
    }

    setFile(file);
  };
  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files:any = e.target.files;
    //const data = new FormData();
    const filesArray = Array.from(files);
    for (let i = 0; i < filesArray.length; i++) {
      if (!acceptedFormats.includes(files[i].type)) {
        console.log(files[i], files[i].type);
        onError("Format de l'image non supporté");
        return;
      }
      if (filesArray[i].size > 2900000) {
        onError("La photo est trop lourde, merci de le compresser");
        return;
      }
      setFiles(filesArray);
      return;
    }
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
    setFiles(prevState => prevState.filter((_, i) => i !== index));
    console.log("Fichiers restants :", files);
  };

  return (
    <Layout>
      <div className="event-page">
        <h1 className="title">Événement {eventId}</h1>
        <div className="container">
          <form action=" " encType="multipart/form-data">
            <label htmlFor="file" style={{ color: "white" }}>
              <input
                type="file"
                id="file"
                name="file"
                onChange={handleFileChange}
              />
            </label>
            <label htmlFor="files" style={{ color: "white" }}>
              <input
                type="file"
                id="file"
                name="file"
                onChange={handleFilesChange}
                multiple
              />
            </label>
            <button className="btn" onClick={(e) => handleUpdateImage(e)}>
              Partager une ou plusieurs images
            </button>
          </form>
        </div>
      </div>
      {file && (
        <section style={{ color: "white" }}>
          File details:
          <div>
            <img
              src={URL.createObjectURL(file)}
              alt="image"
              style={{ width: "200px", height: "200px" }}
            />
            <p>Name: {file.name}</p>
            <p>Type: {file.type}</p>
            <p>Size: {file.size} bytes</p>
            <div style={{ display: "flex" }}>
              <span>Supprimer la photo :</span>
              <span
                className="event__button"
                onClick={() => deleteImageFromFiles(file.name)}
              >
                X
              </span>
            </div>
          </div>
        </section>
      )}
      <section style={{ color: "white" }}>
        <ul
          style={{
            width: "80%",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
          }}
        >
          {files &&
            files?.map((file, i: any) => (
              <li
                style={{ marginBottom: "15px", display: "flex" }}
                id={file.name}
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt="image"
                  style={{ width: "200px", height: "200px" }}
                />
                <div>
                  <p>File details:</p>
                  <p>Index: {i}</p>
                  <p>Name: {file.name}</p>
                  <p>Type: {file.type}</p>
                  <p>Size: {file.size} bytes</p>
                </div>

                <div style={{ display: "flex" }}>
                  <span>Supprimer la photo :</span>
                  <span
                    className="event__button"
                    onClick={() => deleteImageFromFiles(i)}
                  >
                    X
                  </span>
                </div>
              </li>
            ))}
        </ul>
      </section>
     {/*  {file && (
        <button onClick={(e) => console.log(e)} className="submit">
          Upload a file
        </button>
      )} */}
    </Layout>
  );
};

export default Event;
