export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

export const adminCredentials = {
  username: import.meta.env.VITE_ADMIN_USERNAME || "admin",
  password: import.meta.env.VITE_ADMIN_PASSWORD || "admin123",
};
