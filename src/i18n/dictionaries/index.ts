import type { Locale } from "../config";
import { en } from "./en";
import { es } from "./es";
import { fr, type Dict } from "./fr";

export type { Dict };
export const DICTIONARIES: Record<Locale, Dict> = { fr, en, es };
