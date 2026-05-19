import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

// INDUSTRIAL RULE: Base Configuration
// We use an environment variable for the URL so it's easy to switch between local and production.
const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// INTERCEPTOR: The "Security Guard"
// This runs before EVERY request goes to the server.
api.interceptors.request.use(
  (config) => {
    // We grab the token from our Zustand store
    const token = useAuthStore.getState().token;
    
    if (token) {
      // Attach the token to the header so the backend knows who we are.
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
