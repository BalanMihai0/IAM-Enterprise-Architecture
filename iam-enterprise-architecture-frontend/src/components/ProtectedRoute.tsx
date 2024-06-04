import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { DecodedToken } from "../types/DecodedToken";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  fetchAccessTokenLocal,
  fetchAccessTokenMSAL,
} from "../api/AxiosAuthentication";
import { isAuthenticated } from "../authService";

type ProtectedRouteProps = {
  allowedRoles: string[];
};

function isTokenExpired(accessToken: string): boolean {
  const currentTime = Math.floor(Date.now() / 1000);
  const decodedToken = jwtDecode<DecodedToken>(accessToken);
  return currentTime >= decodedToken.exp;
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { accessToken, setAccessToken } = useAuth();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        let token = accessToken;
        if (!token && !(await isAuthenticated())) {
          const authResponse = await fetchAccessTokenLocal();
          token = authResponse?.data;
        } else if (!token && (await isAuthenticated())) {
          const authResponse = await fetchAccessTokenMSAL();
          token = authResponse.data;
        }

        if (token) {
          setAccessToken(token);
          if (!isTokenExpired(token)) {
            const decodedToken = jwtDecode<DecodedToken>(token);
            if (allowedRoles.includes(decodedToken.role)) {
              setIsTokenValid(true);
            }
          }
        }
        //eslint-disable-next-line
      } catch (error: any) {
        if (error.response?.status === 401) {
          setIsTokenValid(false);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchToken();
  }, [accessToken, setAccessToken, allowedRoles]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <div>Loading...</div>
      </div>
    );
  }

  if (isTokenValid) {
    return <Outlet />;
  } else {
    return <Navigate to="/not_found" state={{ from: location }} replace />;
  }
};

export default ProtectedRoute;
