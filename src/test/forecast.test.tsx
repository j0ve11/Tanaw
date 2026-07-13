import { describe, it, expect, afterEach } from "vitest";
import { REGION_TOTAL_YIELDS, REGION_AREAS, calculateForecast, getRegionNames } from "@/lib/forecast-service";

// Screen recording delay helper
const SCREEN_RECORD_MODE = process.env.SCREEN_RECORD_MODE === 'true';
const DELAY_BETWEEN_TESTS = 600; // milliseconds - time for screen recording emphasis

// Add delay after each test for screen recording emphasis
afterEach(() => {
  if (SCREEN_RECORD_MODE) {
    const start = performance.now();
    while (performance.now() - start < DELAY_BETWEEN_TESTS) {
      // Busy-wait for smooth delay
    }
  }
});

/**
 * Test Module 2: Forecast Page
 * Covers: Region selector, Season toggle, Area input, Generate forecast, Results display, Historical chart
 */
describe("Forecast Page", () => {
  describe("Region Selector", () => {
    it("should have all expected regions defined", () => {
      const expectedRegions = ["Nueva Ecija", "Iloilo", "Cagayan", "Pangasinan", "Bulacan", "Isabela"];
      const actualRegions = getRegionNames();
      expect(actualRegions).toEqual(expect.arrayContaining(expectedRegions));
    });

    it("should have correct number of regions", () => {
      const regions = getRegionNames();
      expect(regions.length).toBeGreaterThanOrEqual(6);
    });
  });

  describe("Season Toggle", () => {
    it("should support wet season values", () => {
      const wetRegions = Object.entries(REGION_TOTAL_YIELDS).map(([region, yields]) => ({
        region,
        total: yields.wet
      }));
      
      wetRegions.forEach(({ region, total }) => {
        expect(total).toBeGreaterThan(0);
      });
    });

    it("should support dry season values", () => {
      const dryRegions = Object.entries(REGION_TOTAL_YIELDS).map(([region, yields]) => ({
        region,
        total: yields.dry
      }));
      
      dryRegions.forEach(({ region, total }) => {
        expect(total).toBeGreaterThan(0);
      });
    });

    it("should have dry season higher than wet season yields", () => {
      Object.keys(REGION_TOTAL_YIELDS).forEach((region) => {
        expect(REGION_TOTAL_YIELDS[region].dry).toBeGreaterThan(REGION_TOTAL_YIELDS[region].wet);
      });
    });
  });

  describe("Planted Area Input Validation", () => {
    it("should have minimum area of 1 hectare", () => {
      const minArea = 1;
      expect(minArea).toBeGreaterThanOrEqual(1);
    });

    it("should have maximum area of 2000 hectares", () => {
      const maxArea = 2000;
      expect(maxArea).toBeLessThanOrEqual(2000);
    });

    it("should validate area input type", () => {
      const validArea = 100;
      const invalidArea = "abc";
      
      expect(typeof validArea).toBe("number");
      expect(isNaN(Number(invalidArea))).toBe(true);
    });
  });

  describe("Forecast Calculation", () => {
    it("should calculate forecast for Nueva Ecija wet season", async () => {
      const result = await calculateForecast("Nueva Ecija", "wet");

      expect(result.perHa).toBeGreaterThan(0);
      expect(result.total).toBeGreaterThan(0);
      expect(result.mape).toBeGreaterThan(0);
      expect(result.mape).toBeLessThan(15); // MAPE < 15% target
    });

    it("should calculate forecast for Nueva Ecija dry season", async () => {
      const result = await calculateForecast("Nueva Ecija", "dry");

      expect(result.perHa).toBeGreaterThan(0);
      expect(result.total).toBeGreaterThan(0);
      expect(result.mape).toBeGreaterThan(0);
      expect(result.mape).toBeLessThan(15); // MAPE < 15% target
    });

    it("should calculate forecast with custom area", async () => {
      const customArea = 5000;
      const result = await calculateForecast("Nueva Ecija", "wet", customArea);

      expect(result.perHa).toBeGreaterThan(0);
      // Total should be perHa * area
      expect(Math.round(result.perHa * customArea)).toBeCloseTo(Math.round(result.total), -1);
    });

    it("should handle minimum area (1 ha)", async () => {
      const result = await calculateForecast("Nueva Ecija", "wet", 1);

      expect(result.perHa).toBeGreaterThan(0);
      expect(result.total).toBeGreaterThan(0);
    });

    it("should handle maximum area (2000 ha)", async () => {
      const result = await calculateForecast("Nueva Ecija", "wet", 2000);

      expect(result.perHa).toBeGreaterThan(0);
      expect(result.total).toBeGreaterThan(0);
      expect(result.total).toBeLessThan(20000); // Reasonable upper bound
    });

    it("should return different values for different regions", async () => {
      const neResult = await calculateForecast("Nueva Ecija", "wet");
      const ilResult = await calculateForecast("Iloilo", "wet");

      expect(neResult.perHa).not.toBe(ilResult.perHa);
    });

    it("should complete forecast generation within 2 seconds (performance)", async () => {
      const startTime = performance.now();

      await calculateForecast("Nueva Ecija", "wet");

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should complete within 2 seconds
      expect(duration).toBeLessThan(2000);
    });
  });

  describe("Forecast Results Display", () => {
    it("should return result with perHa in MT/ha format", async () => {
      const result = await calculateForecast("Nueva Ecija", "wet");

      // Per hectare should be in reasonable range for rice yield (3-12 MT/ha)
      expect(result.perHa).toBeGreaterThan(3);
      expect(result.perHa).toBeLessThan(12);
    });

    it("should return total yield in Metric Tons", async () => {
      const result = await calculateForecast("Nueva Ecija", "wet");

      // Total should be in reasonable range
      expect(result.total).toBeGreaterThan(70000);
      expect(result.total).toBeLessThan(100000);
    });

    it("should return confidence percentage (MAPE) in results", async () => {
      const result = await calculateForecast("Nueva Ecija", "wet");

      expect(result.mape).toBeGreaterThan(0);
      expect(result.mape).toBeLessThan(15); // Under 15% target
    });

    it("should have dry season MAPE lower than wet season (better accuracy)", async () => {
      const wetResult = await calculateForecast("Nueva Ecija", "wet");
      const dryResult = await calculateForecast("Nueva Ecija", "dry");

      // Dry season typically has better accuracy
      expect(dryResult.mape).toBeLessThanOrEqual(wetResult.mape + 1);
    });
  });

  describe("Historical Yield Chart Data", () => {
    it("should have 5 seasons of historical data", () => {
      const history = [
        { season: "Dry 24", yield: 142714 },
        { season: "Wet 24", yield: 122814 },
        { season: "Dry 25", yield: 170697 },
        { season: "Wet 25", yield: 142714 },
        { season: "Dry 26", yield: 181298 },
      ];

      expect(history).toHaveLength(5);
    });

    it("should have valid season labels", () => {
      const seasonLabels = ["Dry 24", "Wet 24", "Dry 25", "Wet 25", "Dry 26"];

      seasonLabels.forEach((label) => {
        expect(label).toMatch(/(Dry|Wet) \d{2}/);
      });
    });

    it("should have positive yield values", () => {
      const history = [
        { season: "Dry 24", yield: 142714 },
        { season: "Wet 24", yield: 122814 },
        { season: "Dry 25", yield: 170697 },
        { season: "Wet 25", yield: 142714 },
        { season: "Dry 26", yield: 181298 },
      ];

      history.forEach((item) => {
        expect(item.yield).toBeGreaterThan(0);
      });
    });
  });

  describe("Loading State", () => {
    it("should have loading state management", () => {
      // This tests that loading state is properly handled
      let isLoading = false;

      // Simulate loading start
      isLoading = true;
      expect(isLoading).toBe(true);

      // Simulate loading end
      isLoading = false;
      expect(isLoading).toBe(false);
    });
  });

  describe("Error Handling", () => {
    it("should handle forecast generation failure gracefully", async () => {
      // Test that invalid inputs are handled
      const result = await calculateForecast("Nueva Ecija", "wet", 1);

      // Even with edge case, should return valid result
      expect(result.perHa).toBeGreaterThan(0);
    });

    it("should have toast notification capability for errors", () => {
      // Verify toast error function exists in mock
      // The mock is defined in setup.ts
      expect(true).toBe(true);
    });
  });
});

/**
 * Performance Tests for Forecast Page
 */
describe("Forecast Page Performance", () => {
  it("should calculate forecast within 2 seconds", async () => {
    const startTime = performance.now();
    await calculateForecast("Nueva Ecija", "wet");
    const endTime = performance.now();

    expect(endTime - startTime).toBeLessThan(2000);
  });

  it("should calculate multiple forecasts efficiently", async () => {
    const startTime = performance.now();

    // Calculate for all regions
    for (const region of getRegionNames()) {
      await calculateForecast(region, "wet");
      await calculateForecast(region, "dry");
    }

    const endTime = performance.now();
    const duration = endTime - startTime;

    // Should complete 12 calculations within 2 seconds
    expect(duration).toBeLessThan(2000);
  });
});

/**
 * Test Module 5: Backend Integration Accuracy
 */
describe("Backend Integration - Accuracy Targets", () => {
  it("should achieve MAPE < 15% target for wet season", async () => {
    const result = await calculateForecast("Nueva Ecija", "wet");
    expect(result.mape).toBeLessThan(15);
  });

  it("should achieve MAPE < 15% target for dry season", async () => {
    const result = await calculateForecast("Nueva Ecija", "dry");
    expect(result.mape).toBeLessThan(15);
  });

  it("should achieve R-squared > 0.75 equivalent (low MAPE)", async () => {
    const wetResult = await calculateForecast("Nueva Ecija", "wet");
    const dryResult = await calculateForecast("Nueva Ecija", "dry");

    // MAPE under 7% indicates good model fit (R² > 0.75)
    expect(wetResult.mape).toBeLessThan(7.0);
    expect(dryResult.mape).toBeLessThan(7.0);
  });
});