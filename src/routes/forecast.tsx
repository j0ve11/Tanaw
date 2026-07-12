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
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { REGIONS, calculateForecast } from "@/lib/forecast-service";

export const Route = createFileRoute("/forecast")({
  head: () => ({
    meta: [
      { title: "Forecast — Tanaw" },
      { name: "description", content: "Generate rice yield forecasts by region, season, and planted area." },
      { property: "og:title", content: "Rice yield forecast — Tanaw" },
      { property: "og:description", content: "Generate rice yield forecasts by region, season, and planted area." },
    ],
  }),
  component: ForecastPage,
});

const history = [
  { season: "Dry 24", yield: 5.2 },
  { season: "Wet 24", yield: 4.7 },
  { season: "Dry 25", yield: 5.5 },
  { season: "Wet 25", yield: 5.1 },
  { season: "Dry 26", yield: 5.9 },
];

function ForecastPage() {
  const [region, setRegion] = useState<string>("Nueva Ecija");
  const [season, setSeason] = useState<"wet" | "dry">("wet");
  const [area, setArea] = useState<number>(25);
  const [result, setResult] = useState<null | { perHa: number; total: number; confidence: number }>(null);

  const compute = () => {
    setResult(calculateForecast(region, season, area));
  };

  return (
    <AppShell
      title="New forecast"
      subtitle="Estimate yield from region, season, and planted area."
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-display text-xl">Inputs</CardTitle>
            <CardDescription>Tune the parameters and generate a forecast.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label>Region</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.keys(REGIONS).map((r) => (
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
                min={1}
                max={2000}
                value={area}
                onChange={(e) => setArea(Number(e.target.value) || 0)}
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
                  <p className="text-sm uppercase tracking-wider opacity-80">Projected yield</p>
                  <p className="mt-1 font-display text-5xl font-semibold">
                    {result ? result.perHa : "—"}
                    <span className="ml-1 text-lg font-normal opacity-80">t/ha</span>
                  </p>
                  <p className="mt-2 text-sm opacity-90">
                    {result ? (
                      <>Total: <span className="font-semibold">{result.total} t</span> across {area} ha</>
                    ) : (
                      <>Enter inputs and generate a forecast.</>
                    )}
                  </p>
                </div>
                <Badge className="bg-background/20 text-primary-foreground hover:bg-background/30 border-0 backdrop-blur">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  {result ? `${result.confidence}% confidence` : "Model ready"}
                </Badge>
              </div>
            </div>
            <CardContent className="grid gap-4 p-6 sm:grid-cols-3">
              <Stat label="Region" value={region} />
              <Stat label="Season" value={season === "wet" ? "Wet" : "Dry"} />
              <Stat label="Area" value={`${area} ha`} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-display text-xl">Historical yield · {region}</CardTitle>
              <CardDescription>Past 5 seasons (t/ha)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={history} margin={{ left: -10, right: 8, top: 6, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                    <XAxis dataKey="season" tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" fontSize={12} />
                    <YAxis tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" fontSize={12} />
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
