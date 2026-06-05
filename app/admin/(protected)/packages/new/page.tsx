import Link from "next/link";
import PackageForm from "@/components/admin/PackageForm";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { adminAr } from "@/data/admin-ar";

export default function NewPackagePage() {
  if (!isSupabaseConfigured()) {
    return <p className="text-sm text-brand-dark/70">{adminAr.packages.supabaseNotConfigured}</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/packages" className="text-sm font-medium text-brand-accent hover:underline">
          {adminAr.form.back}
        </Link>
        <h2 className="mt-2 text-2xl font-bold text-brand-dark">{adminAr.form.addTitle}</h2>
      </div>
      <PackageForm mode="create" />
    </div>
  );
}
