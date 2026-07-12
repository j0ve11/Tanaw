import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, Plus, Search, Download, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/users")({
  head: () => ({
    meta: [
      { title: "Users — Tanaw" },
      { name: "description", content: "Manage team members and access for your rice yield forecasting workspace." },
      { property: "og:title", content: "Team & users — Tanaw" },
      { property: "og:description", content: "Manage team members and access." },
    ],
  }),
  component: UsersPage,
});

type Role = "Owner" | "Agronomist" | "Field lead" | "Viewer";
type Status = "Active" | "Invited" | "Suspended";

type User = {
  name: string;
  email: string;
  role: Role;
  fields: number;
  status: Status;
  joined: string;
};

const initialUsers: User[] = [
  { name: "Maya Reyes", email: "maya@tanaw.farm", role: "Owner", fields: 3, status: "Active", joined: "Jan 2024" },
  { name: "Ivan Cruz", email: "ivan@tanaw.farm", role: "Agronomist", fields: 6, status: "Active", joined: "Mar 2024" },
  { name: "Lea Ocampo", email: "lea@tanaw.farm", role: "Field lead", fields: 2, status: "Active", joined: "Aug 2024" },
  { name: "Ben Salazar", email: "ben@tanaw.farm", role: "Viewer", fields: 0, status: "Invited", joined: "—" },
  { name: "Rina Delgado", email: "rina@tanaw.farm", role: "Field lead", fields: 1, status: "Suspended", joined: "Nov 2023" },
];

const statusStyles: Record<Status, string> = {
  Active: "bg-success/15 text-success border-success/30",
  Invited: "bg-warning/15 text-warning-foreground border-warning/40",
  Suspended: "bg-destructive/10 text-destructive border-destructive/30",
};

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [userToRemove, setUserToRemove] = useState<User | null>(null);

  const handleExportUsers = () => {
    const reportData = [
      ["Users Report - Tanaw Workspace"],
      [""],
      ["Name", "Email", "Role", "Fields", "Status", "Joined"],
      ...users.map((u) => [u.name, u.email, u.role, u.fields, u.status, u.joined]),
    ];

    const csvContent = reportData.map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `tanaw-users-report-${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Users exported successfully", {
      description: `${users.length} users have been downloaded as CSV.`,
    });
  };

  const handleRemoveUser = (user: User) => {
    setUsers(users.filter((u) => u.email !== user.email));
    setUserToRemove(null);
    toast.success("User removed", {
      description: `${user.name} has been removed from the workspace.`,
    });
  };

  return (
    <AppShell
      title="Users"
      subtitle="Manage teammates, agronomists, and access to your fields."
      actions={
        <>
          <Button variant="outline" onClick={handleExportUsers}>
            <Download className="mr-1.5 h-4 w-4" /> Export
          </Button>
          <Button><Plus className="mr-1.5 h-4 w-4" /> Invite user</Button>
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Total users" value="12" hint="+2 this month" />
        <StatCard label="Active seats" value="9" hint="of 15 in plan" />
        <StatCard label="Pending invites" value="1" hint="Sent 2d ago" />
        <StatCard label="Suspended" value="1" hint="Review access" />
      </div>

      <Card className="mt-6">
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="font-display text-xl">Team members</CardTitle>
            <CardDescription>People with access to this workspace</CardDescription>
          </div>
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by name or email" className="pl-9" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Fields</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.email}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {initials(u.name)}
                      </div>
                      <div>
                        <p className="font-medium">{u.name}</p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="secondary">{u.role}</Badge></TableCell>
                  <TableCell className="tabular-nums">{u.fields}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusStyles[u.status]}>{u.status}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{u.joined}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit role</DropdownMenuItem>
                        <DropdownMenuItem>Reset password</DropdownMenuItem>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem 
                              className="text-destructive focus:text-destructive"
                              onSelect={(e) => {
                                e.preventDefault();
                                setUserToRemove(u);
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Remove user
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Remove {userToRemove?.name}?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will remove the user from your workspace. They will no longer be able to access any fields or forecasts. This action can be undone by inviting them again.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={() => setUserToRemove(null)}>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                className="bg-destructive text-destructive-foreground"
                                onClick={() => userToRemove && handleRemoveUser(userToRemove)}
                              >
                                Remove user
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppShell>
  );
}

function StatCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 font-display text-3xl font-semibold">{value}</p>
        <p className="mt-2 text-xs text-muted-foreground">{hint}</p>
      </CardContent>
    </Card>
  );
}