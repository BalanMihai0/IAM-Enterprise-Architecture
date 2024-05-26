import axios from "axios";
import { getAccessToken } from "../authService";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5173",
});

export async function fetchRefreshTokenLocal(requestBody: unknown) {
  return await axiosInstance
    .post("/api/v1/auth/login", requestBody)
    .then((response) => {
      return response;
    });
}

export async function fetchAccessTokenLocal() {
  const response = await axiosInstance.get("/api/v1/auth/refresh", {
    withCredentials: true,
  });
  return response;
}

export async function fetchAccessTokenMSAL() {
  const refreshToken = await getAccessToken("admin");
  const response = await axiosInstance.get("/api/v1/auth/refresh/ms", {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
    withCredentials: true,
  });
  return response;
}

export async function logoutLocal() {
    const refreshToken = await getAccessToken("admin");
    const response = await axiosInstance.get("/api/v1/auth/logout", {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
      withCredentials: true,
    });
    return response;
  }