import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    return error.response ? error.response : Promise.reject(error);
  }
);

export default http;
