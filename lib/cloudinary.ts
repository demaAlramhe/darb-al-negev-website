import { v2 as cloudinary } from "cloudinary";

/** All package images for this project live under this folder in the existing Cloudinary account. */
export const CLOUDINARY_PACKAGE_FOLDER = "darb-al-negev/packages";

export function isCloudinaryConfigured(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );
}

function getCloudinary() {
  if (!isCloudinaryConfigured()) {
    throw new Error("Cloudinary credentials are not configured.");
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  return cloudinary;
}

function assertProjectPublicId(publicId: string): void {
  const normalized = publicId.replace(/^\/+/, "");
  if (!normalized.startsWith(`${CLOUDINARY_PACKAGE_FOLDER}/`)) {
    throw new Error(
      `Refusing to delete Cloudinary asset outside "${CLOUDINARY_PACKAGE_FOLDER}": ${publicId}`,
    );
  }
}

export async function uploadPackageImage(
  file: File,
): Promise<{ image_url: string; cloudinary_public_id: string }> {
  const cloud = getCloudinary();
  const bytes = Buffer.from(await file.arrayBuffer());

  const result = await new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
    const stream = cloud.uploader.upload_stream(
      {
        folder: CLOUDINARY_PACKAGE_FOLDER,
        resource_type: "image",
      },
      (error, uploadResult) => {
        if (error || !uploadResult) {
          reject(error ?? new Error("Cloudinary upload failed."));
          return;
        }
        resolve({
          secure_url: uploadResult.secure_url,
          public_id: uploadResult.public_id,
        });
      },
    );

    stream.end(bytes);
  });

  return {
    image_url: result.secure_url,
    cloudinary_public_id: result.public_id,
  };
}

export async function deleteCloudinaryImage(publicId: string): Promise<void> {
  if (!publicId) return;

  assertProjectPublicId(publicId);

  const cloud = getCloudinary();
  await cloud.uploader.destroy(publicId, { resource_type: "image" });
}
