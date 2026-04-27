import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string;
  sub: string;
  icon: LucideIcon;
  trend?: number;
  tone?: "default" | "success" | "warning" | "danger";
}

const toneMap = {
  default: "bg-accent text-accent-foreground",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  danger: "bg-destructive/10 text-destructive",
};

export const KpiCard = ({ label, value, sub, icon: Icon, trend, tone = "default" }: KpiCardProps) => {
  const TrendIcon = (trend ?? 0) >= 0 ? TrendingUp : TrendingDown;
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card transition-base hover:shadow-elevated hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", toneMap[tone])}>
          <Icon className="h-5 w-5" />
        </div>
        {trend !== undefined && (
          <div className={cn("flex items-center gap-1 text-xs font-semibold", trend >= 0 ? "text-success" : "text-destructive")}>
            <TrendIcon className="h-3.5 w-3.5" />
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="mt-4">
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        <div className="text-xs text-muted-foreground mt-1">{label}</div>
        <div className="text-[11px] text-muted-foreground/80 mt-2">{sub}</div>
      </div>
    </div>
  );
};
