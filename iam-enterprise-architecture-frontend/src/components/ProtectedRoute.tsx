import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { DecodedToken } from "../types/DecodedToken";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchAccessTokenLocal, fetchAccessTokenMSAL } from "../api/AxiosAuthentication"
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

  useEffect(() => {
    const fetchToken = async () => {
      try {
        if (!accessToken && await !isAuthenticated()) {
          const authResponse = await fetchAccessTokenLocal();
          setAccessToken(authResponse?.data);
        } else if (!accessToken && await isAuthenticated()) {
          const authResponse = await fetchAccessTokenMSAL();
          console.log(authResponse.data)
          setAccessToken(authResponse.data);
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          setIsLoading(false);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchToken();
  }, [accessToken, setAccessToken]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return accessToken &&
    !isTokenExpired(accessToken) &&
    allowedRoles.includes(jwtDecode<DecodedToken>(accessToken).role) ? (
    <Outlet />
  ) : (
    <Navigate to="/not_found" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
