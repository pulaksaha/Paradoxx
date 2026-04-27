import { alerts } from "@/lib/mockData";
import { AlertTriangle, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const sevStyle = {
  critical: "border-l-destructive bg-destructive/5",
  high: "border-l-warning bg-warning/5",
  medium: "border-l-info bg-info/5",
  low: "border-l-muted bg-muted/30",
};

const sevText = {
  critical: "text-destructive",
  high: "text-warning",
  medium: "text-info",
  low: "text-muted-foreground",
};

export const AlertsPanel = () => {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-card">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-destructive/10 flex items-center justify-center">
            <Bell className="h-4 w-4 text-destructive" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Active Alerts</h3>
            <p className="text-[11px] text-muted-foreground">{alerts.length} requiring attention</p>
          </div>
        </div>
      </div>
      <div className="p-3 space-y-2">
        {alerts.map((a) => (
          <div key={a.id} className={cn("flex gap-3 rounded-lg border-l-4 p-3 pr-2", sevStyle[a.severity])}>
            <AlertTriangle className={cn("h-4 w-4 mt-0.5 shrink-0", sevText[a.severity])} />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium leading-snug">{a.message}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className={cn("text-[10px] uppercase font-bold", sevText[a.severity])}>{a.severity}</span>
                <span className="text-[10px] text-muted-foreground">· {a.ageMin}m ago</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
