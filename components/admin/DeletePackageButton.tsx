"use client";

import { useState, useTransition } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { deletePackageAction } from "@/actions/packages";
import { adminAr } from "@/data/admin-ar";

export default function DeletePackageButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function confirmDelete() {
    startTransition(async () => {
      await deletePackageAction(id);
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-100"
      >
        <Trash2 className="h-3.5 w-3.5" />
        {adminAr.packages.delete}
      </button>

      {open ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/40 p-4">
          <div dir="rtl" lang="ar" className="w-full max-w-md rounded-2xl bg-white p-6 font-arabic shadow-2xl">
            <h3 className="text-lg font-bold text-brand-dark">{adminAr.packages.deleteTitle}</h3>
            <p className="mt-2 text-sm text-brand-dark/70">
              {adminAr.packages.deleteConfirm}{" "}
              <strong>{title}</strong>
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-brand-dark/10 px-4 py-2 text-sm font-semibold"
              >
                {adminAr.packages.cancel}
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={pending}
                className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
              >
                {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {adminAr.packages.confirmDelete}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
