import { useEffect } from "react";
import { fetchAuthToken } from "../api/AxiosAuth";
import { Outlet, useNavigate } from "react-router-dom";

export default function NotAuthenticatedRoute() {
    const navigate = useNavigate();

    useEffect(() => {
        async function updateAuthToken() {
            try {
                const response = await fetchAuthToken();
                if (response) {
                    navigate("/home");
                }
            }
            catch (error : any) {
                if (error.response.status === 401) {
                    return;
                }
            }
        }
        updateAuthToken();
    }, [navigate]);

    return <Outlet />;
}