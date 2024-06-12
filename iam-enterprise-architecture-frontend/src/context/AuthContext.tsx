import {
  useState,
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from "react";
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
  isLoggedIn: () => Promise<boolean | null>;
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

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (await isAuthenticated()) {
          const authResponse = await fetchAccessTokenMSAL();
          setAccessToken(authResponse.data);
        } else {
          const authResponse = await fetchAccessTokenLocal();
          setAccessToken(authResponse?.data);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.response.status !== 401) {
          console.error("Unexpected error in initializeAuth: ", error);
        }
      }
    };
    initializeAuth();
  }, []);

  const isLoggedIn = async (): Promise<boolean | null> => {
    try {
      if (await isAuthenticated()) {
        return true;
      } else if (accessToken) {
        return true;
      } else {
        return false;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response.status === 401) {
        return false;
      } else {
        console.error("Unexpected error in isLoggedIn: ", error);
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
        if (
          refreshResponse &&
          refreshResponse.data.message === "Login successful"
        ) {
          const authResponse = await fetchAccessTokenLocal();
          setAccessToken(authResponse?.data);
        }
      } else if (method === "Microsoft") {
        const loginResponse = await instance.loginPopup({
          scopes: [`api://${process.env.MSAL_API_CLIENT_ID}/admin`],
        });
        if (loginResponse) {
          const account = loginResponse.account;
          await instance.setActiveAccount(account);
          const authResponse = await fetchAccessTokenMSAL();
          setAccessToken(authResponse.data);
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        throw error as Error;
      }
    }
  };

  const logout = async () => {
    if (await isAuthenticated()) {
      await logoutMSAL();
    } else {
      await logoutLocal();
    }
    setAccessToken(null);
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
