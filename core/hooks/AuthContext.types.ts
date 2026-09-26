import { ReactNode } from "react";

export interface AuthUser {
  id: string | number;
  name: string;
  email: string;
  permissions: string[];
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;

  login: (credentials: LoginCredentials) => Promise<void>;

  logout: () => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;

  onLogin?: (credentials: LoginCredentials) => Promise<AuthUser>;

  onLogout?: () => Promise<void>;
}
