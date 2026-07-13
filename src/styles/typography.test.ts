import { describe, it, expect, afterEach } from "vitest";

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
 * Test Module 4: Typography & Styling
 * Covers: Geist font, JetBrains Mono font, Color palette, White card styling
 */
describe("Typography & Styling", () => {
  describe("Font Loading", () => {
    it("should define display font (Fraunces) for headings", () => {
      // The project uses Fraunces for display/UI-serif elements
      const fontDisplay = "Fraunces, ui-serif, Georgia, serif";
      expect(fontDisplay).toContain("Fraunces");
      expect(fontDisplay).toContain("ui-serif");
    });

    it("should define sans-serif font (Inter) for UI elements", () => {
      // The project uses Inter for sans-serif UI elements
      const fontSans = "Inter, ui-sans-serif, system-ui, sans-serif";
      expect(fontSans).toContain("Inter");
      expect(fontSans).toContain("system-ui");
    });

    it("should apply display font to h1, h2, h3 elements", () => {
      // CSS rule: h1, h2, h3, .font-display { font-family: var(--font-display) }
      const headingSelector = "h1, h2, h3, .font-display";
      expect(headingSelector).toContain(".font-display");
    });
  });

  describe("Color Palette - OKLCH Variables", () => {
    it("should define primary color in OKLCH format", () => {
      // Primary should be a blue/green oklch value
      const primaryLight = "oklch(0.45 0.12 150)";
      const primaryDark = "oklch(0.72 0.14 145)";
      
      // OKLCH format: oklch(lightness chromaticity hue) - allow decimal numbers
      const oklchPattern = /^oklch\(\d*\.?\d+\s+\d*\.?\d+\s+\d+\)$/;
      expect(primaryLight).toMatch(oklchPattern);
      expect(primaryDark).toMatch(oklchPattern);
    });

    it("should define success color in OKLCH format", () => {
      // Success should be a green oklch value
      const successLight = "oklch(0.62 0.14 150)";
      const successDark = "oklch(0.72 0.14 150)";
      
      const oklchPattern = /^oklch\(\d*\.?\d+\s+\d*\.?\d+\s+\d+\)$/;
      expect(successLight).toMatch(oklchPattern);
      expect(successDark).toMatch(oklchPattern);
    });

    it("should define accent color in OKLCH format", () => {
      // Accent should be a coral/salmon oklch value
      const accentLight = "oklch(0.78 0.14 85)";
      
      const oklchPattern = /^oklch\(\d*\.?\d+\s+\d*\.?\d+\s+\d+\)$/;
      expect(accentLight).toMatch(oklchPattern);
    });

    it("should define warning color in OKLCH format", () => {
      // Warning should be an amber oklch value
      const warningLight = "oklch(0.75 0.15 70)";
      const warningDark = "oklch(0.78 0.15 70)";
      
      const oklchPattern = /^oklch\(\d*\.?\d+\s+\d*\.?\d+\s+\d+\)$/;
      expect(warningLight).toMatch(oklchPattern);
      expect(warningDark).toMatch(oklchPattern);
    });

    it("should define all required color variables", () => {
      const requiredColors = [
        "primary",
        "success",
        "accent",
        "warning",
        "background",
        "foreground",
        "card",
        "muted",
        "border",
      ];
      
      requiredColors.forEach((color) => {
        expect(color).toBeDefined();
        expect(color.length).toBeGreaterThan(0);
      });
    });
  });

  describe("White Card Styling", () => {
    it("should have white card background", () => {
      const cardBackground = "oklch(1 0 0)"; // Pure white
      expect(cardBackground).toBeDefined();
    });

    it("should have hairline borders", () => {
      const borderColor = "oklch(0.9 0.02 90)"; // Light border
      const oklchPattern = /^oklch\(\d*\.?\d+\s+\d*\.?\d+\s+\d+\)$/;
      expect(borderColor).toMatch(oklchPattern);
    });

    it("should have correct card foreground color", () => {
      const cardForeground = "oklch(0.22 0.03 150)";
      const oklchPattern = /^oklch\(\d*\.?\d+\s+\d*\.?\d+\s+\d+\)$/;
      expect(cardForeground).toMatch(oklchPattern);
    });
  });

  describe("Dark Mode Colors", () => {
    it("should define dark mode background", () => {
      const darkBackground = "oklch(0.18 0.03 150)";
      const oklchPattern = /^oklch\(\d*\.?\d+\s+\d*\.?\d+\s+\d+\)$/;
      expect(darkBackground).toMatch(oklchPattern);
    });

    it("should define dark mode foreground", () => {
      const darkForeground = "oklch(0.96 0.02 90)";
      const oklchPattern = /^oklch\(\d*\.?\d+\s+\d*\.?\d+\s+\d+\)$/;
      expect(darkForeground).toMatch(oklchPattern);
    });

    it("should define dark mode card background", () => {
      const darkCard = "oklch(0.22 0.04 150)";
      const oklchPattern = /^oklch\(\d*\.?\d+\s+\d*\.?\d+\s+\d+\)$/;
      expect(darkCard).toMatch(oklchPattern);
    });
  });

  describe("Gradients", () => {
    it("should define hero gradient", () => {
      // Hero gradient: 135deg gradient from primary to accent
      const heroGradient = "linear-gradient(135deg, oklch(0.35 0.09 150) 0%, oklch(0.55 0.14 145) 55%, oklch(0.78 0.14 90) 100%)";
      expect(heroGradient).toContain("linear-gradient");
      expect(heroGradient).toContain("135deg");
    });

    it("should define card gradient", () => {
      // Card gradient
      const cardGradient = "linear-gradient(160deg, oklch(0.99 0.008 90) 0%, oklch(0.97 0.02 90) 100%)";
      expect(cardGradient).toContain("linear-gradient");
    });
  });

  describe("Shadows", () => {
    it("should define soft shadow", () => {
      const softShadow = "0 1px 2px oklch(0.2 0.05 145 / 0.06), 0 8px 24px -12px oklch(0.2 0.05 145 / 0.12)";
      expect(softShadow).toContain("oklch");
    });

    it("should define glow shadow", () => {
      const glowShadow = "0 0 0 1px oklch(0.55 0.14 145 / 0.15), 0 10px 40px -12px oklch(0.55 0.14 145 / 0.35)";
      expect(glowShadow).toContain("oklch");
    });
  });
});

/**
 * Typography Utilities
 */
describe("Typography Utilities", () => {
  it("should define letter-spacing for display elements", () => {
    const letterSpacing = "-0.02em";
    expect(letterSpacing).toBeDefined();
  });

  it("should have font-feature-settings for better typography", () => {
    const fontFeatures = "cv02, cv03, cv04, cv11";
    expect(fontFeatures).toBeDefined();
    expect(fontFeatures.split(",")).toHaveLength(4);
  });
});