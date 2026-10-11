import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_BYTES, type AllowedImageType } from "./analysis";

const MAX_EDGE = 2000; // px: plenty to read price labels, and keeps uploads small
const REENCODE_ABOVE = 3 * 1024 * 1024;

/**
 * Makes any image the browser can decode (including phone photos and HEIC on Safari) uploadable:
 * oversized or unsupported files are downscaled and re-encoded as JPEG.
 */
export async function prepareImage(file: File): Promise<File> {
  const supported = ALLOWED_IMAGE_TYPES.includes(file.type as AllowedImageType);

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new Error("Impossible de lire cette image. Utilisez un fichier PNG, JPEG ou WebP.");
  }

  const longEdge = Math.max(bitmap.width, bitmap.height);
  if (supported && file.size <= REENCODE_ABOVE && longEdge <= MAX_EDGE) {
    bitmap.close();
    return file;
  }

  const scale = Math.min(1, MAX_EDGE / longEdge);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.9));
  if (!blob || blob.size > MAX_IMAGE_BYTES) throw new Error("Image trop lourde, même après compression.");
  return new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" });
}
