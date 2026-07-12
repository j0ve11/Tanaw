import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock matchMedia for happy-dom
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  ArrowUpRight: () => "svg",
  Sprout: () => "svg",
  Droplets: () => "svg",
  CloudSun: () => "svg",
  TrendingUp: () => "svg",
  Wheat: () => "svg",
  Sparkles: () => "svg",
  Bell: () => "svg",
  Search: () => "svg",
  MoreHorizontal: () => "svg",
  Plus: () => "svg",
}));