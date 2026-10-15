import { FieldValue } from "firebase-admin/firestore";
import { ALLOWED_IMAGE_TYPES, ChartAnalysis, MAX_IMAGE_BYTES, type AllowedImageType } from "@/lib/analysis";
import { forbidden, isAdminRequest } from "@/lib/admin-auth";
import { adminBucket, adminDb } from "@/lib/firebase-admin";
import { getRequestUid } from "@/lib/server-auth";

/** Admin tool: adds an analysis written elsewhere (JSON) to the admin's own history, with its screenshot. No credit. */
export async function POST(request: Request) {
  if (!(await isAdminRequest(request))) return forbidden();
  const uid = await getRequestUid(request);
  if (!uid) return forbidden();

  const form = await request.formData();
  let parsed;
  try {
    parsed = ChartAnalysis.safeParse(JSON.parse(String(form.get("analysis") ?? "")));
  } catch {
    return Response.json({ error: "Le texte collé n'est pas du JSON valide." }, { status: 400 });
  }
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return Response.json({ error: `Analyse incomplète : champ « ${issue.path.join(".")} » — ${issue.message}` }, { status: 400 });
  }

  const image = form.get("image");
  if (image instanceof File && image.size) {
    if (!ALLOWED_IMAGE_TYPES.includes(image.type as AllowedImageType)) return Response.json({ error: "Format d'image non supporté." }, { status: 400 });
    if (image.size > MAX_IMAGE_BYTES) return Response.json({ error: "Image trop lourde (5 Mo maximum)." }, { status: 400 });
  }

  const analysisRef = adminDb.collection("users").doc(uid).collection("analyses").doc();
  await analysisRef.set({ ...parsed.data, note: null, model: "import-admin", createdAt: FieldValue.serverTimestamp() });

  let imageSaved = false;
  if (image instanceof File && image.size) {
    const imagePath = `users/${uid}/analyses/${analysisRef.id}.${image.type.split("/")[1]}`;
    try {
      await adminBucket().file(imagePath).save(Buffer.from(await image.arrayBuffer()), { contentType: image.type, resumable: false });
      await analysisRef.update({ imagePath });
      imageSaved = true;
    } catch (err) {
      console.error("import screenshot upload failed", err);
    }
  }
  return Response.json({ id: analysisRef.id, imageSaved });
}
