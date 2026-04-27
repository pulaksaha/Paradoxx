import { Bed, Scissors, Truck, Droplet } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { BedsPanel } from "@/components/dashboard/BedsPanel";
import { OTPanel } from "@/components/dashboard/OTPanel";
import { AmbulanceMap } from "@/components/dashboard/AmbulanceMap";
import { BloodBankPanel } from "@/components/dashboard/BloodBankPanel";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { AIRecommendations } from "@/components/dashboard/AIRecommendations";
import { InflowChart } from "@/components/dashboard/InflowChart";
import { wards, ambulances, operationTheatres, bloodInventory } from "@/lib/mockData";

const Index = () => {
  const totalBeds = wards.reduce((s, w) => s + w.total, 0);
  const occupiedBeds = wards.reduce((s, w) => s + w.occupied, 0);
  const availableAmb = ambulances.filter(a => a.status === "available").length;
  const idleOT = operationTheatres.filter(o => o.status === "idle" || o.status === "cleaning").length;
  const criticalBlood = bloodInventory.filter(b => b.units < b.minRequired).length;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-6 space-y-6">
          {/* KPI row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
              label="Bed Occupancy"
              value={`${Math.round((occupiedBeds / totalBeds) * 100)}%`}
              sub={`${occupiedBeds} of ${totalBeds} beds occupied`}
              icon={Bed}
              trend={4}
              tone="warning"
            />
            <KpiCard
              label="OT Utilization"
              value={`${operationTheatres.filter(o=>o.status==='in-use').length}/${operationTheatres.length}`}
              sub={`${idleOT} ready for next case`}
              icon={Scissors}
              trend={-2}
              tone="default"
            />
            <KpiCard
              label="Ambulances Available"
              value={`${availableAmb}`}
              sub={`${ambulances.filter(a=>a.status==='dispatched').length} dispatched · ETA 3-6 min`}
              icon={Truck}
              trend={0}
              tone="success"
            />
            <KpiCard
              label="Blood Critical Types"
              value={`${criticalBlood}`}
              sub="O- and A- below minimum threshold"
              icon={Droplet}
              trend={1}
              tone="danger"
            />
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <AmbulanceMap />
              <div className="grid md:grid-cols-2 gap-6">
                <BedsPanel />
                <OTPanel />
              </div>
              <InflowChart />
            </div>
            <div className="space-y-6">
              <AIRecommendations />
              <BloodBankPanel />
              <AlertsPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
