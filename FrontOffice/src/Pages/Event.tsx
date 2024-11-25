import React, { useState } from "react";
import Layout from "../Components/Layout";
import axios from "axios";

interface File {
  name: string;
  type: string;
  size: number;
}
const Event = (eventId: string | null, userId: string | null) => {
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[] | null>([]);

  console.log(eventId, userId);

  const handleUpdateImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/event/${eventId}/post-image`,
        file
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateImages = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/event/${eventId}/post-images`,
        files
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(file);
      console.log(file);

      setFile(file);
    }
  };
  return (
    <Layout>
      <div className="event-page">
        <h1 className="title">Évènement</h1>
        <div className="container">
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file" />
          <button className="btn" onClick={(e) => handleUpdateImage(e)}>
            Partager une image
          </button>
          <button className="btn" onClick={(e) => handleUpdateImage(e)}>
            Partager plusieurs images
          </button>
        </div>
      </div>
      {file && (
        <section style={{ color: "white" }}>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}
      {file && (
        <button onClick={(e) => console.log(e)} className="submit">
          Upload a file
        </button>
      )}
    </Layout>
  );
};

export default Event;
