/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useUser } from './useUser';
import { useMsal } from '@azure/msal-react';
import { jwtDecode } from "jwt-decode";
import { fetchAuthToken, fetchRefreshToken, fetchUser } from '../api/AxiosAuth';

const useAuth = () => {
   const { setUser, setAuthToken } = useUser();
   const { instance } = useMsal();

   useEffect(() => {
      const refreshAuthToken = async () => {
         try {
            const authResponse = await axios.get('/api/v1/auth/refresh', { withCredentials: true });
            const newToken = authResponse.data;
            setAuthToken(newToken);
         } catch (error) {
            console.error('Failed to refresh auth token', error);
         }
      };

      if (Cookies.get('refreshToken')) {
         refreshAuthToken();
      }
   }, [setUser, setAuthToken]);

   const login = async (type: string, email: string | null, password: string | null) => {
      try {
         if (type === "Microsoft") {
            const loginResponse = await instance.loginPopup({ scopes: [`api://${process.env.MSAL_API_CLIENT_ID}/admin`] });
            if (loginResponse) {
               const account = loginResponse.account;
               await instance.setActiveAccount(account);
            }
         }
         else if (type === "Local") {
            const refreshResponse = await fetchRefreshToken({ email, password });
            if (refreshResponse) {
               const refreshToken = refreshResponse.data;
               Cookies.set('refreshToken', refreshToken, { expires: 1, secure: true, sameSite: 'Strict' });
               const authResponse = await fetchAuthToken('/api/v1/auth/refresh');
               setAuthToken(authResponse.data);
               const userId = jwtDecode(authResponse.data).unique_name;
               const userData = await fetchUser(userId, authResponse.data);
               const user = { name: userData.data.full_name, email: userData.data.email, role: userData.data.role };
               setUser(user);
            }
         }
      } catch (error) {
         console.error('Login failed:', error);
      }
   };

   const removeAuthToken = () => {
      Cookies.remove('refreshToken');
      setAuthToken('');
      setUser({ name: '', email: '', role: '' });
   };

   return { login, removeAuthToken };
};

export default useAuth;
