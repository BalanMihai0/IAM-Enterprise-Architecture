/* eslint-disable no-extra-semi */
import React, { createContext, useState, ReactNode } from 'react';
import { User } from '../types/User';

interface UserContextValue {
  user: User;
  authToken: string;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setAuthToken: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<UserContextValue>({
  user: { name: '', email: '', role: '' },
  authToken: '',
  setUser: () => { },
  setAuthToken: () => { },
});

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>({ name: '', email: '', role: '' });
  const [authToken, setAuthToken] = useState<string>('');
 
  return (
     <UserContext.Provider value={{ user, setUser, authToken, setAuthToken }}>
       {children}
     </UserContext.Provider>
  );
};