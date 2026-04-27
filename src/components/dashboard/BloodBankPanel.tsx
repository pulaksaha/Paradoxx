import { bloodInventory } from "@/lib/mockData";
import { Droplet } from "lucide-react";
import { cn } from "@/lib/utils";

export const BloodBankPanel = () => {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-card">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-destructive/10 flex items-center justify-center">
            <Droplet className="h-4 w-4 text-destructive" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Blood Bank Inventory</h3>
            <p className="text-[11px] text-muted-foreground">8 types · 11 units expiring soon</p>
          </div>
        </div>
        <button className="text-xs font-medium text-primary hover:underline">Request</button>
      </div>
      <div className="grid grid-cols-4 gap-3 p-5">
        {bloodInventory.map((b) => {
          const ratio = b.units / b.minRequired;
          const critical = b.units < b.minRequired;
          const low = ratio < 1.3 && !critical;
          return (
            <div
              key={b.type}
              className={cn(
                "rounded-xl border p-3 text-center transition-base",
                critical ? "border-destructive/40 bg-destructive/5" : low ? "border-warning/40 bg-warning/5" : "border-border bg-gradient-soft"
              )}
            >
              <div className={cn("text-xs font-bold mb-1", critical ? "text-destructive" : low ? "text-warning" : "text-muted-foreground")}>
                {b.type}
              </div>
              <div className="text-2xl font-bold tabular-nums">{b.units}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">min {b.minRequired}</div>
              {b.expiringSoon > 0 && (
                <div className="text-[10px] text-warning mt-1.5 font-medium">{b.expiringSoon} expiring</div>
              )}
              {critical && <div className="text-[10px] text-destructive mt-1 font-bold">CRITICAL</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
