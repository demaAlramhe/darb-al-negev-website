import AdminShell from "@/components/admin/AdminShell";
import { requireAdmin } from "@/actions/auth";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return <AdminShell>{children}</AdminShell>;
}
