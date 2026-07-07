import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { appRoutes } from "../routes";
import { getNavUser, logout, type NavUser } from "../services/authService";

export const useAppNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = React.useState<NavUser | null>(null);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  React.useEffect(() => {
    const loadUser = async () => {
      try {
        setUser(await getNavUser());
      } catch {
        setUser(null);
      }
    };

    loadUser();
  }, [location.pathname, location.search]);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await logout();
    } finally {
      setUser(null);
      setIsLoggingOut(false);
      navigate(appRoutes.login);
    }
  };

  return {
    handleLogout,
    isLoggingOut,
    user,
  };
};
