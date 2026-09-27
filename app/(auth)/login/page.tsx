"use client";

import { useAuth } from "@/core/hooks/AuthContext";
import { Button, colorConfig, Icon, Input, MyToast } from "@wijaya/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LoginData = {
  username: string;
  password: string;
};

const defaultLoginData = {
  username: "",
  password: "",
};

export default function LoginPage() {
  const router = useRouter();
  const [data, setData] = useState<LoginData>(defaultLoginData);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();

  const handleLogin = () => {
    if (!data.username) {
      MyToast.error("Username Wajib Diisi");
      return;
    }

    if (!data.password) {
      MyToast.error("Password Wajib Diisi");
      return;
    }

    login({ username: data.username, password: data.password })
      .then(() => {
        MyToast.success("Login Berhasil");
        router.push("/dashboard");
      })
      .catch((e) => {
        MyToast.error(e.message);
      });
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-100 px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.15),_transparent_35%)]" />

      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-300/30 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl" />

      <section className="relative z-10 w-full max-w-md rounded-3xl border border-white/70 bg-white/60 p-8 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:p-10">
        <div className="mb-8 flex justify-center">
          <div className="flex size-14 items-center justify-center rounded-2xl border border-indigo-200 bg-white/70 shadow-sm">
            <div className="size-6 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600" />
          </div>
        </div>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Selamat Datang
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Silakan masuk untuk melanjutkan ke akun Anda
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Username
            </label>

            <div className="relative">
              <Icon
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                icon="lucide:user"
                fontSize="18px"
              />

              <Input
                id="username"
                className={`h-12 w-full rounded-xl border border-[${colorConfig.secondary}] bg-white/70 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 focus:ring-indigo-100`}
                replaceClassName
                value={data.username}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, username: e.target.value }))
                }
                placeholder="Masukkan username"
                autoComplete="username"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Password
            </label>

            <div className="relative">
              <Icon
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                icon="lucide:lock-keyhole"
                fontSize="18px"
              />

              <Input
                id="password"
                className={`h-12 w-full rounded-xl border border-[${colorConfig.secondary}] bg-white/70 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100`}
                type={showPassword ? "text" : "password"}
                replaceClassName
                value={data.password}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, password: e.target.value }))
                }
                placeholder="Masukkan password"
                autoComplete="current-password"
              />

              <Button className="absolte r">Tes</Button>
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <Icon icon="lucide:eye" fontSize="18px" />
                ) : (
                  <Icon icon="lucide:eye-off" fontSize="18px" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                className="size-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              Ingat saya
            </label>

            <button
              type="button"
              className="text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
            >
              Lupa password?
            </button>
          </div>

          <Button
            className="h-12 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30 active:translate-y-0"
            onClick={handleLogin}
            replaceClassName
          >
            Masuk
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Belum memiliki akun?{" "}
          <button
            type="button"
            className="font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Daftar
          </button>
        </p>
      </section>
    </main>
  );
}
