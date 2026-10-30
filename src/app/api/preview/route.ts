import Anthropic from "@anthropic-ai/sdk";
import { FieldValue } from "firebase-admin/firestore";
import { ALLOWED_IMAGE_TYPES, MAX_IMAGE_BYTES, type AllowedImageType } from "@/lib/analysis";
import { analyzeChart, AnalysisRefusedError } from "@/lib/claude";
import { adminBucket, adminDb } from "@/lib/firebase-admin";
import { recordPreviewSpend, reservePreview, teaserOf } from "@/lib/preview";
import { DICTIONARIES } from "@/i18n/dictionaries";
import { requestLocale } from "@/i18n/server";

export const maxDuration = 120;

const error = (message: string, status: number, extra?: object) => Response.json({ error: message, ...extra }, { status });

/**
 * A visitor without an account runs their chart: the full analysis is made and kept here, and only its free part
 * (the reading, no plan, no prices) goes back. `fallback` tells the page to go straight to payment instead.
 */
export async function POST(request: Request) {
  const locale = requestLocale(request);
  const text = DICTIONARIES[locale].api;

  const form = await request.formData();
  const image = form.get("image");
  if (!(image instanceof File)) return error(text.noImage, 400);
  if (!ALLOWED_IMAGE_TYPES.includes(image.type as AllowedImageType)) return error(text.badFormat, 400);
  if (image.size > MAX_IMAGE_BYTES) return error(text.tooLarge, 400);

  if (!(await reservePreview(request).catch(() => false))) return error(text.failed, 429, { fallback: true });

  const bytes = Buffer.from(await image.arrayBuffer());
  let result: Awaited<ReturnType<typeof analyzeChart>>;
  try {
    result = await analyzeChart(bytes.toString("base64"), image.type as AllowedImageType, undefined, locale);
  } catch (err) {
    if (err instanceof AnalysisRefusedError) {
      await recordPreviewSpend(err.costEur);
      return error(text.refused, 422);
    }
    if (err instanceof Anthropic.RateLimitError) return error(text.busy, 503, { fallback: true });
    console.error("preview failed", err);
    return error(text.failed, 502, { fallback: true });
  }
  await recordPreviewSpend(result.costEur);

  // Not a chart: nothing to unlock, the visitor is asked for another image.
  if (!result.analysis.is_chart) return Response.json({ id: null, teaser: teaserOf(result.analysis) });

  const previewRef = adminDb.collection("previews").doc();
  const imagePath = `previews/${previewRef.id}.${image.type.split("/")[1]}`;
  try {
    await adminBucket().file(imagePath).save(bytes, { contentType: image.type, resumable: false });
    await previewRef.set({
      analysis: result.analysis,
      model: result.model,
      costEur: result.costEur,
      imagePath,
      imageType: image.type,
      locale,
      createdAt: FieldValue.serverTimestamp(),
      claimedBy: null,
    });
  } catch (err) {
    // Without the stored report there is nothing to unlock later: payment then runs the analysis as before.
    console.error("preview storage failed", err);
    return error(text.failed, 502, { fallback: true });
  }

  return Response.json({ id: previewRef.id, teaser: teaserOf(result.analysis) });
}
