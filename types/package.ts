export type PackageBadge = "new" | "special" | "popular";

export interface TravelPackage {
  id: string;
  imageGradient: string;
  imageIcon: string;
  badge?: PackageBadge;
  featured?: boolean;
  title: Record<"ar" | "he", string>;
  destination: Record<"ar" | "he", string>;
  price: Record<"ar" | "he", string>;
  date: Record<"ar" | "he", string>;
  duration: Record<"ar" | "he", string>;
  description: Record<"ar" | "he", string>;
}
