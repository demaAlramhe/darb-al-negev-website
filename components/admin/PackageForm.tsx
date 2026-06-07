"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useRef, useState, useTransition, type FormEvent } from "react";
import { Copy, Loader2, Trash2 } from "lucide-react";
import type { DbPackageImage, DbPackageWithImages, PackageFormData } from "@/types/database";
import {
  createPackageAction,
  deletePackageImageAction,
  updatePackageAction,
} from "@/actions/packages";
import { MAX_PACKAGE_IMAGES } from "@/lib/packages";
import { adminAr, type AdminTab } from "@/data/admin-ar";
import type { PriceOptionFormEntry } from "@/types/database";
import PackagePriceOptionsEditor, { initialPriceOptions } from "./PackagePriceOptionsEditor";

interface PendingImage {
  id: string;
  file: File;
  previewUrl: string;
}

const badgeOptions = [
  { value: "", label: adminAr.form.badges.none },
  { value: "new", label: adminAr.form.badges.new },
  { value: "special", label: adminAr.form.badges.special },
  { value: "popular", label: adminAr.form.badges.popular },
] as const;

const AR_TO_HE_FIELDS: [keyof PackageFormData, keyof PackageFormData][] = [
  ["title_ar", "title_he"],
  ["destination_ar", "destination_he"],
  ["description_ar", "description_he"],
  ["includes_ar", "includes_he"],
  ["notes_ar", "notes_he"],
];

function sortImages(images: DbPackageImage[]) {
  return [...images].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );
}

function field(
  label: string,
  name: keyof PackageFormData,
  defaultValue = "",
  multiline = false,
  dir?: "rtl" | "ltr",
  placeholder?: string,
) {
  const className =
    "w-full rounded-xl border border-brand-dark/10 bg-white px-4 py-3 text-sm outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20";

  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-brand-dark">{label}</span>
      {multiline ? (
        <textarea
          name={name}
          rows={4}
          defaultValue={defaultValue}
          dir={dir}
          placeholder={placeholder}
          className={className}
        />
      ) : (
        <input
          name={name}
          defaultValue={defaultValue}
          dir={dir}
          placeholder={placeholder}
          className={className}
        />
      )}
    </label>
  );
}

const tabs: { id: AdminTab; label: string }[] = [
  { id: "general", label: adminAr.form.tabs.general },
  { id: "arabic", label: adminAr.form.tabs.arabic },
  { id: "hebrew", label: adminAr.form.tabs.hebrew },
];

export default function PackageForm({
  mode,
  pkg,
}: {
  mode: "create" | "edit";
  pkg?: DbPackageWithImages;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTab>("general");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [images, setImages] = useState<DbPackageImage[]>(sortImages(pkg?.package_images ?? []));
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([]);
  const [priceOptions, setPriceOptions] = useState<PriceOptionFormEntry[]>(() =>
    initialPriceOptions(pkg?.package_price_options, pkg?.price),
  );

  const totalImages = images.length + pendingImages.length;
  const canUploadMore = totalImages < MAX_PACKAGE_IMAGES;

  useEffect(() => {
    setImages(sortImages(pkg?.package_images ?? []));
  }, [pkg?.package_images]);

  useEffect(() => {
    setPriceOptions(initialPriceOptions(pkg?.package_price_options, pkg?.price));
  }, [pkg?.package_price_options, pkg?.price]);

  function buildFormData(form: HTMLFormElement) {
    const formData = new FormData(form);
    formData.delete("images");
    pendingImages.forEach((item) => formData.append("images", item.file));
    formData.set("price_options_json", JSON.stringify(priceOptions));
    return formData;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setError(null);

    if (totalImages > MAX_PACKAGE_IMAGES) {
      setError(adminAr.form.errors.maxImages);
      return;
    }

    const formData = buildFormData(event.currentTarget);

    startTransition(async () => {
      if (mode === "create") {
        const result = await createPackageAction(formData);
        if (result?.error) setError(result.error);
        return;
      }

      if (!pkg) return;
      const result = await updatePackageAction(pkg.id, formData);
      if (result?.error) {
        setError(result.error);
        return;
      }

      setPendingImages((current) => {
        current.forEach((item) => URL.revokeObjectURL(item.previewUrl));
        return [];
      });
      setMessage(adminAr.form.saved);
      router.refresh();
    });
  }

  async function removeSavedImage(imageId: string) {
    if (!pkg) return;
    const result = await deletePackageImageAction(imageId, pkg.id);
    if (result?.error) {
      setError(result.error);
      return;
    }
    setImages((current) => current.filter((img) => img.id !== imageId));
    setMessage(adminAr.form.general.imageDeleted);
  }

  function removePendingImage(id: string) {
    setPendingImages((current) => {
      const item = current.find((image) => image.id === id);
      if (item) URL.revokeObjectURL(item.previewUrl);
      return current.filter((image) => image.id !== id);
    });
  }

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    const selected = Array.from(event.target.files ?? []);
    event.target.value = "";

    if (selected.length === 0) return;

    const remainingSlots = MAX_PACKAGE_IMAGES - totalImages;
    if (remainingSlots <= 0) {
      setError(adminAr.form.errors.maxImages);
      return;
    }

    const filesToAdd = selected.slice(0, remainingSlots);
    if (selected.length > remainingSlots) {
      setError(adminAr.form.errors.maxImages);
    }

    setPendingImages((current) => [
      ...current,
      ...filesToAdd.map((file) => ({
        id: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
      })),
    ]);
  }

  function copyArabicToHebrew() {
    const form = formRef.current;
    if (!form) return;

    for (const [arName, heName] of AR_TO_HE_FIELDS) {
      const arField = form.elements.namedItem(arName);
      const heField = form.elements.namedItem(heName);
      if (
        arField instanceof HTMLInputElement ||
        arField instanceof HTMLTextAreaElement
      ) {
        if (
          heField instanceof HTMLInputElement ||
          heField instanceof HTMLTextAreaElement
        ) {
          heField.value = arField.value;
        }
      }
    }

    setMessage(adminAr.form.copyDone);
    setError(null);
    setActiveTab("hebrew");
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {message ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {message}
        </div>
      ) : null}
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </div>
      ) : null}

      <p className="rounded-xl border border-brand-accent/20 bg-brand-accent/5 px-4 py-3 text-sm text-brand-dark/75">
        {adminAr.form.languageHint}
      </p>

      <div className="flex flex-wrap gap-2 border-b border-brand-dark/10 pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-t-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
              activeTab === tab.id
                ? "bg-white text-brand-accent shadow-sm ring-1 ring-brand-dark/10"
                : "text-brand-dark/60 hover:text-brand-dark"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <section
        className={`rounded-2xl border border-brand-dark/10 bg-white p-5 shadow-sm sm:p-6 ${activeTab !== "general" ? "hidden" : ""}`}
        aria-hidden={activeTab !== "general"}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {field(adminAr.form.general.date, "travel_date", pkg?.travel_date, false, "ltr")}
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-brand-dark">
              {adminAr.form.general.badge}
            </span>
            <select
              name="badge"
              defaultValue={pkg?.badge ?? ""}
              className="w-full rounded-xl border border-brand-dark/10 bg-white px-4 py-3 text-sm outline-none focus:border-brand-accent"
            >
              {badgeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-5 rounded-xl border border-brand-dark/8 bg-brand-bg/30 px-4 py-3">
          <p className="mb-2 text-sm font-medium text-brand-dark">{adminAr.form.general.visibility}</p>
          <label className="flex items-center gap-2 text-sm font-medium text-brand-dark">
            <input
              type="checkbox"
              name="is_active"
              defaultChecked={pkg?.is_active ?? true}
              className="h-4 w-4 rounded border-brand-dark/20 text-brand-accent focus:ring-brand-accent"
            />
            {adminAr.form.general.active}
          </label>
        </div>

        <div className="mt-6 border-t border-brand-dark/8 pt-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-bold text-brand-dark">{adminAr.form.general.images}</h3>
            <span className="rounded-full bg-brand-accent/10 px-3 py-1 text-xs font-semibold text-brand-accent">
              {adminAr.form.general.imagesCount}: {totalImages}/{MAX_PACKAGE_IMAGES}
            </span>
          </div>

          <p className="mb-4 text-sm text-brand-dark/65">{adminAr.form.general.uploadHint}</p>

          {totalImages > 0 ? (
            <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className="relative overflow-hidden rounded-xl border border-brand-dark/10"
                >
                  <Image
                    src={image.image_url}
                    alt=""
                    width={400}
                    height={260}
                    className="h-32 w-full object-cover"
                  />
                  {index === 0 ? (
                    <span className="absolute bottom-2 start-2 rounded-full bg-brand-dark/80 px-2 py-0.5 text-[10px] font-semibold text-white">
                      {adminAr.form.general.mainImage}
                    </span>
                  ) : null}
                  {mode === "edit" ? (
                    <button
                      type="button"
                      onClick={() => removeSavedImage(image.id)}
                      className="absolute start-2 top-2 inline-flex items-center gap-1 rounded-full bg-red-600 px-2 py-1 text-[10px] font-semibold text-white"
                    >
                      <Trash2 className="h-3 w-3" />
                      {adminAr.form.general.removeImage}
                    </button>
                  ) : null}
                </div>
              ))}

              {pendingImages.map((image, index) => (
                <div
                  key={image.id}
                  className="relative overflow-hidden rounded-xl border border-dashed border-brand-accent/40"
                >
                  <Image
                    src={image.previewUrl}
                    alt=""
                    width={400}
                    height={260}
                    className="h-32 w-full object-cover"
                    unoptimized
                  />
                  <span className="absolute bottom-2 start-2 rounded-full bg-brand-accent px-2 py-0.5 text-[10px] font-semibold text-white">
                    {images.length + index === 0
                      ? adminAr.form.general.mainImage
                      : adminAr.form.general.pendingImage}
                  </span>
                  <button
                    type="button"
                    onClick={() => removePendingImage(image.id)}
                    className="absolute start-2 top-2 inline-flex items-center gap-1 rounded-full bg-red-600 px-2 py-1 text-[10px] font-semibold text-white"
                  >
                    <Trash2 className="h-3 w-3" />
                    {adminAr.form.general.removeImage}
                  </button>
                </div>
              ))}
            </div>
          ) : null}

          <label className={`block ${canUploadMore ? "" : "pointer-events-none opacity-50"}`}>
            <span className="mb-1.5 block text-sm font-medium text-brand-dark">
              {adminAr.form.general.upload}
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              disabled={!canUploadMore || pending}
              onChange={handleFileSelect}
              className="block w-full rounded-xl border border-dashed border-brand-dark/15 bg-brand-bg/40 px-4 py-6 text-sm disabled:cursor-not-allowed"
            />
          </label>

          {!canUploadMore ? (
            <p className="mt-2 text-sm text-brand-dark/60">{adminAr.form.general.maxImagesReached}</p>
          ) : null}
        </div>

        <PackagePriceOptionsEditor options={priceOptions} onChange={setPriceOptions} />
      </section>

      <section
        className={`rounded-2xl border border-brand-dark/10 bg-white p-5 shadow-sm sm:p-6 ${activeTab !== "arabic" ? "hidden" : ""}`}
        aria-hidden={activeTab !== "arabic"}
      >
        <div className="grid gap-4 md:grid-cols-2">
          {field(adminAr.form.arabic.title, "title_ar", pkg?.title_ar)}
          {field(adminAr.form.arabic.destination, "destination_ar", pkg?.destination_ar)}
          {field(
            adminAr.form.arabic.duration,
            "duration_ar",
            pkg?.duration_ar,
            false,
            undefined,
            adminAr.form.arabic.durationPlaceholder,
          )}
        </div>
        <div className="mt-4 grid gap-4">
          {field(adminAr.form.arabic.description, "description_ar", pkg?.description_ar, true)}
          {field(adminAr.form.arabic.includes, "includes_ar", pkg?.includes_ar, true)}
          {field(adminAr.form.arabic.notes, "notes_ar", pkg?.notes_ar, true)}
        </div>
      </section>

      <section className={activeTab !== "hebrew" ? "hidden" : ""} aria-hidden={activeTab !== "hebrew"}>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={copyArabicToHebrew}
            className="inline-flex items-center gap-2 rounded-full border border-brand-dark/10 bg-white px-4 py-2 text-sm font-semibold text-brand-dark transition-colors hover:border-brand-accent hover:text-brand-accent"
          >
            <Copy className="h-4 w-4" />
            {adminAr.form.copyArToHe}
          </button>
        </div>
        <div className="rounded-2xl border border-brand-dark/10 bg-white p-5 shadow-sm sm:p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {field(adminAr.form.hebrew.title, "title_he", pkg?.title_he, false, "rtl")}
            {field(adminAr.form.hebrew.destination, "destination_he", pkg?.destination_he, false, "rtl")}
            {field(
              adminAr.form.hebrew.duration,
              "duration_he",
              pkg?.duration_he,
              false,
              "rtl",
              adminAr.form.hebrew.durationPlaceholder,
            )}
          </div>
          <div className="mt-4 grid gap-4">
            {field(adminAr.form.hebrew.description, "description_he", pkg?.description_he, true, "rtl")}
            {field(adminAr.form.hebrew.includes, "includes_he", pkg?.includes_he, true, "rtl")}
            {field(adminAr.form.hebrew.notes, "notes_he", pkg?.notes_he, true, "rtl")}
          </div>
        </div>
      </section>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-full bg-brand-dark px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark/90 disabled:opacity-60"
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {mode === "create" ? adminAr.form.create : adminAr.form.save}
      </button>
    </form>
  );
}
