// Satellite-based XGBoost forecast service
// Connects to Python FastAPI backend for ML predictions

export type Season = "wet" | "dry";

// Keep regions for UI compatibility
export const REGIONS: Record<string, { wet: number; dry: number }> = {
  "Nueva Ecija": { wet: 5.4, dry: 6.1 },
  Iloilo: { wet: 4.8, dry: 5.6 },
  Cagayan: { wet: 4.5, dry: 5.2 },
  Pangasinan: { wet: 5.1, dry: 5.9 },
  Bulacan: { wet: 4.9, dry: 5.7 },
  Isabela: { wet: 5.6, dry: 6.3 },
};

export interface DekadFeatures {
  VH_Mean_dB: number;
  VV_Mean_dB: number;
  VH_VV_Ratio: number;
  RVI: number;
  NDVI_Mean: number;
  EVI_Mean: number;
  LSWI_Mean: number;
  Seasonal_Encoding: number;
  Event_Disruption: number;
  Sin_Dekad: number;
  Cos_Dekad: number;
}

export interface ForecastResult {
  perHa: number;
  total: number;
  confidence: number;
}

// Seasonal encoding for the model
const SEASONAL_ENCODING: Record<Season, number> = {
  wet: 1,
  dry: 0,
};

/**
 * Calculate forecast using the XGBoost ensemble model.
 * Sends satellite features to the Python backend for prediction.
 */
export async function calculateForecast(
  region: string,
  season: Season,
  area: number,
  dekads?: DekadFeatures[]
): Promise<ForecastResult> {
  // If no satellite data provided, fall back to simple estimation
  if (!dekads || dekads.length !== 5) {
    const base = REGIONS[region]?.[season] ?? 5.0;
    const modifier = 1 + Math.min(0.06, Math.max(-0.06, (25 - area) * 0.001));
    const perHa = +(base * modifier).toFixed(2);
    const total = +(perHa * area).toFixed(1);
    const confidence = Math.round(78 + (season === "dry" ? 6 : 0) + Math.min(8, area / 10));
    return { perHa, total, confidence };
  }

  try {
    const response = await fetch('/api/forecast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ region, season, area, dekads })
    });

    if (!response.ok) {
      throw new Error('Prediction failed');
    }

    const data = await response.json();
    return data as ForecastResult;
  } catch (error) {
    console.error('Forecast API error:', error);
    // Fallback to simple estimation on error
    const base = REGIONS[region]?.[season] ?? 5.0;
    const modifier = 1 + Math.min(0.06, Math.max(-0.06, (25 - area) * 0.001));
    const perHa = +(base * modifier).toFixed(2);
    const total = +(perHa * area).toFixed(1);
    return { perHa, total, confidence: 70 };
  }
}

// Keep legacy functions for backward compatibility
export function getRegionNames(): string[] {
  return Object.keys(REGIONS);
}

export function getBaseYield(region: string, season: Season): number {
  return REGIONS[region]?.[season] ?? 5.0;
}

// Helper to generate synthetic dekad features for testing
export function generateSampleDekadFeatures(season: Season): DekadFeatures[] {
  const seasonalEnc = SEASONAL_ENCODING[season];
  return Array.from({ length: 5 }, (_, i) => ({
    VH_Mean_dB: -15 + Math.random() * 5,
    VV_Mean_dB: -10 + Math.random() * 5,
    VH_VV_Ratio: 0.8 + Math.random() * 0.4,
    RVI: 0.02 + Math.random() * 0.02,
    NDVI_Mean: 0.4 + Math.random() * 0.3,
    EVI_Mean: 0.2 + Math.random() * 0.2,
    LSWI_Mean: 0.2 + Math.random() * 0.2,
    Seasonal_Encoding: seasonalEnc,
    Event_Disruption: 0,
    Sin_Dekad: Math.sin(2 * Math.PI * i / 36),
    Cos_Dekad: Math.cos(2 * Math.PI * i / 36)
  }));
}
