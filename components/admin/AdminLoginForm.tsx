"use client";

import { useActionState } from "react";
import { Loader2, Lock } from "lucide-react";
import { loginAction } from "@/actions/auth";
import { adminAr } from "@/data/admin-ar";

export default function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) => {
      return (await loginAction(formData)) ?? null;
    },
    null,
  );

  return (
    <form action={formAction} className="space-y-4">
      {state?.error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      ) : null}

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-brand-dark">{adminAr.login.email}</span>
        <input
          name="email"
          type="email"
          required
          dir="ltr"
          autoComplete="username"
          className="w-full rounded-xl border border-brand-dark/10 bg-white px-4 py-3 text-sm outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-brand-dark">{adminAr.login.password}</span>
        <input
          name="password"
          type="password"
          required
          dir="ltr"
          autoComplete="current-password"
          className="w-full rounded-xl border border-brand-dark/10 bg-white px-4 py-3 text-sm outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20"
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-dark px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark/90 disabled:opacity-60"
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
        {adminAr.login.submit}
      </button>
    </form>
  );
}
