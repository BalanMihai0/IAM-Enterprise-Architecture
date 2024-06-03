import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "./authService.ts";

import "./style.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { AuthProvider } from "./context/AuthContext.tsx";

(async () => {
  try {
    await msalInstance.initialize();
  } catch (error) {
    console.error("Failed to initialize MSAL instance", error);
  }
})();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <BrowserRouter>
      <MsalProvider instance={msalInstance}>
        <AuthProvider>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </AuthProvider>
      </MsalProvider>
    </BrowserRouter>
  </ThemeProvider>
);
