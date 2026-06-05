import Link from "next/link";
import { LayoutDashboard, LogOut, Package } from "lucide-react";
import { logoutAction } from "@/actions/auth";
import { adminAr } from "@/data/admin-ar";

const navItems = [
  { href: "/admin/dashboard", label: adminAr.nav.dashboard, icon: LayoutDashboard },
  { href: "/admin/packages", label: adminAr.nav.packages, icon: Package },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div dir="rtl" lang="ar" className="min-h-screen bg-brand-bg font-arabic text-brand-dark">
      <header className="border-b border-brand-dark/10 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold tracking-wide text-brand-accent">{adminAr.brand.panel}</p>
            <h1 className="text-lg font-bold">{adminAr.brand.siteName}</h1>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full border border-brand-dark/10 bg-white px-4 py-2 text-sm font-semibold text-brand-dark transition-colors hover:border-brand-accent hover:text-brand-accent"
            >
              <LogOut className="h-4 w-4" />
              {adminAr.nav.logout}
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[220px_1fr] lg:px-8 lg:py-8">
        <aside className="h-fit rounded-2xl border border-brand-dark/10 bg-white p-3 shadow-sm">
          <nav className="space-y-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-brand-dark/80 transition-colors hover:bg-brand-accent/10 hover:text-brand-accent"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        <main>{children}</main>
      </div>
    </div>
  );
}
