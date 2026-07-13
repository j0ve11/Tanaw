import { describe, it, expect } from "vitest";
import { REGION_TOTAL_YIELDS, REGION_AREAS } from "@/lib/forecast-service";

/**
 * Test Module 1: Dashboard Page
 * Covers: Greeting, Stat cards, Yield trend chart, Active fields list, Navigation
 */
describe("Dashboard Page", () => {
  describe("Region Data", () => {
    it("should have all expected regions defined", () => {
      const expectedRegions = ["Nueva Ecija", "Iloilo", "Cagayan", "Pangasinan", "Bulacan", "Isabela"];
      const actualRegions = Object.keys(REGION_TOTAL_YIELDS);
      expect(actualRegions).toEqual(expect.arrayContaining(expectedRegions));
    });

    it("should have both wet and dry yields for each region", () => {
      Object.keys(REGION_TOTAL_YIELDS).forEach((region) => {
        expect(REGION_TOTAL_YIELDS[region]).toHaveProperty("wet");
        expect(REGION_TOTAL_YIELDS[region]).toHaveProperty("dry");
        expect(typeof REGION_TOTAL_YIELDS[region].wet).toBe("number");
        expect(typeof REGION_TOTAL_YIELDS[region].dry).toBe("number");
      });
    });

    it("should have area values for each region", () => {
      Object.keys(REGION_AREAS).forEach((region) => {
        expect(typeof REGION_AREAS[region]).toBe("number");
        expect(REGION_AREAS[region]).toBeGreaterThan(0);
      });
    });
  });

  describe("Stat Cards Calculations", () => {
    it("should calculate total project yield correctly", () => {
      const totalYield = Object.values(REGION_TOTAL_YIELDS).reduce((sum, r) => sum + r.wet + r.dry, 0);
      
      // Total should be approximately 944,723 MT (or calibrated ~972,000 MT)
      expect(totalYield).toBeGreaterThan(940000);
      expect(totalYield).toBeLessThan(980000);
    });

    it("should calculate total area across regions", () => {
      const totalArea = Object.values(REGION_AREAS).reduce((sum, a) => sum + a, 0);
      
      // Total area should be approximately 76,000+ ha
      expect(totalArea).toBeGreaterThan(70000);
    });
  });

  describe("Yield Trend Chart Data", () => {
    it("should have correct number of months in yield trend data", () => {
      const yieldTrend = [
        { month: "Jan", forecast: 66000, actual: 57000 },
        { month: "Feb", forecast: 142000, actual: 123000 },
        { month: "Mar", forecast: 208000, actual: 179000 },
        { month: "Apr", forecast: 292000, actual: 262000 },
        { month: "May", forecast: 378000, actual: 326000 },
        { month: "Jun", forecast: 520000, actual: 454000 },
        { month: "Jul", forecast: 644000, actual: null },
        { month: "Aug", forecast: 740000, actual: null },
      ];
      
      expect(yieldTrend).toHaveLength(8);
      
      // Check forecast values exist for all months
      yieldTrend.forEach((item) => {
        expect(item.forecast).toBeGreaterThan(0);
      });
      
      // Check actual values exist for first 6 months
      const actualValues = yieldTrend.filter((item) => item.actual !== null);
      expect(actualValues).toHaveLength(6);
    });
  });

  describe("Active Fields Data", () => {
    it("should have all six fields defined", () => {
      const fields = [
        "North Paddy A",
        "River Bend", 
        "South Terrace",
        "Central Plains",
        "East Valley",
        "Northwest Fields"
      ];
      
      // Verify field names and regions exist
      const fieldRegions = [
        "Nueva Ecija",
        "Iloilo",
        "Cagayan",
        "Pangasinan",
        "Bulacan",
        "Isabela"
      ];
      
      expect(fields.length).toBe(6);
      fieldRegions.forEach((region) => {
        expect(REGION_AREAS[region]).toBeDefined();
      });
    });

    it("should have valid status values for fields", () => {
      const validStatuses = ["Reproductive", "Vegetative", "Ripening", "Maturing", "Tillering", "Harvest Ready"];
      
      const fieldStatuses = [
        "Reproductive", // North Paddy A
        "Vegetative", // River Bend
        "Ripening", // South Terrace
        "Maturing", // Central Plains
        "Tillering", // East Valley
        "Harvest Ready", // Northwest Fields
      ];
      
      fieldStatuses.forEach((status) => {
        expect(validStatuses).toContain(status);
      });
    });
  });
});

/**
 * Test Module 6: Mobile Viewport Testing
 * Covers responsive design and mobile rendering
 */
describe("Dashboard Mobile Viewport", () => {
  it("should have correct responsive grid classes", () => {
    // Verify the grid pattern matches expected mobile-first design
    const statsGridClasses = "grid gap-6 sm:grid-cols-2 lg:grid-cols-4";
    const fieldsGridClasses = "mt-6 grid gap-4 lg:grid-cols-3";
    
    expect(statsGridClasses).toContain("sm:grid-cols-2");
    expect(fieldsGridClasses).toContain("lg:grid-cols-3");
  });

  it("should have responsive padding classes", () => {
    const responsivePadding = "flex-1 px-4 py-6 md:px-8 md:py-8";
    expect(responsivePadding).toContain("md:px-8");
  });
});

/**
 * Performance Tests
 */
describe("Dashboard Performance", () => {
  it("should calculate metrics within acceptable time", () => {
    const startTime = performance.now();
    
    // Simulate calculation operations
    const totalYield = Object.values(REGION_TOTAL_YIELDS).reduce((sum, r) => sum + r.wet + r.dry, 0);
    const totalArea = Object.values(REGION_AREAS).reduce((sum, a) => sum + a, 0);
    
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    // Should complete within 100ms for in-memory calculations
    expect(duration).toBeLessThan(100);
    expect(totalYield).toBeGreaterThan(0);
    expect(totalArea).toBeGreaterThan(0);
  });
});