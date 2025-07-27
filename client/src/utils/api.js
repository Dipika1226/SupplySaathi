// utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7777/api", // or your deployed API base
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
