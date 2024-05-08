// msalConfig.js

export const msalConfig = {
    auth: {
        clientId: `${process.env.MSAL_CLIENT_ID}`,
        authority: `https://login.microsoftonline.com/${process.env.MSAL_TENANT_ID}`,
        redirectUri: `${process.env.MSAL_REDIRECT_URI}`,
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel: any, message: any, containsPii: any) {
                if (containsPii) {
                    return;
                }
                switch (loglevel) {
                    case 0:
                        console.error(message);
                        return;
                    case 1:
                        console.warn(message);
                        return;
                    case 2:
                        console.info(message);
                        return;
                    case 3:
                        console.debug(message);
                        return;
                }
            },
            logLevel: 3,
            piiLoggingEnabled: false,
        },
    },
    scopes: ["admin"],
};
