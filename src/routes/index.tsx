import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Sprout,
  Droplets,
  CloudSun,
  TrendingUp,
  Wheat,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

const yieldTrend = [
  { month: "Jan", forecast: 4.2, actual: 4.0 },
  { month: "Feb", forecast: 4.5, actual: 4.4 },
  { month: "Mar", forecast: 4.9, actual: 4.7 },
  { month: "Apr", forecast: 5.2, actual: 5.1 },
  { month: "May", forecast: 5.6, actual: 5.4 },
  { month: "Jun", forecast: 5.9, actual: 5.7 },
  { month: "Jul", forecast: 6.1, actual: null },
  { month: "Aug", forecast: 6.3, actual: null },
];

const stats = [
  { label: "Projected yield", value: "6.3 t/ha", delta: "+8.2%", icon: TrendingUp, tone: "success" as const },
  { label: "Active fields", value: "3", delta: "132 ha total", icon: Sprout, tone: "muted" as const },
  { label: "Rainfall (30d)", value: "218 mm", delta: "+12% vs avg", icon: Droplets, tone: "muted" as const },
  { label: "Growing degree days", value: "1,420", delta: "On track", icon: CloudSun, tone: "muted" as const },
];

const fields = [
  { name: "North Paddy A", region: "Nueva Ecija", season: "Wet", area: 42, progress: 68, yield: "6.5 t/ha", status: "Reproductive" },
  { name: "River Bend", region: "Iloilo", season: "Wet", area: 58, progress: 42, yield: "5.9 t/ha", status: "Vegetative" },
  { name: "South Terrace", region: "Cagayan", season: "Dry", area: 32, progress: 88, yield: "6.1 t/ha", status: "Ripening" },
];

function Dashboard() {
  return (
    <AppShell
      title="Good morning, Maya"
      subtitle="Here's how your rice fields are shaping up this season."
      actions={
        <>
          <Button variant="outline">Export report</Button>
          <Button asChild>
            <Link to="/forecast">
              <Sprout className="mr-1.5 h-4 w-4" /> New forecast
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="mt-1 font-display text-3xl font-semibold">{s.value}</p>
                </div>
                <div className="rounded-lg bg-muted p-2 text-primary">
                  <s.icon className="h-4 w-4" />
                </div>
              </div>
              <p className={`mt-3 text-xs font-medium ${s.tone === "success" ? "text-success" : "text-muted-foreground"}`}>{s.delta}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between space-y-0">
            <div>
              <CardTitle className="font-display text-xl">Yield forecast trend</CardTitle>
              <CardDescription>Predicted vs. observed yield (t/ha) — Wet 2026</CardDescription>
            </div>
            <Badge variant="secondary" className="gap-1">
              <TrendingUp className="h-3 w-3" /> +8.2% MoM
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={yieldTrend} margin={{ left: -10, right: 8, top: 6, bottom: 0 }}>
                  <defs>
                    <linearGradient id="fArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="aArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" fontSize={12} />
                  <YAxis tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" fontSize={12} />
                  <Tooltip
                    contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 8, fontSize: 12 }}
                  />
                  <Area type="monotone" dataKey="forecast" stroke="var(--color-primary)" strokeWidth={2} fill="url(#fArea)" />
                  <Area type="monotone" dataKey="actual" stroke="var(--color-accent)" strokeWidth={2} fill="url(#aArea)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-xl">Season progress</CardTitle>
            <CardDescription>Growth stages across active fields</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {fields.map((f) => (
              <div key={f.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-foreground">{f.name}</p>
                    <p className="text-xs text-muted-foreground">{f.region} · {f.status}</p>
                  </div>
                  <span className="font-medium tabular-nums">{f.progress}%</span>
                </div>
                <Progress value={f.progress} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle className="font-display text-xl">Active fields</CardTitle>
            <CardDescription>Latest forecast per field</CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/forecast">View all <ArrowUpRight className="ml-1 h-3.5 w-3.5" /></Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {fields.map((f) => (
              <div key={f.name} className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Wheat className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{f.name}</p>
                    <p className="text-xs text-muted-foreground">{f.region} · {f.area} ha · {f.season} season</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">{f.status}</Badge>
                  <div className="text-right">
                    <p className="font-display text-lg font-semibold">{f.yield}</p>
                    <p className="text-xs text-muted-foreground">Forecast</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}
