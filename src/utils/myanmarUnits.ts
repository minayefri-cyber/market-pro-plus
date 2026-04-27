import type { CatalogItem, MetricUnit, TraditionalUnit, UnitMode } from "@/types";

export const KG_PER_VISS = 1.6329321885344;

/** 1 Viss (ပိဿာ) = 100 Ticals (ကျပ်သား). Manual price is MMK per Viss for Myanmar weight units. */
export const TICALS_PER_VISS = 100;

/** Mint / Pyi (ပူစီနံ): scale per-Viss price by grain mass ratio. */
export const KG_PER_PYI = 1.6;

export function formatMMK(n: number): string {
  return new Intl.NumberFormat("my-MM", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

/**
 * `unitPriceMMK`: typed manual price — metric: per kg / L / pc; traditional: **per Viss**.
 * Tical total: **(unitPrice / 100) × tical quantity**.
 */
export function computeLineTotalMMK(
  item: CatalogItem,
  mode: UnitMode,
  metricUnit: MetricUnit,
  traditionalUnit: TraditionalUnit,
  qty: number,
  unitPriceMMK: number,
): number {
  if (!Number.isFinite(qty) || qty <= 0) return 0;
  const price = unitPriceMMK;

  if (item.pieceMode) {
    return Math.max(0, Math.round(qty)) * price;
  }

  if (mode === "metric") {
    if (item.isLiquid) {
      if (metricUnit === "L") return qty * price;
      if (metricUnit === "g") return (qty / 1000) * price;
      if (metricUnit === "kg") return qty * price;
    }
    if (metricUnit === "kg") return qty * price;
    if (metricUnit === "g") return (qty / 1000) * price;
    if (metricUnit === "L") return qty * price;
  }

  if (mode === "traditional") {
    if (traditionalUnit === "viss") return qty * price;
    if (traditionalUnit === "tical") return (price / TICALS_PER_VISS) * qty;
    if (traditionalUnit === "pyi") return qty * price * (KG_PER_PYI / KG_PER_VISS);
  }

  return 0;
}

export function defaultMetricUnit(item: CatalogItem): MetricUnit {
  return item.isLiquid ? "L" : "kg";
}

export function defaultTraditionalUnit(item: CatalogItem): TraditionalUnit {
  return item.supportsPyi ? "pyi" : "viss";
}
