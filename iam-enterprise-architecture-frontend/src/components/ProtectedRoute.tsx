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
import { useLocation } from "react-router-dom";

type ProtectedRouteProps = {
  allowedRoles: string[];
};

function isTokenExpired(accessToken: string): boolean {
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime >= jwtDecode<DecodedToken>(accessToken).exp;
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { accessToken, setAccessToken } = useAuth();
  const location = useLocation();
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
    return <div className="h-full w-full left-1/2 top-1/2">Loading...</div>;
  }

  return accessToken && !isTokenExpired(accessToken) && allowedRoles.includes(jwtDecode<DecodedToken>(accessToken).role) ? (
      <Outlet />
    ) : (
      <Navigate to="/not_found" state={{ from: location }} replace />
    );
};

export default ProtectedRoute;
