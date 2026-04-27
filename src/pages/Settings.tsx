import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Settings = () => {
  return (
    <DashboardLayout title="Settings" subtitle="Hospital profile and coordinator preferences">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card shadow-card p-6 space-y-4">
          <h3 className="text-sm font-semibold">Hospital Profile</h3>
          <div className="space-y-2">
            <Label htmlFor="hospital">Hospital Name</Label>
            <Input id="hospital" defaultValue="AIIMS Demo Hospital" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="coord">Coordinator</Label>
            <Input id="coord" defaultValue="Dr. R. Sharma" />
          </div>
          <Button>Save changes</Button>
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-card p-6 space-y-4">
          <h3 className="text-sm font-semibold">Notification Preferences</h3>
          {[
            { label: "Critical bed shortages", desc: "Notify when ICU > 90%" },
            { label: "Blood inventory alerts", desc: "Notify when below minimum" },
            { label: "Ambulance dispatch updates", desc: "Real-time fleet status" },
            { label: "AI recommendations", desc: "Push smart suggestions" },
          ].map((opt) => (
            <div key={opt.label} className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-medium">{opt.label}</div>
                <div className="text-[11px] text-muted-foreground">{opt.desc}</div>
              </div>
              <Switch defaultChecked />
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
