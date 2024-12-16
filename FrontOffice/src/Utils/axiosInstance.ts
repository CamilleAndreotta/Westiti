import axios from "axios";

const accessToken = localStorage.getItem("access_token");

export const axiosInstance = axios.create({
  baseURL: `http://localhost:3000/api/`,
  // baseURL: `${import.meta.env.VITE_DEV_URL_API}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
});
