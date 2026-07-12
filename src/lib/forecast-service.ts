export const REGIONS: Record<string, { wet: number; dry: number }> = {
  "Nueva Ecija": { wet: 5.4, dry: 6.1 },
  Iloilo: { wet: 4.8, dry: 5.6 },
  Cagayan: { wet: 4.5, dry: 5.2 },
  Pangasinan: { wet: 5.1, dry: 5.9 },
  Bulacan: { wet: 4.9, dry: 5.7 },
  Isabela: { wet: 5.6, dry: 6.3 },
};

export type Season = "wet" | "dry";

export interface ForecastResult {
  perHa: number;
  total: number;
  confidence: number;
}

export function calculateForecast(
  region: string,
  season: Season,
  area: number
): ForecastResult {
  const base = REGIONS[region][season];
  
  // Deterministic tweak by area for demo
  const modifier = 1 + Math.min(0.06, Math.max(-0.06, (25 - area) * 0.001));
  const perHa = +(base * modifier).toFixed(2);
  const total = +(perHa * area).toFixed(1);
  const confidence = Math.round(78 + (season === "dry" ? 6 : 0) + Math.min(8, area / 10));
  
  return { perHa, total, confidence };
}

export function getRegionNames(): string[] {
  return Object.keys(REGIONS);
}

export function getBaseYield(region: string, season: Season): number {
  return REGIONS[region][season];
}