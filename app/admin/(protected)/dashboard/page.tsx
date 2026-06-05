import Link from "next/link";
import { Plus, Package } from "lucide-react";
import { getPackageStats } from "@/lib/packages";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { adminAr } from "@/data/admin-ar";

export default async function AdminDashboardPage() {
  if (!isSupabaseConfigured()) {
    return (
      <SetupNotice message={adminAr.dashboard.setupMessage} />
    );
  }

  const stats = await getPackageStats();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-brand-dark">{adminAr.dashboard.title}</h2>
        <p className="mt-1 text-sm text-brand-dark/65">{adminAr.dashboard.subtitle}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label={adminAr.dashboard.totalPackages} value={stats.total} />
        <StatCard label={adminAr.dashboard.active} value={stats.active} accent />
        <StatCard label={adminAr.dashboard.hidden} value={stats.hidden} />
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/packages/new"
          className="inline-flex items-center gap-2 rounded-full bg-brand-dark px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark/90"
        >
          <Plus className="h-4 w-4" />
          {adminAr.dashboard.addNew}
        </Link>
        <Link
          href="/admin/packages"
          className="inline-flex items-center gap-2 rounded-full border border-brand-dark/10 bg-white px-5 py-3 text-sm font-semibold text-brand-dark hover:border-brand-accent hover:text-brand-accent"
        >
          <Package className="h-4 w-4" />
          {adminAr.dashboard.manage}
        </Link>
      </div>

      <section className="rounded-2xl border border-brand-dark/10 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-lg font-bold">{adminAr.dashboard.latest}</h3>
        {stats.latest.length === 0 ? (
          <p className="text-sm text-brand-dark/65">{adminAr.dashboard.noPackages}</p>
        ) : (
          <ul className="space-y-2">
            {stats.latest.map((pkg) => (
              <li
                key={pkg.id}
                className="flex items-center justify-between rounded-xl border border-brand-dark/8 px-4 py-3 text-sm"
              >
                <span>{pkg.title_ar || adminAr.dashboard.untitled}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    pkg.is_active ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {pkg.is_active ? adminAr.dashboard.active : adminAr.dashboard.hidden}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-brand-dark/10 bg-white p-5 shadow-sm">
      <p className="text-sm text-brand-dark/65">{label}</p>
      <p className={`mt-2 text-3xl font-bold ${accent ? "text-brand-accent" : "text-brand-dark"}`}>
        {value}
      </p>
    </div>
  );
}

function SetupNotice({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
      <p className="font-semibold">{adminAr.dashboard.setupTitle}</p>
      <p className="mt-2">{message}</p>
      <p className="mt-3">{adminAr.dashboard.setupHint}</p>
    </div>
  );
}
