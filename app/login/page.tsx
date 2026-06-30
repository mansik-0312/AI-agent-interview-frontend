"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login({ username, password });
      router.push("/interviews");
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1020] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#7C3AED] text-3xl text-white shadow-lg">
            🤖
          </div>

          <h1 className="mt-4 text-3xl font-bold text-white">
            AI Interview Agent
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Sign in to continue
          </p>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-8 shadow-2xl"
        >
          <h2 className="mb-6 text-2xl font-bold text-slate-900">
            Welcome Back
          </h2>

          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Username
          </label>

<input
  type="text"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  required
  placeholder="superadmin@example.com"
  className="mb-5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20"
/>

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Password
          </label>

<input
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  required
  placeholder="••••••••••"
  className="mb-6 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20"
/>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#7C3AED] px-4 py-3 font-semibold text-white transition-all hover:bg-[#6D28D9] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
