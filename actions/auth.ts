"use server";

import { redirect } from "next/navigation";
import { adminAr } from "@/data/admin-ar";
import {
  clearAdminSession,
  isAdminAuthenticated,
  setAdminSession,
  verifyAdminCredentials,
} from "@/lib/auth/session";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!verifyAdminCredentials(email, password)) {
    return { error: adminAr.login.error };
  }

  await setAdminSession(email);
  redirect("/admin/dashboard");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function requireAdmin() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin/login");
}
