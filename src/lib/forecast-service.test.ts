import { describe, it, expect } from "vitest";
import { calculateForecast, REGIONS, getRegionNames, getBaseYield, type Season } from "./forecast-service";

describe("forecast-service", () => {
  describe("REGIONS data", () => {
    it("should have all expected regions defined", () => {
      const expectedRegions = ["Nueva Ecija", "Iloilo", "Cagayan", "Pangasinan", "Bulacan", "Isabela"];
      expect(getRegionNames()).toEqual(expect.arrayContaining(expectedRegions));
    });

    it("should have both wet and dry yields for each region", () => {
      Object.keys(REGIONS).forEach((region) => {
        expect(REGIONS[region]).toHaveProperty("wet");
        expect(REGIONS[region]).toHaveProperty("dry");
        expect(typeof REGIONS[region].wet).toBe("number");
        expect(typeof REGIONS[region].dry).toBe("number");
      });
    });

    it("should have dry season yields higher than wet season yields", () => {
      for (const region of getRegionNames()) {
        expect(REGIONS[region].dry).toBeGreaterThan(REGIONS[region].wet);
      }
    });
  });

  describe("calculateForecast", () => {
    it("should calculate forecast for default area (25ha) correctly", () => {
      const result = calculateForecast("Nueva Ecija", "wet", 25);
      expect(result.perHa).toBe(5.4);
      expect(result.total).toBe(135);
      expect(result.confidence).toBe(81); // 78 + 0 + min(8, 2.5) = 80.5 -> 80, but with area/10 = 2.5, min(8, 2.5) = 2.5 -> 80.5 rounds to 81
    });

    it("should increase yield per ha for smaller areas than 25ha", () => {
      const result = calculateForecast("Nueva Ecija", "wet", 10);
      const defaultResult = calculateForecast("Nueva Ecija", "wet", 25);
      expect(result.perHa).toBeGreaterThan(defaultResult.perHa);
    });

    it("should decrease yield per ha for larger areas than 25ha", () => {
      const result = calculateForecast("Nueva Ecija", "wet", 50);
      const defaultResult = calculateForecast("Nueva Ecija", "wet", 25);
      expect(result.perHa).toBeLessThan(defaultResult.perHa);
    });

    it("should calculate dry season confidence higher than wet season", () => {
      const wetResult = calculateForecast("Nueva Ecija", "wet", 25);
      const dryResult = calculateForecast("Nueva Ecija", "dry", 25);
      // 78 + (dry ? 6 : 0) + min(8, area/10)
      expect(dryResult.confidence).toBe(wetResult.confidence + 6);
    });

    it("should cap confidence at 78 + 6 + 8 = 92", () => {
      const result = calculateForecast("Nueva Ecija", "dry", 1000);
      expect(result.confidence).toBe(92);
    });

    it("should handle minimum area (1 ha)", () => {
      const result = calculateForecast("Nueva Ecija", "wet", 1);
      expect(result.perHa).toBeGreaterThan(0);
      expect(result.total).toBeGreaterThan(0);
      expect(result.confidence).toBeGreaterThan(0);
    });

    it("should handle maximum area (2000 ha)", () => {
      const result = calculateForecast("Nueva Ecija", "wet", 2000);
      expect(result.perHa).toBeGreaterThan(0);
      expect(result.total).toBeGreaterThan(0);
      expect(result.confidence).toBeLessThanOrEqual(92);
    });

    it("should return different values for different regions", () => {
      const neResult = calculateForecast("Nueva Ecija", "wet", 25);
      const ilResult = calculateForecast("Iloilo", "wet", 25);
      expect(neResult.perHa).not.toBe(ilResult.perHa);
    });
  });

  describe("getBaseYield", () => {
    it("should return correct base yield for wet season", () => {
      expect(getBaseYield("Nueva Ecija", "wet")).toBe(5.4);
    });

    it("should return correct base yield for dry season", () => {
      expect(getBaseYield("Nueva Ecija", "dry")).toBe(6.1);
    });

    it("should throw for invalid region", () => {
      expect(() => getBaseYield("Invalid Region", "wet")).toThrow();
    });
  });
});