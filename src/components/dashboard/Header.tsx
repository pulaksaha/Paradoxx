import { Search, Bell, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-border bg-background/80 backdrop-blur-xl px-6 py-3.5">
      <Button variant="ghost" size="icon" className="lg:hidden">
        <Menu className="h-5 w-5" />
      </Button>
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Coordinator Dashboard</h1>
        <p className="text-xs text-muted-foreground">Real-time orchestration · Last sync 4s ago</p>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search wards, OTs, units…" className="pl-9 w-72 bg-secondary border-0" />
        </div>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">5</span>
        </Button>
        <div className="flex items-center gap-2.5 pl-3 border-l border-border">
          <div className="h-9 w-9 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
            PS
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-medium leading-tight">Pulak Saha</div>
            <div className="text-[11px] text-muted-foreground">Coordinator</div>
          </div>
        </div>
      </div>
    </header>
  );
};
