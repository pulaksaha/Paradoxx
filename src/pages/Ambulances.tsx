import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AmbulanceMap } from "@/components/dashboard/AmbulanceMap";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { ambulances } from "@/lib/mockData";
import { Truck, Navigation, Wrench } from "lucide-react";

const Ambulances = () => {
  const available = ambulances.filter(a => a.status === "available").length;
  const dispatched = ambulances.filter(a => a.status === "dispatched").length;
  const maintenance = ambulances.filter(a => a.status === "maintenance").length;

  return (
    <DashboardLayout title="Ambulances" subtitle="Live GPS tracking and smart dispatch">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <KpiCard label="Available" value={`${available}`} sub="Ready to dispatch" icon={Truck} tone="success" />
        <KpiCard label="Dispatched" value={`${dispatched}`} sub="On active calls" icon={Navigation} tone="default" />
        <KpiCard label="Maintenance" value={`${maintenance}`} sub="Out of service" icon={Wrench} tone="warning" />
      </div>
      <AmbulanceMap />
    </DashboardLayout>
  );
};

export default Ambulances;
