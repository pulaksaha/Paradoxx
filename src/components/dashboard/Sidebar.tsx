import { Activity, Bed, Scissors, Truck, Droplet, Bell, Settings, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: Bed, label: "Beds & Wards" },
  { icon: Scissors, label: "Operation Theatres" },
  { icon: Truck, label: "Ambulances" },
  { icon: Droplet, label: "Blood Bank" },
  { icon: Bell, label: "Alerts" },
  { icon: Settings, label: "Settings" },
];

export const Sidebar = () => {
  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-sidebar">
      <div className="flex items-center gap-2.5 px-6 py-5 border-b border-sidebar-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-elevated">
          <Activity className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
        </div>
        <div>
          <div className="text-base font-semibold tracking-tight text-sidebar-foreground">MedDispatch</div>
          <div className="text-[11px] text-muted-foreground -mt-0.5">Hospital OS</div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-base",
              item.active
                ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-card"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="m-3 rounded-xl bg-gradient-soft p-4 border border-border">
        <div className="text-xs font-semibold text-foreground">AIIMS Demo Hospital</div>
        <div className="text-[11px] text-muted-foreground mt-0.5">Resource Coordinator · Live</div>
        <div className="mt-3 flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-success animate-pulse-dot" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <span className="text-[11px] text-muted-foreground">All systems online</span>
        </div>
      </div>
    </aside>
  );
};
