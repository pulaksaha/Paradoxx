import { operationTheatres } from "@/lib/mockData";
import { Scissors, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const statusStyle: Record<string, string> = {
  "in-use": "bg-info/10 text-info border-info/20",
  idle: "bg-success/10 text-success border-success/20",
  cleaning: "bg-warning/10 text-warning border-warning/20",
  scheduled: "bg-accent text-accent-foreground border-accent",
};

export const OTPanel = () => {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-card">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
            <Scissors className="h-4 w-4 text-accent-foreground" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Operation Theatres</h3>
            <p className="text-[11px] text-muted-foreground">6 theatres · 3 in use · 1 idle</p>
          </div>
        </div>
        <button className="text-xs font-medium text-primary hover:underline">Schedule</button>
      </div>
      <div className="grid grid-cols-2 gap-3 p-5">
        {operationTheatres.map((ot) => (
          <div key={ot.id} className="rounded-xl border border-border p-3 bg-gradient-soft">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm">{ot.name}</span>
              <span className={cn("text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full border", statusStyle[ot.status])}>
                {ot.status}
              </span>
            </div>
            {ot.procedure && <div className="mt-2 text-xs font-medium text-foreground/90 truncate">{ot.procedure}</div>}
            {ot.surgeon && <div className="text-[11px] text-muted-foreground">{ot.surgeon}</div>}
            {ot.endsInMin !== undefined && (
              <div className="mt-2 flex items-center gap-1 text-[11px] text-info">
                <Clock className="h-3 w-3" /> Ends in {ot.endsInMin}m
              </div>
            )}
            {ot.nextStartInMin !== undefined && (
              <div className="mt-2 flex items-center gap-1 text-[11px] text-warning">
                <Clock className="h-3 w-3" /> Next in {ot.nextStartInMin}m
              </div>
            )}
            {ot.status === "idle" && <div className="mt-2 text-[11px] text-success">✓ Ready for allocation</div>}
          </div>
        ))}
      </div>
    </div>
  );
};
