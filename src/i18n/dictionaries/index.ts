import type { Locale } from "../config";
import { en } from "./en";
import { es } from "./es";
import { fr, type Dict } from "./fr";
import { id } from "./id";
import { de } from "./de";
import { it } from "./it";
import { ja } from "./ja";
import { pt } from "./pt";
import { ko } from "./ko";
import { vi } from "./vi";

export type { Dict };
export const DICTIONARIES: Record<Locale, Dict> = { fr, en, es, ja, ko, vi, id, it, de, pt };
