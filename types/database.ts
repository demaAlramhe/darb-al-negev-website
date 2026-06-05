export type PackageBadgeValue = "new" | "special" | "popular" | "";

export interface DbPackage {
  id: string;
  title_ar: string;
  title_he: string;
  destination_ar: string;
  destination_he: string;
  description_ar: string;
  description_he: string;
  includes_ar: string;
  includes_he: string;
  notes_ar: string;
  notes_he: string;
  price: string;
  travel_date: string;
  duration_ar: string;
  duration_he: string;
  badge: PackageBadgeValue | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbPackageImage {
  id: string;
  package_id: string;
  image_url: string;
  cloudinary_public_id: string;
  created_at: string;
}

export interface DbPackageWithImages extends DbPackage {
  package_images: DbPackageImage[];
}

export interface PackageFormData {
  title_ar: string;
  title_he: string;
  destination_ar: string;
  destination_he: string;
  description_ar: string;
  description_he: string;
  includes_ar: string;
  includes_he: string;
  notes_ar: string;
  notes_he: string;
  price: string;
  travel_date: string;
  duration_ar: string;
  duration_he: string;
  badge: PackageBadgeValue;
  is_active: boolean;
}
