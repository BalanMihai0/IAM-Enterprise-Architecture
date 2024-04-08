import NotFoundPage from "./pages/NotFoundPage.tsx"
import UnauthorizedPage from "./pages/UnauthorizedPage.tsx"

import LandingPage from "./pages/LandingPage.tsx"
import RegisterPage from "./pages/RegisterPage.tsx"
import LoginPage from "./pages/LoginPage.tsx"

import ProtectedRoute from "./components/ProtectedRoute.tsx"
import Layout from "./components/Layout.tsx"

import { Route, Routes } from "react-router"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}> 
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        
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
  )
}

export default App
