import axios from "../api/AxiosConfig";

export async function fetchRefreshToken(requestBody: unknown) {
    return axios.post("/api/v1/auth/login", requestBody).then(response => {
        return response;
    });
}

export async function fetchAuthToken() {
    try {
        const response = await axios.get("/api/v1/auth/refresh", {
            withCredentials: true,
        });
        return response;
    } catch (error) {
        throw error;
    }
}

export async function fetchUser(userId: string, authToken: string) {
    return axios.get(`/api/v1/users/${userId}`, {
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${authToken}`,
        }
    }).then(response => {
        return response;
    });
}