import { useEffect } from "react";
import { fetchAuthToken } from "../api/AxiosAuth";
import { Outlet, useNavigate } from "react-router-dom";

export default function NotAuthenticatedRoute() {
    const navigate = useNavigate();

    useEffect(() => {
        async function updateAuthToken() {
            const response = await fetchAuthToken();
            if (response) {
                navigate("/home");
            }
        }
        updateAuthToken();
    }, [navigate]);

    return <Outlet />;
}