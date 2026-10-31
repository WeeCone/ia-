import Anthropic from "@anthropic-ai/sdk";
import { FieldValue } from "firebase-admin/firestore";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_BYTES, type AllowedImageType } from "@/lib/analysis";
import { AnalysisRefusedError, previewChart } from "@/lib/claude";
import { adminBucket, adminDb } from "@/lib/firebase-admin";
import { isAdminRequest } from "@/lib/admin-auth";
import { recordPreviewError, recordPreviewSpend, releasePreview, reservePreview, teaserOf } from "@/lib/preview";
import { DICTIONARIES } from "@/i18n/dictionaries";
import { requestLocale } from "@/i18n/server";

export const maxDuration = 120;

const error = (message: string, status: number, extra?: object) => Response.json({ error: message, ...extra }, { status });

/**
 * A visitor without an account runs their chart: a first reading (light model, about 0,02 €) goes back, and the
 * screenshot is kept so the full report can be made from it once a pack is bought. When no reading can be made,
 * `reason` says why ("limit": the visitor's free readings for today are used; "budget": the day's are; "error"), so the
 * page can say it rather than jump to the packs. The admin has no limit, to test.
 */
export async function POST(request: Request) {
  const locale = requestLocale(request);
  const text = DICTIONARIES[locale].api;

  const form = await request.formData();
  const image = form.get("image");
  if (!(image instanceof File)) return error(text.noImage, 400);
  if (!ALLOWED_IMAGE_TYPES.includes(image.type as AllowedImageType)) return error(text.badFormat, 400);
  if (image.size > MAX_IMAGE_BYTES) return error(text.tooLarge, 400);

  const admin = await isAdminRequest(request).catch(() => false);
  if (!admin) {
    const reserved = await reservePreview(request).catch(async (err) => {
      console.error("preview: reservation failed", err);
      await recordPreviewError(`réservation : ${err instanceof Error ? err.message : String(err)}`);
      return "error" as const;
    });
    if (reserved !== "ok") return error(text.failed, reserved === "error" ? 502 : 429, { fallback: true, reason: reserved });
  }

  const bytes = Buffer.from(await image.arrayBuffer());
  let result: Awaited<ReturnType<typeof previewChart>>;
  try {
    result = await previewChart(bytes.toString("base64"), image.type as AllowedImageType, locale);
  } catch (err) {
    // Nothing to show: the reading isn't counted against the visitor.
    if (!admin) await releasePreview(request);
    if (err instanceof AnalysisRefusedError) {
      await recordPreviewSpend(err.costEur);
      return error(text.refused, 422);
    }
    if (err instanceof Anthropic.RateLimitError) return error(text.busy, 503, { fallback: true, reason: "error" });
    console.error("preview failed", err);
    const detail = err instanceof Anthropic.APIError ? `API ${err.status ?? "?"} : ${err.message}` : err instanceof Error ? err.message : String(err);
    await recordPreviewError(detail);
    return error(text.failed, 502, { fallback: true, reason: "error" });
  }
  await recordPreviewSpend(result.costEur);

  // Not a chart: nothing to unlock, the visitor is asked for another image.
  if (!result.preview.is_chart) return Response.json({ id: null, teaser: teaserOf(result.preview) });

  const previewRef = adminDb.collection("previews").doc();
  const imagePath = `previews/${previewRef.id}.${image.type.split("/")[1]}`;
  try {
    await adminBucket().file(imagePath).save(bytes, { contentType: image.type, resumable: false });
    await previewRef.set({
      preview: result.preview,
      costEur: result.costEur,
      imagePath,
      imageType: image.type,
      locale,
      createdAt: FieldValue.serverTimestamp(),
      claimedBy: null,
    });
  } catch (err) {
    // Without the stored screenshot there is nothing to unlock later: payment then runs the waiting chart as before.
    // The reading is made and paid for: show it anyway. Without a stored screenshot the unlock can't use it, so after
    // payment the dashboard runs the chart still waiting in the browser, as it did before free readings.
    console.error("preview storage failed", err);
    await recordPreviewError(`stockage : ${err instanceof Error ? err.message : String(err)}`);
    return Response.json({ id: null, teaser: teaserOf(result.preview) });
  }

  return Response.json({ id: previewRef.id, teaser: teaserOf(result.preview) });
}
