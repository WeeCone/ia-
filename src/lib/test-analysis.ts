import type { ChartAnalysis } from "./analysis";
import { DEMO_ANALYSIS } from "./demo";

/** Canned report for the admin test mode: exercises the whole UI without calling the model. */
export const TEST_ANALYSIS: ChartAnalysis = {
  ...DEMO_ANALYSIS,
  asset: "MODE TEST",
  summary: "Rapport fictif du mode test : l'IA n'a pas été appelée et aucun crédit n'a été débité. " + DEMO_ANALYSIS.summary,
  capture_quality: {
    level: "moyenne",
    issues: ["exemple de défaut : unité de temps peu lisible"],
    tip: "exemple de conseil : agrandissez le graphique avant la capture.",
  },
  // Placed at fixed heights: they will not match your capture, they only show how levels are drawn.
  level_marks: [
    { price: "67 000", kind: "resistance", y: 0.22 },
    { price: "65 400", kind: "resistance", y: 0.4 },
    { price: "63 200", kind: "support", y: 0.62 },
    { price: "61 800", kind: "support", y: 0.8 },
  ],
};
