"use client";

import { useAuth } from "@/core/hooks/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <>
      <h1>Selamat Malam, {user?.name}</h1>
    </>
  );
}
