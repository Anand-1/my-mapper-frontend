import React from "react";
import { useNavigate } from "react-router-dom";
import {
  getCurrentUser,
  getStoredAdmin,
  type AdminSession,
  type AuthenticatedUser,
} from "../services/authService";

export const useAdminLandingPage = () => {
  const navigate = useNavigate();
  const [adminSession, setAdminSession] = React.useState<AdminSession | null>(null);
  const [googleSession, setGoogleSession] =
    React.useState<AuthenticatedUser | null>(null);
  const [isCheckingSession, setIsCheckingSession] = React.useState(true);

  React.useEffect(() => {
    const loadSession = async () => {
      const storedAdmin = getStoredAdmin();

      if (storedAdmin) {
        setAdminSession(storedAdmin);
        setIsCheckingSession(false);
        return;
      }

      try {
        const user = await getCurrentUser();

        if (user) {
          setGoogleSession(user);
          setIsCheckingSession(false);
          return;
        }
      } catch {
        // The login page owns the visible auth error state.
      }

      navigate("/login");
    };

    loadSession();
  }, [navigate]);

  const displayName =
    adminSession?.username || googleSession?.name || googleSession?.email || "Admin";

  return {
    adminSession,
    displayName,
    isCheckingSession,
  };
};
