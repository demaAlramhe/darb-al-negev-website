import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { adminAr } from "@/data/admin-ar";

export default function AdminLoginPage() {
  return (
    <div
      dir="rtl"
      lang="ar"
      className="flex min-h-screen items-center justify-center bg-brand-bg px-4 py-10 font-arabic"
    >
      <div className="w-full max-w-md rounded-3xl border border-brand-dark/10 bg-white p-6 shadow-xl sm:p-8">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold tracking-wide text-brand-accent">{adminAr.brand.panel}</p>
          <h1 className="mt-2 text-2xl font-bold text-brand-dark">{adminAr.login.title}</h1>
          <p className="mt-2 text-sm text-brand-dark/65">{adminAr.login.subtitle}</p>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  );
}
