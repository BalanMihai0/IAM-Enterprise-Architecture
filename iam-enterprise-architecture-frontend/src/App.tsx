import NotFoundPage from "./pages/NotFoundPage.tsx"

import LandingPage from "./pages/LandingPage.tsx"
import RegisterPage from "./pages/RegisterPage.tsx"
import LoginPage from "./pages/LoginPage.tsx"
import AdminPage from "./pages/AdminPage.tsx"
import UsersAdminPage from "./pages/UsersAdminPage.tsx";
import JobsAdminPage from "./pages/JobsAdminPage.tsx"

import NotAuthenticatedRoute from "./components/NotAuthenticatedRoute.tsx"
import ProtectedRoute from "./components/ProtectedRoute.tsx"
import Layout from "./components/Layout.tsx"

import { Route, Routes, Navigate } from "react-router-dom"
import { MsalProvider } from "@azure/msal-react"
import AuthTestPage from "./pages/AuthTestPage.tsx"
import { msalInstance } from "./authService.ts"
import { AuthProvider } from './context/AuthContext.tsx';

(async () => {
  try {
    await msalInstance.initialize();
  } catch (error) {
    console.error("Failed to initialize MSAL instance", error);
  }
})();

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />

          {/* Exclusively not authenticated routes */}
          <Route element={<NotAuthenticatedRoute />}>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} /> 
          </Route>

          {/* Stylized routes */}
          <Route element={<Layout />}>
            {/* Public routes */}
            <Route path="/home" element={<LandingPage />} />

            {/* Admin routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/jobs" element={<JobsAdminPage />} />
              <Route path="/admin/users" element={<UsersAdminPage />} />
            </Route>

            {/* Admin & Customer routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin', 'customer']} />}>
              {/* Place admin & customer shared routes here */}
            </Route>
          </Route>

          {/* Catch all */} 
          <Route path="/test" element={<AuthTestPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </MsalProvider>
  )
}

export default App
