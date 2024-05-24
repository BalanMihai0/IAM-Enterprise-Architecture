import { useEffect } from "react";
import { fetchAuthToken } from "../api/AxiosAuth";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../types/DecodedToken";

type ProtectedRouteProps = {
    allowedRoles: string[];
};

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
    const { setAuthToken } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        async function updateAuthToken() {
            try {
                const response = await fetchAuthToken();
                if (response) {
                    setAuthToken(response.data);
                    if (!allowedRoles.includes(jwtDecode<DecodedToken>(response.data).role)) {
                        navigate('/unauthorized', { state: { from: location }, replace: true })
                    }
                } else {
                    localStorage.removeItem("user");
                    navigate('/login', { state: { from: location }, replace: true });
                }
            } catch {
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
        updateAuthToken();
    }, [navigate, setAuthToken, location, allowedRoles]);

    return <Outlet />;
}