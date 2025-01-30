import axios from "axios";

//const accessToken = localStorage.getItem("access_token");
// axios send credentials (cookie)
axios.defaults.withCredentials = true;
export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_DEV_API_URL}`,
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${accessToken}`,
  },
});
