"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { togglePackageActiveAction } from "@/actions/packages";
import { adminAr } from "@/data/admin-ar";

export default function ToggleActiveButton({
  id,
  isActive,
}: {
  id: string;
  isActive: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    await togglePackageActiveAction(id, !isActive);
    router.refresh();
    setLoading(false);
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={loading}
      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
        isActive
          ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
          : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
      }`}
    >
      {loading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : isActive ? (
        adminAr.packages.hide
      ) : (
        adminAr.packages.show
      )}
    </button>
  );
}
