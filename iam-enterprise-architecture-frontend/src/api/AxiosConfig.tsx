import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  fetchAccessTokenLocal,
  fetchAccessTokenMSAL,
} from "./AxiosAuthentication";
import { isAuthenticated } from "../authService";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5173",
});

// Intercepting requests to add Authorization header
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = useAuth();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepting responses to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      let accessToken: string;
      if (await isAuthenticated()) {
        const response = await fetchAccessTokenMSAL();
        accessToken = response.data;
      } else {
        const response = await fetchAccessTokenLocal();
        accessToken = response?.data;
      }
      const { setAccessToken } = useAuth();
      setAccessToken(accessToken);
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
