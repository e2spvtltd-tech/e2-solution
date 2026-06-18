import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toastWithSound as toast } from "@/lib/toast-with-sound";
import { Check, Star, TrendingUp, History, CheckCircle, Activity } from "lucide-react";
import { AppHeader } from "@/components/app/AppHeader";
import { Button } from "@/components/ui/button";
import { inr, packages, type Pkg } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/invest")({
  head: () => ({ meta: [{ title: "Investments — E2 Solutions" }] }),
  component: InvestPage,
});

function PackageCard({ p }: { p: Pkg }) {
  const featured = p.popular;
  const features = [p.dailyRoi, p.binaryBonus, p.referral, p.duration, p.ceiling];
  return (
    <div
      className={cn(
        "rounded-3xl p-5 shadow-soft h-full flex flex-col",
        featured ? "bg-gradient-hero text-primary-foreground shadow-glow" : "bg-card",
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "text-[11px] font-bold uppercase tracking-wider",
            featured ? "text-primary-foreground/80" : "text-primary",
          )}
        >
          {p.name}
        </span>
        {featured && (
          <span className="flex items-center gap-1 rounded-full bg-primary-foreground/15 px-2 py-0.5 text-[11px] font-semibold">
            <Star className="h-3 w-3 fill-current" /> Popular
          </span>
        )}
      </div>
      <p className="mt-1 text-2xl font-extrabold tracking-tight">{inr(p.price)}</p>

      <ul className="mt-4 space-y-2.5 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm">
            <Check
              className={cn(
                "h-4 w-4 shrink-0",
                featured ? "text-primary-foreground" : "text-primary",
              )}
            />
            <span className={featured ? "text-primary-foreground/90" : "text-muted-foreground"}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      <Button
        onClick={() => toast.success(`Investment started in ${p.name} plan`)}
        variant={featured ? "secondary" : "hero"}
        className="mt-5 w-full shrink-0"
      >
        Invest Now
      </Button>
    </div>
  );
}

function InvestPage() {
  const [activeTab, setActiveTab] = useState<"available" | "active" | "history" | "completed">("available");

  return (
    <div className="no-scrollbar">
      <AppHeader title="Investments" subtitle="Precision-engineered investment plans" />
      
      <div className="sticky top-[88px] z-10 bg-background/90 px-4 py-3 backdrop-blur-md border-b border-border/40 max-w-7xl mx-auto">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: "available", label: "Available Plans" },
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
        
        {activeTab === "available" && (
          <>
            <div className="flex items-center gap-2 rounded-2xl bg-accent p-3 md:p-4 text-sm md:text-base text-accent-foreground">
              <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-primary shrink-0" />
              <span>Choose a plan and earn daily ROI plus binary network rewards.</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6 items-stretch">
              {packages.map((p) => (
                <PackageCard key={p.id} p={p} />
              ))}
            </div>
          </>
        )}

        {activeTab === "active" && (
          <div className="flex flex-col items-center justify-center py-12 md:py-24 text-center space-y-4">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-primary/10 text-primary">
              <Activity className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold">No Active Plans</h2>
              <p className="text-muted-foreground max-w-sm mx-auto text-sm">
                You haven't invested in any plans yet. Head over to the Available Plans tab to start earning.
              </p>
            </div>
            <Button onClick={() => setActiveTab("available")} className="mt-4">Explore Plans</Button>
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
