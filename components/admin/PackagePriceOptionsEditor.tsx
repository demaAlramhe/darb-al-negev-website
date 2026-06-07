"use client";

import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import type { DbPackagePriceOption, PriceOptionFormEntry } from "@/types/database";
import { sortPackagePriceOptions } from "@/lib/packages";
import { adminAr } from "@/data/admin-ar";

const inputClass =
  "w-full rounded-xl border border-brand-dark/10 bg-white px-3 py-2.5 text-sm outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20";

function emptyOption(): PriceOptionFormEntry {
  return {
    label_ar: "",
    label_he: "",
    price_ar: "",
    price_he: "",
    sort_order: 0,
  };
}

function fromDbOptions(options: DbPackagePriceOption[]): PriceOptionFormEntry[] {
  return sortPackagePriceOptions(options).map((opt, index) => ({
    id: opt.id,
    label_ar: opt.label_ar,
    label_he: opt.label_he ?? "",
    price_ar: opt.price_ar,
    price_he: opt.price_he ?? "",
    sort_order: index,
  }));
}

export function initialPriceOptions(
  options: DbPackagePriceOption[] | undefined,
  legacyPrice?: string,
): PriceOptionFormEntry[] {
  if (options && options.length > 0) {
    return fromDbOptions(options);
  }
  if (legacyPrice?.trim()) {
    return [
      {
        label_ar: "للشخص",
        label_he: "לאדם",
        price_ar: legacyPrice.trim(),
        price_he: legacyPrice.trim(),
        sort_order: 0,
      },
    ];
  }
  return [emptyOption()];
}

interface PackagePriceOptionsEditorProps {
  options: PriceOptionFormEntry[];
  onChange: (options: PriceOptionFormEntry[]) => void;
}

export default function PackagePriceOptionsEditor({
  options,
  onChange,
}: PackagePriceOptionsEditorProps) {
  const po = adminAr.form.priceOptions;

  function updateOption(index: number, patch: Partial<PriceOptionFormEntry>) {
    onChange(options.map((opt, i) => (i === index ? { ...opt, ...patch } : opt)));
  }

  function addOption() {
    onChange([...options, emptyOption()]);
  }

  function removeOption(index: number) {
    if (options.length <= 1) return;
    onChange(options.filter((_, i) => i !== index));
  }

  function moveOption(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= options.length) return;
    const next = [...options];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div className="mt-6 border-t border-brand-dark/8 pt-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-brand-dark">{po.title}</h3>
          <p className="mt-1 text-sm text-brand-dark/60">{po.hint}</p>
        </div>
        <button
          type="button"
          onClick={addOption}
          className="inline-flex items-center gap-1.5 rounded-full border border-brand-dark/10 bg-white px-4 py-2 text-sm font-semibold text-brand-dark transition-colors hover:border-brand-accent hover:text-brand-accent"
        >
          <Plus className="h-4 w-4" />
          {po.add}
        </button>
      </div>

      <div className="space-y-3">
        {options.map((option, index) => (
          <div
            key={option.id ?? `new-${index}`}
            className="rounded-xl border border-brand-dark/10 bg-brand-bg/20 p-4"
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-brand-dark/55">
                {po.optionNumber} {index + 1}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveOption(index, -1)}
                  disabled={index === 0}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-brand-dark/10 text-brand-dark/70 transition-colors hover:border-brand-accent hover:text-brand-accent disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label={po.moveUp}
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveOption(index, 1)}
                  disabled={index === options.length - 1}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-brand-dark/10 text-brand-dark/70 transition-colors hover:border-brand-accent hover:text-brand-accent disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label={po.moveDown}
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  disabled={options.length <= 1}
                  className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  {po.remove}
                </button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-brand-dark/70">{po.labelAr}</span>
                <input
                  value={option.label_ar}
                  onChange={(e) => updateOption(index, { label_ar: e.target.value })}
                  placeholder={po.labelArPlaceholder}
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-brand-dark/70">{po.priceAr}</span>
                <input
                  value={option.price_ar}
                  onChange={(e) => updateOption(index, { price_ar: e.target.value })}
                  placeholder={po.priceArPlaceholder}
                  dir="ltr"
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-brand-dark/70">{po.labelHe}</span>
                <input
                  value={option.label_he}
                  onChange={(e) => updateOption(index, { label_he: e.target.value })}
                  placeholder={po.labelHePlaceholder}
                  dir="rtl"
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-brand-dark/70">{po.priceHe}</span>
                <input
                  value={option.price_he}
                  onChange={(e) => updateOption(index, { price_he: e.target.value })}
                  placeholder={po.priceHePlaceholder}
                  dir="ltr"
                  className={inputClass}
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
