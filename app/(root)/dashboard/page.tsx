"use client";
import { useAuth } from "@/my-package/wijaya-ui";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <>
      <h1>Selamat Malam, {user?.name}</h1>
    </>
  );
}
