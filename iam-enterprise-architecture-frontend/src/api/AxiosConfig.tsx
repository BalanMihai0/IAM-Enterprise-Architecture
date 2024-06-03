import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  fetchAccessTokenLocal,
  fetchAccessTokenMSAL,
} from "../api/AxiosAuthentication";
import { isAuthenticated } from "../authService";

const axiosInstance = axios.create({
  baseURL: `${process.env.API_BASE_URL}`,
});

const useAxiosInterceptors = () => {
  const { accessToken, setAccessToken } = useAuth();

  useEffect(() => {
    const setupInterceptors = () => {
      // Intercepting requests to add Authorization header
      axiosInstance.interceptors.request.use(
        (config) => {
          if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
            config.withCredentials = true;
          } else {
            console.log("No access token found for interceptor.");
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
            let newAccessToken: string | null = null;

            if (await isAuthenticated()) {
              const response = await fetchAccessTokenMSAL();
              newAccessToken = response.data;
            } else {
              const response = await fetchAccessTokenLocal();
              newAccessToken = response?.data;
            }

            if (newAccessToken) {
              setAccessToken(newAccessToken);
              originalRequest.headers[
                "Authorization"
              ] = `Bearer ${newAccessToken}`;
              return axiosInstance(originalRequest);
            }
          }
          return Promise.reject(error);
        }
      );
    };

    setupInterceptors();
  }, [accessToken, setAccessToken]);

  return axiosInstance;
};

export default useAxiosInterceptors;
