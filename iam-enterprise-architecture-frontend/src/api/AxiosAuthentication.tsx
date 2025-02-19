import axios from "axios";
import { getAccessToken } from "../authService";

const axiosInstance = axios.create({
  baseURL: `${process.env.API_BASE_URL}`,
});

export async function fetchRefreshTokenLocal(requestBody: unknown) {
  try {
    return await axiosInstance
      .post("/api/v1/auth/login", requestBody)
      .then((response) => {
        return response;
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      throw error as Error;
    }
  }
}

export async function registerUser(requestBody: unknown) {
  try {
    return await axiosInstance
      .post("/api/v1/users", requestBody)
      .then((response) => {
        return response;
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      throw error as Error;
    }
  }
}

export async function fetchAccessTokenLocal() {
  try {
    return await axiosInstance.get("/api/v1/auth/refresh", {
      withCredentials: true,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error?.response?.status !== 401) {
      console.error("Unexpected error in fetchAccessTokenLocal:", error);
    }
    // Handle the 401 error or return a specific value if needed
    return null;
  }
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
