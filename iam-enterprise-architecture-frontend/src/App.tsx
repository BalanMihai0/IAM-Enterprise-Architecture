import NotFoundPage from "./pages/NotFoundPage.tsx"
import UnauthorizedPage from "./pages/UnauthorizedPage.tsx"

import LandingPage from "./pages/LandingPage.tsx"
import RegisterPage from "./pages/RegisterPage.tsx"
import LoginPage from "./pages/LoginPage.tsx"

import ProtectedRoute from "./components/ProtectedRoute.tsx"
import Layout from "./components/Layout.tsx"

import { Route, Routes } from "react-router"
import { MsalProvider } from "@azure/msal-react"
import AuthTestPage from "./pages/AuthTestPage.tsx"
import { msalInstance } from "./authService.ts"
import OffersPage from "./pages/OffersPage.tsx"

(async () => {
  try {
     await msalInstance.initialize();
     console.log("MSAL instance initialized");
  } catch (error) {
     console.error("Failed to initialize MSAL instance", error);
  }
 })();

 

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="/test" element={<AuthTestPage />} />
          <Route path="/offers" element={<OffersPage />} />

          {/* Protected routes */}
          {/* Common */}
          <Route element={<ProtectedRoute allowedRoles={["STUDENT", "TEACHER", "ADMINISTRATOR"]} />}>

          </Route>

          {/* Student, Teacher */}
          <Route element={<ProtectedRoute allowedRoles={["STUDENT", "TEACHER"]} />}>

          </Route>
        </Route>

        {/* Catch all */}
        <Route path="*" element={<NotFoundPage />} />
        <Route path="unauthorized" element={<UnauthorizedPage />} />
      </Routes>
    </MsalProvider>

  )
}

export default App
