/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from './msalConfig';

export const msalInstance = new PublicClientApplication(msalConfig);

export const getTokenResponse = async (scope: string): Promise<any> => {
 try {
    const tokenResponse = await msalInstance.acquireTokenSilent({
      scopes: [`api://${process.env.MSAL_API_CLIENT_ID}/${scope}`],
    });
s
    return tokenResponse;
 } catch (error) {
    console.error(error);
    return null;
 }
};

export const getAccessToken = async (scope: string): Promise<string | null> => {
 const tokenResponse = await getTokenResponse(scope);
 return tokenResponse ? tokenResponse.accessToken : null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getClaims = async (scope: string): Promise<any> => {
 const tokenResponse = await getTokenResponse(scope);
 return tokenResponse ? tokenResponse.idTokenClaims : null;
};

export const isAuthenticated = async (): Promise<boolean> => {
   const accounts = msalInstance.getAllAccounts();
   if (accounts.length > 0) {
      return true;
   }
   return false;
}

export const logout = async () => {
   await msalInstance.logoutRedirect({
     postLogoutRedirectUri: window.location.origin,
   });
 };
