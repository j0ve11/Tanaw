import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Tanaw" },
      { name: "description", content: "Workspace, profile, and notification settings for Tanaw." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <AppShell title="Settings" subtitle="Workspace, profile, and notifications.">
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-display text-xl">Workspace profile</CardTitle>
            <CardDescription>How your farm shows up across Tanaw</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="ws">Workspace name</Label>
                <Input id="ws" defaultValue="Reyes Family Farm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="region">Primary region</Label>
                <Input id="region" defaultValue="Nueva Ecija, PH" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ha">Total hectares</Label>
                <Input id="ha" type="number" defaultValue={132} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Contact email</Label>
                <Input id="email" type="email" defaultValue="maya@tanaw.farm" />
              </div>
            </div>
            <Separator />
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save changes</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display text-xl">Notifications</CardTitle>
            <CardDescription>How Tanaw contacts you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Toggle label="Weekly forecast digest" hint="Every Monday morning" defaultChecked />
            <Toggle label="Weather anomaly alerts" hint="Rainfall & temperature spikes" defaultChecked />
            <Toggle label="Product updates" hint="Occasional feature news" />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}

function Toggle({ label, hint, defaultChecked }: { label: string; hint: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border p-3">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
