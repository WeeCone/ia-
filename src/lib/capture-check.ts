// Instant, free checks on a screenshot before it is sent (non-blocking advice, not a verdict).
const MIN_WIDTH = 800;
const MIN_HEIGHT = 400;
// Calibrated on sample captures: sharp TradingView exports score 220-270, a heavily blurred one about 50.
const SHARPNESS_MIN = 80;

export async function checkCapture(file: File): Promise<string[]> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return [];
  }
  const { width, height } = bitmap;
  const advice: string[] = [];

  if (width < MIN_WIDTH || height < MIN_HEIGHT) {
    advice.push(`Image petite (${width} × ${height} px) : l'axe des prix risque d'être illisible. Capturez le graphique en plein écran.`);
  }
  if (width / height < 0.9) {
    advice.push("Capture en hauteur : tournez le téléphone en paysage pour montrer plus d'historique.");
  }

  // Sharpness on a small grayscale copy.
  const scale = Math.min(1, 480 / width);
  const w = Math.max(1, Math.round(width * scale));
  const h = Math.max(1, Math.round(height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (ctx) {
    ctx.drawImage(bitmap, 0, 0, w, h);
    const { data } = ctx.getImageData(0, 0, w, h);
    const gray = new Float32Array(w * h);
    for (let i = 0; i < w * h; i++) gray[i] = 0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2];
    // Strongest local contrast: charts are mostly flat, so look at the sharpest 2 % of pixels rather than the mean.
    const edges: number[] = [];
    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const i = y * w + x;
        edges.push(Math.abs(4 * gray[i] - gray[i - 1] - gray[i + 1] - gray[i - w] - gray[i + w]));
      }
    }
    edges.sort((a, b) => b - a);
    const sharp = edges.length ? edges[Math.floor(edges.length * 0.02)] : 255;
    if (sharp < 10) advice.push("Image presque uniforme : vérifiez que le graphique est bien visible sur la capture.");
    else if (sharp < SHARPNESS_MIN) advice.push("Image floue : faites une capture d'écran plutôt qu'une photo de l'écran, et évitez de zoomer dessus.");
  }
  bitmap.close();
  return advice;
}

