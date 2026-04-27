import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { alerts } from "@/lib/mockData";
import { Bell, AlertOctagon, AlertTriangle } from "lucide-react";

const Alerts = () => {
  const critical = alerts.filter(a => a.severity === "critical").length;
  const high = alerts.filter(a => a.severity === "high").length;

  return (
    <DashboardLayout title="Alerts" subtitle="System-wide notifications requiring attention">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <KpiCard label="Total Active" value={`${alerts.length}`} sub="All severities" icon={Bell} tone="default" />
        <KpiCard label="Critical" value={`${critical}`} sub="Immediate action needed" icon={AlertOctagon} tone="danger" />
        <KpiCard label="High Priority" value={`${high}`} sub="Address within the hour" icon={AlertTriangle} tone="warning" />
      </div>
      <AlertsPanel />
    </DashboardLayout>
  );
};

export default Alerts;
