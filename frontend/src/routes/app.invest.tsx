import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { History, CheckCircle, Activity } from "lucide-react";
import { AppHeader } from "@/components/app/AppHeader";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/invest")({
  head: () => ({ meta: [{ title: "Investments - e2solution.in" }] }),
  component: InvestPage,
});

function InvestPage() {
  const [activeTab, setActiveTab] = useState<"active" | "history" | "completed">("active");

  return (
    <div className="no-scrollbar">
      <AppHeader title="Investments" subtitle="Precision-engineered investment plans" />
      
      <div className="sticky top-[88px] z-10 bg-background/90 px-4 py-3 backdrop-blur-md border-b border-border/40 max-w-7xl mx-auto">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: "active", label: "Active Plans" },
            { id: "history", label: "Investment History" },
            { id: "completed", label: "Completed Plans" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap",
                activeTab === tab.id 
                  ? "bg-primary text-primary-foreground shadow-glow" 
                  : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 px-4 pt-4 md:space-y-6 md:p-8 mx-auto max-w-7xl pb-20 md:pb-24">
        
        {activeTab === "active" && (
          <div className="flex flex-col items-center justify-center py-12 md:py-24 text-center space-y-4">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-primary/10 text-primary">
              <Activity className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold">No Active Plans</h2>
              <p className="text-muted-foreground max-w-sm mx-auto text-sm">
                You don't have any active plans currently.
              </p>
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className="flex flex-col items-center justify-center py-12 md:py-24 text-center space-y-4">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-primary/10 text-primary">
              <History className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold">No Investment History</h2>
              <p className="text-muted-foreground max-w-sm mx-auto text-sm">
                Your investment transaction history will appear here once you make your first deposit.
              </p>
            </div>
          </div>
        )}

        {activeTab === "completed" && (
          <div className="flex flex-col items-center justify-center py-12 md:py-24 text-center space-y-4">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-primary/10 text-primary">
              <CheckCircle className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold">No Completed Plans</h2>
              <p className="text-muted-foreground max-w-sm mx-auto text-sm">
                Plans that have completed their ROI duration will be listed here for your reference.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
