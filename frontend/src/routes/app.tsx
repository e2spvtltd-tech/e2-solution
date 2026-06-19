import { createFileRoute, Outlet, redirect, Link, useLocation } from "@tanstack/react-router";
import { Home, Network, FileText, Coins } from "lucide-react";

export const Route = createFileRoute("/app")({
  // Auth guard — redirect to login if no token found
  beforeLoad: () => {
    if (typeof window !== "undefined" && !localStorage.getItem("token")) {
      throw redirect({ to: "/login" });
    }
  },
  component: AppLayout,
});

function AppLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col bg-primary/5">
      <main className="flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border/40 px-2 pt-2 pb-safe">
        <div className="flex items-center justify-around pb-2">
          <Link to="/app" className={`flex flex-col items-center gap-1 p-2 transition-colors ${currentPath === '/app' ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground'}`}>
            <Home className="h-5 w-5" />
            <span className="text-[10px]">Dashboard</span>
          </Link>
          <Link to="/app/network" className={`flex flex-col items-center gap-1 p-2 transition-colors ${currentPath.includes('/app/network') ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground'}`}>
            <Network className="h-5 w-5" />
            <span className="text-[10px]">Network</span>
          </Link>
          <Link to="/app/invest" className={`flex flex-col items-center gap-1 p-2 transition-colors ${currentPath.includes('/app/invest') ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground'}`}>
            <FileText className="h-5 w-5" />
            <span className="text-[10px]">Investments</span>
          </Link>
          <Link to="/app/earnings" className={`flex flex-col items-center gap-1 p-2 transition-colors ${currentPath.includes('/app/earnings') ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground'}`}>
            <Coins className="h-5 w-5" />
            <span className="text-[10px]">Earnings</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
