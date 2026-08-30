"use client";

import { AuthProvider } from "@/my-package/wijaya-ui";
import { ToasterContainer } from "@/my-package/wijaya-ui";
import { dummyUser } from "./config/userConfig";

export function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToasterContainer />

      <AuthProvider
        onLogin={async (credentials) => {
          if (
            credentials.email === dummyUser.username &&
            credentials.password === dummyUser.password
          ) {
            return {
              id: dummyUser.id,
              name: dummyUser.name,
              username: credentials.email,
              email: dummyUser.email,
            };
          }

          throw new Error("Username atau password salah");
        }}
      >
        {children}
      </AuthProvider>
    </>
  );
}
