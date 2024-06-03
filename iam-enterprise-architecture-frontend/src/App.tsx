import NotFoundPage from "./pages/NotFoundPage.tsx";

import LandingPage from "./pages/LandingPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import UsersAdminPage from "./pages/UsersAdminPage.tsx";
import JobsAdminPage from "./pages/JobsAdminPage.tsx";
import OffersPage from "./pages/OffersPage.tsx";
import BookingsPage from "./pages/BookingsPage.tsx";
import AccountPage from "./pages/AccountPage.tsx";

import AuthTestPage from "./pages/AuthTestPage.tsx";
import NotAuthenticatedRoute from "./components/NotAuthenticatedRoute.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Layout from "./components/Layout.tsx";

import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Navigate to="/" />} />
      {/* Exclusively not authenticated routes */}
      <Route element={<NotAuthenticatedRoute />}>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Stylized routes */}
      <Route element={<Layout />}>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/offers" element={<OffersPage />} />

        {/* Admin routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/jobs" element={<JobsAdminPage />} />
          <Route path="/admin/users" element={<UsersAdminPage />} />
        </Route>

        {/* Customer routes */}
        <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
          <Route path="/bookings" element={<BookingsPage />} />
        </Route>

        {/* Admin & Customer routes */}
        <Route
          element={<ProtectedRoute allowedRoles={["admin", "customer"]} />}
        >
          {/* Place admin & customer shared routes here */}
          <Route path="/account" element={<AccountPage />} />
        </Route>
      </Route>

      {/* Catch all */}
      <Route path="/test" element={<AuthTestPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
