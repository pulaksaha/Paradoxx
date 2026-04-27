import { wards } from "@/lib/mockData";
import { Bed } from "lucide-react";
import { cn } from "@/lib/utils";

export const BedsPanel = () => {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-card">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
            <Bed className="h-4 w-4 text-accent-foreground" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Bed Availability</h3>
            <p className="text-[11px] text-muted-foreground">Live · 6 wards monitored</p>
          </div>
        </div>
        <button className="text-xs font-medium text-primary hover:underline">View all</button>
      </div>
      <div className="p-5 space-y-4">
        {wards.map((w) => {
          const pct = Math.round((w.occupied / w.total) * 100);
          const free = w.total - w.occupied;
          const tone = pct >= 90 ? "bg-destructive" : pct >= 75 ? "bg-warning" : "bg-success";
          return (
            <div key={w.id}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{w.name}</span>
                  <span className="text-[10px] uppercase tracking-wide text-muted-foreground bg-secondary rounded px-1.5 py-0.5">{w.type}</span>
                </div>
                <div className="text-xs tabular-nums text-muted-foreground">
                  <span className="text-foreground font-semibold">{w.occupied}</span>/{w.total}
                  <span className="ml-2 text-success">{free} free</span>
                </div>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div className={cn("h-full rounded-full transition-base", tone)} style={{ width: `${pct}%` }} />
              </div>
              {w.pendingDischarge > 0 && (
                <div className="mt-1 text-[11px] text-warning">
                  ⚠ {w.pendingDischarge} pending discharge — potential to free beds
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
