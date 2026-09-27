"use client";

import { AuthProvider } from "@/core/hooks/AuthContext";
import { ToasterContainer } from "@wijaya/ui";

export function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToasterContainer />

      <AuthProvider>{children}</AuthProvider>
    </>
  );
}
