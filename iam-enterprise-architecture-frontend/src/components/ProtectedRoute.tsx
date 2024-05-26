import { useEffect } from "react";
import { fetchAuthToken, fetchAuthTokenMs } from "../api/AxiosAuth";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../types/DecodedToken";
import { useMsal } from "@azure/msal-react";
import { isAuthenticated } from '../authService';
import { useState } from 'react'

type ProtectedRouteProps = {
    allowedRoles: string[];
};

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
    const { setAuthToken } = useUser();
    const { instance } = useMsal();
    const navigate = useNavigate();
    const location = useLocation();
    //const [tokenSet, setTokenSet] = useState(false);

    useEffect(() => {
        let tokenSet = false;
        async function updateAdminToken() {
            if (await isAuthenticated()) {
                try {
                    const response = await fetchAuthTokenMs();
                    if (response) {
                        setAuthToken(response.data);
                        tokenSet = true;
                        if (!allowedRoles.includes(jwtDecode<DecodedToken>(response.data).role)) {
                            navigate('/unauthorized', { state: { from: location }, replace: true })
                        }
                    }
                    else {
                        localStorage.removeItem("user");
                        navigate('/login', { state: { from: location }, replace: true });
                    }

                } catch (error: any) {
                    if (error.response.status === 401) {
                        localStorage.removeItem("user");
                        navigate('/login');
                    }
                }
            }
        }

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
            } catch (error: any) {
                console.log("here?")
                if (error.response.status === 401) {
                    localStorage.removeItem("user");
                    navigate('/login');
                }
            }
        }

        async function checkAndSetTokens() {
            await updateAdminToken();
            if (!tokenSet) {
                await updateAuthToken();
            }
        }

        checkAndSetTokens();

    }, [navigate, setAuthToken, location, allowedRoles, instance]);

    return <Outlet />;
}