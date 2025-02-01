import axios from "axios";


// axios send credentials (cookie)
export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_DEV_API_URL}`,
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${accessToken}`,
  },
  withCredentials: true,
});
