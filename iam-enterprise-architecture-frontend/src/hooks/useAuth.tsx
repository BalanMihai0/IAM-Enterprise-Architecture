import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { User } from '../types/User';
import { useUser } from './useUser';

const useAuth = () => {
 const [token, setToken] = useState(Cookies.get('token') || '');
 const { setUser } = useUser();

 useEffect(() => {
    const storedToken = Cookies.get('token');
    if (storedToken) {
      setToken(storedToken);
    }
 }, []);

 const setAuthToken = (token: string, user: User) => {
    Cookies.set('token', token, { expires: 7, secure: true });
    setToken(token);
    setUser(user);
 };

 const removeAuthToken = () => {
    Cookies.remove('token');
    setToken('');
    setUser({ name: '', email: '', role: '' });
 };

 return { token, setAuthToken, removeAuthToken };
};

export default useAuth;