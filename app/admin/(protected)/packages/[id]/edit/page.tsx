import Link from "next/link";
import { notFound } from "next/navigation";
import PackageForm from "@/components/admin/PackageForm";
import { getPackageByIdAdmin } from "@/lib/packages";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { adminAr } from "@/data/admin-ar";

export default async function EditPackagePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ success?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;

  if (!isSupabaseConfigured()) {
    return <p className="text-sm text-brand-dark/70">{adminAr.packages.supabaseNotConfigured}</p>;
  }

  const pkg = await getPackageByIdAdmin(id);
  if (!pkg) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/packages" className="text-sm font-medium text-brand-accent hover:underline">
          {adminAr.form.back}
        </Link>
        <h2 className="mt-2 text-2xl font-bold text-brand-dark">{adminAr.form.editTitle}</h2>
      </div>

      {query.success === "created" ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {adminAr.form.created}
        </div>
      ) : null}

      <PackageForm mode="edit" pkg={pkg} />
    </div>
  );
}
