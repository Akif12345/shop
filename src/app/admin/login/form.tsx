"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f3ef] px-4 py-12 text-[#111]">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-black tracking-tight">Admin Login</h1>
        <p className="mt-2 text-sm text-black/60">Sign in to manage service requests.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-black/80">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="admin@example.com"
              className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm focus:border-[#d44a1a] focus:outline-none focus:ring-2 focus:ring-[#d44a1a]/20"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-black/80">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm focus:border-[#d44a1a] focus:outline-none focus:ring-2 focus:ring-[#d44a1a]/20"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#d44a1a] disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
