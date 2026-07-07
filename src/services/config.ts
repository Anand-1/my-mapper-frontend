export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

export const adminCredentials = {
  username: import.meta.env.VITE_ADMIN_USERNAME || "admin",
  password: import.meta.env.VITE_ADMIN_PASSWORD || "admin123",
};

export const tealiumConfig = {
  account: import.meta.env.VITE_TEALIUM_ACCOUNT || "",
  profile: import.meta.env.VITE_TEALIUM_PROFILE || "",
  environment: import.meta.env.VITE_TEALIUM_ENVIRONMENT || "dev",
  enabled: import.meta.env.VITE_TEALIUM_ENABLED !== "false",
};

export const routerBasePath =
  import.meta.env.VITE_ROUTER_BASE || (import.meta.env.PROD ? import.meta.env.BASE_URL : "/");
