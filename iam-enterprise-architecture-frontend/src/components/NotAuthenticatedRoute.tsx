import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function NotAuthenticatedRoute() {
  const { isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSignedIn = async () => {
      setSignedIn(await isLoggedIn());
    };
    checkSignedIn();
    setIsLoading(false);
  }, [isLoggedIn]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return !signedIn ? <Outlet /> : <Navigate to="/" />;
}
