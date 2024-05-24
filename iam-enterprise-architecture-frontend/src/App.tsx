import NotFoundPage from "./pages/NotFoundPage.tsx"
import UnauthorizedPage from "./pages/UnauthorizedPage.tsx"

import LandingPage from "./pages/LandingPage.tsx"
import RegisterPage from "./pages/RegisterPage.tsx"
import LoginPage from "./pages/LoginPage.tsx"

import NotAuthenticatedRoute from "./components/NotAuthenticatedRoute.tsx"
import ProtectedRoute from "./components/ProtectedRoute.tsx"
import Layout from "./components/Layout.tsx"

import { Route, Routes, Navigate } from "react-router-dom"
import { MsalProvider } from "@azure/msal-react"
import AuthTestPage from "./pages/AuthTestPage.tsx"
import { msalInstance } from "./authService.ts"

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
        {/* Redirect from root to home */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Exclusively not authenticated routes */}
        <Route element={<NotAuthenticatedRoute />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Stylized routes */}
        <Route element={<Layout />}>
          {/* Public routes */}
          

          {/* Admin routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            {/* Place admin routes here */}
          </Route>

          {/* Admin & Customer routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin', 'customer']} />}>
            <Route path="/home" element={<LandingPage />} /> 
            {/* Place admin & customer shared routes here */}
          </Route>
        </Route>

        {/* Catch all */}
        <Route path="/test" element={<AuthTestPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MsalProvider>
  )
}

export default App
