/* eslint-disable no-extra-semi */
import React, { createContext, useState, ReactNode } from 'react';

interface UserContextValue {
  authToken: string;
  setAuthToken: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<UserContextValue>({
  authToken: '',
  setAuthToken: () => { },
});

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [authToken, setAuthToken] = useState<string>('');
 
  return (
     <UserContext.Provider value={{ authToken, setAuthToken }}>
       {children}
     </UserContext.Provider>
  );
};