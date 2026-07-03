import { apiBaseUrl } from "./config";

export type AuthenticatedUser = {
  email?: string;
  name?: string;
  picture?: string;
};

export type AdminSession = {
  username: string;
  role: string;
};

export type NavUser = {
  label: string;
  role: string;
};

const ADMIN_STORAGE_KEY = "my_mapper_admin_user";

export const getStoredAdmin = (): AdminSession | null => {
  const storedAdmin = localStorage.getItem(ADMIN_STORAGE_KEY);

  if (!storedAdmin) {
    return null;
  }

  try {
    return JSON.parse(storedAdmin) as AdminSession;
  } catch {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    return null;
  }
};

export const saveAdminSession = (username: string) => {
  localStorage.setItem(
    ADMIN_STORAGE_KEY,
    JSON.stringify({ username, role: "Admin" }),
  );
};

export const clearAdminSession = () => {
  localStorage.removeItem(ADMIN_STORAGE_KEY);
};

export const getCurrentUser = async (): Promise<AuthenticatedUser | null> => {
  const response = await fetch(`${apiBaseUrl}/auth/me`, {
    credentials: "include",
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data.user;
};

export const logout = async () => {
  clearAdminSession();

  await fetch(`${apiBaseUrl}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};

export const loginUser = async (credentials: {
  username: string;
  password: string;
}): Promise<void> => {
  const response = await fetch(`${apiBaseUrl}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(
      body?.error || "Unable to log in. Please check your credentials.",
    );
  }
};

export const registerUser = async (user: {
  name: string;
  email: string;
  password: string;
}): Promise<void> => {
  const response = await fetch(`${apiBaseUrl}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(
      body?.error || "Unable to register user. Please try again."
    );
  }
};

export const getNavUser = async (): Promise<NavUser | null> => {
  const admin = getStoredAdmin();

  if (admin) {
    return {
      label: admin.username,
      role: admin.role || "Admin",
    };
  }

  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return {
    label: user.name || user.email || "Google user",
    role: "Signed in",
  };
};
