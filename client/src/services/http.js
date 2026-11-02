import axios from "axios";

const base = (import.meta.env.VITE_API_URL || "http://localhost:5000")
  .replace(/[[\]'"]/g, "")
  .replace(/\/+$/, "");

const http = axios.create({ baseURL: `${base}/api` });

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("fp_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function errorText(err, fallback) {
  return err?.response?.data?.message || fallback;
}

export default http;
