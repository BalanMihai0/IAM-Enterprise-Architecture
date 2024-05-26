import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { DecodedToken } from "../types/DecodedToken";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../authService";
import {
  fetchAccessTokenMSAL,
  fetchAccessTokenLocal,
} from "../api/AxiosAuthentication";

type ProtectedRouteProps = {
  allowedRoles: string[];
};

function isTokenExpired(accessToken: string): boolean {
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime >= jwtDecode<DecodedToken>(accessToken).exp;
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { accessToken, setAccessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        if (await isAuthenticated()) {
          const authResponse = await fetchAccessTokenMSAL();
          setAccessToken(authResponse.data);
        } else {
          const authResponse = await fetchAccessTokenLocal();
          setAccessToken(authResponse.data);
        }
        setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.response.status === 401) {
            setIsLoading(false);
        }
      }
    };

    fetchToken();
  }, [setAccessToken]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return accessToken && !isTokenExpired(accessToken) ? (
    allowedRoles.includes(jwtDecode<DecodedToken>(accessToken).role) ? (
      <Outlet />
    ) : (
      <Navigate to="/unauthorized" />
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
