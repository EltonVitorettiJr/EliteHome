import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  // Evita que o axios transforme os parâmetros em query string
  paramsSerializer: {
    indexes: null
  }
});
