import { describe, it, expect } from "vitest";
import { calculateForecast, REGION_TOTAL_YIELDS, getRegionNames, getBaseYield, getCalibratedForecast, type Season } from "./forecast-service";

describe("forecast-service", () => {
  describe("REGION_TOTAL_YIELDS data", () => {
    it("should have all expected regions defined", () => {
      const expectedRegions = ["Nueva Ecija", "Iloilo", "Cagayan", "Pangasinan", "Bulacan", "Isabela"];
      expect(getRegionNames()).toEqual(expect.arrayContaining(expectedRegions));
    });

    it("should have both wet and dry yields for each region", () => {
      Object.keys(REGION_TOTAL_YIELDS).forEach((region) => {
        expect(REGION_TOTAL_YIELDS[region]).toHaveProperty("wet");
        expect(REGION_TOTAL_YIELDS[region]).toHaveProperty("dry");
        expect(typeof REGION_TOTAL_YIELDS[region].wet).toBe("number");
        expect(typeof REGION_TOTAL_YIELDS[region].dry).toBe("number");
      });
    });

    it("should have dry season yields higher than wet season yields", () => {
      for (const region of getRegionNames()) {
        expect(REGION_TOTAL_YIELDS[region].dry).toBeGreaterThan(REGION_TOTAL_YIELDS[region].wet);
      }
    });

    it("should sum to approximately 944,723 MT across all regions", async () => {
      let totalAllRegions = 0;
      for (const region of getRegionNames()) {
        const wetResult = await calculateForecast(region, "wet");
        const dryResult = await calculateForecast(region, "dry");
        totalAllRegions += wetResult.total + dryResult.total;
      }
      // Total should be approximately 944,723 MT (within 1% tolerance)
      expect(totalAllRegions).toBeGreaterThan(940000);
      expect(totalAllRegions).toBeLessThan(950000);
    });
  });

  describe("calculateForecast", () => {
    it("should calculate calibrated forecast for Nueva Ecija wet season with improved accuracy", async () => {
      const result = await calculateForecast("Nueva Ecija", "wet");
      // With calibration factor 1.028 applied: 80586 / 13162 * 1.028 = 6.29 MT/ha
      expect(result.perHa).toBeCloseTo(6.29, 1);
      expect(result.total).toBe(80586);
      // Improved MAPE for wet season (under 7%)
      expect(result.mape).toBeLessThan(7.0);
    });

    it("should calculate calibrated forecast for Nueva Ecija dry season with improved accuracy", async () => {
      const result = await calculateForecast("Nueva Ecija", "dry");
      // With calibration factor 1.035 applied: 88762 / 13162 * 1.035 = 6.98 MT/ha
      expect(result.perHa).toBeCloseTo(6.98, 1);
      expect(result.total).toBe(88762);
      // Improved MAPE for dry season (under 7%)
      expect(result.mape).toBeLessThan(7.0);
    });

    it("should calculate dry season MAPE lower than wet season (better accuracy)", async () => {
      const wetResult = await calculateForecast("Nueva Ecija", "wet");
      const dryResult = await calculateForecast("Nueva Ecija", "dry");
      // Dry season has lower MAPE (better)
      expect(dryResult.mape).toBeLessThan(wetResult.mape);
    });

    it("should handle minimum area (1 ha)", async () => {
      const result = await calculateForecast("Nueva Ecija", "wet", 1);
      expect(result.perHa).toBeGreaterThan(0);
      expect(result.total).toBeGreaterThan(0);
      expect(result.mape).toBeGreaterThan(0);
    });

    it("should return different values for different regions", async () => {
      const neResult = await calculateForecast("Nueva Ecija", "wet");
      const ilResult = await calculateForecast("Iloilo", "wet");
      expect(neResult.perHa).not.toBe(ilResult.perHa);
    });
  });

  describe("getBaseYield", () => {
    it("should return calibrated base yield for wet season", () => {
      // With calibration: 80586 / 13162 * 1.028 = 6.29
      expect(getBaseYield("Nueva Ecija", "wet")).toBeCloseTo(6.29, 1);
    });

    it("should return calibrated base yield for dry season", () => {
      // With calibration: 88762 / 13162 * 1.035 = 6.98
      expect(getBaseYield("Nueva Ecija", "dry")).toBeCloseTo(6.98, 1);
    });

    it("should return default for invalid region", () => {
      // Default: 70000 / 25000 * 1.028 = 2.88
      expect(getBaseYield("Invalid Region", "wet")).toBeCloseTo(2.88, 1);
    });
  });

  describe("getCalibratedForecast", () => {
    it("should return forecast with improved accuracy calibration", () => {
      const result = getCalibratedForecast("Nueva Ecija", "wet");
      expect(result.perHa).toBeCloseTo(6.29, 1);
      expect(result.mape).toBeLessThan(7.0);
    });

    it("should return accurate MAPE values for both seasons", () => {
      const wetResult = getCalibratedForecast("Nueva Ecija", "wet");
      const dryResult = getCalibratedForecast("Nueva Ecija", "dry");
      
      // MAPE should be under 7% (improved accuracy)
      expect(wetResult.mape).toBeLessThan(7.0);
      expect(dryResult.mape).toBeLessThan(7.0);
    });
  });
});