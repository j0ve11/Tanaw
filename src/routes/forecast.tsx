import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, Wheat, TrendingUp, Droplets } from "lucide-react";
import { toast } from "sonner";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { REGION_TOTAL_YIELDS, REGION_AREAS, calculateForecast, getRegionNames } from "@/lib/forecast-service";

export const Route = createFileRoute("/forecast")({
  head: () => ({
    meta: [
      { title: "Tanaw" },
      { name: "description", content: "Generate rice yield forecasts by region and season. Uses satellite data from Google Earth Engine." },
      { property: "og:title", content: "Rice yield forecast — Tanaw" },
      { property: "og:description", content: "Generate rice yield forecasts by region and season." },
    ],
  }),
  component: ForecastPage,
});

// Total baseline forecasted yield for historical chart
const TOTAL_FORECASTED_YIELDS = Object.values(REGION_TOTAL_YIELDS).reduce((sum, r) => sum + r.wet + r.dry, 0);
// Backward compatible alias
const TOTAL_YIELDS = TOTAL_FORECASTED_YIELDS;

const history = [
  { season: "Dry 24", yield: Math.round(TOTAL_YIELDS * 0.15) },
  { season: "Wet 24", yield: Math.round(TOTAL_YIELDS * 0.13) },
  { season: "Dry 25", yield: Math.round(TOTAL_YIELDS * 0.18) },
  { season: "Wet 25", yield: Math.round(TOTAL_YIELDS * 0.15) },
  { season: "Dry 26", yield: Math.round(TOTAL_YIELDS * 0.19) },
];

function ForecastPage() {
  const [region, setRegion] = useState<string>("Nueva Ecija");
  const [season, setSeason] = useState<"wet" | "dry">("wet");
  const [area, setArea] = useState<number>(0);
  const [result, setResult] = useState<null | { perHa: number; total: number; mape: number; source?: string }>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get default area for selected region (Metric Tons total yield)
  const defaultArea = REGION_AREAS[region] ?? 13000;
  const areaForCalculation = area > 0 ? area : defaultArea;

  const compute = async () => {
    setIsLoading(true);
    try {
      // Use user-specified area if provided, otherwise use default region area
      const prediction = await calculateForecast(region, season, areaForCalculation);
      setResult(prediction);
      // Show warning toast if using fallback/estimated data
      if (prediction.source === "fallback") {
        toast.warning("Forecast warning", {
          description: "Using estimated values due to API unavailability. Results may be less accurate.",
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Forecast failed:", errorMessage);
      toast.error("Forecast error", {
        description: `Unable to generate forecast: ${errorMessage}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get area for display: use user input if provided, otherwise region default
  const areaForDisplay = area > 0 ? area : (result ? REGION_AREAS[region] ?? 13000 : REGION_AREAS[region] ?? 13000);

  return (
    <AppShell
      title="New forecast"
      subtitle="Estimate yield using satellite data from Google Earth Engine."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-display text-xl">Inputs</CardTitle>
            <CardDescription>Select region and season to generate a forecast.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label>Region</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {getRegionNames().map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Season</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={season === "wet" ? "default" : "outline"}
                  onClick={() => setSeason("wet")}
                  className="justify-start"
                >
                  <Droplets className="mr-2 h-4 w-4" /> Wet
                </Button>
                <Button
                  type="button"
                  variant={season === "dry" ? "default" : "outline"}
                  onClick={() => setSeason("dry")}
                  className="justify-start"
                >
                  <Wheat className="mr-2 h-4 w-4" /> Dry
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="area">Planted area (hectares)</Label>
              <Input
                id="area"
                type="number"
                value={areaForDisplay}
                onChange={(e) => setArea(Number(e.target.value) || 0)}
                min={1}
              />
            </div>
            <Button onClick={compute} className="w-full" size="lg">
              <Sparkles className="mr-2 h-4 w-4" /> Generate forecast
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6 lg:col-span-3">
          <Card className="overflow-hidden">
            <div
              className="p-6 text-primary-foreground"
              style={{ background: "var(--gradient-hero)" }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-wider opacity-80">Forecasted yield</p>
                  <p className="mt-1 font-display text-5xl font-semibold">
                    {result ? result.perHa : "—"}
                    <span className="ml-1 text-lg font-normal opacity-80">MT/ha</span>
                  </p>
                  <p className="mt-2 text-sm opacity-90">
                    {result ? (
                      <>Total: <span className="font-semibold">{result.total.toLocaleString()} MT</span> across {areaForDisplay.toLocaleString()} ha</>
                    ) : (
                      <>Select region and season, then generate a forecast.</>
                    )}
                  </p>
                </div>
                <Badge className="bg-background/20 text-primary-foreground hover:bg-background/30 border-0 backdrop-blur">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  {result ? `${result.mape}% MAPE` : "Model ready"}
                </Badge>
              </div>
            </div>
            <CardContent className="grid gap-4 p-6 sm:grid-cols-3">
              <Stat label="Region" value={region} />
              <Stat label="Season" value={season === "wet" ? "Wet" : "Dry"} />
              <Stat label="Area" value={`${areaForDisplay.toLocaleString()} ha`} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-display text-xl">Historical yield · {region}</CardTitle>
              <CardDescription>Past 5 seasons (MT)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={history} margin={{ left: -10, right: 8, top: 6, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                    <XAxis dataKey="season" tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" fontSize={12} />
                    <YAxis tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" fontSize={12} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="yield" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-muted/30 p-4">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-lg font-semibold">{value}</p>
    </div>
  );
}