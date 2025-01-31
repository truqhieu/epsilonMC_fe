import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

const http = axios.create({
  baseURL: API_BASE_URL,
});

export default http;
