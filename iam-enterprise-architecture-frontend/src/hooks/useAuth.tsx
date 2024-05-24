import { useUser } from './useUser';
import { useMsal } from '@azure/msal-react';
import { jwtDecode } from "jwt-decode";
import { fetchAuthToken, fetchRefreshToken, fetchUser } from '../api/AxiosAuth';
import { DecodedToken } from '../types/DecodedToken';

const useAuth = () => {
   const { setAuthToken } = useUser();
   const { instance } = useMsal();

   const login = async (type: string, email: string | null, password: string | null) => {
      try {
         if (type === "Microsoft") {
            // @ts-expect-error PROCESS.ENV
            const loginResponse = await instance.loginPopup({ scopes: [`api://${process.env.MSAL_API_CLIENT_ID}/admin`] });
            if (loginResponse) {
               const account = loginResponse.account;
               await instance.setActiveAccount(account);
            }
         }
         else if (type === "Local") {
            const refreshResponse = await fetchRefreshToken({ email, password });
            if (refreshResponse.data.message === "Login successful") {
               const authResponse = await fetchAuthToken(); 
               setAuthToken(authResponse.data);
               const userId = jwtDecode<DecodedToken>(authResponse.data).unique_name;
               const userData = await fetchUser(userId, authResponse.data);
               localStorage.setItem("user", JSON.stringify({ name: userData.data.full_name, email: userData.data.email }));
            } else {
               console.error("Invalid credentials");
            }
         }
      } catch (error) {
         console.error('Login failed:', error);
      }
   };

   const logout = () => {
      // TODO: Backend endpoint to remove cookie
      setAuthToken('');
      localStorage.removeItem("user");
   };

   return { login, logout };
};

export default useAuth;
