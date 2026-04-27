import { ambulances } from "@/lib/mockData";
import { Truck, MapPin, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";

const statusDot: Record<string, string> = {
  available: "bg-success",
  dispatched: "bg-info",
  returning: "bg-warning",
  maintenance: "bg-muted-foreground",
};

export const AmbulanceMap = () => {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
            <Truck className="h-4 w-4 text-accent-foreground" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Ambulance Fleet · Live</h3>
            <p className="text-[11px] text-muted-foreground">6 vehicles · 2 available · 2 dispatched</p>
          </div>
        </div>
        <button className="text-xs font-medium text-primary hover:underline">Dispatch</button>
      </div>

      <div className="grid lg:grid-cols-5">
        {/* Map */}
        <div className="lg:col-span-3 relative h-[340px] bg-gradient-soft border-r border-border overflow-hidden">
          {/* grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          {/* roads */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-border/60" />
          <div className="absolute top-0 bottom-0 left-1/3 w-1 bg-border/60" />
          <div className="absolute top-0 bottom-0 left-2/3 w-1 bg-border/60" />

          {/* hospital marker */}
          <div className="absolute" style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}>
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/30 animate-pulse-dot" style={{ width: 36, height: 36, transform: "translate(-50%,-50%)", left: "50%", top: "50%" }} />
              <div className="relative h-9 w-9 rounded-full bg-gradient-primary shadow-elevated flex items-center justify-center text-primary-foreground text-[10px] font-bold">
                H
              </div>
            </div>
          </div>

          {ambulances.map((a) => (
            <div
              key={a.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{ left: `${a.x}%`, top: `${a.y}%` }}
            >
              <div className={cn("h-3 w-3 rounded-full ring-4 ring-background", statusDot[a.status])} />
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md bg-foreground text-background text-[10px] font-medium px-2 py-1 opacity-0 group-hover:opacity-100 transition-base pointer-events-none">
                {a.callsign} · {a.status}
              </div>
            </div>
          ))}

          <div className="absolute bottom-3 left-3 flex items-center gap-3 rounded-lg bg-card/90 backdrop-blur px-3 py-1.5 border border-border text-[10px]">
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-success" /> Available</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-info" /> Dispatched</span>
            <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-warning" /> Returning</span>
          </div>
        </div>

        {/* List */}
        <div className="lg:col-span-2 p-3 space-y-2 max-h-[340px] overflow-y-auto">
          {ambulances.map((a) => (
            <div key={a.id} className="flex items-center gap-3 rounded-xl border border-border p-2.5 hover:bg-secondary/50 transition-base">
              <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center", `bg-${a.status === "available" ? "success" : a.status === "dispatched" ? "info" : a.status === "returning" ? "warning" : "muted"}/10`)}>
                <Truck className={cn("h-4 w-4", statusDot[a.status].replace("bg-", "text-"))} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{a.callsign}</span>
                  <span className="text-[10px] uppercase text-muted-foreground">{a.status}</span>
                </div>
                <div className="text-[11px] text-muted-foreground truncate flex items-center gap-1">
                  {a.destination ? <><MapPin className="h-3 w-3" />{a.destination}</> : a.driver}
                </div>
              </div>
              {a.etaMin !== undefined && (
                <div className="text-right">
                  <div className="text-sm font-bold tabular-nums">{a.etaMin}m</div>
                  <div className="text-[10px] text-muted-foreground flex items-center gap-0.5"><Navigation className="h-2.5 w-2.5" />ETA</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
