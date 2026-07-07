import React from "react";
import { useFormik } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";
import { appRoutes } from "../routes";
import { apiBaseUrl } from "../services/config";
import {
  getCurrentUser,
  loginUser,
  saveAdminSession,
  type AuthenticatedUser,
} from "../services/authService";

type LoginFormValues = {
  username: string;
  password: string;
  remember: boolean;
};

export const useLoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const oauthStatus = searchParams.get("oauth");
  const oauthMessage = searchParams.get("message");
  const [authenticatedUser, setAuthenticatedUser] =
    React.useState<AuthenticatedUser | null>(null);
  const [authLookupError, setAuthLookupError] = React.useState("");
  const [loginError, setLoginError] = React.useState("");

  React.useEffect(() => {
    if (oauthStatus !== "success") {
      return;
    }

    const loadAuthenticatedUser = async () => {
      try {
        const user = await getCurrentUser();

        if (!user) {
          throw new Error("Unable to verify signed-in user");
        }

        setAuthenticatedUser(user);
        setAuthLookupError("");
        navigate(appRoutes.dashboard);
      } catch {
        setAuthLookupError("Signed in, but the session could not be verified.");
      }
    };

    loadAuthenticatedUser();
  }, [navigate, oauthStatus]);

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      username: "",
      password: "",
      remember: false,
    },
    validate: (values) => {
      const errors: Partial<Record<keyof LoginFormValues, string>> = {};

      if (!values.username) {
        errors.username = "Username is required";
      }

      if (!values.password) {
        errors.password = "Password is required";
      }

      return errors;
    },
    onSubmit: async (values) => {
      saveAdminSession(values.username);
      setLoginError("");
      try {
        await loginUser({
          username: formik.values.username,
          password: formik.values.password
        });

        navigate(appRoutes.dashboard);
      } catch (error) {
        setLoginError(
          error instanceof Error
            ? error.message
            : "Unable to create account. Please try again."
        );
      } finally {
        // setIsSubmitting(false);
      }
    },
  });

  const handleGoogleLogin = () => {
    window.location.href = `${apiBaseUrl}/auth/google`;
  };

  return {
    authenticatedUser,
    authLookupError,
    formik,
    handleGoogleLogin,
    loginError,
    oauthMessage,
    oauthStatus,
  };
};
