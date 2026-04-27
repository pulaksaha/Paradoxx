import { inflowTrend } from "@/lib/mockData";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Activity } from "lucide-react";

export const InflowChart = () => {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-card">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
            <Activity className="h-4 w-4 text-accent-foreground" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">Patient Flow · Today</h3>
            <p className="text-[11px] text-muted-foreground">AI-predicted spike at 18:00</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" />Admissions</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success" />Discharges</span>
        </div>
      </div>
      <div className="p-4 h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={inflowTrend}>
            <defs>
              <linearGradient id="ad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="dc" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="time" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={28} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.75rem",
                fontSize: 12,
                boxShadow: "var(--shadow-elevated)",
              }}
            />
            <Area type="monotone" dataKey="admissions" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#ad)" />
            <Area type="monotone" dataKey="discharges" stroke="hsl(var(--success))" strokeWidth={2.5} fill="url(#dc)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
