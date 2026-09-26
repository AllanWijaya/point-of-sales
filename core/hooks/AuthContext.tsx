"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  AuthContextValue,
  AuthProviderProps,
  AuthUser,
  LoginCredentials,
} from "./AuthContext.types";
import { APIRequest, setAuthToken } from "../lib/APIRequest";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({
  children,
  onLogin,
  onLogout,
}: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);

    try {
      if (onLogin) {
        setUser(await onLogin(credentials));
        return;
      }

      const result = await APIRequest<
        {
          data: {
            token: string;
            user: AuthUser & {
              uuid: string;
              username: string;
              company_uuid: string;
            };
          };
        },
        LoginCredentials
      >({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      });
      setAuthToken(result.data.token);
      setUser({ ...result.data.user, id: result.data.user.uuid });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);

    try {
      await onLogout?.();

      setAuthToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
