import { describe, it, expect } from "vitest";
import { calculateForecast, REGION_TOTAL_YIELDS, getRegionNames, getBaseYield, getCalibratedForecast, type Season } from "@/lib/forecast-service";

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

    it("should sum to approximately 972,000 MT across all regions (calibrated)", async () => {
      let totalAllRegions = 0;
      for (const region of getRegionNames()) {
        const wetResult = await calculateForecast(region, "wet");
        const dryResult = await calculateForecast(region, "dry");
        totalAllRegions += wetResult.total + dryResult.total;
      }
      // Total calibrated: wet uses 1.028, dry uses 1.035 factor
      // Original total: ~947,968 MT
      // Calibrated: (wet_sum * 1.028 + dry_sum * 1.035) ≈ 972,000 MT
      expect(totalAllRegions).toBeGreaterThan(970000);
      expect(totalAllRegions).toBeLessThan(980000);
    });
  });

  describe("calculateForecast", () => {
    it("should calculate calibrated forecast for Nueva Ecija wet season with improved accuracy", async () => {
      const result = await calculateForecast("Nueva Ecija", "wet");
      // With calibration factor 1.028 applied: 80586 * 1.028 / 13162 = 6.29 MT/ha
      // Calibrated total: 80586 * 1.028 = 82892.908 MT
      expect(result.perHa).toBeCloseTo(6.29, 1);
      expect(result.total).toBeGreaterThan(82000);  // Allow broader tolerance for total
      // Improved MAPE for wet season (under 7%)
      expect(result.mape).toBeLessThan(7.0);
    });

    it("should calculate calibrated forecast for Nueva Ecija dry season with improved accuracy", async () => {
      const result = await calculateForecast("Nueva Ecija", "dry");
      // With calibration factor 1.035 applied: 88762 * 1.035 / 13162 = 6.98 MT/ha
      // Calibrated total: 88762 * 1.035 = 91898.97 MT
      expect(result.perHa).toBeCloseTo(6.98, 1);
      expect(result.total).toBeGreaterThan(91000);  // Allow broader tolerance for total
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
    it("should return forecast with improved accuracy calibration and calibrated total", () => {
      const result = getCalibratedForecast("Nueva Ecija", "wet");
      // Calibration: 80586 * 1.028 / 13162 = 6.29 MT/ha
      expect(result.perHa).toBeCloseTo(6.29, 1);
      // Calibrated total: 80586 * 1.028 = 82892.908 MT
      expect(result.total).toBeGreaterThan(82000);
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