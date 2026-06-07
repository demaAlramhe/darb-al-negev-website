import Image from "next/image";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import DeletePackageButton from "@/components/admin/DeletePackageButton";
import ToggleActiveButton from "@/components/admin/ToggleActiveButton";
import { getAllPackagesAdmin, getAdminPackageDisplayPrice } from "@/lib/packages";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { adminAr } from "@/data/admin-ar";

export default async function AdminPackagesPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const params = await searchParams;

  if (!isSupabaseConfigured()) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
        {adminAr.packages.supabaseNotConfigured}
      </div>
    );
  }

  const packages = await getAllPackagesAdmin();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-brand-dark">{adminAr.packages.title}</h2>
          <p className="mt-1 text-sm text-brand-dark/65">{adminAr.packages.subtitle}</p>
        </div>
        <Link
          href="/admin/packages/new"
          className="inline-flex items-center gap-2 rounded-full bg-brand-dark px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark/90"
        >
          <Plus className="h-4 w-4" />
          {adminAr.packages.new}
        </Link>
      </div>

      {params.success === "deleted" ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {adminAr.packages.deleted}
        </div>
      ) : null}

      {packages.length === 0 ? (
        <div className="rounded-2xl border border-brand-dark/10 bg-white p-8 text-center text-sm text-brand-dark/65">
          {adminAr.packages.empty}
        </div>
      ) : (
        <div className="space-y-4">
          {packages.map((pkg) => {
            const image = pkg.package_images?.[0]?.image_url;
            return (
              <article
                key={pkg.id}
                className="rounded-2xl border border-brand-dark/10 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                  <div className="relative h-28 w-full overflow-hidden rounded-xl bg-brand-bg sm:w-40">
                    {image ? (
                      <Image src={image} alt={pkg.title_ar} fill className="object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-brand-dark/45">
                        {adminAr.packages.noImage}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-bold text-brand-dark">{pkg.title_ar || pkg.title_he}</h3>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          pkg.is_active ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {pkg.is_active ? adminAr.dashboard.active : adminAr.dashboard.hidden}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-brand-dark/70">{pkg.destination_ar}</p>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-brand-dark/60">
                      <span>
                        {adminAr.packages.price}: {getAdminPackageDisplayPrice(pkg)}
                      </span>
                      <span>
                        {adminAr.packages.date}: {pkg.travel_date}
                      </span>
                      <span>
                        {adminAr.packages.duration}: {pkg.duration_ar || pkg.duration_he}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/admin/packages/${pkg.id}/edit`}
                      className="inline-flex items-center gap-1 rounded-full border border-brand-dark/10 px-3 py-1.5 text-xs font-semibold hover:border-brand-accent hover:text-brand-accent"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      {adminAr.packages.edit}
                    </Link>
                    <ToggleActiveButton id={pkg.id} isActive={pkg.is_active} />
                    <DeletePackageButton id={pkg.id} title={pkg.title_ar || pkg.title_he} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
