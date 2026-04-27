import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { BedsPanel } from "@/components/dashboard/BedsPanel";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { wards } from "@/lib/mockData";
import { Bed, BedDouble, AlertTriangle } from "lucide-react";

const Beds = () => {
  const total = wards.reduce((s, w) => s + w.total, 0);
  const occupied = wards.reduce((s, w) => s + w.occupied, 0);
  const pending = wards.reduce((s, w) => s + w.pendingDischarge, 0);

  return (
    <DashboardLayout title="Beds & Wards" subtitle="Live bed occupancy across all wards">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <KpiCard label="Total Beds" value={`${total}`} sub={`${wards.length} wards`} icon={BedDouble} tone="default" />
        <KpiCard label="Occupied" value={`${occupied}`} sub={`${Math.round((occupied / total) * 100)}% utilization`} icon={Bed} tone="warning" />
        <KpiCard label="Pending Discharge" value={`${pending}`} sub="Could free beds soon" icon={AlertTriangle} tone="danger" />
      </div>
      <BedsPanel />
    </DashboardLayout>
  );
};

export default Beds;
