import "@testing-library/jest-dom";
import { vi } from "vitest";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import React from "react";

// Mock matchMedia for happy-dom
Object.defineProperty(window, "matchMedia", {
  writable: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: vi.fn().mockImplementation((query: any) => ({
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
  ArrowUpRight: () => null,
  Sprout: () => null,
  Droplets: () => null,
  CloudSun: () => null,
  TrendingUp: () => null,
  Wheat: () => null,
  Sparkles: () => null,
  Bell: () => null,
  Search: () => null,
  MoreHorizontal: () => null,
  Plus: () => null,
}));

// Mock sonner toast
vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    warning: vi.fn(),
    success: vi.fn(),
    info: vi.fn(),
    promise: vi.fn(),
    dismiss: vi.fn(),
  },
}));

// Mock recharts components
vi.mock("recharts", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AreaChart: ({ children }: any) => React.createElement("svg", null, children),
  Area: () => null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  BarChart: ({ children }: any) => React.createElement("svg", null, children),
  Bar: () => null,
  CartesianGrid: () => null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ResponsiveContainer: ({ children }: any) => React.createElement("div", null, children),
  Tooltip: () => null,
  XAxis: () => null,
  YAxis: () => null,
}));

// Mock @tanstack/react-router
vi.mock("@tanstack/react-router", () => ({
  createFileRoute: () => ({
    head: () => ({}),
    component: () => null,
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Link: ({ children }: any) => React.createElement("a", null, children),
  useNavigate: () => vi.fn(),
  useRouterState: () => ({ location: { pathname: "/" } }),
  useRouter: () => ({ navigate: vi.fn() }),
}));

// Mock Radix UI components
vi.mock("@/components/ui/sidebar", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  SidebarProvider: ({ children }: any) => React.createElement("div", null, children),
  SidebarTrigger: () => React.createElement("button", null, "Menu"),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  SidebarInset: ({ children }: any) => React.createElement("div", null, children),
}));

vi.mock("@/components/app-sidebar", () => ({
  AppSidebar: () => React.createElement("nav", null, "Sidebar"),
}));

// Mock @tanstack/react-query
vi.mock("@tanstack/react-query", () => ({
  useQuery: () => ({
    data: null,
    isLoading: false,
    error: null,
  }),
  useMutation: () => ({
    mutate: vi.fn(),
    isLoading: false,
    error: null,
  }),
  QueryClient: class {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  QueryClientProvider: ({ children }: any) => React.createElement("div", null, children),
}));

// Mock window properties
Object.defineProperty(window, "location", {
  value: {
    pathname: "/",
    search: "",
    hash: "",
  },
  writable: true,
});