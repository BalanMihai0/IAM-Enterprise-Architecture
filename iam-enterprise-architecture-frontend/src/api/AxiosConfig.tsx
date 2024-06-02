import axios from "axios";
import {
  fetchAccessTokenLocal,
  fetchAccessTokenMSAL,
} from "./AxiosAuthentication";
import { isAuthenticated } from "../authService";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5173",
});

const setupInterceptors = (accessToken: string | null) => {
  // Intercepting requests to add Authorization header
  axiosInstance.interceptors.request.use(
    async (config) => {
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
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        const context = useContext(AuthContext);
        let newAccessToken: string | null = null;

        if (await isAuthenticated()) {
          const response = await fetchAccessTokenMSAL();
          newAccessToken = response.data;
        } else {
          const response = await fetchAccessTokenLocal();
          newAccessToken = response?.data;
        }

        if (context) {
          context.setAccessToken(newAccessToken);
        }
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      }
      return Promise.reject(error);
    }
  );
};

export { axiosInstance, setupInterceptors };
