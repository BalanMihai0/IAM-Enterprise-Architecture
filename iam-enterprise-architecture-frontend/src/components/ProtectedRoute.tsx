/* import { useLocation, Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles }) {
    const location = useLocation();

    return (
        isLoggedIn
            ? (user?.role && allowedRoles.includes(user.role)
                ? (
                    <div className="flex">
                        <Sidebar role={user.role} />
                        <div className="flex-1 p-4 bg-dracula-darker-500">
                            <Outlet />
                        </div>
                    </div>
                )
                : <Navigate to="/unauthorized" state={{ from: location }} replace />
            )
            : <Navigate to="/login" state={{ from: location }} replace />
    );
} */

type ProtectedRouteProps = {
    allowedRoles: string[]; // This specifies that allowedRoles is an array of strings
   };

export default function ProtectedRoute({allowedRoles}:ProtectedRouteProps) {
    return (
        <>
        </>
    )
}