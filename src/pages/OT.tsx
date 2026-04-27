import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { OTPanel } from "@/components/dashboard/OTPanel";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { operationTheatres } from "@/lib/mockData";
import { Scissors, Clock, CheckCircle2 } from "lucide-react";

const OT = () => {
  const inUse = operationTheatres.filter(o => o.status === "in-use").length;
  const idle = operationTheatres.filter(o => o.status === "idle").length;
  const cleaning = operationTheatres.filter(o => o.status === "cleaning").length;

  return (
    <DashboardLayout title="Operation Theatres" subtitle="OT schedule and idle-time tracker">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <KpiCard label="In Use" value={`${inUse}`} sub="Currently operating" icon={Scissors} tone="default" />
        <KpiCard label="Idle / Available" value={`${idle}`} sub="Ready for allocation" icon={CheckCircle2} tone="success" />
        <KpiCard label="Cleaning" value={`${cleaning}`} sub="Turnaround in progress" icon={Clock} tone="warning" />
      </div>
      <OTPanel />
    </DashboardLayout>
  );
};

export default OT;
