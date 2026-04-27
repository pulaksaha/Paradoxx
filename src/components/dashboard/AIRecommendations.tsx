import { useEffect, useState } from "react";
import { Sparkles, RefreshCw, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { wards, operationTheatres, ambulances, bloodInventory, alerts } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Recommendation {
  title: string;
  detail: string;
  severity: "critical" | "high" | "medium";
  category: "beds" | "ot" | "ambulance" | "blood";
  impact: string;
}

const sevStyle = {
  critical: "bg-destructive/10 text-destructive border-destructive/20",
  high: "bg-warning/10 text-warning border-warning/20",
  medium: "bg-info/10 text-info border-info/20",
};

export const AIRecommendations = () => {
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const snapshot = {
        wards: wards.map(w => ({ name: w.name, type: w.type, occupancy: `${w.occupied}/${w.total}`, pendingDischarge: w.pendingDischarge })),
        operationTheatres: operationTheatres.map(o => ({ name: o.name, status: o.status, procedure: o.procedure, endsInMin: o.endsInMin, nextStartInMin: o.nextStartInMin })),
        ambulances: ambulances.map(a => ({ callsign: a.callsign, status: a.status, etaMin: a.etaMin, destination: a.destination })),
        blood: bloodInventory.map(b => ({ type: b.type, units: b.units, min: b.minRequired, expiring: b.expiringSoon })),
        alerts: alerts.map(a => ({ message: a.message, severity: a.severity })),
      };
      const { data, error } = await supabase.functions.invoke("ai-recommendations", { body: { snapshot } });
      if (error) throw error;
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      setRecs(data?.recommendations ?? []);
    } catch (e) {
      console.error(e);
      toast.error("Could not generate recommendations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRecommendations(); }, []);

  return (
    <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-border bg-gradient-soft">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-elevated">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-sm font-semibold flex items-center gap-2">
              AI Orchestration
              <span className="text-[10px] uppercase tracking-wide bg-primary text-primary-foreground px-1.5 py-0.5 rounded">Live</span>
            </h3>
            <p className="text-[11px] text-muted-foreground">Prioritized actions for next 30 min</p>
          </div>
        </div>
        <button
          onClick={fetchRecommendations}
          disabled={loading}
          className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline disabled:opacity-50"
        >
          <RefreshCw className={cn("h-3.5 w-3.5", loading && "animate-spin")} />
          Re-analyze
        </button>
      </div>
      <div className="p-4 space-y-3 min-h-[200px]">
        {loading && recs.length === 0 && (
          <div className="space-y-3">
            {[1,2,3,4].map(i => (
              <div key={i} className="rounded-xl border border-border p-4 animate-pulse">
                <div className="h-3 bg-secondary rounded w-2/3 mb-2" />
                <div className="h-2 bg-secondary rounded w-full mb-1" />
                <div className="h-2 bg-secondary rounded w-4/5" />
              </div>
            ))}
          </div>
        )}
        {!loading && recs.length === 0 && (
          <div className="text-center py-12 text-sm text-muted-foreground">No recommendations yet.</div>
        )}
        {recs.map((r, i) => (
          <div key={i} className="group rounded-xl border border-border p-4 hover:border-primary/40 hover:shadow-card transition-base">
            <div className="flex items-start justify-between gap-3 mb-1.5">
              <h4 className="text-sm font-semibold leading-snug">{r.title}</h4>
              <span className={cn("text-[10px] uppercase font-bold px-2 py-0.5 rounded border shrink-0", sevStyle[r.severity])}>
                {r.severity}
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{r.detail}</p>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <div className="text-[11px] font-medium text-success">↑ {r.impact}</div>
              <button className="flex items-center gap-1 text-[11px] font-semibold text-primary opacity-0 group-hover:opacity-100 transition-base">
                Execute <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
