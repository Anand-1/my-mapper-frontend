import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../routes";
import { registerUser } from "../services/authService";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const useRegisterPage = () => {
  const navigate = useNavigate();
  const [registerError, setRegisterError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const formik = useFormik<RegisterFormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: (values) => {
      const errors: Partial<Record<keyof RegisterFormValues, string>> = {};

      if (!values.name) {
        errors.name = "Name is required";
      }

      if (!values.email) {
        errors.email = "Email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = "Please enter a valid email address";
      }

      if (!values.password) {
        errors.password = "Password is required";
      } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
      }

      if (!values.confirmPassword) {
        errors.confirmPassword = "Confirm your password";
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Passwords do not match";
      }

      return errors;
    },
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setRegisterError("");

      try {
        await registerUser({
          name: values.name,
          email: values.email,
          password: values.password,
        });

        navigate(appRoutes.dashboard);
      } catch (error) {
        setRegisterError(
          error instanceof Error
            ? error.message
            : "Unable to create account. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return {
    formik,
    isSubmitting,
    registerError,
  };
};
