export type PackageBadge = "new" | "special" | "popular";

export interface PackagePriceOption {
  label: Record<"ar" | "he", string>;
  price: Record<"ar" | "he", string>;
}

export interface TravelPackage {
  id: string;
  imageGradient: string;
  imageIcon: string;
  imageUrl?: string;
  imageUrls?: string[];
  badge?: PackageBadge;
  featured?: boolean;
  title: Record<"ar" | "he", string>;
  destination: Record<"ar" | "he", string>;
  /** Legacy single price — first option or packages.price column */
  price: Record<"ar" | "he", string>;
  priceOptions?: PackagePriceOption[];
  date: Record<"ar" | "he", string>;
  duration: Record<"ar" | "he", string>;
  description: Record<"ar" | "he", string>;
  includes?: Record<"ar" | "he", string>;
  notes?: Record<"ar" | "he", string>;
}
