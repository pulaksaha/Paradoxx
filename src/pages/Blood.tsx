import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { BloodBankPanel } from "@/components/dashboard/BloodBankPanel";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { bloodInventory } from "@/lib/mockData";
import { Droplet, AlertTriangle, Clock } from "lucide-react";

const Blood = () => {
  const totalUnits = bloodInventory.reduce((s, b) => s + b.units, 0);
  const critical = bloodInventory.filter(b => b.units < b.minRequired).length;
  const expiring = bloodInventory.reduce((s, b) => s + b.expiringSoon, 0);

  return (
    <DashboardLayout title="Blood Bank" subtitle="Stock levels, expiry alerts, shortages">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <KpiCard label="Total Units" value={`${totalUnits}`} sub="Across 8 blood types" icon={Droplet} tone="default" />
        <KpiCard label="Critical Types" value={`${critical}`} sub="Below minimum threshold" icon={AlertTriangle} tone="danger" />
        <KpiCard label="Expiring Soon" value={`${expiring}`} sub="Units within 7 days" icon={Clock} tone="warning" />
      </div>
      <BloodBankPanel />
    </DashboardLayout>
  );
};

export default Blood;
