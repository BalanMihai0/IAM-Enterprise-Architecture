import { Configuration } from "@azure/msal-browser";
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

export const msalConfig: Configuration = {
   auth: {
      clientId: `${process.env.MSAL_WEB_CLIENT_ID}`,
      authority: `https://login.microsoftonline.com/${process.env.MSAL_WEB_TENANT_ID}`,
      redirectUri: `${process.env.MSAL_REDIRECT_URI}`,
   },
 cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
 },
};