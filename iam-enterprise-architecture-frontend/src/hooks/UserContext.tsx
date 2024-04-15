/* eslint-disable no-extra-semi */
import React, { createContext, useState, ReactNode } from 'react';
import { User } from '../types/User';

interface UserContextValue {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const UserContext = createContext<UserContextValue>({
  user: { name: '', email: '', role: '' },
  setUser: () => { },
});

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>({ name: '', email: '', role: '' });
 
  return (
     <UserContext.Provider value={{ user, setUser }}>
       {children}
     </UserContext.Provider>
  );
};