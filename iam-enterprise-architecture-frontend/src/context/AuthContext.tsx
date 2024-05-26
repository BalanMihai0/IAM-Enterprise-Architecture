import {
  useState,
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchAccessTokenLocal,
  fetchAccessTokenMSAL,
  fetchRefreshTokenLocal,
  logoutLocal,
} from "../api/AxiosAuthentication";
import { isAuthenticated, logout as logoutMSAL } from "../authService";
import { useMsal } from "@azure/msal-react";

interface AuthContextProps {
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  isLoggedIn: () => Promise<boolean|null>;
  login: (
    method: "local" | "Microsoft",
    credentials?: { email: string; password: string }
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { instance } = useMsal();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      if (await isAuthenticated()) {
        const authResponse = await fetchAccessTokenMSAL();
        setAccessToken(authResponse.data);
      } else {
        const authResponse = await fetchAccessTokenLocal();
        setAccessToken(authResponse.data);
      }
    };

    fetchToken();
  }, []);

  const isLoggedIn = async (): Promise<boolean | null> => {
    try {
      if (await isAuthenticated()) {
        return true;
      } else if (await fetchAccessTokenLocal()) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((error as any).response?.status === 401) {
        return false;
      } else {
        console.error('Unexpected error in isLoggedIn:', error);
        return null;
      }
    }
  };

  const login = async (
    method: "local" | "Microsoft",
    credentials?: { email: string; password: string }
  ) => {
    try {
      if (method === "local") {
        const refreshResponse = await fetchRefreshTokenLocal(credentials);
        if (refreshResponse.data.message === "Login successful") {
          const authResponse = await fetchAccessTokenLocal();
          setAccessToken(authResponse.data);
        }
      } else if (method === "Microsoft") {
        const loginResponse = await instance.loginPopup({
          // @ts-expect-error PROCESS.ENV
          scopes: [`api://${process.env.MSAL_API_CLIENT_ID}/admin`],
        });
        if (loginResponse) {
          const account = loginResponse.account;
          await instance.setActiveAccount(account);
          const authResponse = await fetchAccessTokenMSAL();
          setAccessToken(authResponse.data);
        }
      }
      navigate("/home");
    } catch (error) {
      console.error("Login error: ", error);
    }
  };

  const logout = async () => {
    if (await isAuthenticated()) {
        logoutMSAL();
      } else {
        logoutLocal();
      }
    setAccessToken(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, isLoggedIn, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext };
